/* Draft isian, buka/simpan sheet periksa, urungkan
   asal: index-fixd.html baris 2739-2999 */
      /* ---------- draft isian bin (4 helper: draft, getar, layar menyala) ---------- */
      const K_DR = "warehouse_so_draft_v1"; // isian yang belum disimpan; hanya di perangkat ini, tidak ikut sinkron/cadangan
      let drafts = ld(K_DR, {}),
        drT = 0;
      if (typeof drafts !== "object" || !drafts || Array.isArray(drafts)) drafts = {};
      function draftNow() {
        clearTimeout(drT);
        if (!sel || $("sheet").hidden) return;
        const al = lines(),
          empty = match === null && $("qty").value === "" && !$("note").value && !al.length;
        if (empty) {
          if (drafts[sel.bin]) {
            delete drafts[sel.bin];
            sv(K_DR, drafts);
          }
          return;
        }
        drafts[sel.bin] = { match, qty: $("qty").value, note: $("note").value, lines: al, at: new Date().toISOString() };
        sv(K_DR, drafts);
      }
      const draftSoon = () => {
        clearTimeout(drT);
        drT = setTimeout(draftNow, 500);
      };
      function draftDrop(bin) {
        clearTimeout(drT);
        if (drafts[bin]) {
          delete drafts[bin];
          sv(K_DR, drafts);
        }
      }
      function clearDrafts() {
        clearTimeout(drT);
        drafts = {};
        sv(K_DR, drafts);
      }
      // getar singkat saat simpan: di lapangan terang dan bising, toast sering tidak terlihat
      const buzz = (pat) => {
        try { if (navigator.vibrate) navigator.vibrate(pat); } catch (e) {}
        try { if (window.__beep) window.__beep(pat); } catch (e) {}
      };
      // layar tidak mati saat lembar hitung terbuka
      let wl = null;
      async function wakeOn() {
        try {
          if (!navigator.wakeLock || wl) return;
          wl = await navigator.wakeLock.request("screen");
          wl.addEventListener("release", () => { wl = null; });
        } catch (e) {
          wl = null;
        }
      }
      function wakeOff() {
        try { if (wl) wl.release(); } catch (e) {}
        wl = null;
      }
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) draftNow();
        else if (!$("sheet").hidden || !$("dcSheet").hidden) wakeOn();
      });
      window.addEventListener("pagehide", draftNow);
      function open(bin, keep) {
        sel = DATA.find((x) => x.bin === bin);
        if (!sel) return;
        if (isClosed(sel.area)) {
          toast("Area " + sel.area + " sudah ditutup. Buka kembali di menu Petugas & Area untuk mengubah.");
          return;
        }
        const c = counts[bin];
        match = c ? c.itemMatch : null;
        // urutan navigasi dibekukan saat lembar dibuka, supaya tidak berubah ketika bin disimpan
        if (!keep || !navList.includes(bin)) navList = list.map((x) => x.bin);
        if (!navList.includes(bin)) navList = [bin];
        $("shBin").textContent = sel.bin;
        const i = navList.indexOf(bin);
        $("shPos").textContent = `Bin ${i + 1} dari ${navList.length}` + (c ? " · sudah diisi" : "");
        $("shPrev").disabled = !navTarget(-1);
        $("shNext").disabled = !navTarget(1);
        $("errBk").hidden = true;
        updUndo();
        $("shItem").innerHTML =
          `<div class="code">Area ${esc(sel.area)} · Kode WMS ${esc(sel.kode)}</div><div class="itemname">${szHtml(sel.item)}</div>${isBlindFor(sel.bin) ? `<div class="kv"><div style="grid-column:1/-1"><small>Mode hitung buta</small><strong>Qty WMS disembunyikan</strong></div></div>` : `<div class="kv"><div><small>Qty WMS</small><strong>${fmt(sel.onhand)}</strong></div><div><small>Free stock</small><strong>${fmt(sel.freeStock)}</strong></div></div>`}`;
        $("qty").value = c ? c.actualQty : "";
        $("note").value = c?.note || "";
        $("lines").innerHTML = "";
        $("err").textContent = "";
        clearInvalid($("sheet"));
        (c?.actualItems || []).forEach((x) => addLine(x.item, x.qty));
        const dr = drafts[bin],
          restored = !!(dr && (!c || String(dr.at) > String(c.savedAt)));
        if (restored) {
          match = dr.match === true || dr.match === false ? dr.match : null;
          $("qty").value = dr.qty == null ? "" : dr.qty;
          $("note").value = dr.note || "";
          $("lines").innerHTML = "";
          (Array.isArray(dr.lines) ? dr.lines : []).forEach((x) => addLine(x.item, x.qty));
          if (match === false && !document.querySelector("#lines .al")) addLine();
        }
        if (!isBlindFor(sel.bin)) {
          $("qSame").textContent = "Sama dengan WMS (" + fmt(sel.onhand) + ")";
          $("qSame").hidden = false;
        } else {
          $("qSame").hidden = true;
          $("qSame").textContent = "Sama dengan WMS"; // jangan simpan angka WMS di DOM saat mode buta
        }
        choice();
        $("sheet").hidden = false;
        document.body.style.overflow = "hidden";
        prev();
        $("sheet").querySelector(".sh-body").scrollTop = 0;
        shDirty = restored;
        if (restored) toast("Draft isian bin ini dipulihkan");
        wakeOn();
      }
      function close() {
        shDirty = false;
        $("sheet").hidden = true;
        if ($("dcSheet").hidden) wakeOff();
        document.body.style.overflow = "";
        renderBins();
        metrics();
      }
      function choice() {
        $("yes").classList.toggle("on", match === true);
        $("no").classList.toggle("on", match === false);
        $("yes").setAttribute("aria-pressed", String(match === true));
        $("no").setAttribute("aria-pressed", String(match === false));
        $("diffWrap").hidden = match !== false;
        $("qLbl").textContent =
          match === false ? "2. Qty barang WMS yang masih ada di bin (isi 0 jika tidak ada)" : "2. Qty fisik";
      }
      function prev() {
        const v = $("qty").value;
        const el = $("prev");
        if (isBlindFor(sel.bin) || match === null || v === "") {
          el.innerHTML = "";
          return;
        }
        const d = Number(v) - sel.onhand,
          good = match === true && d === 0;
        const big = sel.onhand > 0 && Math.abs(d) / sel.onhand >= 0.5 && Math.abs(d) >= 10;
        el.innerHTML = `<div class="prev ${good ? "good" : "bad"}"><b>${good ? "Sesuai dengan WMS" : "Perlu review supervisor"}</b><br>${d ? `Selisih qty: <b>${d > 0 ? "+" : ""}${fmt(d)}</b>` : "Qty sama"}${match === false ? " · Item berbeda" : ""}${big ? '<div class="bigdiff">Selisih besar. Pastikan angka yang diketik sudah benar sebelum menyimpan.</div>' : ""}</div>`;
      }
      async function save() {
        const v = $("qty").value,
          err = (m, f) => {
            clearInvalid($("sheet"));
            $("err").textContent = m;
            $("errBk").hidden = true;
            if (f) {
              markInvalid(f, "err");
              f.focus();
            }
            return false;
          };
        if (match === null) return err("Pilih YA atau TIDAK dulu.");
        if (v === "" || !Number.isInteger(Number(v)) || Number(v) < 0)
          return err("Isi qty fisik dengan angka bulat 0 atau lebih.", $("qty"));
        const al = lines();
        if (match === false) {
          if (!al.length) return err("Tambahkan barang lain yang ditemukan, atau pilih YA.", $("addL"));
          if (
            al.some((x) => !x.item || x.qty === "" || !Number.isInteger(Number(x.qty)) || Number(x.qty) < 0)
          ) {
            const bad = [...document.querySelectorAll("#lines .li, #lines .lq")].find((e) => e.value === "");
            return err("Lengkapi nama dan qty setiap barang lain.", bad);
          }
        }
        {
          const dd = Number(v) - sel.onhand,
            big = (sel.onhand > 0 && Math.abs(dd) / sel.onhand >= 0.5 && Math.abs(dd) >= 10) || (sel.onhand === 0 && Number(v) >= 50);
          if (big) {
            if (saveBusy) return false;
            saveBusy = true;
            const okk = await ask(
              "Selisih besar, sudah benar?",
              isBlindFor(sel.bin)
                ? "Hasil hitung jauh berbeda dari data WMS. Hitung ulang dulu jika ragu."
                : "WMS " + fmt(sel.onhand) + ", Anda isi " + fmt(Number(v)) + " (selisih " + (dd > 0 ? "+" : "") + fmt(dd) + "). Salah ketik satu digit sering terjadi.",
              "Ya, simpan",
            );
            saveBusy = false;
            if (!okk) {
              $("qty").focus();
              return false;
            }
          }
        }
        const prevRec = counts[sel.bin];
        counts[sel.bin] = {
          itemMatch: match,
          actualItems: match === false ? al.map((x) => ({ item: x.item, qty: Number(x.qty) })) : [],
          actualItem: match ? sel.item : al.map((x) => x.item + " (" + x.qty + ")").join("; "),
          actualQty: Number(v),
          note: $("note").value,
          savedAt: nowIso(),
          by: curName(),
          systemQty: Number(sel.onhand),
          systemItem: sel.item,
        };
        undoStack.push({ bin: sel.bin, prev: prevRec, saved: counts[sel.bin] });
        if (undoStack.length > 30) undoStack.shift();
        if (!sv(K_C, counts)) {
          // jangan lanjut diam-diam: hasil ini hanya ada di layar
          $("err").textContent =
            "Gagal menyimpan ke perangkat (penyimpanan penuh atau diblokir). Data BELUM aman. Unduh cadangan dulu, lalu ketuk Simpan lagi.";
          $("errBk").hidden = false;
          updUndo();
          return false;
        }
        $("errBk").hidden = true;
        draftDrop(sel.bin);
        buzz(isProb(counts[sel.bin]) ? [70, 50, 70] : 40);
        tgBin(sel, counts[sel.bin]);
        const i = list.findIndex((x) => x.bin === sel.bin);
        const nextOk = (x) => !counts[x.bin] && !isClosed(x.area);
        const nx = list.slice(i + 1).find(nextOk) || list.find(nextOk);
        toast("Tersimpan: " + sel.bin);
        if (nx && nx.bin !== sel.bin) {
          renderBins();
          open(nx.bin, true);
        } else {
          close();
          toast("Semua bin di daftar ini sudah diperiksa");
        }
      }
      /* ---------- urungkan simpan terakhir ---------- */
      function undoTop() {
        // buang entri yang sudah tidak berlaku (data direset / diubah dari tempat lain)
        while (undoStack.length) {
          const e = undoStack[undoStack.length - 1];
          if (counts[e.bin] === e.saved) return e;
          undoStack.pop();
        }
        return null;
      }
      function updUndo() {
        const e = undoTop();
        $("undoBar").hidden = !e;
        $("shUndo").hidden = !e;
        if (e) {
          $("undoTxt").textContent = "Terakhir disimpan: " + e.bin;
          $("shUndo").title = "Urungkan simpan " + e.bin;
        }
      }
      async function undo() {
        const e = undoTop();
        if (!e) return;
        const x = DATA.find((d) => d.bin === e.bin);
        if (x && isClosed(x.area)) return toast("Area " + x.area + " sudah ditutup. Buka kembali dulu untuk mengurungkan.");
        const sheetOpen = !$("sheet").hidden;
        if (sheetOpen && shDirty && !(await ask("Urungkan simpan " + e.bin + "?", "Isian yang sedang diketik di bin ini akan hilang.", "Urungkan", true))) return;
        undoStack.pop();
        if (e.prev) counts[e.bin] = e.prev;
        else delete counts[e.bin];
        sv(K_C, counts);
        renderBins();
        metrics();
        if (sheetOpen) open(e.bin, true); // buka lagi bin itu supaya bisa dihitung ulang
        toast("Dibatalkan: " + e.bin + (e.prev ? " (kembali ke isian sebelumnya)" : " (kembali ke Belum)"));
      }
