// Sheet 04.Proses Muat
// asal: Code-fix.gs baris 801-850
/* ---------- 04.Proses Muat ---------- */
function hm_(t) {                    // 'H:MM' -> menit, '' bila tidak valid
  var m = String(t || '').match(/^(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}
function renderMuat_(st) {
  var h = st[K.muatH] || {};
  var days = Object.keys(h).filter(function (t) { return h[t]; }).sort().reverse();   // terbaru di atas
  var blocks = [];
  if (!days.length) {
    blocks.push({ title: 'Proses Muat', note: 'Belum ada data. Upload file di menu Laporan Muat lalu simpan; laporan muncul di sini.' });
    return writeBlocks_(SH.muat, blocks);
  }
  blocks.push({ title: 'Rekap Proses Muat per Tanggal',
    header: ['Tanggal', 'Total Mobil/SPM', 'Diproses WMS', 'Tidak Diproses', 'Mobil Masuk', 'Item', 'Item OK', 'Item Copy Rekomendasi',
      '% Item Copy Rekom.', 'SPM Copy Rekom.', '% SPM Copy Rekom.', 'Dilaporkan oleh'],
    rows: days.map(function (t) {
      var e = h[t], ni = Number(e.ni) || 0, ci = Number(e.ci) || 0, dp = Number(e.dp) || 0, cs = Number(e.cpS) || 0;
      return [dmy_(t), Number(e.total) || 0, dp, Number(e.tdkN) || 0, Number(e.masuk) || 0, ni, ni - ci, ci, pct_(ci, ni), cs, pct_(cs, dp), e.by || ''];
    }), textCols: [1, 12], fmts: { 9: '0.0%', 11: '0.0%' } });

  // per PIC, tanggal terbaru
  var last = days[0], rowsL = Array.isArray(h[last].rows) ? h[last].rows : [], pic = {};
  rowsL.forEach(function (r) {
    var p = pic[r[2]] = pic[r[2]] || { spm: 0, ok: 0, cp: 0 };
    p.spm++; p.ok += (Number(r[3]) || 0) - (Number(r[4]) || 0); p.cp += Number(r[4]) || 0;
  });
  var pRows = Object.keys(pic).sort(function (a, b) { return pic[b].spm - pic[a].spm || a.localeCompare(b); }).map(function (n) {
    var p = pic[n]; return [n, p.spm, p.ok, p.cp, pct_(p.cp, p.ok + p.cp)];
  });
  if (pRows.length) blocks.push({ title: 'PIC Muat Melakukan Proses WMS - ' + dmy_(last),
    header: ['PIC Muat', 'SPM', 'Item OK', 'Item Copy Rekomendasi', '% Copy Rekom.'], rows: pRows, textCols: [1], fmts: { 5: '0.0%' } });

  // detail per SPM
  var det = [];
  days.forEach(function (t) {
    (Array.isArray(h[t].rows) ? h[t].rows : []).forEach(function (r) {
      var n = Number(r[3]) || 0, cp = Number(r[4]) || 0, qs = num_(r[6]), qm = num_(r[7]), a = hm_(r[8]), b = hm_(r[9]);
      det.push([dmy_(t), String(r[0]), r[5] || '', r[1] || '', r[2] || '', cp > 0 ? 'COPY REKOMENDASI' : 'OK', n, n - cp, cp,
        qs == null ? '' : qs, qm == null ? '' : qm, qs == null || qm == null ? '' : qs - qm, r[8] || '', r[9] || '',
        a == null || b == null ? '' : (b >= a ? b - a : b + 1440 - a), r[10] || '']);
    });
  });
  blocks.push({ title: 'Detail per SPM',
    header: ['Tanggal', 'No SPM', 'Ship To', 'Nopol', 'PIC Muat', 'Keterangan', 'Item', 'Item OK', 'Item Copy Rekomendasi', 'Qty SPM', 'Qty Muat', 'Selisih',
      'Mulai Muat', 'Selesai Muat', 'Durasi (menit)', 'PIC Check'],
    rows: det, textCols: [1, 2, 3, 4, 5, 6, 13, 14, 16] });
  writeBlocks_(SH.muat, blocks);
}

