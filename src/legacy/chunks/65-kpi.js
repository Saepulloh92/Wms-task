/* KPI Area
   asal: index-fixd.html baris 4576-4655 */
      /* ---------- KPI area ----------
         Tampilan KPI sudah React: src/views/KpiView.jsx. Logika murni: src/lib/kpi.js.
         Di bawah hanya "shim" supaya kode lama (Telegram, DC) tetap memakai nama yang sama. */
      const pc = WMSLib.pc;
      const fmtDur = WMSLib.fmtDur;
      const signed = WMSLib.signed;
      const kpiOf = (rows) => WMSLib.kpiOf(rows, counts, stat);

