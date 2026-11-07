/* Aksesibilitas + navigasi bin + input
   asal: index-fixd.html baris 5576-5746 */
      /* ---- v12: aksesibilitas tambahan ---- */
      (function () {
        // Badge angka -> nama tombol yang bisa dibaca pembaca layar
        const syncBadge = (bd) => {
          const host = bd.closest("button, .mi");
          if (!host) return;
          if (!host.dataset.baseLabel) host.dataset.baseLabel = host.textContent.replace(bd.textContent, "").trim();
          const cnt = bd.textContent.trim();
          if (bd.hidden || !cnt) host.removeAttribute("aria-label");
          else host.setAttribute("aria-label", host.dataset.baseLabel + ", " + cnt + " perlu perhatian");
        };
        document.querySelectorAll("#tabs .bd, .mi .bd").forEach((bd) => {
          syncBadge(bd);
          new MutationObserver(() => syncBadge(bd)).observe(bd, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
        });
        // Dialog modal: fokus masuk, terjebak di dalam, kembali ke pemicu, latar inert
        const MODALS = ["sheet", "dcSheet", "dcPickSheet", "dlg", "navSet", "padSheet", "login"];
        const FOCUSABLE = 'button:not([disabled]):not([hidden]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const opener = {};
        const topOpen = () => MODALS.map((id) => $(id)).filter((e) => e && !e.hidden).pop();
        const visible = (el) => {
          if (el.closest("[hidden]")) return false;
          const cs = getComputedStyle(el);
          return cs.display !== "none" && cs.visibility !== "hidden";
        };
        const refresh = () => {
          const top = topOpen();
          const app = document.querySelector(".app");
          if (app) top ? app.setAttribute("inert", "") : app.removeAttribute("inert");
          MODALS.forEach((id) => {
            const e = $(id);
            if (!e) return;
            if (e !== top && !e.hidden) e.setAttribute("inert", ""); else e.removeAttribute("inert");
          });
        };
        MODALS.forEach((id) => {
          const el = $(id);
          if (!el) return;
          new MutationObserver(() => {
            if (!el.hidden) {
              opener[id] = document.activeElement;
              refresh();
              requestAnimationFrame(() => {
                if (el.contains(document.activeElement)) return;
                const f = [...el.querySelectorAll(FOCUSABLE)].filter(visible)[0];
                if (f) f.focus({ preventScroll: true });
              });
            } else {
              refresh();
              const o = opener[id];
              opener[id] = null;
              if (o && document.contains(o) && !topOpen()) o.focus({ preventScroll: true });
            }
          }).observe(el, { attributes: true, attributeFilter: ["hidden"] });
        });
        document.addEventListener("keydown", (e) => {
          if (e.key !== "Tab") return;
          const top = topOpen();
          if (!top) return;
          const f = [...top.querySelectorAll(FOCUSABLE)].filter(visible);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
          else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
      })();

      // Escape menutup dialog konfirmasi lebih dulu, lalu menu samping
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.key !== "Escape") return;
          if (!$("dlg").hidden) {
            e.stopImmediatePropagation();
            e.preventDefault();
            $("dNo") && $("dNo").click();
          } else if ($("side").classList.contains("on")) {
            e.stopImmediatePropagation();
            side(false);
          }
        },
        true,
      );
      // Cegah angka berubah karena scroll mouse/trackpad
      document.addEventListener("wheel", () => {
        const a = document.activeElement;
        if (a && a.type === "number") a.blur();
      }, { passive: true });
      // Semua kolom angka terpilih saat difokus, jadi langsung bisa diketik ulang
      document.addEventListener("focusin", (e) => {
        if (e.target.matches && e.target.matches('input[type="number"]')) setTimeout(() => e.target.select(), 0);
      });

      /* ---- v5: navigasi bin, input, cadangan ---- */
      async function navTo(dir) {
        const b = navTarget(dir);
        if (!b) return toast(dir < 0 ? "Ini bin pertama di daftar" : "Ini bin terakhir di daftar");
        if (shDirty && !(await ask("Pindah tanpa menyimpan?", "Isian di bin ini belum disimpan dan akan hilang.", "Pindah", true))) return;
        if (shDirty && sel) draftDrop(sel.bin);
        open(b, true);
      }
      $("shPrev").onclick = () => navTo(-1);
      $("shNext").onclick = () => navTo(1);
      $("shUndo").onclick = undo;
      $("undoBtn").onclick = undo;
      $("errBk").onclick = () => doBackup();
      document.addEventListener("keydown", (e) => {
        if ($("sheet").hidden || !$("dlg").hidden || !e.altKey) return;
        if (e.key === "ArrowLeft") { e.preventDefault(); navTo(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); navTo(1); }
      });

      // Enter di qty / catatan = Simpan & lanjut
      [$("qty"), $("note")].forEach((el) =>
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
        }),
      );

      // Kolom angka: hanya bilangan bulat, dengan batas wajar
      const MAXQ = 9999999;
      document.addEventListener("keydown", (e) => {
        const t = e.target;
        if (t.matches && t.matches('input[type="number"]') && ["e", "E", "+", "-", ".", ","].includes(e.key)) e.preventDefault();
      });
      document.addEventListener(
        "input",
        (e) => {
          const t = e.target;
          if (!t.matches || !t.matches('input[type="number"]') || t.value === "") return;
          const n = Math.min(MAXQ, Math.trunc(Math.abs(Number(t.value))));
          if (String(n) !== t.value) t.value = Number.isFinite(n) ? n : "";
        },
        true,
      );

      // Tombol − / + : tahan untuk mengulang, makin lama makin cepat
      function holdStep(btn, d) {
        let t, iv, n;
        const step = () => {
          n++;
          const k = n > 25 ? 10 : 1;
          $("qty").value = Math.min(MAXQ, Math.max(0, (Number($("qty").value) || 0) + d * k));
          shDirty = true;
          draftSoon();
          prev();
        };
        const stop = () => {
          clearTimeout(t);
          clearInterval(iv);
        };
        btn.onpointerdown = (e) => {
          e.preventDefault();
          stop();
          n = 0;
          step();
          t = setTimeout(() => (iv = setInterval(step, 70)), 450);
        };
        ["onpointerup", "onpointerleave", "onpointercancel"].forEach((ev) => (btn[ev] = stop));
        btn.oncontextmenu = (e) => e.preventDefault();
        btn.onclick = (e) => {
          if (e.detail === 0) { n = 0; step(); } // papan ketik / pembaca layar
        };
      }
      holdStep($("qm"), -1);
      holdStep($("qp"), 1);

