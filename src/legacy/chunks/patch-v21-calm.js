/* Layar petugas lebih sepi (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7330-7359 */
      /* ---- v21: layar petugas lebih sepi ---- */
      (function () {
        const g = $("guard"), ch = $("chips");
        const petugas = () => !!curUser() && !isAdmin();
        function tidyGuard() {
          g.querySelectorAll(".gd").forEach((el) => {
            // banner untuk admin (impor data, cadangan) disembunyikan dari petugas; peringatan penyimpanan tetap tampil
            el.hidden = !isAdmin() && (el.classList.contains("info") || !!el.querySelector('[data-g="imp"]'));
          });
        }
        function tidyChips() {
          if (!petugas()) return;
          ch.querySelectorAll('[data-k="bad"],[data-k="ok"]').forEach((b) => (b.hidden = true));
        }
        function start() {
          tidyGuard();
          if (petugas() && lf === "all") {
            lf = "todo";
            renderBins();
          }
        }
        new MutationObserver(tidyGuard).observe(g, { childList: true });
        new MutationObserver(tidyChips).observe(ch, { childList: true });
        new MutationObserver(start).observe($("login"), { attributes: true, attributeFilter: ["hidden"] });
        tidyGuard();
        tidyChips();
        start();
      })();
