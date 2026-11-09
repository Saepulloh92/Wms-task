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

// ---- Tata letak _STATE: tiap kunci punya blok baris sendiri (+ cadangan baris) sehingga hanya kunci yang
// berubah yang ditulis ulang (data master yang besar tidak ikut ditulis saat hanya hasil periksa yang berubah).
// Tata letak disimpan di Script Properties 'STATE_LAYOUT'. Tanpa tata letak (instalasi lama), tulis ulang penuh sekali.
var LAYOUT_PROP = 'STATE_LAYOUT';

function readLayout_() {
  var p = PropertiesService.getScriptProperties().getProperty(LAYOUT_PROP);
  try {
    var l = p ? JSON.parse(p) : null;
    return l && l.v === 1 && isObj_(l.keys) && l.rows >= 0 ? l : null;
  } catch (e) { return null; }
}

// hash kanonik per kunci (urutan kunci objek tidak berpengaruh)
function keyHashes_(state) {
  var h = {};
  Object.keys(state).forEach(function (k) {
    if (JSON.stringify(state[k]) !== undefined) h[k] = hash_(canon_(state[k]));
  });
  return h;
}

// true bila sheet _STATE masih sesuai tata letak (awal tiap blok berisi kuncinya). Bila admin mengosongkan/mengubah sheet
// secara manual, tata letak tidak boleh dipercaya: semua kunci ditulis ulang dari data yang ada.
function layoutIntact_(lay) {
  if (!lay) return false;
  var s = stateSheet_();
  if (s.getLastRow() > lay.rows) return false;
  var keys = Object.keys(lay.keys);
  if (!keys.length) return true;
  var col = s.getRange(1, 1, lay.rows, 1).getValues();
  return keys.every(function (k) {
    var e = lay.keys[k];
    return e && col[e.r - 1] && String(col[e.r - 1][0]) === k;
  });
}

// true bila isi sama persis dengan yang terakhir disimpan (tidak perlu menulis / menaikkan rev)
function sameAsStored_(hashes) {
  var lay = readLayout_();
  if (!lay || !layoutIntact_(lay)) return false;
  var ks = Object.keys(hashes);
  var stored = Object.keys(lay.keys).filter(function (k) { return CORRUPT_.indexOf(k) < 0; });
  if (ks.length !== stored.length) return false;
  return ks.every(function (k) { return lay.keys[k] && lay.keys[k].h === hashes[k]; });
}

function ensureRows_(s, n) {
  var have = s.getMaxRows();
  if (have < n) s.insertRowsAfter(have, n - have);
}

function blockRows_(key, str, cap) {
  var rows = [], n = 0;
  for (var i = 0; i < Math.max(str.length, 1); i += CHUNK) rows.push([key, n++, str.substr(i, CHUNK)]);
  while (rows.length < cap) rows.push(['', '', '']);
  return rows;
}

function capFor_(need) {
  return need + Math.max(2, Math.ceil(need * 0.5));
}

function writeState_(strs, hashes) {
  var props = PropertiesService.getScriptProperties();
  var s = stateSheet_();
  var keys = Object.keys(strs);
  var need = {};
  keys.forEach(function (k) { need[k] = Math.max(1, Math.ceil(strs[k].length / CHUNK)); });

  var lay = readLayout_();
  var inPlace = !!lay && layoutIntact_(lay);
  if (inPlace) {
    keys.forEach(function (k) {
      var e = lay.keys[k];
      if (e && need[k] > e.c) inPlace = false;     // blok kepenuhan: susun ulang
    });
  }

  if (!inPlace) {
    props.deleteProperty(LAYOUT_PROP);               // bila terhenti di tengah, tulis ulang penuh lagi pada commit berikutnya
    var prevLast = s.getLastRow();
    var rows = [], layK = {}, r = 1;
    keys.forEach(function (k) {
      var cap = capFor_(need[k]);
      layK[k] = { r: r, c: cap, h: hashes[k] };
      rows = rows.concat(blockRows_(k, strs[k], cap));
      r += cap;
    });
    // tulis data BARU dulu, baru kosongkan sisa lama: bila penulisan gagal, data lama tidak hilang
    if (rows.length) {
      ensureRows_(s, rows.length);
      s.getRange('A:C').setNumberFormat('@');
      s.getRange(1, 1, rows.length, 3).setValues(rows);
    }
    if (prevLast > rows.length) s.getRange(rows.length + 1, 1, prevLast - rows.length, 3).clearContent();
    lay = { v: 1, rows: r - 1, keys: layK };
    props.setProperty(LAYOUT_PROP, JSON.stringify(lay));
    return;
  }

  // sama-sama di tempat: hanya kunci yang hash-nya berubah
  var touched = false;
  keys.forEach(function (k) {
    var e = lay.keys[k];
    if (e && e.h === hashes[k]) return;
    if (!e) {                                          // kunci baru: tambahkan di akhir
      var cap = capFor_(need[k]);
      e = lay.keys[k] = { r: lay.rows + 1, c: cap, h: '' };
      lay.rows += cap;
    }
    ensureRows_(s, e.r + e.c - 1);
    s.getRange(e.r, 1, e.c, 3).setValues(blockRows_(k, strs[k], e.c));
    e.h = hashes[k];
    touched = true;
  });
  Object.keys(lay.keys).forEach(function (k) {         // kunci yang sudah tidak ada: kosongkan bloknya
    if (k in strs || CORRUPT_.indexOf(k) >= 0) return;   // kunci rusak dibiarkan agar admin bisa memeriksanya
    var e = lay.keys[k];
    s.getRange(e.r, 1, e.c, 3).clearContent();
    delete lay.keys[k];
    touched = true;
  });
  if (touched) props.setProperty(LAYOUT_PROP, JSON.stringify(lay));
}

// hashes (opsional) = hasil keyHashes_(state) bila pemanggil sudah menghitungnya
function commit_(state, hashes) {
  state = whitelist_(state);
  hashes = hashes || keyHashes_(state);
  var strs = {};
  Object.keys(hashes).forEach(function (k) { strs[k] = JSON.stringify(state[k]); });
  var lay0 = readLayout_();
  var masterKeyChanged = !lay0 || !lay0.keys[K.master] || lay0.keys[K.master].h !== hashes[K.master];
  writeState_(strs, hashes);

  var props = PropertiesService.getScriptProperties();
  var masterChanged = false, h = '';
  if (masterKeyChanged) {                              // hitung hash master hanya bila mungkin berubah
    h = hash_(JSON.stringify(state[K.master] || []));
    masterChanged = props.getProperty('MASTER_HASH') !== h;
  }
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
