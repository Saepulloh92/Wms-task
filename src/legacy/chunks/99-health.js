/* Kesehatan data: panel di menu Data WMS + lencana header (hanya admin). Logika murni: src/lib/health.js.
   Dipanggil: tiap 15 dtk, setelah sinkron (98-sync) dan saat membuka menu Data (go di 45-nav). */
      let hlLast = null;
      function hlInput() {
        return {
          data: DATA, counts, users, tasks, closed,
          sync: { ready: syReady(), dirty: SY.dirty, err: syErr, lastAt: SY.lastAt, warn: SY.warn || "", clk: SY.clk || 0 },
        };
      }
      function hlText(h) {
        if (h.ok) return "Kesehatan data: semua presisi, tidak ada temuan.";
        return ["Kesehatan data: " + h.bad + " perlu ditindaklanjuti, " + h.warn + " perlu dicek.",
          ...h.issues.map((i) => (i.level === "bad" ? "[PERLU TINDAK] " : "[CEK] ") + i.title + (i.n ? " (" + i.n + " bin" + (i.bins.length ? ": " + i.bins.join(", ") + (i.n > i.bins.length ? " …" : "") : "") + ")" : "") + " - " + i.detail)].join("\n");
      }
      function hlRender(h) {
        const v = $("v-data");
        if (!v) return;
        let p = $("hlPanel");
        if (!p) {
          p = document.createElement("div");
          p.className = "panel";
          p.id = "hlPanel";
          p.setAttribute("aria-live", "polite");
          const first = v.querySelector(".panel");
          if (first) v.insertBefore(p, first);
          else v.appendChild(p);
          p.addEventListener("click", (e) => {
            const b = e.target.closest("button");
            if (!b) return;
            if (b.dataset.bin) {
              try { go("so"); open(b.dataset.bin); } catch (er) {}
            } else if (b.dataset.act === "usr") go("usr");
            else if (b.dataset.act === "sync") { const t = $("syUrl"); if (t) t.scrollIntoView({ block: "center" }); }
            else if (b.dataset.act === "data") { const t = $("file"); if (t) t.scrollIntoView({ block: "center" }); }
            else if (b.id === "hlCopy") {
              const t = hlText(hlLast || h);
              (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Ringkasan disalin"), () => toast("Tidak bisa menyalin di perangkat ini"));
            }
          });
        }
        const lab = { usr: "Buka User & Area", sync: "Ke pengaturan sinkron", data: "Ke impor data" };
        const sum = h.ok ? '<div class="hl-sum hl-ok">Semua presisi. Tidak ada temuan.</div>'
          : '<div class="hl-sum ' + (h.bad ? "hl-bad" : "hl-warn") + '">' + (h.bad ? h.bad + " perlu ditindaklanjuti" : "") + (h.bad && h.warn ? ", " : "") + (h.warn ? h.warn + " perlu dicek" : "") + "</div>";
        p.innerHTML = '<h2 style="font-size: 18px">Kesehatan data</h2>' + sum +
          (h.ok ? "" : '<ul class="hl-list">' + h.issues.map((i) =>
            '<li class="hl-item hl-' + i.level + '"><b>' + esc(i.title) + (i.n ? " (" + i.n + ")" : "") + "</b><p>" + esc(i.detail) + "</p>" +
            (i.bins.length ? '<div class="hl-bins">' + i.bins.map((b) => '<button type="button" data-bin="' + esc(b) + '">' + esc(b) + "</button>").join("") + (i.n > i.bins.length ? "<span class=fine>+" + (i.n - i.bins.length) + " lagi</span>" : "") + "</div>" : "") +
            (i.act !== "bin" ? '<button class="btn sec sm hl-act" type="button" data-act="' + i.act + '">' + lab[i.act] + "</button>" : "") + "</li>").join("") + "</ul>" +
            '<button class="btn sec mt" id="hlCopy" type="button">Salin ringkasan</button>') +
          '<p class="fine">Diperiksa otomatis tiap 15 detik dan setelah sinkron.</p>';
      }
      function hlRun() {
        try {
          const h = WMSLib.healthCheck(hlInput());
          hlLast = h;
          const b = $("hlB");
          const show = isAdmin() && !h.ok;
          if (b) {
            b.hidden = !show;
            if (show) {
              b.className = "netb " + (h.bad ? "bad" : "warn");
              b.textContent = String(h.bad + h.warn);
              b.title = h.bad + " perlu ditindaklanjuti, " + h.warn + " perlu dicek";
            }
          }
          if (isAdmin()) hlRender(h);
          else if ($("hlPanel")) $("hlPanel").remove();
        } catch (e) {}
      }
      const hlBtn = $("hlB");
      if (hlBtn) hlBtn.onclick = () => { if (allowedView("data")) { go("data"); setTimeout(() => { const p = $("hlPanel"); if (p) p.scrollIntoView({ block: "start" }); }, 50); } };
      setInterval(() => { if (!document.hidden) hlRun(); }, 15000);
      setTimeout(hlRun, 2500);
