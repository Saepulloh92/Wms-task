/* Dashboard Delivery (Beranda)
   Panel realtime dari tab dashboard spreadsheet delivery (sel dibaca dari posisi tetap, sama dengan tata letak "DASHBOARD NEW").
   Memakai monCSV / monUrls dari 92-monitoring.js. Alamat sheet diisi per perangkat (tidak ditulis di kode). */
      const K_DLV = "warehouse_so_dlv_v1",
        K_DLVC = "warehouse_so_dlvc_v1";
      const dlvS = ld(K_DLV, {});
      let dlv = { url: dlvS.url || WMS_CONFIG.deliveryUrl || "", auto: dlvS.auto == null ? 1 : dlvS.auto };
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
      const dlvFold = (key, t, sum, def, body) => `<details class="dcard dfold" data-k="${key}"${(dlvOpen[key] == null ? def || innerWidth >= 900 : dlvOpen[key]) ? " open" : ""}><summary><h3>${esc(t)}</h3>${sum ? `<span class="dsum">${esc(sum)}</span>` : ""}</summary>${body}</details>`;
      const dlvAny = (...cells) => cells.some((c) => dlvC(c));
      // "1.228,97" / "1228,97" / "97,6%" -> angka
      const dlvNum = (s) => {
        let t = String(s || "").replace(/[%\s]/g, "");
        if (!t) return null;
        if (/,/.test(t)) t = t.replace(/\./g, "").replace(",", ".");
        const n = parseFloat(t);
        return isFinite(n) ? n : null;
      };
      const dlvPctStr = (raw) => {
        const n = dlvNum(raw);
        return n == null ? null : /%/.test(raw) ? n : n <= 1.5 ? n * 100 : n;
      };
      // nilai pertama berbentuk angka/jam/persen di kolom (atau beberapa kolom) pada rentang baris. Tahan terhadap sel gabungan yang pojok kirinya bergeser 1 baris.
      function dlvRng(cols, r1, r2) {
        for (const col of [].concat(cols)) for (let r = r1; r <= r2; r++) {
          const v = dlvC(col + r);
          if (v && /^[-+]?\d[\d.,:]*%?$/.test(v)) return v;
        }
        return "";
      }
      // nama bulan ringkasan ("NOVEMBER 2026") di sekitar pojok kanan atas dashboard
      function dlvMonth() {
        for (let r = 7; r <= 10; r++) for (let c = dlvCI("AL"); c <= dlvCI("AU"); c++) {
          const v = String(((dlvCache.rows[r - 1] || [])[c]) ?? "").trim();
          if (/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+\d{4}/i.test(v)) return v;
        }
        return "";
      }
      function dlvHtml() {
        const V = dlvV,
          tot = dlvN("B28"),
          kel = dlvN("N43"),
          prs = dlvN("J43"),
          msk = dlvN("F43"),
          bel = dlvN("B43"),
          share = (n) => (n != null && tot ? Math.round((n / tot) * 100) + "% dari total" : "");
        const kpi = `<div class="kcs">${dlvKpi("tot", tot, "Total Mobil", tot != null && kel != null ? (tot <= 0 ? "Belum ada mobil" : tot - kel > 0 ? tot - kel + " belum keluar" : "Semua keluar") : "")}${dlvKpi("ok", kel, "Mobil Keluar", share(kel))}${dlvKpi("wip", prs, "Mobil Proses", share(prs))}</div>`;
        const segs = [["Keluar", kel || 0, "#0a5bd3"], ["Proses", prs || 0, "#f5a623"], ["Masuk", Math.max(0, (msk || 0) - (kel || 0) - (prs || 0)), "#2e9e68"], ["Belum masuk", bel || 0, "#9aa5b8"], ["Tidak masuk", Math.max(0, (dlvN("S33") || 0) - (bel || 0)), "#d32f2f"]],
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
        const D = (x) => x || "–";
        // blok yang pojok sel gabungannya bisa bergeser 1 baris: ambil nilai (angka/jam/persen) pertama pada rentang baris
        const pMsk = dlvRng(["P", "Q"], 53, 54),
          pPrs = dlvRng(["P", "Q"], 55, 56),
          pKel = dlvRng(["P", "Q"], 57, 58),
          prog = [["Mobil masuk", pMsk, "#2e9e68"], ["Mobil proses", pPrs, "#f5a623"], ["Mobil keluar", pKel, "#0a5bd3"]].filter(([, v]) => v),
          progHtml = prog.length
            ? `<div class="lh">Progress delivery</div>` + prog.map(([l, v, c]) => `<div class="prow"><span>${esc(l)}</span><div class="pbar"><i style="width:${Math.max(0, Math.min(100, dlvPctStr(v) || 0))}%;background:${c}"></i></div><b>${esc(v)}</b></div>`).join("")
            : pm != null ? `<div class="fine mt">Progres keluar dari mobil masuk ${esc(V("P34"))}</div>${dlvBar(pm)}` : "";
        const status = dlvCard(
          "Status Mobil",
          `<div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="${pct}% keluar">${arcs}<text x="50" y="52" text-anchor="middle" class="dv">${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Keluar</text></svg><div class="dnl">${segs.map(([lb, v, c]) => `<div><i style="background:${c}"></i><span>${lb}</span><b>${esc(fmt(v))}</b><span class="p">${sum ? Math.round((v / sum) * 100) : 0}%</span></div>`).join("")}</div></div>` +
            progHtml +
            (jenis ? `<div class="dchips"><small>Jenis mobil</small>${jenis}</div>` : "") +
            (jam ? `<div class="dchips"><small>Jam keluar mobil</small>${jam}</div>` : ""),
        );
        const waktu = !dlvAny("F8", "B13", "E20", "J10") ? "" : dlvCard(
          "Waktu Penting",
          `<div class="mg5 m4">${dlvKv("Jam update", V("F8"))}${dlvKv("Finish loading", V("B13"))}${dlvKv("Selesai SJ deliv (dalam kota)", V("E20"))}${dlvKv("Total finish delivery", V("J10"))}</div>`,
          dlvC("AJ2") ? `<span class="dsum">${esc(dlvC("AJ2"))}</span>` : "",
        );
        const kota = { tot: dlvRng("B", 19, 21), gap: dlvRng("J", 20, 22), plan: dlvRng("M", 20, 22), dlv: dlvRng("P", 20, 22) },
          lt14 = dlvRng("J", 13, 16),
          tRows =
            (dlvAny("S12", "W12") ? dlvRow("Tonase delivery", "Plan " + V("S12") + " · Aktual " + V("W12") + " · Selisih " + V("AA14"), V("AD14"), "wip") : "") +
            (dlvAny("S19", "W19") ? dlvRow("Omzet", "Plan " + V("S19") + " · Aktual " + V("W19"), V("AA19"), "ok") : "") +
            (dlvAny("S25", "W25") ? dlvRow("Non omzet", "Plan " + V("S25") + " · Aktual " + V("W25"), V("AA25"), "pd") : "") +
            (kota.tot || kota.plan || kota.dlv ? dlvRow("Dalam kota", "Total " + D(kota.tot) + " · Plan " + D(kota.plan) + " · Deliv " + D(kota.dlv), "Gap " + D(kota.gap), "pd") : "") +
            (lt14 ? dlvRow("Mobil masuk > 14:00", "Hari ini", lt14 + " mobil", "wip") : "");
        const tonase = tRows ? dlvCard("Tonase Delivery Hari Ini", tRows) : "";
        const gagal = [];
        for (let r = 35; r <= 47; r += 2) {
          const n = dlvFirst(r, "AA", "AD"),
            c = dlvC("AE" + r);
          if (n) gagal.push(dlvRow(n, "", /^\d+$/.test(c) ? c + " mobil" : c || "Gagal", "red"));
        }
        const under = [];
        for (let r = 54; r <= 70; r += 2) {
          const n = dlvFirst(r, "Y", "AA"),
            al = dlvFirst(r, "AB", "AF");
          if (n) under.push(dlvRow(n, "", al || "Under", "wip"));
        }
        const underNow = dlvRng("S", 53, 58),
          belum = dlvC("S33"),
          nAb = (dlvNum(belum) || 0) + (dlvNum(underNow) || 0) + (dlvNum(lt14) || 0);
        const abn = !belum && !underNow && !lt14 && !gagal.length && !under.length ? "" : dlvFold(
          "abn",
          "Abnormal Hari Ini",
          "Belum masuk " + D(belum) + " · Under tonage " + D(underNow) + " · >14:00 " + D(lt14),
          nAb > 0 || gagal.length > 0 || under.length > 0,
          `<div class="mg5">${dlvKv("Belum / tidak masuk", D(belum), "c-gagal")}${dlvKv("Under tonage", D(underNow), "c-proses")}${dlvKv("Mobil masuk > 14:00", D(lt14), "c-masuk")}</div>` +
            (dlvAny("S39", "V39", "S46", "V46") ? `<div class="dchips"><small>Belum / tidak masuk per jenis</small><span>BOX: <b>${esc(V("S39"))}</b></span><span>FUSO: <b>${esc(V("V39"))}</b></span><span>CONTAINER: <b>${esc(V("S46"))}</b></span><span>TRONTON: <b>${esc(V("V46"))}</b></span></div>` : "") +
            (gagal.length ? `<div class="lh">Agen gagal masuk</div>${gagal.join("")}` : "") +
            (under.length ? `<div class="lh">Under tonage</div>${under.join("")}` : ""),
        );
        const mon = dlvMonth(),
          pTon = (() => { const a = dlvNum(dlvC("AL19")), q = dlvNum(dlvC("AL17")); return a != null && q ? (a / q) * 100 : null; })(),
          pMob = dlvPct("AR13");
        const bulan = !dlvAny("AL13", "AL15", "AL17", "AL19", "AR13", "AR19", "AL23") ? "" : dlvFold(
          "bln",
          "Ringkasan Bulan Ini" + (mon ? " · " + mon : ""),
          "Mobil " + V("AR13") + " · Tonase " + (pTon != null ? pTon.toFixed(1).replace(".", ",") + "%" : "–"),
          false,
          `<div class="fine">Planning vs actual mobil · ${esc(V("AL15"))} dari ${esc(V("AL13"))}</div>${dlvBar(pMob)}<div class="bn">${esc(V("AR13"))}</div>` +
            `<div class="fine mt">Planning vs actual tonase · ${esc(V("AL19"))} dari ${esc(V("AL17"))}</div>${dlvBar(pTon)}<div class="bn">${pTon != null ? esc(pTon.toFixed(1).replace(".", ",") + "%") : "–"}</div>` +
            `<div class="fine mt">Omzet · actual ${esc(V("AR17"))}</div>${dlvBar(dlvPct("AR19"))}<div class="bn">${esc(V("AR19"))}</div>` +
            `<div class="lh">Rata-rata per hari</div><div class="mg5 m4">${dlvKv("Mobil", V("AL23"))}${dlvKv("Ton plan", V("AR23"))}${dlvKv("Ton actual", V("AR25"))}${dlvKv("Ton omzet", V("AR27"))}</div>` +
            `<div class="mg5">${dlvKv("Finish kota", V("AL25"))}${dlvKv("Finish loading", V("AL27"))}${dlvKv("Finish delivery", V("AL29"))}</div>` +
            `<div class="lh">Total abnormal bulan ini</div><div class="mg5">${dlvKv("Gagal masuk", V("AL33"), "c-gagal")}${dlvKv("Under tonage", V("AL35"), "c-proses")}${dlvKv("Mobil > 14:00", V("AL37"), "c-masuk")}</div>`,
        );
        const rank = [["Mobil terbanyak", "AL41", "AO41"], ["Tonase terberat", "AL43", "AO43"], ["Loading terlama", "AL45", "AO45"], ["Delivery terlama", "AL47", "AO47"]]
          .filter(([, v]) => dlvC(v))
          .map(([l, v, d]) => dlvRow(l, dlvC(d), dlvC(v), "ok"))
          .join("");
        const dest = dlvC("AG53") ? dlvRow("Tujuan terbanyak", V("AL55") + " mobil · " + V("AL57") + " ton", dlvC("AG53"), "pd") : "";
        const rec = rank + dest ? dlvFold("rek", "Rekor Harian & Destinasi", "", false, rank + dest) : "";
        return kpi + status + waktu + tonase + abn + bulan + rec;
      }
      let dlvLast = ""; // HTML terakhir yang dipasang: tidak dipasang ulang bila sama (tanpa kedip, scroll dan kartu terbuka tetap)
      /* Pembaruan per-elemen untuk layar TV: hanya simpul yang berubah disentuh, sisanya tetap.
         Layar tidak berkedip, donat & bar bergeser halus (transisi CSS), angka yang berubah menyala sebentar. */
      const TV_ROOT = 'class="tv-wrap tv-root"';
      function dlvMorph(root, html) {
        const t = document.createElement("template");
        t.innerHTML = html;
        const calm = matchMedia("(prefers-reduced-motion: reduce)").matches, chg = [];
        const walk = (a, b) => {
          for (let i = 0; i < b.childNodes.length; i++) {
            const nb = b.childNodes[i], na = a.childNodes[i];
            if (!na) { a.appendChild(nb.cloneNode(true)); continue; }
            if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) { a.replaceChild(nb.cloneNode(true), na); continue; }
            if (nb.nodeType !== 1) { if (na.nodeValue !== nb.nodeValue) { na.nodeValue = nb.nodeValue; if (a.nodeType === 1) chg.push(a); } continue; }
            for (const at of nb.attributes) if (na.getAttribute(at.name) !== at.value && !(at.name === "style" && na.classList.contains("tv-wrap"))) na.setAttribute(at.name, at.value);
            for (const at of [...na.attributes]) if (!nb.hasAttribute(at.name) && at.name !== "style" && !(at.name === "open" && na.nodeName === "DETAILS")) na.removeAttribute(at.name);
            if (!nb.hasAttribute("style") && na.hasAttribute("style") && !na.classList.contains("tv-wrap")) na.removeAttribute("style");
            walk(na, nb);
          }
          while (a.childNodes.length > b.childNodes.length) a.removeChild(a.lastChild);
        };
        walk(root, t.content);
        if (!calm) new Set(chg).forEach((el) => { if (el.isConnected && el.animate) el.animate([{ backgroundColor: "rgba(255,208,0,.55)" }, { backgroundColor: "rgba(255,208,0,0)" }], { duration: 1800, easing: "ease-out" }); });
      }
      const dlvPut = (body, html) => {
        if (html !== dlvLast) {
          if (dlvLast.includes(TV_ROOT) && html.includes(TV_ROOT) && body.firstElementChild && body.firstElementChild.classList.contains("tv-root")) dlvMorph(body, html);
          else body.innerHTML = html;
          requestAnimationFrame(() => { dlvTvScale(); if (document.body.classList.contains("tv")) dlvTvFit(); });
          dlvLast = html;
        }
      };
      const dlvSkel = '<div class="skl-kpi" aria-hidden="true"><div class="skl"></div><div class="skl"></div><div class="skl"></div></div><div class="skl skl-card" aria-hidden="true"></div><div class="visually-hidden" role="status">Memuat dashboard delivery…</div>';
      function dlvRender() {
        const body = $("dlvBody");
        if (!body) return;
        const useTv = !!dlvCache && dlvTvUse(); // desain 4K/TV (93-dash-tv.js)
        document.body.classList.toggle("tvd", useTv);
        $("v-mon").classList.toggle("tvd-on", useTv);
        const msg = dlvErr ? `<div class="note">${esc(dlvErr)}</div>` : "";
        $("dlvRef").disabled = dlvBusy;
        $("dlvRef").textContent = dlvBusy ? "Memuat…" : "Muat ulang dashboard";
        if (!dlvCache) {
          $("dlvAt").className = "sync";
          $("dlvAt").textContent = "";
          $("dlvTitle").textContent = "Hubungkan spreadsheet dashboard delivery";
          dlvPut(body, msg || (dlvBusy ? dlvSkel : '<div class="note info"><b>Dashboard delivery belum terhubung.</b> Isi alamat spreadsheet di "Sumber dashboard delivery" di bawah.<br><button class="btn pri sm mt" id="dlvOpenSet" type="button">Atur sumber data</button></div>'));
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
        dlvPut(body, useTv ? msg + dlvTvHtml() : msg + dlvHtml());
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
        dlvTvSoon();
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

      /* Layar TV: sembunyikan menu, tampilkan dashboard penuh (Esc untuk keluar) */
      function dlvTvSet(on) {
        document.body.classList.toggle("tv", on);
        const b = $("dlvTv");
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.textContent = on ? "Keluar layar TV" : "Layar TV";
        dlvRender();
        requestAnimationFrame(() => { dlvTvScale(); dlvTvFit(); });
        if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
        if (!on && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      }
      $("dlvTv").onclick = () => dlvTvSet(!document.body.classList.contains("tv"));
      document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && document.body.classList.contains("tv")) dlvTvSet(false); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("tv")) dlvTvSet(false); });
      /* Tautan TV: buka alamat aplikasi dengan ?tv=1 (atau #tv) → langsung Beranda dalam mode Layar TV (desain 4K).
         Untuk bookmark/kiosk di TV; layar penuh tetap butuh satu ketukan "Layar TV" (aturan browser). Esc keluar. */
      if (/[?&]tv=1(&|$)/.test(location.search) || location.hash === "#tv") {
        setTimeout(() => { if (typeof go === "function") go("mon"); if (!document.body.classList.contains("tv")) dlvTvSet(true); }, 400);
      }

      /* Mode TV: perkecil otomatis sampai seluruh dashboard muat satu layar, tanpa scroll */
      function dlvTvFit() {
        const el = $("v-mon");
        if (!el) return;
        el.style.zoom = "";
        if (!document.body.classList.contains("tv") || el.classList.contains("tvd-on")) return; // desain 4K sudah diskalakan sendiri
        let z = parseFloat(getComputedStyle(el).zoom) || 1;
        for (let i = 0; i < 6; i++) {
          const h = document.documentElement.scrollHeight, vh = innerHeight;
          if (h <= vh + 1) break;
          const nz = Math.max(0.5, z * (vh / h) * 0.97);
          if (Math.abs(nz - z) < 0.01) break;
          z = nz;
          el.style.zoom = String(z);
        }
      }
      let dlvRz = 0;
      window.addEventListener("resize", () => { clearTimeout(dlvRz); dlvRz = setTimeout(dlvTvFit, 150); });
