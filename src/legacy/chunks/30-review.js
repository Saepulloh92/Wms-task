/* Review Supervisor
   asal: index-fixd.html baris 3000-3089 */
      /* ---------- review ---------- */
      function renderCheck() {
        const done = DATA.filter((x) => counts[x.bin]),
          prob = done.filter((x) => stat(x) === "bad"),
          ok = done.filter((x) => stat(x) === "ok");
        $("stats").innerHTML = [
          ["Diperiksa", done.length + "/" + DATA.length, ""],
          ["Sesuai", ok.length, "var(--green)"],
          ["Perlu review", prob.length, "var(--amber)"],
          ["Belum", DATA.length - done.length, ""],
        ]
          .map(
            ([l, v, c]) =>
              `<div class="stat"><small>${l}</small><strong style="${c ? "color:" + c : ""}">${v}</strong></div>`,
          )
          .join("");
        $("chipsC").innerHTML = chipsHtml(cf, [
          ["problem", "Perlu review", prob.length],
          ["ok", "Sesuai", ok.length],
          ["todo", "Belum", DATA.length - done.length],
          ["all", "Semua", DATA.length],
        ]);
        const rows = DATA.filter(
          (x) => cf === "all" || (cf === "problem" && stat(x) === "bad") || stat(x) === cf,
        );
        $("checkList").innerHTML = rows.length
          ? rows
              .map((x) => {
                const c = counts[x.bin],
                  s = stat(x),
                  d = c ? c.actualQty - x.onhand : 0;
                return `<div class="card"><div class="r"><b class="big">${esc(x.bin)}</b>${s === "todo" ? '<span class="pill">Belum</span>' : s === "ok" ? '<span class="pill green">Sesuai</span>' : `<span class="pill ${c.itemMatch === false ? "red" : "amber"}">${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>`}</div><div class="m">${szHtml(x.item)}</div>${c ? `<div class="r"><span class="m">WMS ${fmt(x.onhand)} · Fisik ${fmt(c.actualQty)}</span><b class="${d < 0 ? "neg" : d > 0 ? "pos" : ""}">${d > 0 ? "+" : ""}${fmt(d)}</b></div>${c.itemMatch === false ? `<div class="m">Ditemukan: ${esc(c.actualItem)}</div>` : ""}${c.note ? `<div class="m">Catatan: ${esc(c.note)}</div>` : ""}<button class="btn sec sm" data-b="${esc(x.bin)}">Periksa ulang</button>` : `<button class="btn sec sm" data-b="${esc(x.bin)}">Periksa sekarang</button>`}</div>`;
              })
              .join("")
          : '<div class="empty">Tidak ada data untuk filter ini.</div>';
      }
      function csvOut(rows, name) {
        const csv = rows
          .map((r) => r.map((v) => '"' + String(v ?? "").replace(/"/g, '""') + '"').join(","))
          .join("\r\n");
        const b = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" }),
          u = URL.createObjectURL(b),
          a = document.createElement("a");
        a.href = u;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(u), 1000);
      }
      $("btnCsv").onclick = () => {
        csvOut(
          [
            [
              "Lokasi",
              "Area",
              "Bin",
              "Kode WMS",
              "Barang WMS",
              "Barang Sesuai",
              "Barang Aktual",
              "Qty WMS",
              "Qty Fisik",
              "Selisih Qty",
              "Status",
              "Catatan",
              "Waktu",
            ],
            ...DATA.map((x) => {
              const c = counts[x.bin];
              return [
                x.lokasi,
                x.area,
                x.bin,
                x.kode,
                x.item,
                c ? (c.itemMatch ? "Ya" : "Tidak") : "",
                c?.actualItem || "",
                x.onhand,
                c ? c.actualQty : "",
                c ? c.actualQty - x.onhand : "",
                c ? (isProb(c) ? "Perlu Review" : "Sesuai") : "Belum Diperiksa",
                c?.note || "",
                c?.savedAt || "",
              ];
            }),
          ],
          "Rekap_Pemeriksaan_SO_Per_Bin.csv",
        );
      };
