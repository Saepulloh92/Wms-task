// Sheet Rekap Clearing
// asal: Code-fix.gs baris 851-910
/* ---------- Rekap Clearing (REKAP PENERIMAAN F-WLA-17) ---------- */
// baris riwayat dari aplikasi: [voucher, shift, lori, jam, sms, qtyWMS, qtyCounthings, selisih, status, namaItem, rak, selesai, picTimbang, group]
function clrKet_(label, diff) {
  switch (label) {
    case 'Belum dihitung': return 'TDK ADA FOTO';
    case 'Tidak ada di laporan': return 'TIDAK ADA DI LAPORAN';
    case 'Dobel hitung': return 'FOTO DOBEL, QTY BEDA';
    case 'SMS beda': return 'SMS BEDA';
    case 'Selisih qty': return Number(diff) > 0 ? 'QTY COUNTHINGS LEBIH' : 'QTY COUNTHINGS KURANG';
    default: return '';
  }
}
function clrSums_(rows) {
  var w = 0, c = 0, ok = 0;
  rows.forEach(function (r) {
    w += num_(r[5]) || 0; c += num_(r[6]) || 0;
    if (r[8] === 'Cocok') ok++;
  });
  return { w: w, c: c, ok: ok, bad: rows.length - ok };
}
function renderClr_(st) {
  var h = st[K.clrH] || {};
  var days = Object.keys(h).filter(function (t) { return h[t]; }).sort().reverse();
  if (!days.length) {
    return writeBlocks_(SH.clr, [{ title: 'REKAP PENERIMAAN F-WLA-17',
      note: 'Belum ada data. Buka menu Clearing di aplikasi, lalu simpan hasilnya; laporan muncul di sini.' }]);
  }
  var t0 = days[0], e = h[t0], rows = Array.isArray(e.rows) ? e.rows.slice() : [], S = clrSums_(rows), sh = {};
  rows.forEach(function (r) { if (r[1]) sh[String(r[1]).replace('Shift ', '')] = 1; });
  var selisih = S.c - S.w;
  var blocks = [
    { title: 'CLEARING REKAP PENERIMAAN PRODUKSI - RAK WAREHOUSE',
      header: ['Tanggal', 'Shift', 'Voucher', 'Qty WMS', 'Qty Counthings', 'Selisih', 'Status'],
      rows: [[dmy_(t0), Object.keys(sh).sort().join(', '), rows.length, S.w, S.c, selisih, selisih === 0 && !S.bad ? 'OK' : 'Perlu dicek']],
      textCols: [1, 2, 7] }
  ];
  rows.sort(function (a, b) { return natCmp_(b[0], a[0]); });     // voucher terbaru di atas, seperti referensi
  var no = 0;
  blocks.push({ title: 'Detail per Voucher',
    header: ['No.', 'No Voucher', 'PIC Timbang', 'Group', 'Shift', 'No Lori', 'Nama Item', 'Rak', 'Qty WMS', 'Qty Counthings', 'Selisih', 'Status', 'Keterangan Selisih', 'Selesai'],
    rows: rows.map(function (r) {
      return [++no, String(r[0]), r[12] || '', r[13] || '', String(r[1] || '').replace('Shift ', ''), r[2] || '', r[9] || '', r[10] || '',
        num_(r[5]) == null ? '' : num_(r[5]), num_(r[6]) == null ? '' : num_(r[6]), num_(r[7]) == null ? '' : num_(r[7]),
        r[8] || '', clrKet_(r[8], r[7]), r[11] ? 'Ya' : ''];
    }), textCols: [2, 3, 4, 5, 6, 7, 8, 12, 13, 14] });
  var k = 0;
  blocks.push({ title: 'Keterangan Selisih per Tanggal per Shift',
    header: ['No.', 'No Voucher', 'Shift', 'Keterangan', 'Qty Selisih', 'Selesai'],
    rows: rows.filter(function (r) { return r[8] !== 'Cocok'; }).map(function (r) {
      return [++k, String(r[0]), String(r[1] || '').replace('Shift ', ''), clrKet_(r[8], r[7]), num_(r[7]) == null ? '' : num_(r[7]), r[11] ? 'Ya' : ''];
    }), textCols: [2, 3, 4, 6] });
  blocks.push({ title: 'Riwayat per Tanggal',
    header: ['Tanggal', 'Voucher', 'Cocok', 'Perlu Dicek', 'Qty WMS', 'Qty Counthings', 'Selisih', 'Disimpan oleh'],
    rows: days.map(function (t) {
      var r2 = Array.isArray(h[t].rows) ? h[t].rows : [], q = clrSums_(r2);
      return [dmy_(t), r2.length, q.ok, q.bad, q.w, q.c, q.c - q.w, h[t].by || ''];
    }), textCols: [1, 8] });
  writeBlocks_(SH.clr, blocks);
}

