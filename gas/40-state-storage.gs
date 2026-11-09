// Penyimpanan state di sheet _STATE
// asal: Code-fix.gs baris 379-460
/* ===================== PENYIMPANAN STATE ===================== */

function ss_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sheet_(name) {
  var s = ss_().getSheetByName(name);
  if (s) return s;
  // migrasi: sheet lama 'Hasil_Periksa' dipakai ulang sebagai '02.Stock - Per Bin'
  if (name === SH.counts) {
    var old = ss_().getSheetByName('Hasil_Periksa');
    if (old) { old.setName(name); return old; }
  }
  return ss_().insertSheet(name);
}

function stateSheet_() {
  var s = ss_().getSheetByName(SH.state);
  if (!s) {
    s = ss_().insertSheet(SH.state);
    s.getRange('A:C').setNumberFormat('@');
    s.hideSheet();
  }
  return s;
}

var CORRUPT_ = [];   // kunci state yang gagal dibaca pada pembacaan terakhir (dilaporkan lewat warn_)

function readState_() {
  var s = stateSheet_();
  var last = s.getLastRow();
  var state = {};
  CORRUPT_ = [];
  if (last < 1) return state;
  var rows = s.getRange(1, 1, last, 3).getValues();
  var parts = {};
  rows.forEach(function (r) {
    if (r[0] === '' || r[0] === '_meta') return;
    (parts[r[0]] = parts[r[0]] || []).push([Number(r[1]), String(r[2])]);
  });
  Object.keys(parts).forEach(function (k) {
    var txt = parts[k].sort(function (a, b) { return a[0] - b[0]; }).map(function (p) { return p[1]; }).join('');
    try { state[k] = JSON.parse(txt); } catch (e) {
      CORRUPT_.push(k);   // jangan diam-diam: catat dan laporkan, supaya admin tahu sebelum data itu tertimpa
      Logger.log('Bagian state rusak, dilewati: ' + k + ' (' + txt.length + ' karakter)');
    }
  });
  return state;
}

// ringkasan masalah untuk klien: bagian state rusak dan sheet laporan yang gagal dibuat (kosong bila aman)
function warn_() {
  var w = [];
  if (CORRUPT_.length) w.push('Data rusak dibaca server: ' + CORRUPT_.join(', '));
  var re = PropertiesService.getScriptProperties().getProperty('RENDER_ERR');
  if (re) w.push('Sheet laporan gagal diperbarui: ' + re);
  return w.join(' | ');
}

function readMeta_() {
  var p = PropertiesService.getScriptProperties().getProperty('META');
  try { return p ? JSON.parse(p) : { rev: 0, at: null }; } catch (e) { return { rev: 0, at: null }; }
}

function commit_(state) {
  state = whitelist_(state);
  // simpan state
  var s = stateSheet_();
  var prevLast = s.getLastRow();
  var rows = [];
  Object.keys(state).forEach(function (k) {
    var str = JSON.stringify(state[k]);
    if (str === undefined) return;
    var n = 0;
    for (var i = 0; i < Math.max(str.length, 1); i += CHUNK) {
      rows.push([k, n++, str.substr(i, CHUNK)]);
    }
  });
  // tulis data BARU dulu, baru buang sisa baris lama: bila penulisan gagal, data lama tetap utuh (sebelumnya sheet dikosongkan lebih dulu)
  if (rows.length) {
    if (s.getMaxRows() < rows.length) s.insertRowsAfter(s.getMaxRows(), rows.length - s.getMaxRows());
    s.getRange('A:C').setNumberFormat('@');
    s.getRange(1, 1, rows.length, 3).setValues(rows);
  }
  if (prevLast > rows.length) s.getRange(rows.length + 1, 1, prevLast - rows.length, 3).clearContent();

  var props = PropertiesService.getScriptProperties();
  var h = hash_(JSON.stringify(state[K.master] || []));
  var masterChanged = props.getProperty('MASTER_HASH') !== h;
  var old = readMeta_();
  var meta = { rev: old.rev + 1, mrev: (old.mrev || 0) + (masterChanged ? 1 : 0), at: new Date().toISOString() };
  props.setProperty('META', JSON.stringify(meta));

  // sheet yang bisa dibaca manusia (Master_WMS besar: tulis ulang hanya jika berubah)
  try {
    renderSheets_(state, masterChanged);
    if (masterChanged) props.setProperty('MASTER_HASH', h);
  } catch (err) { Logger.log('renderSheets_: ' + err); }
  return meta;
}

