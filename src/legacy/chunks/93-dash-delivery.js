/* Dashboard Delivery (Beranda)
   Panel realtime dari tab dashboard spreadsheet delivery (sel dibaca dari posisi tetap, sama dengan tata letak "DASHBOARD NEW").
   Memakai monCSV / monUrls dari 92-monitoring.js. Alamat sheet diisi per perangkat (tidak ditulis di kode). */
      const K_DLV = "warehouse_so_dlv_v1",
        K_DLVC = "warehouse_so_dlvc_v1";
      const dlvS = ld(K_DLV, {});
      let dlv = { url: dlvS.url || "", auto: dlvS.auto == null ? 2 : dlvS.auto };
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
      const dlvSec = (t, body) => `<section class="dsec"><h3>${esc(t)}</h3>${body}</section>`;
      function dlvHtml() {
        const V = dlvV;
        const tonase = `<div class="mtw"><table class="mtb"><thead><tr><th></th><th>Plan</th><th>Aktual</th><th>Selisih / %</th></tr></thead><tbody>
          <tr><td>Mobil masuk &gt; 14:00</td><td>${esc(V("S12"))}</td><td>${esc(V("W12"))}</td><td>${esc(V("AA14"))} · ${esc(V("AD14"))}</td></tr>
          <tr><td>Dalam kota</td><td>${esc(V("S19"))}</td><td>${esc(V("W19"))}</td><td>${esc(V("AA19"))}</td></tr>
          <tr><td>Non omzet</td><td>${esc(V("S25"))}</td><td>${esc(V("W25"))}</td><td>${esc(V("AA25"))}</td></tr></tbody></table></div>
          <div class="mg5">${dlvKv("Finish loading", V("B13"))}${dlvKv("Selesai SJ deliv (dalam kota)", V("E20"))}${dlvKv("Finish delivery", V("J10"))}</div>`;
        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]]
          .filter(([n]) => dlvC(n))
          .map(([n, j]) => `<span>${esc(dlvC(n))}: <b>${esc(V(j))}</b></span>`)
          .join("");
        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]]
          .filter(([h]) => dlvC(h))
          .map(([h, p]) => `<span>${esc(dlvC(h))} → <b>${esc(V(p))}</b></span>`)
          .join("");
        const pm = dlvPct("P34");
        const mobil = `<div class="mg5">${dlvKv("Total mobil", V("B28"), "c-total")}${dlvKv("Belum masuk", V("B43"), "c-belum")}${dlvKv("Mobil masuk", V("F43"), "c-masuk")}${dlvKv("Mobil proses", V("J43"), "c-proses")}${dlvKv("Mobil keluar", V("N43"), "c-keluar")}</div>
          ${dlvBar(pm)}
          ${jenis ? `<div class="dchips"><small>Jenis mobil</small>${jenis}</div>` : ""}
          ${jam ? `<div class="dchips"><small>Jam keluar mobil</small>${jam}</div>` : ""}
          <div class="xk">Belum / tidak masuk: <b>${esc(V("S33"))}</b> mobil (BOX ${esc(V("S39"))} · FUSO ${esc(V("V39"))} · CONTAINER ${esc(V("S46"))} · TRONTON ${esc(V("V46"))})</div>`;
        const gagal = [];
        for (let r = 35; r <= 47; r += 2) {
          const n = dlvFirst(r, "AA", "AD");
          if (n) gagal.push(`<span>${esc(n)}${dlvC("AE" + r) ? " · " + esc(dlvC("AE" + r)) : ""}</span>`);
        }
        const under = [];
        for (let r = 54; r <= 70; r += 2) {
          const n = dlvFirst(r, "Y", "AA"),
            al = dlvFirst(r, "AB", "AF");
          if (n) under.push(`<span>${esc(n)}${al ? " · " + esc(al) : ""}</span>`);
        }
        const abn = `<div class="mg5">${dlvKv("Gagal masuk", V("AL33"), "c-gagal")}${dlvKv("Under tonage", V("AL35"), "c-proses")}${dlvKv("Mobil > 14:00", V("AL37"), "c-masuk")}</div>
          ${gagal.length ? `<div class="gg"><b>Agen gagal masuk:</b>${gagal.join("")}</div>` : ""}
          ${under.length ? `<div class="gg"><b>Under tonage:</b>${under.join("")}</div>` : ""}`;
        const pr = dlvPct("AR13");
        const bulan = `<div class="mg5">${dlvKv("Plan mobil", V("AL13"))}${dlvKv("Aktual mobil", V("AL15"))}${dlvKv("Realisasi mobil", V("AR13"), "c-keluar")}</div>
          ${dlvBar(pr)}
          <div class="mg5">${dlvKv("Plan tonase", V("AL17"))}${dlvKv("Aktual tonase", V("AL19"))}${dlvKv("% omzet", V("AR19"), "c-keluar")}</div>
          <div class="mg5">${dlvKv("Rata² mobil/hari", V("AL23"))}${dlvKv("Ton plan", V("AR23"))}${dlvKv("Ton aktual", V("AR25"))}${dlvKv("Ton omzet", V("AR27"))}</div>
          <div class="mg5">${dlvKv("Finish kota", V("AL25"))}${dlvKv("Finish loading", V("AL27"))}${dlvKv("Finish delivery", V("AL29"))}</div>`;
        const rank = [["Mobil terbanyak", "AL41", "AO41"], ["Tonase terberat", "AL43", "AO43"], ["Loading terlama", "AL45", "AO45"], ["Delivery terlama", "AL47", "AO47"]]
          .filter(([, v]) => dlvC(v))
          .map(([l, v, d]) => `<div class="xk">${esc(l)}: <b>${esc(dlvC(v))}</b>${dlvC(d) ? " · " + esc(dlvC(d)) : ""}</div>`)
          .join("");
        const dest = dlvC("AG53") ? `<div class="xk">Tujuan terbanyak: <b>${esc(dlvC("AG53"))}</b> · ${esc(V("AL55"))} mobil · ${esc(V("AL57"))} ton</div>` : "";
        return dlvSec("Tonase delivery hari ini", tonase) + dlvSec("Status mobil", mobil) + dlvSec("Abnormal", abn) + dlvSec("Ringkasan bulan ini", bulan) + dlvSec("Rekor harian & tujuan", rank + dest);
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
        $("dlvAt").className = "sync " + (stale ? "old" : "ok");
        $("dlvAt").textContent = (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        const ttl = dlvC("F2"),
          tgl = dlvC("AJ2"),
          jam = dlvC("F8");
        $("dlvTitle").textContent = [ttl || "Dashboard Delivery", tgl, jam ? "update " + jam : ""].filter(Boolean).join(" · ");
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
        if (!u) sv(K_DLVC, null);
        dlvEnter();
        if (u) dlvLoad(true);
      };
