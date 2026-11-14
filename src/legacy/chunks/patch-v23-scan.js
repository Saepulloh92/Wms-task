/* Scan label rak lewat kamera (patch IIFE, dijalankan setelah chunk utama).
   Memakai BarcodeDetector bawaan browser (Chrome/Edge Android). Bila tidak ada, tombol disembunyikan dan petugas tetap bisa memakai papan angka. */
      (function () {
        const btn = $("scanBtn"), sheet = $("scanSheet"), vid = $("scanVid"), msg = $("scanMsg");
        if (!btn || !sheet) return;
        if (!("BarcodeDetector" in window) || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return; // tombol tetap tersembunyi
        btn.hidden = false;
        const norm = (t) => String(t).toUpperCase().replace(/[^A-Z0-9]/g, "");
        let stream = null, det = null, timer = 0, busy = false;
        function stop() {
          clearInterval(timer); timer = 0; busy = false;
          if (stream) stream.getTracks().forEach((t) => t.stop());
          stream = null; vid.srcObject = null;
        }
        function close() { stop(); sheet.hidden = true; document.body.style.overflow = ""; }
        // cocokkan hasil baca dengan kode bin: persis dulu, lalu bin terpanjang yang terkandung di teks QR
        function match(raw) {
          const q = norm(raw);
          if (!q) return null;
          const pool = DATA.filter((x) => inScope(x.area));
          const exact = pool.find((x) => norm(x.bin) === q);
          if (exact) return exact;
          return pool.filter((x) => norm(x.bin).length >= 3 && q.includes(norm(x.bin))).sort((a, b) => norm(b.bin).length - norm(a.bin).length)[0] || null;
        }
        async function tick() {
          if (busy || !stream || vid.readyState < 2) return;
          busy = true;
          try {
            const codes = await det.detect(vid);
            for (const c of codes) {
              const hit = match(c.rawValue);
              if (hit) {
                try { buzz(40); } catch (e) {}
                close();
                lf = "all";
                $("area").value = [...$("area").options].some((o) => o.value === hit.area) ? hit.area : "*";
                $("search").value = "";
                renderBins();
                open(hit.bin);
                return;
              }
              msg.textContent = "Kode \u201C" + String(c.rawValue).slice(0, 24) + "\u201D tidak cocok dengan bin mana pun. Arahkan ke label lain.";
            }
          } catch (e) { /* frame gagal dibaca: coba lagi */ }
          busy = false;
        }
        btn.onclick = async () => {
          sheet.hidden = false;
          document.body.style.overflow = "hidden";
          msg.textContent = "Memulai kamera\u2026";
          try {
            det = det || new BarcodeDetector();
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
            vid.srcObject = stream;
            await vid.play();
            msg.textContent = "Arahkan kamera ke barcode atau QR di rak.";
            timer = setInterval(tick, 250);
          } catch (e) {
            stop();
            msg.textContent = e && e.name === "NotAllowedError" ? "Izin kamera ditolak. Aktifkan izin kamera di pengaturan browser, atau ketik kode bin." : "Kamera tidak bisa dibuka. Ketik kode bin saja.";
          }
        };
        $("scanX").onclick = close;
        $("scanPad").onclick = () => { close(); $("padBtn").click(); };
        document.addEventListener("keydown", (e) => { if (!sheet.hidden && e.key === "Escape") close(); });
        document.addEventListener("visibilitychange", () => { if (document.hidden && !sheet.hidden) close(); });
      })();
