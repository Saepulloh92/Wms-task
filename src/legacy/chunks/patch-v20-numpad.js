/* Papan angka cari bin (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7243-7328 */
      /* ---- v20: papan angka cari bin (tanpa QR) ---- */
      (function () {
        let v = "";
        const sheet = $("padSheet"), disp = $("padDisp"), res = $("padRes"), keys = $("padKeys");
        const norm = (t) => String(t).toUpperCase().replace(/[^A-Z0-9]/g, "");
        function buildKeys() {
          const set = new Set();
          DATA.forEach((x) => String(x.bin).toUpperCase().split("").forEach((c) => { if (/[A-Z]/.test(c)) set.add(c); }));
          const L = [...set].sort().slice(0, 20);
          keys.innerHTML =
            ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => `<button type="button" data-k="${k}">${k}</button>`).join("") +
            '<button type="button" class="fn" data-k="back" aria-label="Hapus satu karakter">⌫</button><button type="button" data-k="0">0</button><button type="button" class="fn" data-k="clr" aria-label="Hapus semua">C</button>' +
            (L.length ? `<div class="lt">${L.map((c) => `<button type="button" data-k="${c}">${c}</button>`).join("")}</div>` : "");
        }
        function render() {
          disp.innerHTML = v ? `<span>${esc(v)}</span>` : '<span class="ph">Ketuk angka atau huruf kode bin</span>';
          const q = norm(v), pool = DATA.filter((x) => inScope(x.area));
          let rows, title;
          if (!q) {
            rows = pool.filter((x) => !counts[x.bin] && !isClosed(x.area));
            title = rows.length ? "Bin berikutnya yang belum diperiksa" : "Semua bin sudah diperiksa";
          } else {
            const pre = [], inc = [];
            pool.forEach((x) => { const n = norm(x.bin); if (n.startsWith(q)) pre.push(x); else if (n.includes(q)) inc.push(x); });
            rows = pre.concat(inc);
            title = rows.length ? "Ketuk bin untuk mulai" : "Tidak ada bin dengan kode itu";
          }
          const total = rows.length;
          rows = rows.slice(0, 8);
          res.innerHTML =
            `<div class="pad-t">${title}</div>` +
            rows.map((x) => {
              const s2 = stat(x), c = counts[x.bin];
              const pill = isClosed(x.area) ? '<span class="pill amber">Ditutup</span>' : s2 === "todo" ? '<span class="pill">Belum</span>' : s2 === "ok" ? '<span class="pill green">Sesuai</span>' : `<span class="pill amber">${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>`;
              return `<button class="bin ${s2 === "ok" ? "done-ok" : s2 === "bad" ? "done-bad" : ""}" data-b="${esc(x.bin)}"><b>${esc(x.bin)}</b><span class="it">${szHtml(x.item)}</span><span class="q">${cfg.blind && !c ? "–" : fmt(x.onhand)}<small>qty WMS</small></span><span>${pill}</span></button>`;
            }).join("") +
            (total > rows.length ? `<p class="fine">Menampilkan ${rows.length} dari ${fmt(total)}. Tambah angka atau huruf untuk mempersempit.</p>` : "");
        }
        function press(k) {
          try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {}
          if (k === "back") v = v.slice(0, -1);
          else if (k === "clr") v = "";
          else if (v.length < 14) v += k;
          render();
        }
        keys.onclick = (e) => { const b = e.target.closest("[data-k]"); if (b) press(b.dataset.k); };
        function closePad() {
          sheet.hidden = true;
          document.body.style.overflow = "";
        }
        res.onclick = (e) => {
          const b = e.target.closest("[data-b]");
          if (!b) return;
          const hit = DATA.find((x) => x.bin === b.dataset.b);
          if (!hit) return;
          closePad();
          lf = "all";
          $("area").value = [...$("area").options].some((o) => o.value === hit.area) ? hit.area : "*";
          $("search").value = "";
          renderBins();
          open(hit.bin);
        };
        $("padBtn").onclick = () => {
          v = "";
          buildKeys();
          render();
          sheet.hidden = false;
          document.body.style.overflow = "hidden";
        };
        $("padX").onclick = closePad;
        document.addEventListener("keydown", (e) => {
          if (sheet.hidden || !$("dlg").hidden) return;
          if (e.key === "Escape") return closePad();
          if (e.ctrlKey || e.metaKey || e.altKey) return;
          if (e.key === "Backspace") { e.preventDefault(); press("back"); }
          else if (/^[a-zA-Z0-9]$/.test(e.key)) { e.preventDefault(); press(e.key.toUpperCase()); }
        });
        // filter dilipat untuk petugas, terbuka untuk admin
        const flt = $("flt");
        const fltState = () => { flt.open = !curUser(); };
        fltState();
        new MutationObserver(fltState).observe($("login"), { attributes: true, attributeFilter: ["hidden"] });
        $("user").addEventListener("change", fltState);
      })();
