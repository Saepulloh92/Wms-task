/* Tampilan lapangan + scan label rak (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7150-7180 */
      /* ---- v18: tampilan lapangan (ukuran teks, Outdoor) + scan label rak ---- */
      (function () {
        const K = "warehouse_so_disp_v1", TSV = [1, 1.15, 1.3];
        let d = ld(K, {});
        if (!d || typeof d !== "object" || Array.isArray(d)) d = {};
        function apply() {
          const r = document.documentElement;
          r.classList.toggle("outdoor", !!d.out);
          r.style.setProperty("--ts", String(TSV[d.ts] || 1));
          document.querySelectorAll(".dsp [data-ts]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.ts) === (d.ts || 0))));
          $("swOut").checked = !!d.out;
        }
        document.querySelector(".dsp").onclick = (e) => {
          const b = e.target.closest("[data-ts]");
          if (!b) return;
          d.ts = Number(b.dataset.ts);
          sv(K, d);
          apply();
          toast("Ukuran teks: " + b.getAttribute("aria-label"));
        };
        $("swOut").onchange = () => {
          d.out = $("swOut").checked;
          sv(K, d);
          apply();
          toast(d.out ? "Mode Outdoor aktif" : "Mode Outdoor mati");
        };
        apply();

      })();
