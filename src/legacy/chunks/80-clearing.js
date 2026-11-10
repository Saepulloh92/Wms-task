/* Clearing (Voucher vs counting)
   asal: index-fixd.html baris 5164-5575 */
      /* ---- v14: Clearing (Laporan Voucher vs hasil counting) ---- */
      const K_CLR = "warehouse_so_clr_v1", K_CLRR = "warehouse_so_clr_rep_v1", K_CLRC = "warehouse_so_clr_cnt_v1";
      let clr = Object.assign({ url: WMS_CONFIG.clearingUrl, start: 2, cv: "Nama Foto", cq: "Total Count", ck: "Kode Item", auto: 5 }, ld(K_CLR, {}));
      let clrRep = ld(K_CLRR, null), clrCnt = ld(K_CLRC, null), clrF = "all", clrBusy = false, clrErr = "";
      const K_CLRD = "warehouse_so_clr_done_v1", K_CLRH = "warehouse_so_clr_hist_v1";
      let clrHist = ld(K_CLRH, []);
      if (!Array.isArray(clrHist)) clrHist = [];
      let clrDone = ld(K_CLRD, {});
      if (typeof clrDone !== "object" || !clrDone || Array.isArray(clrDone)) clrDone = {};
      const clrIsDone = (x) => !!clrDone[clrKey(x.v)];
      function clrAct(x) {
        const k = clrKey(x.v), d = clrDone[k];
        if (d)
          return `<div class="m"><b>Ditandai selesai</b>${d.by ? " oleh " + esc(d.by) : ""}, ${esc(new Date(d.at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))}${d.note ? "<br>Catatan: " + esc(d.note) : ""}</div><button class="btn sec sm" data-cu="${esc(k)}">Buka lagi</button>`;
        return x.st === "ok" ? "" : `<button class="btn sec sm" data-cd="${esc(k)}">Tandai selesai</button>`;
      }
      const CLR_ST = { dup: ["Dobel hitung", "red"], qty: ["Selisih qty", "red"], nq: ["Qty kosong", "amber"], belum: ["Belum dihitung", "amber"], extra: ["Tidak ada di laporan", "amber"], ok: ["Cocok", "green"] };
      const clrKey = (v) => {
        let s = String(v ?? "").trim();
        if (/^\d+\.0+$/.test(s)) s = s.replace(/\.0+$/, ""); // "4043814.0" hasil Excel/CSV
        // nama foto "4043742_2026-11-06-100438": nomor voucher = deretan angka paling depan (>= 5 digit) sebelum tanda lain
        const lead = s.match(/^\s*(\d{5,})(?=\D|$)/),
          d = lead ? lead[1] : s.replace(/\D/g, "");
        return d ? d.replace(/^0+/, "") || "0" : s.toUpperCase();
      };
      const sms8 = (k) => {
        const s = String(k ?? "");
        if (/e\+/i.test(s)) return "";
        const d = s.replace(/\D/g, "");
        return d.length >= 8 ? d.slice(0, 8) : "";
      };
      function clrIdx(spec, hdr) {
        spec = String(spec || "").trim();
        if (!spec) return -1;
        if (/^[A-Za-z]{1,2}$/.test(spec)) {
          let n = 0;
          for (const ch of spec.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
          return n - 1;
        }
        const s = spec.toLowerCase();
        return hdr.findIndex((h) => String(h ?? "").toLowerCase().includes(s));
      }
      let clrShF = "all";
      function clrShiftOf(t) {
        const m = String(t || "").match(/(\d{1,2}):(\d{2})/);
        if (!m) return "";
        const h = Number(m[1]), a = 7, b = 15, c = 23; // Shift 1 mulai 07.00, Shift 2 15.00, Shift 3 23.00
        return "Shift " + (h >= c || h < a ? 3 : h >= b ? 2 : 1);
      }
      const clrShiftNorm = (v) => {
        v = String(v ?? "").trim();
        if (!v) return "";
        const d = v.match(/\b([1-9])\b/);
        return /^shift/i.test(v) || !d ? (d ? "Shift " + d[1] : v) : "Shift " + d[1];
      };
      function clrParseRep(rows) {
        const hi = rows.slice(0, 15).findIndex((r) => r.some((c) => String(c ?? "").trim().toLowerCase() === "no voucher"));
        if (hi < 0) throw new Error("Kolom \"No Voucher\" tidak ditemukan di laporan.");
        const hdr = rows[hi].map((h) => String(h ?? "").trim().toLowerCase());
        const f = (n) => hdr.indexOf(n);
        const iv = f("no voucher"), iq = f("qty"), ik = f("kode item"), inm = f("nama item"), ir = f("rak");
        const fx = (re) => hdr.findIndex((h) => re.test(h)), il = fx(/lori|nopol|no\.? ?kendaraan|plat/), ish = fx(/shift/), itm = fx(/jam|waktu|tgl|tanggal|time/), ip = fx(/pic|timbang/), ig = fx(/^group|^grup/);
        if (iq < 0) throw new Error("Kolom \"Qty\" tidak ditemukan di laporan.");
        const out = [];
        rows.slice(hi + 1).forEach((r) => {
          const v = String(r[iv] ?? "").trim();
          if (!v) return;
          out.push({ v, q: monNum(String(r[iq] ?? "")), k: ik >= 0 ? String(r[ik] ?? "").trim() : "", n: inm >= 0 ? String(r[inm] ?? "").trim() : "", r: ir >= 0 ? String(r[ir] ?? "").trim() : "", lr: il >= 0 ? String(r[il] ?? "").trim() : "", pic: ip >= 0 ? String(r[ip] ?? "").trim() : "", grp: ig >= 0 ? String(r[ig] ?? "").trim() : "", sh: ish >= 0 ? clrShiftNorm(r[ish]) : itm >= 0 ? clrShiftOf(r[itm]) : "" });
        });
        return out;
      }
      function clrParseCnt(rows, cfg) {
        const st = Math.max(1, Number(cfg.start) || 2), hdr = st >= 2 ? (rows[st - 2] || []) : [];
        // fallback otomatis ke format sheet "REKAP COUNT" (Nama Foto / Total Count)
        let iv = clrIdx(cfg.cv, hdr), iq = clrIdx(cfg.cq, hdr);
        if (iv < 0) iv = clrIdx("Nama Foto", hdr);
        if (iv < 0) iv = clrIdx("No Voucher", hdr);
        if (iq < 0) iq = clrIdx("Total Count", hdr);
        if (iq < 0) iq = clrIdx("Qty", hdr);
        const ik = clrIdx(cfg.ck, hdr), it = clrIdx("Tanggal Foto", hdr), il = hdr.findIndex((h) => /lori|nopol|plat/i.test(String(h ?? "")));
        if (iv < 0) throw new Error("Kolom No Voucher / Nama Foto counting tidak ketemu. Cek pengaturan kolom.");
        if (iq < 0) throw new Error("Kolom Qty / Total Count counting tidak ketemu. Cek pengaturan kolom.");
        const out = [];
        rows.slice(st - 1).forEach((r) => {
          let v = String(r[iv] ?? "").trim();
          if (!v) return;
          // nama foto: buang ekstensi dan akhiran duplikat "(1)", contoh 4033996(1).jpg -> 4033996
          const sfx = /\(\d+\)\s*(\.\w{2,4})?$/.test(v);
          v = v.replace(/\.(jpe?g|png|heic|webp)$/i, "").replace(/\s*\(\d+\)\s*$/, "").trim();
          if (!v) return;
          out.push({ v, q: monNum(String(r[iq] ?? "")), k: ik >= 0 ? String(r[ik] ?? "").trim() : "", sfx, t: it >= 0 ? String(r[it] ?? "").trim() : "", lr: il >= 0 ? String(r[il] ?? "").trim() : "" });
        });
        // foto dobel (akhiran "(1)") dengan qty sama = satu hitungan; qty beda tetap ditandai Dobel hitung
        const grp = new Map();
        out.forEach((o) => { const k = clrKey(o.v); if (!grp.has(k)) grp.set(k, []); grp.get(k).push(o); });
        const res = [];
        grp.forEach((g) => {
          if (!g.some((x) => x.sfx)) return res.push(...g);
          const seen = new Set();
          g.forEach((x) => { const q = String(x.q); if (!seen.has(q)) { seen.add(q); res.push(x); } });
        });
        return res.map(({ v, q, k, t, lr }) => ({ v, q, k, t, lr }));
      }
      /* waktu foto counting -> ms (NaN bila tidak terbaca): ISO, dd/mm/yyyy hh:mm, atau serial Excel */
      function clrTs(t) {
        const x = String(t || "").trim();
        if (!x) return NaN;
        if (/^\d+(\.\d+)?$/.test(x)) { const n = Number(x); return n > 20000 && n < 80000 ? Math.round((n - 25569) * 864e5) : NaN; }
        const m = x.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})(?:[ T,]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
        if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)).getTime();
        return Date.parse(x);
      }
      /* beberapa baris counting untuk satu voucher: pakai yang TERBARU (waktu foto bila terbaca semua, kalau tidak baris paling bawah) */
      function clrLatest(rows) {
        const ts = rows.map((r) => clrTs(r.t));
        if (ts.every((v) => !isNaN(v))) {
          let bi = 0;
          ts.forEach((v, i) => { if (v >= ts[bi]) bi = i; });
          return rows[bi];
        }
        return rows[rows.length - 1];
      }
      const CLR_IKAT = 25; // isi satu ikatan
      const clrRnd = (x) => Math.round(x * 1000) / 1000; // hindari galat desimal (0,1 + 0,2 ≠ 0,3)
      function clrBuild() {
        const rep = clrRep ? clrRep.rows : [], cnt = clrCnt ? clrCnt.rows : [];
        const cm = new Map();
        cnt.forEach((c) => {
          const k = clrKey(c.v);
          if (!cm.has(k)) cm.set(k, { v: c.v, rows: [] });
          cm.get(k).rows.push(c);
        });
        /* cadangan bila nomor lengkap tidak ketemu: cocokkan 7 digit pertama dari depan.
           Tiap nomor counting hanya dipakai SATU voucher (yang awalannya paling mirip). Nomor counting yang sudah cocok persis dengan voucher lain tidak ikut. */
        const repKeys = new Set(rep.map((r) => clrKey(r.v))),
          r7 = new Map(),
          asg = new Map(); // kunci voucher laporan -> kunci counting yang ditugaskan
        repKeys.forEach((k) => {
          if (!/^\d{7,}$/.test(k) || cm.has(k)) return;
          const p = k.slice(0, 7);
          if (!r7.has(p)) r7.set(p, []);
          r7.get(p).push(k);
        });
        const cpl = (x, y) => { let i = 0; while (i < x.length && i < y.length && x[i] === y[i]) i++; return i; };
        cm.forEach((g, ck) => {
          if (!/^\d{7,}$/.test(ck) || repKeys.has(ck)) return;
          const cands = r7.get(ck.slice(0, 7));
          if (!cands) return;
          const best = cands.slice().sort((x, y) => cpl(y, ck) - cpl(x, ck) || x.localeCompare(y))[0];
          if (!asg.has(best)) asg.set(best, []);
          asg.get(best).push(ck);
        });
        const byPrefix = (rk) => {
          const ks = asg.get(rk);
          return ks && ks.length ? { v: cm.get(ks[0]).v, rows: ks.flatMap((ck) => cm.get(ck).rows) } : null;
        };
        // satu voucher bisa muncul di beberapa baris laporan (beberapa item): qty dijumlah; baris yang persis sama (dobel input) dihitung sekali
        const ra = new Map();
        rep.forEach((r) => {
          const k = clrKey(r.v);
          if (!ra.has(k)) return ra.set(k, { ...r, _sig: new Set([[r.q, r.k, r.r, r.n].join("|")]) });
          const a = ra.get(k), sg = [r.q, r.k, r.r, r.n].join("|");
          if (a._sig.has(sg)) return;
          a._sig.add(sg);
          a.q = a.q == null && r.q == null ? null : (a.q || 0) + (r.q || 0);
          if (r.n && !String(a.n).includes(r.n)) a.n = a.n ? a.n + ", " + r.n : r.n;
        });
        const seen = new Set(), list = [];
        [...ra.values()].forEach((r) => {
          const k = clrKey(r.v);
          seen.add(k);
          let g = cm.get(k), viaP = false;
          if (!g) { g = byPrefix(k); viaP = !!g; } // nomor lengkap tidak ketemu: coba 7 digit pertama dari depan
          if (!g) return list.push({ v: r.v, sms: "", kc: "", qR: r.q, qC: null, diff: null, st: "belum", n: r.n, r: r.r, rc: 0, lori: r.lr || "", shift: r.sh || "", tm: "", pic: r.pic || "", grp: r.grp || "" });
          const lt = clrLatest(g.rows);
          let qC = lt.q == null ? null : clrRnd(lt.q), ik = 0;
          const kc = lt.k || (g.rows.find((x) => sms8(x.k)) || {}).k || "";
          const nq = qC == null || r.q == null; // salah satu qty kosong / tidak terbaca: tidak bisa dibandingkan
          let diff = nq ? null : clrRnd(qC - r.q);
          // counting dalam ikatan: qty counting x CLR_IKAT = qty laporan (mis. 42 x 25 = 1050) dianggap cocok.
          // Selisih ratusan/ribuan yang jauh mengecil bila dikali ikatan juga dibaca sebagai ikatan (selisihnya dihitung setelah dikali).
          if (diff != null && diff !== 0 && qC > 0) {
            const e = clrRnd(qC * CLR_IKAT), nd = clrRnd(e - r.q);
            if (nd === 0 || (Math.abs(diff) >= 100 && Math.abs(nd) < Math.abs(diff))) { ik = qC; qC = e; diff = nd; }
          }
          const sms = sms8(kc);
          const st = nq ? "nq" : diff === 0 ? "ok" : "qty"; // cocok = voucher + qty sama persis
          const tm = lt.t || (g.rows.find((x) => x.t) || {}).t || "", lori = r.lr || lt.lr || (g.rows.find((x) => x.lr) || {}).lr || "";
          list.push({ v: r.v, cv: viaP ? lt.v : "", sms, kc, qR: r.q, qC, diff, st, ik, n: r.n, r: r.r, rc: g.rows.length, lori, shift: r.sh || clrShiftOf(tm), tm, pic: r.pic || "", grp: r.grp || "" });
        });
        // hanya voucher yang ada di Laporan Voucher yang diimpor; baris counting lain diabaikan
        const ord = { dup: 0, qty: 1, nq: 2, belum: 3, ok: 4 };
        list.sort((a, b) => ord[a.st] - ord[b.st] || String(a.v).localeCompare(String(b.v), "id", { numeric: true }));
        return list;
      }
      /* Diagnosa: versi aturan pencocokan + alasan tiap voucher "belum dihitung" (nama counting terdekat dan kuncinya), agar mudah dilihat langsung di perangkat */
      const CLR_MATCH_V = "7-digit-depan-v3";
      function clrDiag(all) {
        const el = $("clrDiag");
        if (!el) return;
        const bel = all.filter((x) => x.st === "belum" || x.st === "nq");
        if (!clrCnt || !clrRep || !bel.length) { el.innerHTML = ""; return; }
        const cnt = clrCnt.rows, row = (c) => `${esc(c.v)} <span class="fine">→ kunci ${esc(clrKey(c.v))}</span>`;
        const near = (k) => cnt.filter((c) => { const ck = clrKey(c.v); return k.length >= 5 && ck.length >= 5 && ck.slice(0, 5) === k.slice(0, 5); }).slice(0, 3);
        el.innerHTML = `<details class="clr-diag"><summary>Diagnosa pencocokan · aturan ${CLR_MATCH_V}</summary><p class="fine">Laporan ${fmt(clrRep.rows.length)} voucher · counting ${fmt(cnt.length)} baris. Contoh nama counting yang dibaca: ${cnt.slice(0, 3).map(row).join(" · ")}</p>` +
          bel.slice(0, 10).map((x) => { const k = clrKey(x.v), nr = near(k); return `<div class="fine"><b>${esc(x.v)}</b> (kunci ${esc(k)}) ${x.st === "nq" ? "ketemu, tapi qty kosong" : nr.length ? "tidak ada yang sama persis. Mirip: " + nr.map(row).join(" · ") : "tidak ada nomor counting yang mirip"}</div>`; }).join("") +
          (bel.length > 10 ? `<p class="fine">… dan ${fmt(bel.length - 10)} lainnya.</p>` : "") + "</details>";
      }
      function renderClr() {
        setTimeout(() => typeof renderClrHist === "function" && $("clrHist") && renderClrHist(), 0);
        clearTimeout(clrAT);
        clrAT = setTimeout(clrAuto, 1500);
        $("clrCfg").hidden = !isAdmin();
        $("clrUrl").value = clr.url;
        $("clrStart").value = clr.start;
        $("clrCV").value = clr.cv;
        $("clrCQ").value = clr.cq;
        $("clrCK").value = clr.ck;
        $("clrAutoSel").value = String(clr.auto == null ? 5 : clr.auto);
        $("clrRepInfo").textContent = clrRep ? `${clrRep.name || "Laporan"}: ${fmt(clrRep.rows.length)} voucher, dimuat ${new Date(clrRep.at).toLocaleString("id-ID")}.` : "Belum ada laporan. Pilih file Laporan Voucher.";
        $("clrCntInfo").textContent = clrErr ? clrErr : clrCnt ? `Counting dari ${clrCnt.src === "url" ? "spreadsheet" : "file"}: ${fmt(clrCnt.rows.length)} baris, dimuat ${new Date(clrCnt.at).toLocaleString("id-ID")}.` : clr.url ? "Counting belum dimuat." : "Link spreadsheet counting belum diatur (Pengaturan di bawah), atau muat dari file.";
        $("clrCntInfo").style.color = clrErr ? "var(--red)" : "";
        $("clrLoad").disabled = clrBusy;
        $("clrRefresh").disabled = clrBusy;
        $("clrRefresh").textContent = clrBusy ? "Memuat…" : "↻ Refresh";
        $("clrLoad").textContent = clrBusy ? "Memuat…" : "Muat counting dari spreadsheet";
        const all = clrBuild(), n = (s) => all.filter((x) => x.st === s).length;
        const nTot = all.length, nOk = n("ok"), nBad = n("qty") + n("dup"), nBel = n("belum") + n("nq");
        clrDiag(all);
        const kc = (cls, ico, v, lb) => `<div class="kc ${cls}"><div class="kh"><span class="ki">${ico}</span><b>${fmt(v)}</b></div><div class="kl">${lb}</div><span class="dchip eq">${nTot ? Math.round((v / nTot) * 100) : 0}%</span></div>`;
        $("clrStats").innerHTML = kc("ok", monIco.ok, nOk, "Cocok") + kc("bad", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>', nBad, "Selisih / dobel") + kc("wip", monIco.wip, nBel, "Belum dihitung");
        { // pil sinkron: waktu counting terakhir dimuat
          const el = $("clrAt");
          if (!clrCnt) { el.className = "sync"; el.textContent = ""; }
          else {
            const stale = clr.auto && clrCnt.src !== "file" && (Date.now() - clrCnt.at) / 60000 > clr.auto * 2 + 1;
            el.className = "sync " + (stale ? "old" : clrCnt.src === "file" ? "file" : "ok");
            el.textContent = (clrCnt.src === "file" ? "Dari file" : stale ? "Data lama" : "Tersinkron") + " · " + new Date(clrCnt.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
          }
        }
        $("clrChips").innerHTML = chipsHtml(clrF, [["all", "Semua", all.length], ["bad", "Perlu dicek", all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length], ["done", "Ditandai selesai", all.filter(clrIsDone).length], ["ok", "Cocok", n("ok")], ["belum", "Belum dihitung", n("belum")]]);
        { // ringkasan: donat status + progres per shift
          const segs = [["Cocok", nOk, "#2e9e68"], ["Selisih / dobel", nBad, "#d64545"], ["Belum dihitung", nBel, "#f5a623"]], C = 2 * Math.PI * 40;
          let off = 0;
          const arcs = segs.map(([, v, c]) => {
            if (!v || !nTot) return "";
            const len = (v / nTot) * C, r = `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="14" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 50 50)"/>`;
            off += len;
            return r;
          }).join("");
          const pct = nTot ? Math.round((nOk / nTot) * 100) : 0, shl = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
          $("clrRekap").innerHTML = nTot
            ? `<section class="dcard"><div class="dtop"><h3>Status Clearing</h3><span class="fine">${fmt(nTot)} voucher</span></div><div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="${pct}% cocok">${arcs || '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>'}<text x="50" y="52" text-anchor="middle" class="dv">${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Cocok</text></svg><div class="dnl">${segs.map(([lb, v, c]) => `<div><i style="background:${c}"></i><span>${lb}</span><b>${fmt(v)}</b><span class="p">${Math.round((v / nTot) * 100)}%</span></div>`).join("")}</div></div>${shl.length ? '<div class="shl">' + shl.map((h) => { const t = all.filter((x) => x.shift === h), k = t.filter((x) => x.st === "ok").length, pp = Math.round((k / t.length) * 100); return `<div class="shr"><span>${esc(h)}</span><div class="pbar"><i style="width:${pp}%"></i></div><b>${k}/${t.length}</b></div>`; }).join("") + "</div>" : ""}</section>`
            : "";
        }
        const shs = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        $("clrShChips").innerHTML = shs.length ? chipsHtml(clrShF, [["all", "Semua shift", all.length], ...shs.map((h) => [h, h, all.filter((x) => x.shift === h).length])]).replace(/data-k=/g, "data-sh=") : "";
        const q = $("clrQ").value.toLowerCase().trim();
        const vis = all.filter((x) => (clrShF === "all" || x.shift === clrShF) && (clrF === "all" || (clrF === "bad" ? x.st !== "ok" && !clrIsDone(x) : clrF === "done" ? clrIsDone(x) : x.st === clrF)) && (!q || (x.v + " " + x.n + " " + x.r + " " + x.lori + " " + x.shift).toLowerCase().includes(q)));
        $("clrList").innerHTML = (vis.length ? vis.slice(0, 300).map((x) => {
          const [lb, cl] = CLR_ST[x.st];
          const d = x.diff == null ? "" : x.diff === 0 ? "0" : (x.diff > 0 ? "+" : "") + fmt(x.diff);
          return `<div class="card vc s-${x.st}"><div class="r"><b class="id">${esc(x.v)}</b><span class="pill ${cl}">${lb}</span>${clrIsDone(x) ? ' <span class="pill green">Selesai</span>' : ""}</div>${x.n ? `<div class="nm">${esc(x.n)}${x.r ? ", rak " + esc(x.r) : ""}</div>` : ""}<dl class="kv k3"><div><dt>Shift</dt><dd>${esc(x.shift || "-")}${x.tm ? "<small>" + esc((String(x.tm).match(/\d{1,2}:\d{2}/) || [""])[0]) + "</small>" : ""}</dd></div><div><dt>No Lori</dt><dd class="id">${esc(x.lori || "-")}</dd></div><div><dt>Selisih</dt><dd class="${x.diff ? "neg" : ""}">${d || "-"}</dd></div><div><dt>Qty WMS</dt><dd>${x.qR == null ? "-" : fmt(x.qR)}</dd></div><div><dt>Qty count</dt><dd>${x.qC == null ? "-" : fmt(x.qC)}${x.ik ? ` <small>(${fmt(x.ik)}×${CLR_IKAT})</small>` : ""}</dd></div></dl>${x.st !== "ok" && x.ik ? `<div class="m">Counting ${fmt(x.ik)} ikat × ${CLR_IKAT} = ${fmt(x.qC)}.</div>` : ""}${x.cv ? `<div class="m">Dicocokkan lewat awalan angka dengan nama foto ${esc(x.cv)}.</div>` : ""}${x.st !== "ok" && x.rc > 1 ? `<div class="m">${x.rc} foto counting untuk voucher ini, dipakai yang terbaru.</div>` : ""}${clrAct(x)}</div>`;
        }).join("") + (vis.length > 300 ? `<p class="fine">Menampilkan 300 dari ${fmt(vis.length)}. Pakai pencarian atau filter.</p>` : "") : `<div class="empty">${all.length ? "Tidak ada voucher di filter ini." : "Muat Laporan Voucher dan counting dulu."}</div>`);
      }
      async function clrFetch(manual) {
        if (clrBusy) return;
        const cands = monUrls(clr.url);
        if (!cands.length) return manual ? (toast("Isi link spreadsheet counting dulu."), renderClr()) : undefined;
        clrBusy = true;
        renderClr();
        let rows = null, last = "";
        for (const u of cands) {
          try {
            const r = await fetch(u + (u.includes("?") ? "&" : "?") + "_=" + Date.now(), { cache: "no-store" }); // _= : lewati cache Google/CDN
            if (!r.ok) throw new Error("HTTP " + r.status);
            const t = await r.text();
            if (/^\s*<(!doctype|html)/i.test(t)) throw new Error("minta login");
            rows = monCSV(t.replace(/^﻿/, ""));
            break;
          } catch (e) {
            last = e.message;
          }
        }
        clrBusy = false;
        try {
          if (!rows) throw new Error("Gagal mengambil spreadsheet (" + last + "). Pastikan dibagikan ke \"Siapa saja yang memiliki link\".");
          clrCnt = { at: Date.now(), src: "url", rows: clrParseCnt(rows, clr) };
          clrErr = "";
          sv(K_CLRC, clrCnt);
          if (manual) toast("Counting dimuat: " + fmt(clrCnt.rows.length) + " baris");
        } catch (e) {
          clrErr = e.message;
          if (manual) toast("Gagal memuat counting");
        }
        renderClr();
      }
      function clrReadFile(file, cb) {
        const rd = new FileReader();
        rd.onload = () => {
          try {
            let rows;
            if (/\.csv$/i.test(file.name)) rows = monCSV(String(rd.result).replace(/^﻿/, ""));
            else {
              const wb = XLSX.read(rd.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: true });
            }
            cb(rows);
          } catch (e) {
            toast(e.message || "File tidak bisa dibaca");
          }
        };
        if (/\.csv$/i.test(file.name)) rd.readAsText(file);
        else rd.readAsArrayBuffer(file);
      }
      $("clrRepFile").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        clrReadFile(f, (rows) => {
          try {
            clrRep = { at: Date.now(), name: f.name, rows: clrParseRep(rows).slice(0, 20000) };
            if (!sv(K_CLRR, clrRep)) toast("Penyimpanan penuh, laporan tidak tersimpan permanen.");
            toast("Laporan dimuat: " + fmt(clrRep.rows.length) + " voucher");
            renderClr();
          } catch (er) {
            toast(er.message);
          }
        });
        e.target.value = "";
      };
      $("clrCntFile").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        clrReadFile(f, (rows) => {
          try {
            clrCnt = { at: Date.now(), src: "file", rows: clrParseCnt(rows, clr) };
            clrErr = "";
            sv(K_CLRC, clrCnt);
            toast("Counting dimuat: " + fmt(clrCnt.rows.length) + " baris");
          } catch (er) {
            clrErr = er.message;
            toast("Gagal memuat counting");
          }
          renderClr();
        });
        e.target.value = "";
      };
      $("clrSave").onclick = () => {
        clr = { url: $("clrUrl").value.trim(), start: Math.max(1, Number($("clrStart").value) || 2), cv: $("clrCV").value.trim(), cq: $("clrCQ").value.trim(), ck: $("clrCK").value.trim(), auto: Number($("clrAutoSel").value) || 0 };
        sv(K_CLR, clr);
        linkSnap(); // tautan baru dibagikan ke HP lain lewat sinkron
        toast("Pengaturan clearing tersimpan");
        clrFetch(true);
      };
      $("clrLoad").onclick = () => clrFetch(true);
      /* Refresh: buang hasil counting lama dari memori, reset filter, lalu ambil ulang dari spreadsheet (tanpa cache) */
      $("clrRefresh").onclick = async () => {
        if (clrBusy) return;
        clrF = "all"; clrShF = "all"; $("clrQ").value = ""; clrErr = "";
        $("clrCntFile").value = ""; $("clrRepFile").value = "";
        if (clr.url) {
          clrCnt = null; sv(K_CLRC, null);
          await clrFetch(true);
        } else {
          renderClr();
          toast("Tidak ada link spreadsheet. Pilih ulang file counting untuk memperbarui.");
        }
      };
      { let _t = 0; $("clrQ").oninput = () => { clearTimeout(_t); _t = setTimeout(renderClr, 200); }; }
      $("clrShChips").onclick = (e) => {
        const sb = e.target.closest("[data-sh]");
        if (!sb) return;
        clrShF = sb.dataset.sh;
        renderClr();
      };
      $("clrChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (!b) return;
        clrF = b.dataset.k;
        renderClr();
      };
      $("clrCsv").onclick = () => {
        const all = clrBuild();
        if (!all.length) return toast("Belum ada data untuk diunduh.");
        const rows = clrShF === "all" ? all : all.filter((x) => x.shift === clrShF), R = clrRekap(rows);
        csvOut([
          ["REKAP PENERIMAAN F-WLA-17"],
          ["Tanggal", clrTglS(), "Shift", clrShF === "all" ? "Semua" : clrShF.replace("Shift ", "")],
          ["Qty WMS", R.wms, "Qty Counthings", R.cnt, "Selisih", R.sel],
          [],
          ["No", "No Voucher", "PIC Timbang", "Group", "Shift", "No Lori", "Nama Item", "Qty WMS", "Qty Counthings", "Selisih", "Keterangan", "SMS", "Ditandai Selesai", "Catatan Selesai"],
          ...R.sorted.map((x, i) => [i + 1, x.v, x.pic || "", x.grp || "", (x.shift || "").replace("Shift ", ""), x.lori || "", x.n || "", x.qR ?? "", x.qC ?? "", x.diff ?? "", clrKet(x), x.sms || "", clrIsDone(x) ? "Ya" : "", (clrDone[clrKey(x.v)] || {}).note || ""]),
        ], "rekap_penerimaan_" + new Date().toISOString().slice(0, 10) + ".csv");
      };
      const clrKet = (x) => x.st === "belum" ? "TDK ADA FOTO" : x.st === "extra" ? "TIDAK ADA DI LAPORAN" : x.st === "dup" ? "FOTO DOBEL, QTY BEDA" : x.st === "nq" ? "QTY KOSONG" : x.st === "qty" ? (x.diff > 0 ? "QTY COUNTHINGS LEBIH" : "QTY COUNTHINGS KURANG") : "";
      const clrVNum = (v) => Number(String(v).replace(/\D/g, "")) || 0;
      const clrTglS = () => new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short", year: "2-digit" });
      function clrRekap(rows) {
        const rep = rows.filter((x) => x.qR != null), wms = rep.reduce((a, x) => a + (x.qR || 0), 0), cnt = rep.reduce((a, x) => a + (x.qC || 0), 0);
        const sorted = rows.slice().sort((a, b) => clrVNum(b.v) - clrVNum(a.v) || String(b.v).localeCompare(String(a.v)));
        const ket = sorted.filter((x) => x.st !== "ok" && !clrIsDone(x));
        return { wms, cnt, sel: cnt - wms, sorted, ket, n: rows.length, ok: rows.filter((x) => x.st === "ok").length, done: rows.filter((x) => x.st !== "ok" && clrIsDone(x)).length };
      }
      const sg = (n) => (n > 0 ? "+" : "") + fmt(n);
      function clrRekapUi(all) {
        const el = $("clrRekap");
        if (!all.length) { el.innerHTML = ""; return; }
        const rows = clrShF === "all" ? all : all.filter((x) => x.shift === clrShF), R = clrRekap(rows);
        const shL = clrShF === "all" ? [...new Set(rows.map((x) => x.shift).filter(Boolean))].map((h) => h.replace("Shift ", "")).sort().join(", ") || "-" : clrShF.replace("Shift ", "");
        const st = R.sel === 0 && !R.ket.length ? ["OK", "green"] : ["SELISIH", "red"];
        const tbl = R.sorted.slice(0, 200).map((x, i) => `<tr><td>${i + 1}</td><td class="id">${esc(x.v)}</td><td class="tx">${esc(x.pic || "-")}</td><td class="tx">${esc(x.grp || "-")}</td><td>${esc((x.shift || "-").replace("Shift ", ""))}</td><td class="tx">${esc(x.lori || "-")}</td><td class="tx">${szHtml(x.n || "")}</td><td>${x.qR == null ? "-" : fmt(x.qR)}</td><td>${x.qC == null ? "-" : fmt(x.qC)}</td><td class="${x.diff ? "neg" : ""}">${x.diff == null ? "-" : x.diff === 0 ? "0" : sg(x.diff)}</td></tr>`).join("");
        const ketT = R.ket.slice(0, 200).map((x, i) => `<tr><td>${i + 1}</td><td class="id">${esc(x.v)}</td><td class="tx">${esc(x.lori || "-")}</td><td class="tx"><span class="pill ${x.st === "belum" || x.st === "extra" || x.st === "nq" ? "amber" : "red"}">${esc(clrKet(x))}</span></td><td class="${x.diff ? "neg" : ""}">${x.diff ? sg(x.diff) : "-"}</td></tr>`).join("");
        el.innerHTML = `<div class="panel"><h3>Rekap Penerimaan F-WLA-17</h3><dl class="kv k3"><div><dt>Tanggal</dt><dd>${esc(clrTglS())}</dd></div><div><dt>Shift</dt><dd>${esc(shL)}</dd></div><div><dt>Status</dt><dd><span class="pill ${st[1]}">${st[0]}</span></dd></div></dl><dl class="kv k3 mt"><div><dt>Qty WMS</dt><dd>${fmt(R.wms)}</dd></div><div><dt>Qty Counthings</dt><dd>${fmt(R.cnt)}</dd></div><div><dt>Selisih</dt><dd class="${R.sel ? "neg" : ""}">${R.sel ? sg(R.sel) : "OK"}</dd></div></dl><p class="fine">${fmt(R.n)} voucher · cocok ${fmt(R.ok)} · perlu dicek ${fmt(R.ket.length)}${R.done ? " · selesai ditandai " + fmt(R.done) : ""}</p>` +
          (R.ket.length ? `<h3 class="sec">Keterangan selisih (${fmt(R.ket.length)})</h3><div class="mtw"><table class="mtb"><thead><tr><th>No</th><th>No Voucher</th><th>No Lori</th><th>Keterangan</th><th>Qty Selisih</th></tr></thead><tbody>${ketT}</tbody></table></div>${R.ket.length > 200 ? `<p class="fine">Menampilkan 200 dari ${fmt(R.ket.length)}. Unduh CSV untuk semua.</p>` : ""}` : '<div class="note ok">Tidak ada selisih. Semua voucher cocok.</div>') +
          `<details class="mt"><summary>Tabel rekap lengkap (${fmt(R.n)} voucher)</summary><div class="mtw"><table class="mtb"><thead><tr><th>No</th><th>No Voucher</th><th>PIC Timbang</th><th>Group</th><th>Shift</th><th>No Lori</th><th>Nama Item</th><th>Qty WMS</th><th>Qty Counthings</th><th>Selisih</th></tr></thead><tbody>${tbl}</tbody></table></div>${R.n > 200 ? `<p class="fine">Menampilkan 200 dari ${fmt(R.n)}. Unduh CSV untuk semua.</p>` : ""}</details></div>`;
      }
      function clrShiftTxt(all) {
        const sh = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        if (!sh.length) return "";
        const r = sh.map((h) => {
          const g = all.filter((x) => x.shift === h), ok = g.filter((x) => x.st === "ok").length;
          return h.padEnd(8) + String(g.length).padStart(6) + String(ok).padStart(7) + String(g.length - ok).padStart(6);
        });
        return "\n*Per shift*\n```\nSHIFT    TOTAL  COCOK  CEK\n" + r.join("\n") + "\n```\n";
      }
      keepDom("clrStats", "clrRekap");
      let clrAT = 0, clrTimer = 0;
      function clrEnter() {
        clearInterval(clrTimer);
        clrTimer = 0;
        if (clr.auto && clr.url)
          clrTimer = setInterval(() => {
            if (!document.hidden && clrCnt && clrCnt.src !== "file") clrFetch(false);
          }, clr.auto * 60000);
      }
      function clrLeave() {
        clearInterval(clrTimer);
        clrTimer = 0;
      }
      function clrAuto() {
        if (!clrRep || !clrCnt) return;
        const all = clrBuild();
        if (!all.length) return;
        const sig = clrSig(all);
        if (clrHist.some((h) => h.sig === sig)) return;
        const tgl = new Date().toISOString().slice(0, 10), i = clrHist.findIndex((x) => x.tgl === tgl);
        const ent = { tgl, at: new Date().toISOString(), by: curName(), sig, n: all.length, ok: all.filter((x) => x.st === "ok").length, bad: all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length, text: clrText(), rows: clrRows(all) };
        if (i >= 0) clrHist[i] = ent; else clrHist.push(ent);
        clrHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        clrHist = clrHist.slice(0, 60);
        sv(K_CLRH, clrHist);
        renderClrHist();
      }
      function clrText() {
        const all = clrBuild();
        if (!all.length) return "";
        const R = clrRekap(all), F = "```", shs = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        const shL = shs.map((h) => h.replace("Shift ", "")).join(", ") || "-";
        const w = (l, v) => l.padEnd(16) + String(v).padStart(10);
        const perShift = shs.length ? `\n*Per shift*\n${F}\nSHIFT  VCR   WMS    CNT   SEL\n${shs.map((h) => { const r = clrRekap(all.filter((x) => x.shift === h)); return h.replace("Shift ", "").padEnd(6) + String(r.n).padStart(4) + String(r.wms).padStart(7) + String(r.cnt).padStart(7) + String(r.sel).padStart(6); }).join("\n")}\n${F}\n` : "";
        const ketRows = R.ket.slice(0, 80).map((x, i) => String(i + 1).padStart(2) + " " + String(x.v).padEnd(8) + " " + (x.diff ? sg(x.diff) : "-").padStart(7) + "  " + clrKet(x));
        const ket = R.ket.length ? `\n*Keterangan selisih (${R.ket.length})*\n${F}\nNO VOUCHER    SEL  KETERANGAN\n${ketRows.join("\n")}${R.ket.length > 80 ? "\n… +" + (R.ket.length - 80) + " lagi" : ""}\n${F}\n` + R.ket.slice(0, 80).map((x) => `• ${md(x.v)}${x.lori ? " · " + md(x.lori) : ""}${x.shift ? " · S" + x.shift.replace("Shift ", "") : ""}${x.n ? " · " + md(x.n) : ""}`).join("\n") + "\n" : "\nTidak ada selisih ✅\n";
        return `*REKAP PENERIMAAN F-WLA-17*\nTanggal : ${clrTglS()}\nShift   : ${shL}\n━━━━━━━━━━━━━━━━━━━━\n${F}\n${w("Qty WMS", fmt(R.wms))}\n${w("Qty Counthings", fmt(R.cnt))}\n${w("Selisih", R.sel ? sg(R.sel) : "OK")}\n${F}\nVoucher ${R.n} | Cocok ${R.ok} | Perlu dicek ${R.ket.length}${R.done ? " | Selesai " + R.done : ""}\n` + perShift + ket + (curName() ? `\nDilaporkan oleh: ${md(curName())}` : "");
      }
      $("clrTg").onclick = () => {
        const t = clrText();
        if (!t) return toast("Belum ada data clearing.");
        tgSend(t);
        toast("Masuk antrean Telegram");
      };
      /* ---- simpan hasil clearing (riwayat per tanggal) ---- */
      const clrRows = (all) => all.map((x) => [x.v, x.shift, x.lori, x.tm, x.sms, x.qR, x.qC, x.diff, CLR_ST[x.st][0], x.n, x.r, clrIsDone(x) ? 1 : 0, x.pic || "", x.grp || ""]);
      const clrSig = (all) => all.map((x) => [x.v, x.st, x.qC, x.qR, x.shift, x.lori, clrIsDone(x) ? 1 : 0].join("|")).join(";");
      const clrTglF = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      function renderClrHist() {
        const el = $("clrHist");
        if (!el) return;
        const all = clrBuild(), last = clrHist[0] || null, cur = clrSig(all);
        const same = clrHist.find((h) => h.sig === cur);
        $("clrSaveHist").disabled = !all.length;
        $("clrSaveInfo").textContent = !all.length ? "Belum ada data untuk disimpan." : same ? "✅ Hasil ini sudah tersimpan (" + clrTglF(same.tgl) + ")." : last ? "⚠️ Ada perubahan yang belum disimpan. Terakhir disimpan: " + new Date(last.at).toLocaleString("id-ID") + "." : "⚠️ Belum pernah disimpan.";
        el.innerHTML = clrHist.length
          ? histRows(clrHist, "clr", (h, i) =>
              histRow(
                esc(clrTglF(h.tgl)),
                `${fmt(h.n)} voucher · cocok ${fmt(h.ok)} · cek ${fmt(h.bad)}`,
                `<div class="m">Disimpan ${esc(new Date(h.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))}${h.by ? " oleh " + esc(h.by) : ""}</div><div class="acts"><button class="btn sec sm inl" data-ch="${i}" type="button">Kirim ke Telegram</button><button class="btn dng sm inl" data-cd="${i}" type="button">Hapus</button></div>`,
              ),
            )
          : '<div class="empty">Belum ada hasil clearing yang disimpan.</div>';
      }
      $("clrSaveHist").onclick = async () => {
        const all = clrBuild();
        if (!all.length) return toast("Belum ada data untuk disimpan.");
        const tgl = new Date().toISOString().slice(0, 10), i = clrHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && clrHist[i].sig !== clrSig(all) && !(await ask("Ganti hasil clearing hari ini?", "Sudah ada hasil tersimpan untuk " + clrTglF(tgl) + ". Yang lama diganti dengan yang sekarang.", "Ganti"))) return;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), sig: clrSig(all), n: all.length, ok: all.filter((x) => x.st === "ok").length, bad: all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length, text: clrText(), rows: clrRows(all) };
        if (i >= 0) clrHist[i] = ent; else clrHist.push(ent);
        clrHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        clrHist = clrHist.slice(0, 60);
        if (!sv(K_CLRH, clrHist)) return toast("Gagal menyimpan: penyimpanan penuh.");
        buzz(40);
        renderClrHist();
        await sendAll(ent.text, ent.text, true);
      };
      $("clrHist").onclick = async (e) => {
        if (histMore(e, "clr", renderClrHist)) return;
        const c = e.target.closest("[data-ch]"), d = e.target.closest("[data-cd]");
        if (c) {
          const h = clrHist[Number(c.dataset.ch)];
          if (!h) return;
          if (!tgReady()) { toast("Atur token bot dan Chat ID dulu."); return go("tg"); }
          tgSend(h.text);
          toast("Masuk antrean Telegram");
        } else if (d) {
          const h = clrHist[Number(d.dataset.cd)];
          if (!h || !(await ask("Hapus hasil clearing " + h.tgl + "?", "Hasil tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          clrHist.splice(Number(d.dataset.cd), 1);
          sv(K_CLRH, clrHist);
          renderClrHist();
        }
      };
      $("clrCopy").onclick = async () => {
        const all = clrBuild().filter((x) => x.qC != null);
        if (!all.length) return toast("Belum ada hasil counting.");
        const t = all.map((x) => [x.v, x.qC].join("\t")).join("\n");
        try {
          await navigator.clipboard.writeText(t);
          toast("Disalin: " + all.length + " voucher (No Voucher, Qty)");
        } catch (e) {
          const a = document.createElement("textarea");
          a.value = t;
          document.body.appendChild(a);
          a.select();
          document.execCommand("copy");
          a.remove();
          toast("Disalin: " + all.length + " voucher");
        }
      };

