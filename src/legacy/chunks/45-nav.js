/* Navigasi go(), menu samping, initAll
   asal: index-fixd.html baris 3393-3569 */
      /* ---------- navigasi ---------- */
      function go(v) {
        ["so", "dc", "check", "task", "kes", "adj", "clr", "muat", "usr", "kpi", "tg", "mon", "data"].forEach((k) => ($("v-" + k).hidden = k !== v));
        document.querySelectorAll(".mi").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          b.classList.toggle("on", b.dataset.v === v);
          if (b.dataset.v === v) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        document.querySelectorAll(".mi[data-v]").forEach((b) => {
          if (b.dataset.v === v) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        curViewId = v;
        if (typeof menuSync === "function") menuSync();
        // judul halaman sama dengan judul di bilah atas: sembunyikan secara visual (tetap terbaca pembaca layar); dijalankan setelah judul bilah atas diperbarui
        setTimeout(() => {
          const h = document.querySelector("#v-" + v + " > h2"), t = document.getElementById("pgT");
          if (h && t) h.classList.toggle("dup", h.textContent.trim() === t.textContent.trim());
        }, 0);
        $("tMenu").classList.toggle("on", ![...document.querySelectorAll("#tabs [data-v]")].some((b) => !b.hidden && b.dataset.v === v));
        try { localStorage.setItem("warehouse_so_view_v1", v); } catch (e) {}
        side(false);
        $("pgT").textContent = {
          so: "Periksa Bin",
          check: "Review Supervisor",
          kes: "Cek Kesesuaian",
          adj: "File Adjust",
          clr: "Clearing",
          muat: "Laporan Muat",
          usr: "User & Area",
          kpi: "KPI Area",
          dc: "DC Harian",
          tg: "Telegram",
          mon: "Beranda",
          data: "Data WMS",
          task: "Tugas Bin",
        }[v];
        const soView = v === "so" || v === "check";
        document.querySelector("header .prog").hidden = !soView;
        if (soView) metrics();
        else
          $("hSub").textContent = {
            dc: "Cek harian per item",
            kes: "Bandingkan WMS dan fisik",
            adj: "Selisih siap diunggah",
            clr: "Voucher vs counting",
            muat: "Laporan muat",
            usr: "Atur petugas dan area",
            kpi: "Capaian per area dan petugas",
            tg: "Kirim info ke Telegram",
            mon: "Posisi mobil per wilayah",
            data: "Impor data WMS",
            task: "Tugas per petugas",
          }[v];
        if (v === "check") renderCheck();
        if (v === "kes") renderKes();
        if (v === "adj") renderAdj();
        if (v === "clr") { renderClr(); if (clr.url && (!clrCnt || Date.now() - clrCnt.at > 120000)) clrFetch(false); clrEnter(); }
        else clrLeave();
        if (v === "usr") { renderUsr(); cfgUi(); }
        if (v === "task") renderTask();
        if (v === "tg") tgUi();
        if (v === "mon") monEnter();
        else monLeave();
        if (v === "dc") renderDc();
        if (v === "data") {
          $("dataInfo").textContent = DATA.length + " bin dimuat dari " + areas().length + " area.";
          guardUi(true);
        }
        WMS.emit(); // beri tahu view React bahwa tampilan aktif berganti
        window.scrollTo(0, 0);
      }
      document.querySelectorAll(".mi").forEach((b) => (b.onclick = () => nav(b.dataset.v)));
      const side = (o) => {
        $("side").classList.toggle("on", o);
        $("scrim").classList.toggle("on", o);
      };
      $("burger").onclick = () => side(true);
      $("scrim").onclick = () => side(false);
      $("chips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          lf = b.dataset.k;
          renderBins();
        }
      };
      $("chipsR").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          rf = b.dataset.k;
          sv(K_RF, rf);
          renderBins();
        }
      };
      $("chipsC").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          cf = b.dataset.k;
          renderCheck();
        }
      };
      $("nextBin").onclick = () => {
        const b = $("nextBin").dataset.b;
        if (b) open(b);
      };
      $("binList").onclick = (e) => {
        const b = e.target.closest("[data-b]");
        if (b) open(b.dataset.b);
      };
      $("checkList").onclick = (e) => {
        const b = e.target.closest("[data-b]");
        if (b) {
          go("so");
          const x = DATA.find((d) => d.bin === b.dataset.b);
          if (x) {
            if (!inScope(x.area)) {
              curU = "";
              sv(K_CU, curU);
              initAll();
            }
            $("area").value = x.area;
            lf = "all";
            rf = "all"; // bin tujuan harus tampil, apa pun filter posisi rak sebelumnya
            $("search").value = "";
            renderBins();
            open(x.bin);
          }
        }
      };
      $("area").onchange = renderBins;
      { let _t = 0; $("search").oninput = () => { clearTimeout(_t); _t = setTimeout(renderBins, 150); }; }
      let shDirty = false;
      async function shTryClose() {
        if (shDirty && !(await ask("Tutup tanpa menyimpan?", "Isian di bin ini belum disimpan dan akan hilang.", "Tutup", true))) return;
        if (sel) draftDrop(sel.bin);
        close();
      }
      $("shX").onclick = shTryClose;
      $("sheet").addEventListener("input", () => {
        shDirty = true;
        draftSoon();
        clearInvalid($("sheet"));
        if ($("errBk").hidden) $("err").textContent = "";
      });
      $("sheet").addEventListener("click", (e) => {
        if (e.target.closest("button") && e.target.closest(".sh-body")) {
          shDirty = true;
          draftSoon();
        }
      });
      $("yes").onclick = () => {
        match = true;
        $("lines").innerHTML = "";
        if (!cfg.blind && $("qty").value === "") $("qty").value = sel.onhand;
        choice();
        prev();
      };
      $("no").onclick = () => {
        match = false;
        if (!document.querySelector("#lines .al")) addLine();
        choice();
        prev();
      };
      $("addL").onclick = () => addLine();
      $("qty").oninput = prev;
      $("qSame").onclick = () => {
        if (cfg.blind) return;
        $("qty").value = sel.onhand;
        prev();
      };
      $("qm").onclick = () => {
        $("qty").value = Math.max(0, (Number($("qty").value) || 0) - 1);
        prev();
      };
      $("qp").onclick = () => {
        $("qty").value = (Number($("qty").value) || 0) + 1;
        prev();
      };
      $("save").onclick = save;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("sheet").hidden) shTryClose();
      });
      function initAll() {
        renderUserSel();
        const a = visAreas();
        $("area").innerHTML =
          `<option value="*">${curUser() ? "Semua area saya" : "Semua area"}</option>` + a.map((x) => `<option>${esc(x)}</option>`).join("");
        if (a.length === 1) $("area").value = a[0];
        renderBins();
        metrics();
      }

