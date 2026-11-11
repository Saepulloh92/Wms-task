/* Monitoring kiriman / Beranda
   asal: index-fixd.html baris 6168-6604 */
      /* ---------- monitoring kiriman ---------- */
      const K_MON = "warehouse_so_mon_v1",
        K_MONC = "warehouse_so_monc_v1",
        K_MONG = "warehouse_so_mong_v1",
        K_MONH = "warehouse_so_monh_v1";
      const MON_DEF = [
        { role: "nama", label: "Wilayah / nama baris", col: "A", type: "teks" },
        { role: "total", label: "Total mobil", col: "B", type: "angka" },
        { role: "belum", label: "Belum masuk", col: "C", type: "angka" },
        { role: "masuk", label: "Mobil masuk", col: "D", type: "angka" },
        { role: "proses", label: "Mobil proses", col: "E", type: "angka" },
        { role: "keluar", label: "Mobil keluar", col: "F", type: "angka" },
        { role: "gagal", label: "List gagal masuk", col: "G", type: "daftar" },
        { role: "progress", label: "Progress delivery", col: "H", type: "persen" },
      ];
      const monS = ld(K_MON, {});
      let mon = {
        url: monS.url || WMS_CONFIG.monUrl || "",
        start: monS.start || 2,
        auto: monS.auto == null ? 5 : monS.auto,
        alert: !!monS.alert,
        fields: Array.isArray(monS.fields) && monS.fields.length ? monS.fields : MON_DEF.map((f) => ({ ...f })),
      };
      let monCache = ld(K_MONC, null), // { at, rows, src }
        monView = "ringkas",
        monQ = "",
        monTimer = 0,
        monBusy = false,
        monErr = "";
      let monUnit = "", monPer = 1, monTr = 7;
      const monH = ld(K_MONH, {}), // riwayat harian { "YYYY-MM-DD": {total,keluar,masuk,proses,belum,gagal,u:{wilayah:{...}}} }
        monOpen = new Set();
      const monLetter = (i) => {
        let s2 = "";
        for (i++; i > 0; i = Math.floor((i - 1) / 26)) s2 = String.fromCharCode(65 + ((i - 1) % 26)) + s2;
        return s2;
      };
      function monCSV(t) {
        // seperti parseCSV, tetapi baris kosong tetap dihitung agar nomor baris sama dengan di spreadsheet
        const rows = [];
        let row = [], f = "", q = false;
        for (let i = 0; i < t.length; i++) {
          const ch = t[i], n = t[i + 1];
          if (ch === '"' && q && n === '"') { f += '"'; i++; }
          else if (ch === '"') q = !q;
          else if (ch === "," && !q) { row.push(f); f = ""; }
          else if ((ch === "\n" || ch === "\r") && !q) {
            if (ch === "\r" && n === "\n") i++;
            row.push(f); rows.push(row); row = []; f = "";
          } else f += ch;
        }
        row.push(f);
        if (row.some((v) => v.trim())) rows.push(row);
        return rows;
      }
      function monUrls(u) {
        u = u.trim();
        if (!u) return [];
        const gid = (u.match(/[#&?]gid=(\d+)/) || [])[1];
        const pub = u.match(/spreadsheets\/d\/e\/([\w-]+)/);
        if (pub) return [`https://docs.google.com/spreadsheets/d/e/${pub[1]}/pub?output=csv${gid ? "&gid=" + gid : ""}`];
        const m = u.match(/spreadsheets\/d\/([\w-]+)/);
        if (m) {
          const g = gid || "0";
          return [
            `https://docs.google.com/spreadsheets/d/${m[1]}/export?format=csv&gid=${g}`,
            `https://docs.google.com/spreadsheets/d/${m[1]}/gviz/tq?tqx=out:csv&gid=${g}`,
          ];
        }
        return [u];
      }
      function monNum(v) {
        let t = String(v ?? "").trim().replace(/%/g, "").replace(/\s/g, "");
        if (!t) return null;
        if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, "").replace(",", ".");
        else t = t.replace(",", ".");
        const n = Number(t);
        return Number.isFinite(n) ? n : null;
      }
      function monCol(spec, hdr) {
        spec = String(spec || "").trim();
        if (!spec) return -1;
        if (/^[A-Za-z]{1,3}$/.test(spec)) {
          let n = 0;
          for (const ch of spec.toUpperCase()) n = n * 26 + ch.charCodeAt(0) - 64;
          return n - 1;
        }
        const k = nrm(spec);
        return k ? hdr.findIndex((h) => nrm(h).includes(k)) : -1;
      }
      function monSumOf(groups) {
        const sum = {};
        ["total", "belum", "masuk", "proses", "keluar"].forEach((k) => {
          const v = groups.map((g) => g.n[k]).filter((x) => x != null);
          sum[k] = v.length ? v.reduce((a, b) => a + b, 0) : null;
        });
        sum.gagal = groups.reduce((a, g) => a + g.gagalN, 0);
        const pv = groups.map((g) => g.n.progress).filter((x) => x != null);
        sum.progress = sum.total && sum.keluar != null ? (sum.keluar / sum.total) * 100 : pv.length ? pv.reduce((a, b) => a + b, 0) / pv.length : null;
        return sum;
      }
      function monBuild(rows) {
        const hdr = rows[Math.max(0, mon.start - 2)] || [];
        const F = mon.fields.map((f) => ({ ...f, i: monCol(f.col, hdr) }));
        const by = (r) => F.find((f) => f.role === r);
        const nf = by("nama");
        const missing = F.filter((f) => String(f.col || "").trim() && f.i < 0).map((f) => f.label);
        const groups = [];
        if (nf && nf.i >= 0)
          rows.slice(Math.max(0, mon.start - 1)).forEach((r) => {
            const name = String(r[nf.i] ?? "").trim();
            if (!name || /^(total|jumlah|grand\s*total)\b/i.test(name)) return;
            const g = { name, n: {}, extra: [], gagal: [], gagalN: 0, raw: {} };
            F.forEach((f) => {
              if (f.role === "nama" || f.i < 0) return;
              const raw = String(r[f.i] ?? "").trim();
              if (f.role === "gagal" || (!f.role && f.type === "daftar")) {
                const list = raw.split(/[\n;|,]+/).map((x) => x.trim()).filter(Boolean);
                if (f.role === "gagal") {
                  if (/^\d+$/.test(raw)) g.gagalN = Number(raw);
                  else { g.gagal = list; g.gagalN = list.length; }
                } else g.extra.push({ label: f.label, text: list.join(", ") });
              } else if (f.role) g.n[f.role] = f.role === "progress" ? monPct(raw) : monNum(raw);
              else g.extra.push({ label: f.label, text: f.type === "angka" ? (monNum(raw) == null ? raw : fmt(monNum(raw))) : raw });
            });
            const n = g.n;
            if (n.total == null) {
              const sm = ["belum", "masuk", "proses", "keluar"].map((k) => n[k]).filter((v) => v != null);
              if (sm.length) n.total = sm.reduce((a, b) => a + b, 0);
            }
            if (n.progress == null && n.total && n.keluar != null) n.progress = (n.keluar / n.total) * 100;
            groups.push(g);
          });
        const sum = monSumOf(groups);
        return { F, groups, sum, missing, hasName: !!(nf && nf.i >= 0) };
      }

      /* ---- v16: Beranda, mobil keluar vs SPM dikerjakan ---- */
      function monCmp() {
        const el = $("monCmp");
        if (!el) return;
        const mu = ld(K_MUATS, null);
        const b = monCache ? monBuild(monCache.rows) : null, keluar = b ? b.sum.keluar : null;
        const go2 = allowedView("muat") ? '<button class="btn sec sm mt" type="button" data-go="muat">Buka Laporan Muat</button>' : "";
        if (!mu) {
          el.innerHTML = `<div class="panel cmp"><div class="r"><b>Mobil keluar dan SPM dikerjakan</b></div><p class="fine">Laporan Muat belum diimpor. Impor file laporan muat supaya jumlah mobil keluar bisa dibandingkan dengan SPM yang dikerjakan.</p>${go2}</div>`;
        } else {
          const tgl = mu.tgl ? new Date(mu.tgl + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "tanpa tanggal";
          const today = mISO(new Date()), old = mu.tgl && mu.tgl !== today;
          let head = "", body = "";
          if (keluar == null) {
            body = `<dl class="kv k2"><div><dt>SPM dikerjakan</dt><dd>${fmt(mu.dp)}</dd></div><div><dt>Tidak diproses WMS</dt><dd>${fmt(mu.tdkN)}</dd></div></dl><p class="fine">Jumlah mobil keluar belum terbaca dari monitoring. ${monCache ? 'Cek kolom "Mobil keluar" di pengaturan sumber.' : "Isi alamat spreadsheet di pengaturan sumber."}</p>`;
          } else {
            const diff = keluar - mu.dp, pct = keluar ? Math.round((mu.dp / keluar) * 100) + "%" : "-";
            const [lb, cl, tx] = diff === 0
              ? ["Sama", "green", "Jumlah mobil keluar sama dengan SPM yang dikerjakan."]
              : diff > 0
                ? ["Keluar lebih banyak", "red", `${fmt(diff)} mobil sudah keluar tetapi SPM-nya tidak tercatat dikerjakan di WMS.`]
                : ["SPM lebih banyak", "amber", `${fmt(-diff)} SPM dikerjakan di WMS tetapi mobilnya belum tercatat keluar.`];
            head = `<span class="pill ${cl}">${lb}</span>`;
            body = `<dl class="kv"><div><dt>Mobil keluar</dt><dd>${fmt(keluar)}</dd></div><div><dt>SPM dikerjakan</dt><dd>${fmt(mu.dp)}</dd></div><div><dt>Selisih</dt><dd class="${diff ? "neg" : ""}">${diff > 0 ? "+" : ""}${fmt(diff)}</dd></div><div><dt>Dikerjakan</dt><dd>${pct}</dd></div></dl><p class="cmp-tx">${tx}</p>`;
          }
          el.innerHTML = `<div class="panel cmp"><div class="r"><b>Mobil keluar dan SPM dikerjakan</b>${head}</div>${body}<p class="fine">Laporan muat tanggal ${tgl}, diimpor ${new Date(mu.at).toLocaleString("id-ID")}.${old ? " Tanggal ini bukan hari ini, impor laporan terbaru." : ""}</p>${go2}</div>`;
        }
        const g = el.querySelector("[data-go]");
        if (g) g.onclick = () => nav(g.dataset.go);
      }
      function monPct(raw) {
        const v = monNum(raw);
        if (v == null) return null;
        return !/%/.test(raw) && v > 0 && v <= 1 && /[.,]/.test(raw) ? v * 100 : v;
      }
      const pr = (v) => (v == null ? "–" : Math.round(v) + "%");
      const monClock = (t) => new Date(t).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      function monSeg(g) {
        const n = g.n || g,
          parts = ["belum", "masuk", "proses", "keluar"].map((k) => [k, n[k] || 0]),
          tot = parts.reduce((a, [, v]) => a + v, 0) || 1;
        return parts.map(([k, v]) => (v ? `<i class="c-${k}" style="width:${(v / tot) * 100}%"></i>` : "")).join("");
      }
      const MON_LBL = (b, r) => (b.F.find((f) => f.role === r) || {}).label || r;
      /* ---- dashboard: riwayat harian, KPI, tren, status ---- */
      function monSnap(b) {
        if (!b.groups.length) return;
        const pick = (S) => ({ total: S.total, keluar: S.keluar, masuk: S.masuk, proses: S.proses, belum: S.belum, gagal: S.gagal }),
          u = {};
        b.groups.forEach((g) => (u[g.name] = pick({ ...g.n, gagal: g.gagalN })));
        monH[mISO(new Date())] = { ...pick(b.sum), u };
        Object.keys(monH).sort().slice(0, -60).forEach((k) => delete monH[k]);
        sv(K_MONH, monH);
      }
      const monSnapOf = (sn, unit) => (sn ? (unit ? (sn.u || {})[unit] : sn) || null : null);
      function monPrevSnap(per) {
        const lim = new Date();
        lim.setHours(0, 0, 0, 0);
        lim.setDate(lim.getDate() - per);
        const lk = mISO(lim), today = mISO(new Date()), k = Object.keys(monH).filter((x) => x <= lk && x < today).sort().pop();
        return k ? { k, s: monH[k] } : null;
      }
      function monTrend(days, unit) {
        const pts = [];
        for (let i = days - 1; i >= 0; i--) {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() - i);
          const s2 = monSnapOf(monH[mISO(d)], unit);
          pts.push({ d, t: s2 ? s2.total : null, k: s2 ? s2.keluar : null });
        }
        return pts;
      }
      function monTrendSvg(pts) {
        const vals = pts.flatMap((p) => [p.t, p.k]).filter((v) => v != null);
        if (!vals.length) return '<div class="empty">Belum ada riwayat. Tren terbentuk dari data yang dimuat setiap hari.</div>';
        const W = 340, H = 190, L0 = 30, R = 10, T = 12, B = 28,
          mx = Math.max(...vals, 1),
          step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000].find((q) => mx / q <= 4) || Math.ceil(mx / 4),
          top = Math.ceil(mx / step) * step,
          x = (i) => L0 + (pts.length === 1 ? (W - L0 - R) / 2 : (i * (W - L0 - R)) / (pts.length - 1)),
          y = (v) => T + (H - T - B) * (1 - v / top),
          DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
          long = pts.length > 10;
        let grid = "";
        for (let v = 0; v <= top; v += step) grid += `<line class="g" x1="${L0}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L0 - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
        const lab = pts.map((p, i) => ((pts.length - 1 - i) % (long ? 5 : 1) === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${long ? p.d.getDate() + "/" + (p.d.getMonth() + 1) : DAY[p.d.getDay()]}</text>` : "")).join("");
        const series = (key, col) => {
          const segs = [];
          let cur = [];
          pts.forEach((p, i) => {
            if (p[key] == null) { if (cur.length) segs.push(cur); cur = []; } else cur.push([x(i), y(p[key])]);
          });
          if (cur.length) segs.push(cur);
          const line = segs.filter((g) => g.length > 1).map((g) => `<path d="M${g.map((q) => q.join(",")).join(" L")}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round"/>`).join("");
          const area = segs.filter((g) => g.length > 1).map((g) => `<path d="M${g.map((q) => q.join(",")).join(" L")} L${g[g.length - 1][0]},${y(0)} L${g[0][0]},${y(0)}Z" fill="${col}" opacity=".08"/>`).join("");
          const dots = segs.flat().map((q) => `<circle cx="${q[0]}" cy="${q[1]}" r="4" fill="${col}"/>`).join("");
          return area + line + dots;
        };
        return `<svg class="dch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik tren total dan terkirim ${pts.length} hari terakhir">${grid}${lab}${series("t", "#0a5bd3")}${series("k", "#1f7a4d")}</svg>`;
      }
      const monIco = {
        tot: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6h11v9H2zM14 9h4l3 3.5V15h-7z"/><circle cx="7" cy="17.5" r="2" style="stroke:#0a5bd3" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" style="stroke:#0a5bd3" stroke-width="1.5"/></svg>',
        ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
        wip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',
      };
      const monStat = (g) => {
        const n = g.n;
        return g.gagalN ? ["Gagal masuk", "red"] : (n.total && n.keluar >= n.total) || n.progress >= 100 ? ["Terkirim", "ok"] : n.proses || n.masuk ? ["Dalam Proses", "wip"] : ["Pending", "pd"];
      };
      function monDash(S) {
        const sum2 = (o) => (o && (o.masuk != null || o.proses != null) ? (o.masuk || 0) + (o.proses || 0) : null),
          prs = sum2(S),
          bel = S.belum || 0,
          kel = S.keluar,
          ps = monPrevSnap(monPer),
          pv = ps && monSnapOf(ps.s, monUnit),
          ttl = ps ? "Dibanding " + ps.k.split("-").reverse().join("/") : "Belum ada riwayat pembanding";
        const chip = (c, p) => {
          if (c == null || !p) return `<span class="dchip eq" title="${ttl}">–</span>`;
          const d = Math.round(((c - p) / p) * 100);
          return `<span class="dchip${d ? "" : " eq"}" title="${ttl}">${d > 0 ? "↑ +" : d < 0 ? "↓ " : ""}${d}%</span>`;
        };
        const card = (cls, v, lb, p) => `<div class="kc ${cls}"><div class="kh"><span class="ki">${monIco[cls]}</span><b>${v == null ? "–" : fmt(v)}</b></div><div class="kl">${lb}</div>${chip(v, p)}</div>`;
        const segs = [["Terkirim", kel || 0, "#0a5bd3"], ["Dalam Proses", prs || 0, "#b26a00"], ["Pending", bel, "#6b7785"]],
          tot = segs.reduce((a, q) => a + q[1], 0),
          C = 2 * Math.PI * 40;
        let off = 0;
        const arcs = tot
          ? segs.map(([, v, c]) => {
              if (!v) return "";
              const len = (v / tot) * C,
                r = `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="14" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 50 50)"/>`;
              off += len;
              return r;
            }).join("")
          : '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>';
        const pct = tot ? Math.round(((kel || 0) / tot) * 100) : 0;
        return (
          `<div class="kcs">${card("tot", S.total, "Total Kiriman", pv && pv.total)}${card("ok", kel, "Terkirim", pv && pv.keluar)}${card("wip", prs, "Dalam Proses", sum2(pv))}</div>` +
          `<section class="dcard"><div class="dtop"><h3>Tren Kiriman</h3><div class="seg2" role="group" aria-label="Rentang tren"><button type="button" data-tr="7" class="${monTr === 7 ? "on" : ""}">7 Hari</button><button type="button" data-tr="30" class="${monTr === 30 ? "on" : ""}">30 Hari</button></div></div>${monTrendSvg(monTrend(monTr, monUnit))}<div class="dlg"><span class="a">Total</span><span class="b">Terkirim</span></div></section>` +
          `<section class="dcard"><div class="dtop"><h3>Status Kiriman</h3></div><div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="${pct}% terkirim">${arcs}<text x="50" y="52" text-anchor="middle" class="dv">${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Terkirim</text></svg><div class="dnl">${segs.map(([lb, v, c]) => `<div><i style="background:${c}"></i><span>${lb}</span><b>${fmt(v)}</b><span class="p">${tot ? Math.round((v / tot) * 100) : 0}%</span></div>`).join("")}</div></div></section>`
        );
      }
      function monDetail(b, g, L, has) {
        const n = g.n,
          mini = ["total", "belum", "masuk", "proses", "keluar"].filter((k) => has(k)).map((k) => `<div class="c-${k}"><small>${L(k)}</small><strong>${n[k] == null ? "–" : fmt(n[k])}</strong></div>`).join("");
        return `<div class="dd"><div class="mg5">${mini}</div>${g.gagalN ? `<div class="gg"><b>${L("gagal")} (${g.gagalN}):</b>${g.gagal.map((x) => `<span>${esc(x)}</span>`).join("")}</div>` : ""}${g.extra.filter((e) => e.text).map((e) => `<div class="xk">${esc(e.label)}: <b>${esc(e.text)}</b></div>`).join("")}</div>`;
      }
      function monRender() {
        monCmp();
        const msg = [];
        if (monErr) msg.push(`<div class="note">${esc(monErr)}</div>`);
        if (!monCache) {
          $("monMsg").innerHTML = msg.join(""); // belum terhubung: cukup satu petunjuk dari Dashboard Delivery, tidak ganda
          $("monCmp").innerHTML = "";
          $("monOver").innerHTML = $("monList").innerHTML = $("monTools").innerHTML = "";
          $("monAt").className = "sync";
          $("monAt").textContent = "";
          $("monTg").disabled = true;
          return;
        }
        const b = monBuild(monCache.rows);
        $("monTg").disabled = !b.groups.length;
        const age = (Date.now() - monCache.at) / 60000,
          stale = mon.auto && monCache.src !== "file" && age > mon.auto * 2 + 1;
        $("monAt").className = "sync " + (stale ? "old" : monCache.src === "file" ? "file" : "ok");
        $("monAt").textContent = (monCache.src === "file" ? "Dari file" : stale ? "Data lama" : "Tersinkron") + " · " + new Date(monCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        if (!b.hasName) msg.push('<div class="note">Kolom nama wilayah belum diatur atau tidak ditemukan. Cek pengaturan kolom.</div>');
        else if (!b.groups.length) msg.push(`<div class="note">Tidak ada baris data mulai baris ke-${mon.start}. Cek "Data mulai baris ke".</div>`);
        if (b.missing.length) msg.push(`<div class="note">Kolom tidak ditemukan: ${esc(b.missing.join(", "))}.</div>`);
        const gg = b.groups.filter((g) => g.gagalN);
        if (gg.length) msg.unshift(`<div class="note" role="alert">⚠️ <b>${fmt(gg.reduce((a, g) => a + g.gagalN, 0))} mobil gagal masuk</b> di ${gg.map((g) => esc(g.name)).join(", ")}.</div>`);
        $("monMsg").innerHTML = msg.join("");
        const names = b.groups.map((g) => g.name);
        if (monUnit && !names.includes(monUnit)) monUnit = "";
        $("monUnit").innerHTML = '<option value="">Semua Unit</option>' + names.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join("");
        $("monUnit").value = monUnit;
        $("monPer").value = String(monPer);
        const UG = monUnit ? b.groups.filter((g) => g.name === monUnit) : b.groups,
          S = monUnit ? monSumOf(UG) : b.sum,
          L = (r) => esc(MON_LBL(b, r));
        $("monOver").innerHTML = UG.length ? monDash(S) : "";
        $("monTools").innerHTML =
          chipsHtml(monView, [["ringkas", "Ringkas", ""], ["kartu", "Kartu", ""], ["tabel", "Tabel", ""]]) +
          `<input id="monQ" type="search" placeholder="Cari wilayah" value="${esc(monQ)}" style="flex:1;min-width:140px;min-height:40px;border-radius:99px;padding:6px 14px" autocomplete="off" aria-label="Cari wilayah" />`;
        const q = monQ.toLowerCase().trim(),
          G = b.groups.filter((g) => (!monUnit || g.name === monUnit) && (!q || g.name.toLowerCase().includes(q)));
        if (!G.length) {
          $("monList").innerHTML = b.groups.length ? '<div class="empty">Tidak ada wilayah yang cocok.</div>' : "";
          return;
        }
        if (monView === "tabel") {
          const cols = b.F.filter((f) => f.role !== "nama" && f.i >= 0);
          const head = `<tr><th>${esc(MON_LBL(b, "nama"))}</th>${cols.map((f) => `<th>${esc(f.label)}</th>`).join("")}</tr>`;
          const val = (g, f) => {
            if (f.role === "gagal") return `<td class="tx">${g.gagalN ? `<b style="color:var(--red)">${g.gagalN}</b>${g.gagal.length ? " · " + esc(g.gagal.join(", ")) : ""}` : "0"}</td>`;
            if (f.role === "progress") return `<td>${pr(g.n.progress)}</td>`;
            if (f.role) return `<td>${g.n[f.role] == null ? "–" : fmt(g.n[f.role])}</td>`;
            const x = g.extra.find((e) => e.label === f.label);
            return `<td class="tx">${esc(x ? x.text : "")}</td>`;
          };
          const foot = `<tr><td>Total</td>${cols.map((f) => (f.role === "gagal" ? `<td>${fmt(S.gagal)}</td>` : f.role === "progress" ? `<td>${pr(S.progress)}</td>` : f.role && S[f.role] != null ? `<td>${fmt(S[f.role])}</td>` : "<td></td>")).join("")}</tr>`;
          $("monList").innerHTML = `<div class="mtw"><table class="mtb"><thead>${head}</thead><tbody>${G.map((g) => `<tr><td>${esc(g.name)}</td>${cols.map((f) => val(g, f)).join("")}</tr>`).join("")}</tbody><tfoot>${foot}</tfoot></table></div>`;
          return;
        }
        const has = (r) => b.F.some((f) => f.role === r && f.i >= 0);
        if (monView === "ringkas") {
          $("monList").innerHTML =
            `<div class="dcard"><div class="dtop"><h3>Per Wilayah</h3><span class="fine">${G.length} wilayah · ketuk untuk detail</span></div>` +
            G.map((g) => {
              const n = g.n, st = monStat(g);
              return `<details class="drow" data-n="${esc(g.name)}"${monOpen.has(g.name) ? " open" : ""}><summary><span class="pill2 ${st[1]}">${st[0]}</span><span class="dnm"><b>${esc(g.name)}</b><small>${n.keluar == null ? "–" : fmt(n.keluar)}${n.total != null ? " / " + fmt(n.total) : ""} mobil keluar</small></span><span class="dpc">${pr(n.progress)}</span></summary>${monDetail(b, g, L, has)}</details>`;
            }).join("") +
            "</div>";
          return;
        }
        $("monList").innerHTML =
          '<div class="mgrid">' +
          G.map((g) => {
            const n = g.n,
              mini = ["total", "belum", "masuk", "proses", "keluar"].filter((k) => has(k)).map((k) => `<div class="c-${k}"><small>${L(k)}</small><strong>${n[k] == null ? "–" : fmt(n[k])}</strong></div>`).join("");
            return `<div class="card mcard"><div class="r"><b class="big">${esc(g.name)}</b>${has("progress") || n.progress != null ? `<span class="pill ${n.progress >= 100 ? "green" : ""}">${pr(n.progress)}</span>` : ""}</div>${n.progress != null ? `<div class="pbar"><i style="width:${Math.max(0, Math.min(100, n.progress))}%"></i></div>` : ""}<div class="seg">${monSeg(g)}</div><div class="mg5">${mini}</div>${g.gagalN ? `<div class="gg"><b>${L("gagal")} (${g.gagalN}):</b>${g.gagal.map((x) => `<span>${esc(x)}</span>`).join("")}</div>` : ""}${g.extra.filter((e) => e.text).map((e) => `<div class="xk">${esc(e.label)}: <b>${esc(e.text)}</b></div>`).join("")}</div>`;
          }).join("") +
          "</div>";
      }
      $("monMsg").onclick = (e) => {
        if (e.target.id === "monOpenSet") { $("monSet").open = true; $("monUrl").focus(); }
      };
      $("monTools").onclick = (e) => {
        const c = e.target.closest("[data-k]");
        if (c) {
          monView = c.dataset.k;
          monRender();
        }
      };
      let monQT = 0;
      $("monTools").oninput = (e) => {
        if (e.target.id === "monQ") {
          monQ = e.target.value;
          const p = e.target.selectionStart;
          clearTimeout(monQT); // tunggu jeda ketik 150 ms agar tidak render ulang tiap huruf
          monQT = setTimeout(() => {
            monRender();
            const i = $("monQ");
            if (i) { i.focus(); try { i.setSelectionRange(p, p); } catch (x) {} }
          }, 150);
        }
      };
      keepDom("monOver", "monTools", "monList");
      $("monOver").onclick = (e) => {
        const t = e.target.closest("[data-tr]");
        if (t) { monTr = Number(t.dataset.tr); monRender(); }
      };
      $("monPer").onchange = () => { monPer = Number($("monPer").value) || 1; monRender(); };
      $("monUnit").onchange = () => { monUnit = $("monUnit").value; monRender(); };
      $("monList").addEventListener("toggle", (e) => {
        const d = e.target;
        if (d.classList && d.classList.contains("drow")) d.open ? monOpen.add(d.dataset.n) : monOpen.delete(d.dataset.n);
      }, true);
      async function monLoad(manual) {
        if (monBusy) return;
        const cands = monUrls(mon.url);
        if (!cands.length) {
          monErr = "";
          monRender();
          return;
        }
        monBusy = true;
        $("monRef").disabled = true;
        $("monRef").textContent = "Memuat…";
        let rows = null, last = "";
        for (const u of cands) {
          try {
            const r = await fetch(u, { cache: "no-store" });
            if (!r.ok) throw new Error("HTTP " + r.status);
            const t = await r.text();
            if (/^\s*<(!doctype|html)/i.test(t)) throw new Error("minta login");
            rows = monCSV(t.replace(/^﻿/, ""));
            break;
          } catch (e) {
            last = e.message;
          }
        }
        monBusy = false;
        $("monRef").disabled = false;
        $("monRef").textContent = "Muat ulang";
        if (!rows) {
          monErr = "Gagal mengambil spreadsheet (" + last + "). Pastikan dibagikan ke \"Siapa saja yang memiliki link\" dan alamatnya benar." + (monCache ? " Menampilkan data terakhir." : "");
          if (manual) toast("Gagal memuat spreadsheet");
          return monRender();
        }
        monErr = "";
        monCache = { at: Date.now(), rows: rows.slice(0, 600).map((r) => r.slice(0, 40)), src: "url" };
        sv(K_MONC, monCache);
        monSnap(monBuild(monCache.rows));
        monRender();
        monAlertCheck();
        if (manual) toast("Data dimuat: " + monBuild(monCache.rows).groups.length + " baris");
      }
      function monAlertCheck() {
        if (!monCache) return;
        const b = monBuild(monCache.rows),
          now = b.groups.flatMap((g) => g.gagal.map((x) => g.name + "|" + x)),
          old = ld(K_MONG, null);
        sv(K_MONG, now);
        if (!mon.alert || !old || !tgReady()) return; // pemuatan pertama hanya menyimpan acuan
        const fresh = b.groups.map((g) => [g.name, g.gagal.filter((x) => !old.includes(g.name + "|" + x))]).filter(([, l]) => l.length);
        if (fresh.length) tgSend(`🚫 *Gagal masuk baru*\n${fresh.map(([n, l]) => `*${md(n)}*: ${l.map(md).join(", ")}`).join("\n")}\n${tgTime()}`);
      }
      function monEnter() {
        monMapUi();
        $("monUrl").value = mon.url;
        $("monStart").value = mon.start;
        $("monAuto").value = String(mon.auto);
        $("monAlert").checked = mon.alert;
        monRender();
        if (typeof monClrEnter === "function") monClrEnter();
        if (mon.url && (!monCache || monCache.src !== "file") && (!monCache || Date.now() - monCache.at > 20000)) monLoad(false);
        monLeave();
        if (typeof dlvEnter === "function") dlvEnter();
        if (mon.auto && mon.url)
          monTimer = setInterval(() => {
            if (!document.hidden) monLoad(false);
          }, mon.auto * 60000);
      }
      function monLeave() {
        if (typeof dlvLeave === "function") dlvLeave();
        clearInterval(monTimer);
        monTimer = 0;
      }
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !$("v-mon").hidden && mon.url && monCache && monCache.src !== "file" && Date.now() - monCache.at > 30000) monLoad(false);
      });
      $("monRef").onclick = () => (mon.url ? monLoad(true) : (toast("Isi alamat spreadsheet dulu."), ($("monSet").open = true)));
      /* pengaturan kolom */
      function monMapUi() {
        $("monMap").innerHTML = mon.fields
          .map((f, i) => {
            const cx = !f.role;
            return `<div class="mrow ${cx ? "cx" : ""}" data-i="${i}"><input class="mlab" value="${esc(f.label)}" aria-label="Nama tampilan" /><input class="mcol" value="${esc(f.col)}" placeholder="Kolom" aria-label="Kolom untuk ${esc(f.label)}" autocomplete="off" spellcheck="false" />${cx ? `<button class="rmx" aria-label="Hapus kolom">×</button><select class="ty" aria-label="Jenis isi">${[["teks", "Teks"], ["angka", "Angka"], ["daftar", "Daftar (pisah koma)"]].map(([v, l]) => `<option value="${v}" ${f.type === v ? "selected" : ""}>${l}</option>`).join("")}</select>` : ""}</div>`;
          })
          .join("");
      }
      function monRead() {
        document.querySelectorAll("#monMap .mrow").forEach((r) => {
          const f = mon.fields[Number(r.dataset.i)];
          if (!f) return;
          f.label = r.querySelector(".mlab").value.trim() || f.label;
          f.col = r.querySelector(".mcol").value.trim();
          const t = r.querySelector(".ty");
          if (t) f.type = t.value;
        });
        mon.url = $("monUrl").value.trim();
        mon.start = Math.max(1, Number($("monStart").value) || 2);
        mon.auto = Number($("monAuto").value) || 0;
        mon.alert = $("monAlert").checked;
      }
      $("monAdd").onclick = () => {
        monRead();
        mon.fields.push({ role: "", label: "Kolom tambahan", col: "", type: "teks" });
        monMapUi();
        const l = document.querySelectorAll("#monMap .mlab");
        l[l.length - 1].focus();
      };
      $("monMap").onclick = (e) => {
        const b = e.target.closest(".rmx");
        if (!b) return;
        monRead();
        mon.fields.splice(Number(b.closest(".mrow").dataset.i), 1);
        monMapUi();
      };
      $("monSave").onclick = () => {
        monRead();
        if (mon.url && !monUrls(mon.url).length) return toast("Alamat tidak valid.");
        if (mon.url && !/^https?:\/\//i.test(mon.url)) return toast("Alamat harus diawali https://");
        if (!sv(K_MON, mon)) toast("Gagal menyimpan pengaturan (penyimpanan penuh).");
        else toast("Pengaturan disimpan");
        monEnter();
        if (mon.url) monLoad(true);
      };
      $("monPrevBtn").onclick = async () => {
        monRead();
        let rows = monCache && (!mon.url || monCache.src === "file") ? monCache.rows : null;
        if (!rows) {
          const c = monUrls(mon.url);
          if (!c.length) return toast("Isi alamat spreadsheet dulu.");
          $("monPrev").innerHTML = '<p class="fine">Memuat…</p>';
          for (const u of c) {
            try {
              const r = await fetch(u, { cache: "no-store" }),
                t = await r.text();
              if (!r.ok || /^\s*<(!doctype|html)/i.test(t)) continue;
              rows = monCSV(t.replace(/^﻿/, ""));
              break;
            } catch (e) {}
          }
        }
        if (!rows) return ($("monPrev").innerHTML = '<div class="note">Tidak bisa membaca spreadsheet. Cek alamat dan pengaturan berbagi.</div>');
        const show = rows.slice(0, 8), w = Math.min(14, Math.max(...show.map((r) => r.length), 1));
        $("monPrev").innerHTML = `<div class="pv"><table><tr><th></th>${Array.from({ length: w }, (_, i) => `<th>${monLetter(i)}</th>`).join("")}</tr>${show.map((r, ri) => `<tr><td>${ri + 1}</td>${Array.from({ length: w }, (_, i) => `<td>${esc(r[i] ?? "")}</td>`).join("")}</tr>`).join("")}</table></div><p class="fine">Huruf di atas adalah nama kolom yang diisi di pengaturan. Angka di kiri adalah nomor baris.</p>`;
      };
      $("monFile").onchange = () => {
        const f = $("monFile").files[0];
        if (!f) return;
        const r = new FileReader(), x = /\.xlsx?$/i.test(f.name);
        r.onload = () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV.");
              const wb = XLSX.read(r.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false });
            } else rows = monCSV(String(r.result).replace(/^﻿/, ""));
            monRead();
            monCache = { at: Date.now(), rows: rows.slice(0, 600).map((q) => q.slice(0, 40).map(String)), src: "file" };
            sv(K_MONC, monCache);
        monSnap(monBuild(monCache.rows));
            monErr = "";
            monRender();
            toast("Data dimuat dari file");
          } catch (e) {
            toast("Gagal membaca file: " + e.message);
          }
        };
        x ? r.readAsArrayBuffer(f) : r.readAsText(f);
      };
      $("monTg").onclick = () => {
        if (!tgReady()) {
          toast("Atur token bot dan Chat ID dulu.");
          return go("tg");
        }
        if (!monCache) return;
        const b = monBuild(monCache.rows), S = b.sum;
        if (!b.groups.length) return;
        const L = (r) => MON_LBL(b, r),
          line = (g) => {
            const n = g.n;
            return `*${md(g.name)}* ${n.progress != null ? pr(n.progress) : ""}\n` + ["total", "belum", "masuk", "proses", "keluar"].filter((k) => n[k] != null).map((k) => `${md(L(k))} ${fmt(n[k])}`).join(" · ") + (g.gagalN ? `\n🚫 ${md(L("gagal"))} (${g.gagalN})${g.gagal.length ? ": " + g.gagal.map(md).join(", ") : ""}` : "");
          };
        tgSend(`*MONITORING KIRIMAN*\n${new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}\n━━━━━━━━━━━━━━━━━━━━\n${["total", "belum", "masuk", "proses", "keluar"].filter((k) => S[k] != null).map((k) => `${md(L(k))} ${fmt(S[k])}`).join(" · ")}\n${md(L("progress"))}: ${pr(S.progress)}${S.gagal ? `\n🚫 ${md(L("gagal"))}: ${S.gagal}` : ""}\n━━━━━━━━━━━━━━━━━━━━\n${b.groups.map(line).join("\n\n")}`);
        toast("Masuk antrean Telegram");
      };
      function cfgUi() {
        if (cfg.blind == null) cfg.blind = true;
        $("swBlind").checked = !!cfg.blind;
      }
      $("swBlind").onchange = () => {
        cfg.blind = $("swBlind").checked;
        sv(K_CFG, cfg);
        renderBins();
        toast(cfg.blind ? "Mode hitung buta aktif" : "Mode hitung buta mati");
      };

