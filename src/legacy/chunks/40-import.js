/* Impor data WMS (CSV/XLSX)
   asal: index-fixd.html baris 3226-3392 */
      /* ---------- impor ---------- */
      function parseCSV(t) {
        const rows = [];
        let row = [],
          f = "",
          q = false;
        for (let i = 0; i < t.length; i++) {
          const ch = t[i],
            n = t[i + 1];
          if (ch === '"' && q && n === '"') {
            f += '"';
            i++;
          } else if (ch === '"') q = !q;
          else if (ch === "," && !q) {
            row.push(f);
            f = "";
          } else if ((ch === "\n" || ch === "\r") && !q) {
            if (ch === "\r" && n === "\n") i++;
            row.push(f);
            if (row.some((v) => v.trim())) rows.push(row);
            row = [];
            f = "";
          } else f += ch;
        }
        row.push(f);
        if (row.some((v) => v.trim())) rows.push(row);
        return rows;
      }
      const nrm = (h) =>
        String(h)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
      const toNum = (v) =>
        typeof v === "number" ? v : Number(String(v).replace(/\./g, "").replace(",", ".")) || 0;
      async function ingest(rows) {
        const hi = rows.findIndex((r) => {
          const h = r.map(nrm);
          return (h.includes("bin") || h.includes("rak")) && (h.includes("kode") || h.includes("kodeitem") || h.includes("noitem"));
        });
        if (hi < 0) throw new Error("Header tidak ditemukan. Perlu kolom Rak/Bin dan Kode Item.");
        const H = rows[hi].map(nrm),
          ix = (...n) => H.findIndex((h) => n.includes(h)),
          g = (r, ...n) => {
            const i = ix(...n);
            return i < 0 ? "" : r[i];
          };
        const need = {
          bin: ix("bin", "rak"),
          kode: ix("kode", "kodeitem", "itemcode", "noitem", "nomoritem"),
          item: ix("item", "namaitem", "namabarang"),
          onhand: ix("onhand", "qtywms", "stokwms", "qty"),
        };
        if (Object.values(need).some((v) => v < 0))
          throw new Error("Kolom wajib: Rak/Bin, Kode Item, Nama Item, Onhand.");
        const p = rows
          .slice(hi + 1)
          .map((r) => {
            const bin = String(r[need.bin]).trim();
            return {
              lokasi: g(r, "lokasi", "warehouse") || "WMS",
              area: String(g(r, "area") || bin.split("-")[0]).trim(),
              bin,
              kode: String(r[need.kode]).trim(),
              item: String(r[need.item]).trim(),
              onhand: toNum(r[need.onhand]),
              freeStock: toNum(g(r, "freestock")),
              bookingSusun: toNum(g(r, "bookingsusun")),
              bookingMuat: toNum(g(r, "bookingmuat")),
              aging: toNum(g(r, "aging")),
              sinyal: g(r, "sinyal") || "",
              tumpak: String(g(r, "notumpak", "tumpak", "nomortumpak") || "").trim(),
              kelas: String(g(r, "kelaspipa", "kelas") || "").trim().toUpperCase(),
              status: g(r, "status") || "Active",
            };
          })
          .filter((x) => x.bin && x.item);
        if (!p.length) throw new Error("Tidak ada baris data valid.");
        if (
          !(await ask(
            "Ganti data WMS?",
            `${p.length} bin akan dimuat. Hasil pemeriksaan lama dihapus.`,
            "Ganti data",
            true,
          ))
        )
          return;
        DATA = p;
        // Kelas Pipa dari Excel -> kelas per kode item (dipakai urutan prioritas A, B, C di menu Aging Stock)
        (() => {
          const nc = { ...agingCls },
            at = new Date().toISOString();
          let n = 0;
          p.forEach((x) => {
            if (x.kode && ["A", "B", "C", "PTM"].includes(x.kelas) && !(nc[x.kode] && nc[x.kode].c === x.kelas)) {
              nc[x.kode] = { c: x.kelas, at };
              n++;
            }
          });
          if (n) {
            agingCls = nc;
            sv(K_AGK, agingCls);
          }
        })();
        counts = {};
        closed = {};
        sv(K_X, closed);
        tasks = {};
        sv(K_T, tasks);
        dc = {};
        sv(K_D, dc);
        dcPick = {};
        sv(K_DP, dcPick);
        codeFix = {};
        sv(K_M, DATA);
        sv(K_C, counts);
        clearDrafts();
        sv(K_F, codeFix);
        initAll();
        toast(failed.has(K_M) ? "Data dimuat tetapi TIDAK tersimpan di perangkat (penyimpanan penuh). Unduh cadangan." : p.length + " bin dimuat");
        go("so");
      }
      $("btnImp").onclick = () => {
        const f = $("file").files[0];
        if (!f) {
          toast("Pilih file Excel atau CSV terlebih dahulu.");
          return;
        }
        const r = new FileReader(),
          x = /\.xlsx?$/i.test(f.name);
        r.onload = async () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV lalu impor.");
              const wb = XLSX.read(r.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" });
            } else rows = parseCSV(String(r.result).replace(/^﻿/, ""));
            await ingest(rows);
          } catch (e) {
            toast("Gagal impor: " + e.message);
          }
        };
        x ? r.readAsArrayBuffer(f) : r.readAsText(f);
      };
      $("btnClear").onclick = async () => {
        if (
          await ask(
            "Hapus semua hasil?",
            "Semua hasil pemeriksaan di perangkat ini dihapus. Data WMS tetap.",
            "Hapus",
            true,
          )
        ) {
          counts = {};
        closed = {};
        sv(K_X, closed);
        codeFix = {};
          sv(K_C, counts);
          clearDrafts();
          sv(K_F, codeFix);
          initAll();
          toast("Hasil dihapus");
        }
      };
