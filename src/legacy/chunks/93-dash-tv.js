/* Dashboard Delivery layar 4K / TV: desain "Dashboard Supply Chain Management" satu layar 16:9.
   Angka dibaca dari sel spreadsheet yang sama dengan kartu Beranda (dlvC / dlvV di 93-dash-delivery.js).
   Panggung 2400x1350 diskalakan ke layar (transform), jadi tampilan identik di TV 4K, Full HD, atau jendela kecil. */
      const TV_W = 2400, TV_H = 1350;
      // desain 4K dipakai: mode Layar TV di layar >= 1000px, atau otomatis di layar sangat lebar (>= 2400px)
      const dlvTvUse = () => (document.body.classList.contains("tv") ? innerWidth >= 1000 : innerWidth >= TV_W);
      function dlvTvHtml() {
        const V = dlvV, D = (x) => x || "–", e = esc;
        const tot = dlvN("B28"), kel = dlvN("N43"), prs = dlvN("J43"), msk = dlvN("F43");
        const num = (n) => (n == null ? "–" : String(n));
        const fp = (n) => n.toFixed(1).replace(".", ",") + "%";
        const tgl = dlvC("AJ2") || new Date().toLocaleDateString("id-ID"), ttl = dlvC("F2");
        const title = ttl && !/^dashboard\s+delivery$/i.test(ttl) ? ttl : "Dashboard Supply Chain Management LA 2026";
        const mon = dlvMonth();
        const age = (Date.now() - dlvCache.at) / 60000, stale = dlv.auto && age > dlv.auto * 2 + 1;
        const sync = (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        // tonase hari ini
        const gapN = dlvNum(dlvC("AA14")), gapPct = dlvPctStr(dlvC("AD14"));
        const gapTxt = dlvC("AA14") ? (gapN != null && gapN < 0 ? "▼ " : gapN > 0 ? "▲ " : "") + dlvC("AA14") : "";
        const lt14 = dlvRng("J", 13, 16);
        const kpi = (cls, ico, lb, val, sub, subCls) => `<div class="tv-card tv-kpi ${cls}">${ico ? `<div class="tv-kicon">${ico}</div>` : ""}<div class="tv-kpi-content"><div class="tv-klabel">${e(lb)}</div><div class="tv-kvalue">${e(val)}</div>${sub ? `<div class="tv-ksub ${subCls || ""}">${e(sub)}</div>` : ""}</div></div>`;
        const kpis =
          kpi("tv-primary", "🚚", "Total Finish Delivery", V("J10"), "◷  " + tgl) +
          kpi("", "🏁", "Finish Loading", V("B13"), dlvC("F8") ? "Update " + dlvC("F8") : "") +
          kpi("", "🚛", "Selesai SJ Dalam Kota", V("E20"), lt14 ? "Mobil masuk > 14:00 : " + lt14 : "") +
          kpi("", "", "♧ Plan Delivery", V("S12"), "Plan tonase") +
          kpi("", "", "♧ Act Delivery", V("W12"), gapTxt, gapPct != null && gapPct < 95 ? "tv-amber" : "tv-green") +
          kpi("tv-success", "🎯", "Gap", V("AD14"), "");
        // progress delivery
        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]].filter(([n]) => dlvC(n))
          .map(([n, j]) => { const c = dlvN(j); return `<div class="tv-tr"><div class="tv-td tv-l">${e(dlvC(n))}</div><div class="tv-td">${e(V(j))}</div><div class="tv-td">${c != null && tot ? fp((c / tot) * 100) : "–"}</div></div>`; }).join("");
        const pKel = dlvRng(["P", "Q"], 57, 58) || dlvC("P34"), pKelN = Math.max(0, Math.min(100, dlvPctStr(pKel) || 0));
        const donutP = tot ? Math.round(((kel || 0) / tot) * 100) : 0;
        // belum / tidak masuk
        const gagal = [];
        for (let r = 35; r <= 47; r += 2) { const n = dlvFirst(r, "AA", "AD"); if (n) gagal.push(n); }
        const belum = dlvC("S33");
        const jb = [["BOX", "S39"], ["FUSO", "V39"], ["CONTAINER", "S46"], ["TRONTON", "V46"]].filter(([, c]) => dlvC(c)).map(([l, c]) => l + " " + dlvC(c)).join(" · ");
        // bulan berjalan
        const pTon = (() => { const a = dlvNum(dlvC("AL19")), q = dlvNum(dlvC("AL17")); return a != null && q ? fp((a / q) * 100) : "–"; })();
        const m3 = (a, b, c) => `<div class="tv-metric-grid">${[a, b, c].map(([l, v, g]) => `<div class="tv-metric"><span>${e(l)}</span><strong class="${g ? "tv-green" : ""}">${e(v)}</strong></div>`).join("")}</div>`;
        const th = (l) => `<div class="tv-th">${e(l)}</div>`, td = (v, g) => `<div class="tv-td ${g ? "tv-green" : ""}">${e(v)}</div>`;
        const rank = [["Mobil Terbanyak", "AL41", "AO41"], ["Tonase Terbesar", "AL43", "AO43"], ["Loading Terlama", "AL45", "AO45"], ["Delivery Terlama", "AL47", "AO47"]]
          .map(([l, v, d]) => `<div class="tv-rank-row"><span>${l}</span><b>${e(V(v))}</b><span>${e(D(dlvC(d)))}</span></div>`).join("");
        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]].filter(([h]) => dlvC(h))
          .map(([h, p]) => `<span>${e(dlvC(h))} → <b>${e(V(p))}</b></span>`).join("");
        const ab = [dlvNum(dlvC("AL33")), dlvNum(dlvC("AL35")), dlvNum(dlvC("AL37"))];
        const abTot = ab.some((x) => x != null) ? ab.reduce((s, x) => s + (x || 0), 0) : null;
        const row = (l, v, g) => `<div class="tv-summary-row"><span>${e(l)}</span><b class="${g ? "tv-green" : ""}">${e(v)}</b></div>`;
        return `<div class="tv-wrap tv-root"><div class="tv-stage">
<div class="tv-header"><div class="tv-brand">RUCIKA<small>Sambungan Berkualitas</small></div>
<div class="tv-heading"><div class="tv-h1">${e(title)}</div><div class="tv-sub">Plan • Deliver • Perform</div></div>
<div class="tv-right-head"><div class="tv-date">▦ &nbsp;${e(tgl)}<small class="tv-sync ${stale ? "tv-old" : ""}">${e(sync)}</small></div><div class="tv-logo-mark"><b>★ R</b>Rucika<br><small>Inspiring Innovation</small></div></div></div>
<div class="tv-kpis">${kpis}</div>
<div class="tv-main">
<div class="tv-stack">
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">▥</span>Progress Delivery</div><div class="tv-panel-body">
  <div class="tv-progress-layout"><div class="tv-donut" style="--p:${donutP}"><div><strong>${num(tot)}</strong><span>Total Mobil</span></div></div>
  <div class="tv-dt tv-c3"><div class="tv-tr">${th("Jenis Mobil")}${th("Jumlah")}${th("%")}</div>${jenis || `<div class="tv-tr"><div class="tv-td tv-l">–</div><div class="tv-td">–</div><div class="tv-td">–</div></div>`}</div></div>
  <div class="tv-bar-wrap"><div class="tv-bar-head"><span>Progress Delivery</span><b>${e(D(pKel))}</b></div><div class="tv-bar"><span style="width:${pKelN}%"></span></div></div></div></div>
 <div class="tv-card tv-warn"><div class="tv-panel-title"><span class="tv-ico">⚠</span>Belum / Tidak Masuk</div><div class="tv-panel-body tv-alert-grid"><div class="tv-alert-count"><strong>${e(D(belum))}</strong><span>Mobil</span></div>
  <div class="tv-alert-list">${gagal.length ? "📍 Lokasi Agen Gagal Masuk<br><b>" + gagal.map(e).join(", ") + "</b>" : "Tidak ada agen gagal masuk"}${jb ? "<br>Jenis: " + e(jb) : ""}</div></div></div>
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Mobil Masuk - Proses - Keluar</div><div class="tv-panel-body tv-flow">
  <div class="tv-flow-item"><div class="tv-ico">🚛</div><b>Mobil Masuk</b><strong>${num(msk)}</strong></div><div class="tv-arrow">➜</div>
  <div class="tv-flow-item"><div class="tv-ico">⚙️</div><b>Mobil Proses</b><strong>${num(prs)}</strong></div><div class="tv-arrow">➜</div>
  <div class="tv-flow-item"><div class="tv-ico">🟢</div><b>Mobil Keluar</b><strong>${num(kel)}</strong></div>${jam ? `<div class="tv-hours"><small>Jam keluar mobil</small>${jam}</div>` : ""}</div></div>
</div>
<div class="tv-stack">
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Planning vs Actual${mon ? " · " + e(mon) : ""}</div><div class="tv-panel-body">
  ${m3(["Plan Mobil", V("AL13")], ["Act Mobil", V("AL15")], ["Realisasi", V("AR13"), 1])}
  <div class="tv-dt tv-c3 tv-gap"><div class="tv-tr">${th("Plan Tonase")}${th("Act Tonase")}${th("Act Omzet")}</div><div class="tv-tr">${td(V("AL17"))}${td(V("AL19"))}${td(V("AR17"))}</div></div></div></div>
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">⚖</span>Tonase &amp; Selisih Hari Ini</div><div class="tv-panel-body">
  ${m3(["Plan Omzet", V("S19")], ["Act Omzet", V("W19")], ["Selisih", V("AA14"), 1])}
  <div class="tv-mini-stats tv-gap"><div class="tv-mini-stat"><span>Plan Non Omzet</span><b>${e(V("S25"))}</b></div><div class="tv-mini-stat"><span>Act Non Omzet</span><b>${e(V("W25"))}</b></div><div class="tv-mini-stat"><span>% Non Omzet</span><b>${e(V("AA25"))}</b></div></div></div></div>
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📊</span>Summary Bulan ${e(mon || "Ini")}</div><div class="tv-panel-body tv-summary-list">
  ${row("Act Tonase %", pTon)}${row("Omzet %", V("AR19"), 1)}${row("Rata Mobil / Hari", V("AL23"))}${row("Ton Plan / Hari", V("AR23"))}
  ${row("Ton Actual / Hari", V("AR25"))}${row("Ton Omzet / Hari", V("AR27"))}${row("Finish Kota rata-rata", V("AL25"))}${row("Finish Loading rata-rata", V("AL27"))}${row("Finish Delivery rata-rata", V("AL29"))}${row("Gap Tonase", V("AD14"))}</div></div>
</div>
<div class="tv-stack">
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🏆</span>Rank (Dalam 1 Hari)</div><div class="tv-panel-body">${rank}</div></div>
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚨</span>Total Abnormal Bulan Ini</div><div class="tv-panel-body tv-mini-stats">
  <div class="tv-mini-stat"><span>Total</span><b class="tv-big">${abTot == null ? "–" : abTot}</b></div><div class="tv-mini-stat"><span>Gagal Masuk</span><b>${e(V("AL33"))}</b></div><div class="tv-mini-stat"><span>Under Tonage</span><b>${e(V("AL35"))}</b></div><div class="tv-mini-stat"><span>Mobil &gt; 14:00</span><b>${e(V("AL37"))}</b></div></div></div>
 <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📍</span>Destinasi Delivery</div><div class="tv-panel-body tv-destination"><div class="tv-city">${e(D(dlvC("AG53")))}</div><div class="tv-ton">Total Mobil<strong>${e(V("AL55"))}</strong>${e(V("AL57"))} Ton</div><div class="tv-city-art">🌆</div></div></div>
</div>
</div><div class="tv-footer"></div></div></div>`;
      }
      // skala panggung ke lebar (Beranda) atau seluruh layar (mode TV); hanya transform, jadi mulus
      function dlvTvScale() {
        const w = document.querySelector("#dlvBody .tv-wrap");
        if (!w) return;
        const tv = document.body.classList.contains("tv");
        const aw = tv ? innerWidth : w.parentElement.clientWidth || innerWidth;
        const s = Math.min(aw / TV_W, tv ? innerHeight / TV_H : Infinity);
        w.style.setProperty("--tv-s", s.toFixed(4));
        w.style.width = Math.floor(TV_W * s) + "px";
        w.style.height = Math.floor(TV_H * s) + "px";
      }
      let dlvTvRaf = 0;
      const dlvTvSoon = () => { cancelAnimationFrame(dlvTvRaf); dlvTvRaf = requestAnimationFrame(dlvTvScale); };
      window.addEventListener("resize", () => { dlvTvSoon(); if (dlvCache && dlvTvUse() !== document.body.classList.contains("tvd")) dlvRender(); });
      document.addEventListener("fullscreenchange", dlvTvSoon);
