/* Dashboard Delivery (Beranda)
   Panel realtime dari tab dashboard spreadsheet delivery (sel dibaca dari posisi tetap, sama dengan tata letak "DASHBOARD NEW").
   Memakai monCSV / monUrls dari 92-monitoring.js. Alamat sheet diisi per perangkat (tidak ditulis di kode). */
      const K_DLV = "warehouse_so_dlv_v1",
        K_DLVC = "warehouse_so_dlvc_v1";
      const dlvS = ld(K_DLV, {});
      let dlv = { url: dlvS.url || WMS_CONFIG.deliveryUrl || "", auto: dlvS.auto == null ? 2 : dlvS.auto };
      let dlvCache = ld(K_DLVC, null), // { at, rows }
        dlvBusy = false,
        dlvErr = "",
        dlvTimer = 0;
      const dlvCI = (c) => {
        let n = 0;
        for (const ch of c) n = n * 26 + ch.charCodeAt(0) - 64;
        return n - 1;
      };
      function dlvC(a) {
        const m = /^([A-Z]+)(\d+)$/.exec(a);
        if (!m || !dlvCache) return "";
        const r = dlvCache.rows[+m[2] - 1];
        return r ? String(r[dlvCI(m[1])] ?? "").trim() : "";
      }
      const dlvV = (a) => dlvC(a) || "–";
      const dlvFirst = (row, from, to) => {
        for (let i = dlvCI(from); i <= dlvCI(to); i++) {
          const v = dlvCache.rows[row - 1] && String(dlvCache.rows[row - 1][i] ?? "").trim();
          if (v && v !== "-") return v;
        }
        return "";
      };
      function dlvPct(a) {
        const raw = dlvC(a),
          n = parseFloat(raw.replace("%", "").replace(",", "."));
        if (!isFinite(n)) return null;
        return /%/.test(raw) ? n : n <= 1.5 ? n * 100 : n;
      }
      const dlvBar = (p) => (p == null ? "" : `<div class="pbar"><i style="width:${Math.max(0, Math.min(100, p))}%"></i></div>`);
      const dlvKv = (l, v, cls) => `<div class="${cls || ""}"><small>${esc(l)}</small><strong>${esc(v)}</strong></div>`;
      const dlvN = (a) => monNum(dlvC(a));
      const dlvCard = (t, body, right) => `<section class="dcard"><div class="dtop"><h3>${esc(t)}</h3>${right || ""}</div>${body}</section>`;
      const dlvRow = (title, sub, val, cls) => `<div class="lrow"><div class="lt"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</div>${val ? `<span class="pill2 ${cls || "pd"}">${esc(val)}</span>` : ""}</div>`;
      function dlvKpi(cls, v, lb, sub) {
        return `<div class="kc ${cls}"><div class="kh"><span class="ki">${monIco[cls]}</span><b>${v == null ? "–" : esc(fmt(v))}</b></div><div class="kl">${esc(lb)}</div><span class="dchip${sub ? "" : " eq"}">${sub ? esc(sub) : "–"}</span></div>`;
      }
      const dlvOpen = {}; // key -> true/false (pilihan pengguna, bertahan antar muat ulang)
      const dlvFold = (key, t, sum, def, body) => `<details class="dcard dfold" data-k="${key}"${(dlvOpen[key] == null ? def : dlvOpen[key]) ? " open" : ""}><summary><h3>${esc(t)}</h3>${sum ? `<span class="dsum">${esc(sum)}</span>` : ""}</summary>${body}</details>`;
      const dlvAny = (...cells) => cells.some((c) => dlvC(c));
      function dlvHtml() {
        const V = dlvV,
          tot = dlvN("B28"),
          kel = dlvN("N43"),
          prs = dlvN("J43"),
          msk = dlvN("F43"),
          bel = dlvN("B43"),
          share = (n) => (n != null && tot ? Math.round((n / tot) * 100) + "% dari total" : "");
        const kpi = `<div class="kcs">${dlvKpi("tot", tot, "Total Mobil", tot != null && kel != null ? (tot <= 0 ? "Belum ada mobil" : tot - kel > 0 ? tot - kel + " belum keluar" : "Semua keluar") : "")}${dlvKpi("ok", kel, "Mobil Keluar", share(kel))}${dlvKpi("wip", prs, "Mobil Proses", share(prs))}</div>`;
        const segs = [["Keluar", kel || 0, "#0a5bd3"], ["Proses", prs || 0, "#f5a623"], ["Masuk", Math.max(0, (msk || 0) - (kel || 0) - (prs || 0)), "#2e9e68"], ["Belum masuk", bel || 0, "#9aa5b8"]],
          sum = segs.reduce((a, q) => a + q[1], 0),
          C = 2 * Math.PI * 40;
        let off = 0;
        const arcs = sum
          ? segs.map(([, v, c]) => {
              if (!v) return "";
              const len = (v / sum) * C,
                r = `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="14" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 50 50)"/>`;
              off += len;
              return r;
            }).join("")
          : '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>';
        const pct = tot || sum ? Math.round(((kel || 0) / (tot || sum)) * 100) : 0,
          pm = dlvPct("P34");
        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]]
          .filter(([n]) => dlvC(n))
          .map(([n, j]) => `<span>${esc(dlvC(n))}: <b>${esc(V(j))}</b></span>`)
          .join("");
        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]]
          .filter(([h]) => dlvC(h))
          .map(([h, p]) => `<span>${esc(dlvC(h))} → <b>${esc(V(p))}</b></span>`)
          .join("");
        const status = dlvCard(
          "Status Mobil",
          `<div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="${pct}% keluar">${arcs}<text x="50" y="52" text-anchor="middle" class="dv">${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Keluar</text></svg><div class="dnl">${segs.map(([lb, v, c]) => `<div><i style="background:${c}"></i><span>${lb}</span><b>${esc(fmt(v))}</b><span class="p">${sum ? Math.round((v / sum) * 100) : 0}%</span></div>`).join("")}</div></div>` +
            (pm != null ? `<div class="fine mt">Progres keluar dari mobil masuk ${esc(V("P34"))}</div>${dlvBar(pm)}` : "") +
            (jenis ? `<div class="dchips"><small>Jenis mobil</small>${jenis}</div>` : "") +
            (jam ? `<div class="dchips"><small>Jam keluar mobil</small>${jam}</div>` : "") +
            `<div class="xk">Belum / tidak masuk: <b>${esc(V("S33"))}</b> mobil (BOX ${esc(V("S39"))} · FUSO ${esc(V("V39"))} · CONTAINER ${esc(V("S46"))} · TRONTON ${esc(V("V46"))})</div>`,
        );
        const tonase = !dlvAny("S12", "W12", "S19", "W19", "S25", "W25", "B13", "E20", "J10") ? "" : dlvCard(
          "Tonase Delivery Hari Ini",
          dlvRow("Mobil masuk > 14:00", "Plan " + V("S12") + " · Aktual " + V("W12"), V("AA14") + " · " + V("AD14"), "wip") +
            dlvRow("Dalam kota", "Plan " + V("S19") + " · Aktual " + V("W19"), V("AA19"), "ok") +
            dlvRow("Non omzet", "Plan " + V("S25") + " · Aktual " + V("W25"), V("AA25"), "pd") +
            `<div class="mg5">${dlvKv("Finish loading", V("B13"))}${dlvKv("Selesai SJ deliv", V("E20"))}${dlvKv("Finish delivery", V("J10"))}</div>`,
        );
        const gagal = [];
        for (let r = 35; r <= 47; r += 2) {
          const n = dlvFirst(r, "AA", "AD");
          if (n) gagal.push(dlvRow(n, "", dlvC("AE" + r) || "Gagal", "red"));
        }
        const under = [];
        for (let r = 54; r <= 70; r += 2) {
          const n = dlvFirst(r, "Y", "AA"),
            al = dlvFirst(r, "AB", "AF");
          if (n) under.push(dlvRow(n, "", al || "Under", "wip"));
        }
        const nAb = (dlvN("AL33") || 0) + (dlvN("AL35") || 0);
        const abn = !dlvAny("AL33", "AL35", "AL37") && !gagal.length && !under.length ? "" : dlvFold(
          "abn",
          "Abnormal",
          "Gagal " + V("AL33") + " · Under " + V("AL35") + " · >14:00 " + V("AL37"),
          nAb > 0 || gagal.length > 0 || under.length > 0,
          `<div class="mg5">${dlvKv("Gagal masuk", V("AL33"), "c-gagal")}${dlvKv("Under tonage", V("AL35"), "c-proses")}${dlvKv("Mobil > 14:00", V("AL37"), "c-masuk")}</div>` +
            (gagal.length ? `<div class="lh">Agen gagal masuk</div>${gagal.join("")}` : "") +
            (under.length ? `<div class="lh">Under tonage</div>${under.join("")}` : ""),
        );
        const bulan = !dlvAny("AL13", "AL15", "AL17", "AL19", "AR13", "AR19", "AL23") ? "" : dlvFold(
          "bln",
          "Ringkasan Bulan Ini",
          "Mobil " + V("AR13") + " · Tonase " + V("AR19"),
          false,
          `<div class="fine">Realisasi mobil · ${esc(V("AL15"))} dari ${esc(V("AL13"))}</div>${dlvBar(dlvPct("AR13"))}<div class="bn">${esc(V("AR13"))}</div>` +
            `<div class="fine mt">Realisasi tonase · ${esc(V("AL19"))} dari ${esc(V("AL17"))}</div>${dlvBar(dlvPct("AR19"))}<div class="bn">${esc(V("AR19"))}</div>` +
            `<div class="mg5 m4">${dlvKv("Rata² mobil/hari", V("AL23"))}${dlvKv("Ton plan", V("AR23"))}${dlvKv("Ton aktual", V("AR25"))}${dlvKv("Ton omzet", V("AR27"))}</div>` +
            `<div class="mg5">${dlvKv("Finish kota", V("AL25"))}${dlvKv("Finish loading", V("AL27"))}${dlvKv("Finish delivery", V("AL29"))}</div>`,
        );
        const rank = [["Mobil terbanyak", "AL41", "AO41"], ["Tonase terberat", "AL43", "AO43"], ["Loading terlama", "AL45", "AO45"], ["Delivery terlama", "AL47", "AO47"]]
          .filter(([, v]) => dlvC(v))
          .map(([l, v, d]) => dlvRow(l, dlvC(d), dlvC(v), "ok"))
          .join("");
        const dest = dlvC("AG53") ? dlvRow("Tujuan terbanyak", V("AL55") + " mobil · " + V("AL57") + " ton", dlvC("AG53"), "pd") : "";
        const rec = rank + dest ? dlvFold("rek", "Rekor Harian & Tujuan", "", false, rank + dest) : "";
        return kpi + status + tonase + abn + bulan + rec;
      }
      function dlvRender() {
        const body = $("dlvBody");
        if (!body) return;
        const msg = dlvErr ? `<div class="note">${esc(dlvErr)}</div>` : "";
        $("dlvRef").disabled = dlvBusy;
        $("dlvRef").textContent = dlvBusy ? "Memuat…" : "Muat ulang dashboard";
        if (!dlvCache) {
          $("dlvAt").className = "sync";
          $("dlvAt").textContent = "";
          $("dlvTitle").textContent = "Hubungkan spreadsheet dashboard delivery";
          body.innerHTML = msg || '<div class="note info"><b>Dashboard delivery belum terhubung.</b> Isi alamat spreadsheet di "Sumber dashboard delivery" di bawah.<br><button class="btn pri sm mt" id="dlvOpenSet" type="button">Atur sumber data</button></div>';
          return;
        }
        const age = (Date.now() - dlvCache.at) / 60000,
          stale = dlv.auto && age > dlv.auto * 2 + 1;
        // Beranda hanya berisi dashboard delivery: lencana sinkron panel ini selalu tampil
        const showAt = true;
        $("dlvAt").className = "sync " + (stale ? "old" : "ok");
        $("dlvAt").textContent = showAt ? (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "";
        const ttl = dlvC("F2"),
          tgl = dlvC("AJ2"),
          jam = dlvC("F8");
        $("dlvTitle").textContent = [ttl && !/^dashboard\s+delivery$/i.test(ttl) ? ttl : "", tgl, jam ? "update " + jam : ""].filter(Boolean).join(" · ");
        body.innerHTML = msg + dlvHtml();
      }
      async function dlvLoad(manual) {
        if (dlvBusy) return;
        const cands = monUrls(dlv.url);
        if (!cands.length) {
          dlvErr = "";
          return dlvRender();
        }
        dlvBusy = true;
        dlvRender();
        let rows = null,
          last = "";
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
        dlvBusy = false;
        if (!rows) {
          dlvErr = "Gagal mengambil dashboard delivery (" + last + "). Pastikan dibagikan ke \"Siapa saja yang memiliki link\" dan alamatnya memuat tab dashboard (ada gid=…)." + (dlvCache ? " Menampilkan data terakhir." : "");
          if (manual) toast("Gagal memuat dashboard delivery");
          return dlvRender();
        }
        dlvErr = "";
        dlvCache = { at: Date.now(), rows: rows.slice(0, 80).map((r) => r.slice(0, 50)) };
        sv(K_DLVC, dlvCache);
        dlvRender();
        if (manual) toast("Dashboard delivery dimuat");
      }
      function dlvEnter() {
        $("dlvUrl").value = dlv.url;
        $("dlvAuto").value = String(dlv.auto);
        dlvRender();
        if (dlv.url && (!dlvCache || Date.now() - dlvCache.at > 20000)) dlvLoad(false);
        dlvLeave();
        if (dlv.auto && dlv.url)
          dlvTimer = setInterval(() => {
            if (!document.hidden) dlvLoad(false);
          }, dlv.auto * 60000);
      }
      function dlvLeave() {
        clearInterval(dlvTimer);
        dlvTimer = 0;
      }
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !$("v-mon").hidden && dlv.url && dlvCache && Date.now() - dlvCache.at > 30000) dlvLoad(false);
      });
      $("dlvRef").onclick = () => (dlv.url ? dlvLoad(true) : (toast("Isi alamat spreadsheet dulu."), ($("dlvSet").open = true)));
      $("dlvBody").addEventListener("click", (e) => {
        const sm = e.target.closest && e.target.closest("summary"),
          d = sm && sm.parentElement;
        if (d && d.dataset && d.dataset.k) dlvOpen[d.dataset.k] = !d.open; // klik terjadi sebelum browser membuka/menutup
      });
      $("dlvPanel").onclick = (e) => {
        if (e.target.id === "dlvOpenSet") {
          $("dlvSet").open = true;
          $("dlvUrl").focus();
        }
      };
      $("dlvSave").onclick = () => {
        const u = $("dlvUrl").value.trim();
        if (u && !monUrls(u).length) return toast("Alamat tidak valid.");
        if (u !== dlv.url) dlvCache = null;
        dlv = { url: u, auto: +$("dlvAuto").value || 0 };
        sv(K_DLV, dlv);
        linkSnap(); // tautan baru dibagikan ke HP lain lewat sinkron
        if (!u) sv(K_DLVC, null);
        dlvEnter();
        if (u) dlvLoad(true);
      };
