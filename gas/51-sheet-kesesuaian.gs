// Sheet 01.Kesesuaian Rak
// asal: Code-fix.gs baris 765-800
/* ---------- 01.Kesesuaian Rak: per bulan, per area (kondisi terakhir di bulan itu) ---------- */
function renderKes_(st) {
  var h = st[K.kesH] || {};
  var days = Object.keys(h).filter(function (t) {
    return h[t] && isObj_(h[t].ar) && Object.keys(h[t].ar).length;
  }).sort();
  var byMonth = {};
  days.forEach(function (t) {
    var mm = byMonth[t.slice(0, 7)] = byMonth[t.slice(0, 7)] || {};
    Object.keys(h[t].ar).forEach(function (a) {      // tanggal diurutkan naik, jadi hari terbaru yang tersisa
      mm[a] = { tgl: t, tot: Number(h[t].ar[a][0]) || 0, ok: Number(h[t].ar[a][1]) || 0 };
    });
  });
  var blocks = [], sum = [];
  Object.keys(byMonth).sort().forEach(function (m) {
    var mm = byMonth[m], rows = [], T = 0, O = 0;
    Object.keys(mm).sort(natCmp_).forEach(function (a) {
      var x = mm[a]; T += x.tot; O += x.ok;
      rows.push([a, x.tot, x.ok, pct_(x.ok, x.tot), 'W' + Math.ceil(Number(x.tgl.slice(8, 10)) / 7), dateCell_(x.tgl)]);
    });
    rows.push(['TOTAL', T, O, pct_(O, T), '', '']);
    blocks.push({ title: 'Kesesuaian RAK - ' + bulanLbl_(m),
      header: ['Area', 'Total Rak', 'Sesuai', 'Persentase', 'Week', 'Tgl Cek'], rows: rows,
      textCols: [1, 5], fmts: { 4: '0.00%', 6: 'yyyy-mm-dd' } });
    sum.push([bulanLbl_(m), T, O, pct_(O, T)]);
  });
  if (!blocks.length) {
    blocks.push({ title: 'Kesesuaian RAK', note: 'Belum ada data. Buka menu Cek Kesesuaian di aplikasi; laporan tersimpan otomatis dan muncul di sini.' });
  } else {
    blocks.unshift({ title: 'Kesesuaian RAK - Proses susun WMS vs Aktual',
      note: 'Sesuai = rak tanpa temuan (salah rak, stok minus, free stock salah, booking melebihi stok, stok kecil). Week = minggu dalam bulan saat dicek.' });
    blocks.push({ title: 'Rekap Bulanan', header: ['Bulan', 'Total Rak', 'Sesuai', 'Persentase'], rows: sum, textCols: [1], fmts: { 4: '0.00%' } });
  }
  writeBlocks_(SH.kes, blocks);
}

