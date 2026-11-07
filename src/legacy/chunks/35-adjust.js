/* File Adjust
   asal: index-fixd.html baris 3090-3225 */
      /* ---------- adjust ---------- */
      function adjustRows() {
        const code = {};
        DATA.forEach((x) => (code[x.item] = x.kode));
        Object.assign(code, codeFix);
        const rows = [],
          miss = new Set();
        DATA.forEach((x) => {
          const c = counts[x.bin];
          if (!c) return;
          const d = c.actualQty - x.onhand;
          if (d)
            rows.push({
              rak: x.bin,
              kode: x.kode,
              nama: x.item,
              qty: d,
              ket: c.itemMatch === false ? "SO selisih item WMS" : "SO selisih qty",
            });
          if (c.itemMatch === false)
            (c.actualItems || []).forEach((a) => {
              if (!a.qty) return;
              const k = code[a.item];
              if (!k) miss.add(a.item);
              rows.push({
                rak: x.bin,
                kode: k || "",
                nama: a.item,
                qty: a.qty,
                ket: "SO item lain ditemukan di bin",
              });
            });
        });
        kesAdj().forEach((x) => rows.push(x));
        dcAdj().forEach((x) => rows.push(x));
        return { rows, miss: [...miss] };
      }
      function renderAdj() {
        const { rows, miss } = adjustRows();
        const ready = rows.filter((r) => r.kode);
        const pl = rows.filter((r) => r.qty > 0).reduce((a, r) => a + r.qty, 0),
          mi = rows.filter((r) => r.qty < 0).reduce((a, r) => a + r.qty, 0);
        $("adjStats").innerHTML = [
          ["Baris adjust", ready.length, ""],
          ["Total tambah", "+" + fmt(pl), "var(--green)"],
          ["Total kurang", fmt(mi), "var(--red)"],
          ["Bin diperiksa", Object.keys(counts).length, ""],
        ]
          .map(
            ([l, v, c]) =>
              `<div class="stat"><small>${l}</small><strong style="${c ? "color:" + c : ""}">${v}</strong></div>`,
          )
          .join("");
        $("adjWarn").innerHTML = miss.length
          ? `<div class="warn" style="margin:0 0 10px">${miss.length} barang belum punya kode item. Isi kodenya agar masuk file.</div>` +
            miss
              .map(
                (m) =>
                  `<div class="card"><div class="m">${esc(m)}</div><input class="cfx" aria-label="Kode item untuk ${esc(m)}" data-n="${esc(m)}" inputmode="numeric" placeholder="Kode item (14 digit)"></div>`,
              )
              .join("")
          : "";
        document.querySelectorAll(".cfx").forEach(
          (e) =>
            (e.onchange = () => {
              const v = e.value.replace(/\D/g, "");
              if (v) {
                codeFix[e.dataset.n] = v;
                sv(K_F, codeFix);
                renderAdj();
                metrics();
              }
            }),
        );
        $("adjList").innerHTML = rows.length
          ? rows
              .map(
                (r) =>
                  `<div class="card"><div class="r"><b class="big">${esc(rakFmt(r.rak))}</b><b class="big ${r.qty < 0 ? "neg" : "pos"}">${r.qty > 0 ? "+" : ""}${fmt(r.qty)}</b></div><div class="m">${esc(r.nama)}</div><div class="m">${esc(r.kode || "kode belum ada")} · ${esc(r.ket)}</div></div>`,
              )
              .join("")
          : '<div class="empty">Belum ada selisih. Periksa bin dulu, atau semua bin sudah sesuai.</div>';
        $("btnAdj").disabled = $("btnAdjCopy").disabled = !ready.length;
      }
      const HDR = ["Tanggal", "Site", "Location", "Rak", "Kode Item", "Keterangan", "Qty", "Kode Kategori"];
      function outRows() {
        return adjustRows()
          .rows.filter((r) => r.kode)
          .map((r) => [
            new Date($("aTgl").value || Date.now()),
            Number($("aSite").value) || $("aSite").value,
            $("aLoc").value,
            rakFmt(r.rak),
            Number(r.kode),
            r.ket,
            r.qty,
            Number($("aKat").value) || $("aKat").value,
          ]);
      }
      $("btnAdj").onclick = () => {
        const R = outRows();
        if (!window.XLSX) {
          csvOut([HDR, ...R.map((r) => [r[0].toISOString().slice(0, 10), ...r.slice(1)])], "adjust_item.csv");
          toast("Excel tidak tersedia, diunduh sebagai CSV");
          return;
        }
        const ws = XLSX.utils.aoa_to_sheet([HDR, ...R], { cellDates: true });
        R.forEach((_, i) => {
          ws["A" + (i + 2)].z = "yyyy-mm-dd";
          ws["E" + (i + 2)].z = "0";
        });
        ws["!cols"] = [
          { wch: 12 },
          { wch: 8 },
          { wch: 10 },
          { wch: 10 },
          { wch: 16 },
          { wch: 32 },
          { wch: 8 },
          { wch: 14 },
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Area Rak");
        XLSX.writeFile(wb, "adjust_item.xlsx");
        toast("File adjust_item.xlsx diunduh");
      };
      $("btnAdjCopy").onclick = () => {
        const tx = [HDR, ...outRows().map((r) => [r[0].toISOString().slice(0, 10), ...r.slice(1)])]
          .map((r) => r.join("\t"))
          .join("\n");
        navigator.clipboard.writeText(tx).then(
          () => toast("Tersalin. Tempel di Excel."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
        );
      };
      ["aTgl", "aSite", "aKat", "aLoc"].forEach((i) => ($(i).onchange = () => {}));
