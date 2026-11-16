/* Kartu hasil Clearing di menu Monitoring. Logika: src/lib/clearing-summary.js. Data langsung (HP ini) bila laporan + counting
   sudah dimuat, kalau tidak memakai riwayat clearing terakhir yang tersinkron. Hanya untuk yang boleh membuka menu Clearing. */
      var cmKey = "", cmSum = null, cmTimer = 0; // var: monEnter berjalan saat boot, sebelum baris ini dieksekusi (let = TDZ)
      function cmSource() {
        if (clrRep && clrCnt) {
          const key = [clrRep.at, clrCnt.at, clrRep.rows.length, clrCnt.rows.length, Object.keys(clrDone).length, clr.cv, clr.cq, clr.ck].join("|");
          if (key !== cmKey) { cmKey = key; cmSum = WMSLib.clrSummarize(clrBuild().map((x) => ({ ...x, done: clrIsDone(x) }))); }
          if (cmSum && cmSum.total) return { s: cmSum, live: true, at: clrCnt.at, src: clrCnt.src };
        }
        const h = clrHist[0];
        if (!h) return null;
        const rows = WMSLib.clrFromHist(h.rows);
        if (rows.length) return { s: WMSLib.clrSummarize(rows), live: false, at: Date.parse(h.at) || 0, tgl: h.tgl };
        const open = h.bad || 0;
        return { s: { total: h.n, ok: h.ok, open, qty: 0, dup: 0, nq: 0, belum: 0, done: 0, wms: null, cnt: null, sel: 0, pct: h.n ? Math.round((h.ok / h.n) * 100) : 0, byShift: [], top: [], status: open ? "cek" : "ok" }, live: false, at: Date.parse(h.at) || 0, tgl: h.tgl };
      }
      // akurasi peringatan dini voucher: berapa yang ditandai, sudah diputuskan petugas, dan terbukti salah item
      function cmAn() {
        try {
          const a = typeof anSummary === "function" ? anSummary() : null;
          if (!a || !(a.flag || a.lori.length)) return "";
          const acc = a.chk
            ? "<b>" + fmt(a.salah) + "</b> terbukti salah item · " + fmt(a.normal) + " normal · akurasi <b>" + a.pct + "%</b> dari " + fmt(a.chk) + " yang diperiksa"
            : "belum ada yang diputuskan petugas";
          const top = a.plan.slice(0, 5), fb = (k, v, lb, cls) => '<button class="btn ' + cls + ' sm" type="button" data-anfb="' + esc(k) + "|" + v + '">' + lb + "</button>";
          const rows = top.map((x) => '<li class="cm-pl"><div class="cm-pt"><b>' + esc(x.v) + "</b><span>" + esc([x.mc && "Mesin " + x.mc, x.lr && "Lori " + x.lr, x.item].filter(Boolean).join(" · ")) + "</span></div>" +
            '<p class="cm-why">' + esc(x.why.join(" · ")) + "</p>" +
            '<div class="cm-pb">' + fb(x.k, "salah", "Salah item", "pri") + fb(x.k, "normal", "Normal", "sec") + "</div></li>").join("");
          const lori = a.lori.slice(0, 3).map((x) => '<li class="cm-pl"><div class="cm-pt"><b>Lori ' + esc(x.lr) + "</b><span>" + esc(x.item) + '</span></div><p class="cm-why">Total qty ' + fmt(x.q) + " dari " + fmt(x.nv) + " voucher, lori lain biasanya " + fmt(x.usual) + ". Cek fisik lori ini.</p></li>").join("");
          const left = a.plan.length;
          return '<div class="cm-sec">Cek hari ini · peringatan dini voucher</div>' +
            '<p class="cm-det cm-an">' + fmt(a.flag) + " ditandai · " + (left ? "<b>" + fmt(left) + "</b> belum diputuskan" : "semua sudah diputuskan") + " · " + acc + "</p>" +
            (left ? '<p class="fine">Cek fisik voucher di bawah (urut paling perlu dulu), lalu tekan hasilnya.</p>' : "") +
            (rows ? '<ul class="cm-plan">' + rows + "</ul>" : "") +
            (lori ? '<div class="cm-sec">Lori perlu dicek</div><ul class="cm-plan">' + lori + "</ul>" : "") +
            '<div class="cm-pb">' + (left > top.length ? '<button class="btn sec sm" type="button" id="cmAnAll">Lihat semua (' + fmt(left) + ")</button>" : "") + '<button class="btn sec sm" type="button" id="cmAnCopy">Bagikan daftar</button></div>';
        } catch (e) { return ""; }
      }
      // teks daftar kerja untuk dibagikan (WhatsApp/Telegram): voucher paling perlu dicek dulu + lori
      function cmAnText(a) {
        const L = ["Cek hari ini · peringatan dini voucher Clearing", new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })];
        a.plan.slice(0, 10).forEach((x, i) => L.push((i + 1) + ". " + x.v + " · " + [x.mc && "Mesin " + x.mc, x.lr && "Lori " + x.lr, x.item].filter(Boolean).join(" · ") + " — " + x.why.join("; ")));
        a.lori.slice(0, 5).forEach((x) => L.push("Lori " + x.lr + " · " + x.item + " — total qty " + fmt(x.q) + " (median lori lain " + fmt(x.usual) + ")"));
        L.push("Cek fisik, lalu tandai Salah item / Normal di aplikasi.");
        return L.join("\n");
      }
      function monClrRender() {
        const el = $("monClr");
        if (!el) return;
        try {
          if (!(allowedView("clr") || isSup())) { el.innerHTML = ""; return; }
          const src = cmSource();
          if (!src || !src.s.total) { el.innerHTML = ""; return; }
          const s = src.s, hm = (t) => new Date(t).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
          const sub = src.live
            ? (src.src === "file" ? "Dari file" : "Counting") + " dimuat " + hm(src.at) + " · " + fmt(s.total) + " voucher"
            : "Dari riwayat tersimpan " + clrTglF(src.tgl) + (src.at ? ", " + hm(src.at) : "") + " · " + fmt(s.total) + " voucher";
          const det = [s.qty && "selisih qty " + fmt(s.qty), s.dup && "dobel " + fmt(s.dup), s.nq && "qty kosong " + fmt(s.nq), s.belum && "belum dihitung " + fmt(s.belum), s.done && "ditandai selesai " + fmt(s.done)].filter(Boolean).join(" · ");
          const stat = s.status === "ok" ? ["Semua cocok", "green"] : ["Perlu tindak " + fmt(s.open), "red"];
          const tr = WMSLib.clrTrend(clrHist, 7);
          el.innerHTML = '<section class="cm" aria-label="Hasil Clearing"><div class="cm-h"><div><h2>Clearing</h2><p class="cm-sub">' + esc(sub) + '</p></div><span class="pill ' + stat[1] + '">' + esc(stat[0]) + "</span></div>" +
            '<div class="cm-grid"><div class="cm-t"><b>' + fmt(s.total) + "</b><span>Voucher</span></div>" +
            '<div class="cm-t cm-g"><b>' + fmt(s.ok) + "</b><span>Cocok (" + s.pct + "%)</span></div>" +
            '<div class="cm-t' + (s.open ? " cm-r" : " cm-g") + '"><b>' + fmt(s.open) + "</b><span>Perlu tindak</span></div>" +
            '<div class="cm-t' + (s.sel ? " cm-r" : "") + '"><b>' + (s.wms == null ? "-" : (s.sel > 0 ? "+" : "") + fmt(s.sel)) + "</b><span>Selisih qty</span></div></div>" +
            '<div class="cm-bar" role="progressbar" aria-label="Progres Clearing" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + s.pct + '"><i style="width:' + s.pct + '%"></i></div>' +
            (s.wms == null ? "" : '<p class="cm-qty">Qty WMS <b>' + fmt(s.wms) + "</b> · Counting <b>" + fmt(s.cnt) + "</b> · Selisih <b" + (s.sel ? ' class="cm-neg"' : "") + ">" + (s.sel > 0 ? "+" : "") + fmt(s.sel) + "</b></p>") +
            (det ? '<p class="cm-det">' + esc(det) + "</p>" : "") +
            cmAn() +
            (s.byShift.length ? '<div class="cm-sec">Per shift</div><div class="cm-sh"><span class="fine">Shift</span><span class="fine">Cocok</span><span class="fine">Cek</span>' + s.byShift.map((g) => "<span>" + esc(g.shift) + "</span><span>" + fmt(g.ok) + "/" + fmt(g.total) + "</span><span>" + (g.open ? "<b>" + fmt(g.open) + "</b>" : "0") + "</span>").join("") + "</div>" : "") +
            (s.top.length ? '<div class="cm-sec">Perlu ditindaklanjuti' + (s.open > s.top.length ? " (" + s.top.length + " dari " + fmt(s.open) + ")" : "") + '</div><ul class="cm-todo">' + s.top.map((x) => '<li class="' + (x.st === "belum" || x.st === "nq" ? "cm-w" : "") + '"><b>' + esc(x.v) + "</b><span>" + esc(clrKet(x)) + (x.lori ? "<small>Lori " + esc(x.lori) + "</small>" : "") + "</span><b>" + (x.diff ? (x.diff > 0 ? "+" : "") + fmt(x.diff) : "") + "</b></li>").join("") + "</ul>" : "") +
            (tr.length > 1 ? '<div class="cm-sec">Cocok per hari (' + tr.length + ' hari)</div><div class="cm-tr">' + tr.map((d) => '<div title="' + esc(d.tgl) + ": " + d.pct + '% cocok"><i class="' + (d.pct < 60 ? "cm-low" : d.pct < 90 ? "cm-mid" : "") + '" style="height:' + Math.max(d.pct, 3) + '%"></i>' + esc(d.tgl.slice(8)) + "</div>").join("") + "</div>" : "") +
            '<div class="cm-act">' + (allowedView("clr") ? '<button class="btn pri sm inl" id="cmOpen" type="button">Buka Clearing</button>' : "") +
            (clr.url && clrRep ? '<button class="btn sec sm inl" id="cmRef" type="button"' + (clrBusy ? " disabled" : "") + ">" + (clrBusy ? "Memuat…" : "Muat ulang counting") + "</button>" : "") + "</div></section>";
          el.onclick = (e) => {
            const b = e.target.closest && e.target.closest("[data-anfb]");
            if (b) { const [k, v] = b.dataset.anfb.split("|"); anSetVerdict(k, v); monClrRender(); if (typeof clrAnomRender === "function") clrAnomRender(); return; }
            if (e.target.closest && e.target.closest("#cmAnAll")) go("clr");
            if (e.target.closest && e.target.closest("#cmAnCopy")) {
              const a = anSummary(), t = a ? cmAnText(a) : "";
              if (!t) return;
              if (navigator.share) navigator.share({ text: t }).catch(() => {});
              else if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => toast("Daftar disalin"), () => toast("Gagal menyalin"));
            }
          };
          const o = $("cmOpen"), r = $("cmRef");
          if (o) o.onclick = () => go("clr");
          if (r) r.onclick = () => clrFetch(true);
        } catch (e) { el.innerHTML = ""; }
      }
      function monClrEnter() {
        monClrRender();
        clearInterval(cmTimer);
        const stale = () => clr.url && clrRep && clrCnt && clrCnt.src !== "file" && !clrBusy && Date.now() - clrCnt.at > Math.max(2, clr.auto || 5) * 60000;
        if (stale()) clrFetch(false);
        cmTimer = setInterval(() => {
          if (document.hidden || $("v-mon").hidden) { if ($("v-mon").hidden) clearInterval(cmTimer); return; }
          monClrRender();
          if (stale()) clrFetch(false);
        }, 60000);
      }
