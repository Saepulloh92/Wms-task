// Pembuat sheet laporan: util tanggal, Master_WMS, 02/03/05, rebuildSheets()
// asal: Code-fix.gs baris 461-764
/* ===================== SHEET UNTUK DIBACA ===================== */

function fmtTime_(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return Utilities.formatDate(d, ss_().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

// textCols = nomor kolom (mulai 1) yang dipaksa berformat teks, supaya kode barang tidak
// berubah jadi angka ilmiah dan isian berawalan "=" tidak dibaca sebagai rumus.
// Kosong/null = semua kolom teks.
var SHASH_ = null;   // hash isi tiap sheet terakhir ditulis (satu properti, dimuat sekali per render)

function writeTable_(name, header, rows, textCols, fmts) {
  var h = hash_(JSON.stringify([header, rows, fmts || null]));
  if (SHASH_ && SHASH_[name] === h) return;   // tidak berubah: tidak perlu menyentuh sheet sama sekali
  var s = sheet_(name);
  s.clear();                                   // isi + format lama dibuang, supaya format kolom tidak "nyangkut"
  var all = [header].concat(rows);
  var cols = textCols || header.map(function (_, i) { return i + 1; });
  cols.forEach(function (c) {
    s.getRange(1, c, all.length, 1).setNumberFormat('@');
  });
  Object.keys(fmts || {}).forEach(function (c) {
    s.getRange(2, Number(c), Math.max(rows.length, 1), 1).setNumberFormat(fmts[c]);
  });
  s.getRange(1, 1, all.length, header.length).setValues(all);
  s.getRange(1, 1, 1, header.length).setFontWeight('bold').setBackground('#e8eef7');
  s.setFrozenRows(1);
  if (SHASH_) SHASH_[name] = h;
}

// beberapa tabel dalam satu sheet (seperti 03.Weekly dan 05.Monitoring JIS di referensi)
// blocks = [{ title, note, header, rows, textCols, fmts }]
function writeBlocks_(name, blocks) {
  var h = hash_(JSON.stringify(blocks));
  if (SHASH_ && SHASH_[name] === h) return;
  var s = sheet_(name);
  s.clear();
  var r = 1;
  blocks.forEach(function (b) {
    if (b.title) { s.getRange(r, 1).setValue(b.title).setFontWeight('bold').setFontSize(12); r++; }
    if (b.note) { s.getRange(r, 1).setValue(b.note).setFontStyle('italic').setFontColor('#555555'); r++; }
    if (!b.header) { if (b.title || b.note) r++; return; }   // blok judul/catatan saja
    var nc = b.header.length, all = [b.header].concat(b.rows);
    (b.textCols || []).forEach(function (c) { s.getRange(r, c, all.length, 1).setNumberFormat('@'); });
    Object.keys(b.fmts || {}).forEach(function (c) {
      s.getRange(r + 1, Number(c), Math.max(b.rows.length, 1), 1).setNumberFormat(b.fmts[c]);
    });
    s.getRange(r, 1, all.length, nc).setValues(all);
    s.getRange(r, 1, 1, nc).setFontWeight('bold').setBackground('#e8eef7');
    r += all.length + 1;
  });
  if (SHASH_) SHASH_[name] = h;
}

/* ---------- util tanggal & hitung (zona waktu spreadsheet) ---------- */

var BLN_ = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
var BLN_FULL_ = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var DAY_MS_ = 86400000;

function ymd_(v) {                 // 'yyyy-MM-dd' menurut zona waktu spreadsheet; '' bila kosong/tidak valid
  if (!v) return '';
  var d = new Date(v);
  if (isNaN(d.getTime())) return '';
  return Utilities.formatDate(d, ss_().getSpreadsheetTimeZone(), 'yyyy-MM-dd');
}
function utcMs_(s) { var p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
function isoOf_(ms) { return new Date(ms).toISOString().slice(0, 10); }
function mondayOf_(s) {            // tanggal Senin dari minggu yang memuat s
  var ms = utcMs_(s);
  return isoOf_(ms - ((new Date(ms).getUTCDay() + 6) % 7) * DAY_MS_);
}
function isoWeek_(mon) {           // nomor minggu ISO dari tanggal Senin
  var thu = utcMs_(mon) + 3 * DAY_MS_;
  var y = new Date(thu).getUTCFullYear();
  return Math.floor((thu - Date.UTC(y, 0, 1)) / DAY_MS_ / 7) + 1;
}
function weekLabel_(mon) {         // contoh: "W45 · 2 Nov – 8 Nov"
  var a = new Date(utcMs_(mon)), b = new Date(utcMs_(mon) + 6 * DAY_MS_);
  return 'W' + isoWeek_(mon) + ' · ' + a.getUTCDate() + ' ' + BLN_[a.getUTCMonth()] + ' – ' + b.getUTCDate() + ' ' + BLN_[b.getUTCMonth()];
}
function dateCell_(s) {            // tanggal sungguhan (bukan teks), supaya bisa diurutkan / dipakai rumus
  return s ? Utilities.parseDate(s, ss_().getSpreadsheetTimeZone(), 'yyyy-MM-dd') : '';
}
function natCmp_(a, b) {           // urut alami: B1-2-A < B1-10-A
  var x = String(a).match(/\d+|\D+/g) || [], y = String(b).match(/\d+|\D+/g) || [];
  for (var i = 0; i < Math.min(x.length, y.length); i++) {
    if (x[i] === y[i]) continue;
    if (/^\d/.test(x[i]) && /^\d/.test(y[i])) { var d = Number(x[i]) - Number(y[i]); if (d) return d; continue; }
    return x[i] < y[i] ? -1 : 1;
  }
  return x.length - y.length;
}
function bulanLbl_(ym) { return BLN_FULL_[Number(ym.slice(5, 7)) - 1] + ' ' + ym.slice(0, 4); }   // '2026-11' -> 'November 2026'
function dmy_(t) { return t ? t.slice(8, 10) + '-' + t.slice(5, 7) + '-' + t.slice(0, 4) : ''; }  // '2026-11-07' -> '07-11-2026'
function num_(v) { return v === '' || v == null || isNaN(Number(v)) ? null : Number(v); }
function pct_(n, d) { return d > 0 ? n / d : '-'; }
function isJis_(item) { return /\bJIS\b/i.test(String(item || '')); }

// satu baris per bin (master + hasil periksa yang bin-nya sudah tidak ada di master)
function binEntries_(master, counts) {
  var seen = {}, out = [];
  function mk(area, bin, kode, item, onhand, c) {
    var e = { area: area || '', bin: bin, kode: String(kode || ''), item: item || '', onhand: onhand, c: c || null,
      checked: false, actual: null, diff: null, abs: null, status: 'Belum dicek', date: '', mon: '' };
    if (c && c.actualQty !== '' && c.actualQty != null && !isNaN(Number(c.actualQty))) {
      e.checked = true;
      e.actual = Number(c.actualQty);
      e.diff = e.actual - onhand;
      e.abs = Math.abs(e.diff);
      e.status = e.diff === 0 ? 'Sesuai' : 'Selisih';
      e.date = ymd_(c.savedAt);
      e.mon = e.date ? mondayOf_(e.date) : '';
    }
    return e;
  }
  master.forEach(function (x) {
    seen[x.bin] = true;
    out.push(mk(x.area, x.bin, x.kode, x.item, Number(x.onhand) || 0, counts[x.bin]));
  });
  Object.keys(counts).forEach(function (bin) {
    if (seen[bin]) return;
    var c = counts[bin] || {};
    out.push(mk('', bin, '', c.systemItem, Number(c.systemQty) || 0, c));
  });
  out.sort(function (a, b) {
    if (!a.area !== !b.area) return a.area ? -1 : 1;     // bin tanpa master di paling bawah
    return natCmp_(a.area, b.area) || natCmp_(a.bin, b.bin);
  });
  return out;
}

function sumStats_(list) {         // ringkasan angka dari daftar entry yang sudah dicek
  var s = { n: 0, ok: 0, bad: 0, onh: 0, act: 0, net: 0, abs: 0, plus: 0, minus: 0 };
  list.forEach(function (e) {
    s.n++; if (e.diff === 0) s.ok++; else s.bad++;
    s.onh += e.onhand; s.act += e.actual; s.net += e.diff; s.abs += e.abs;
    if (e.diff > 0) s.plus += e.diff; else if (e.diff < 0) s.minus += e.diff;
  });
  return s;
}

function renderSheets_(st, withMaster, force) {
  var props = PropertiesService.getScriptProperties();
  try { SHASH_ = force ? {} : JSON.parse(props.getProperty('SHEET_HASH') || '{}'); } catch (e) { SHASH_ = {}; }
  try {
    renderSheetsBody_(st, withMaster);
  } finally {
    props.setProperty('SHEET_HASH', JSON.stringify(SHASH_));
    SHASH_ = null;
  }
}

function renderSheetsBody_(st, withMaster) {
  var master = Array.isArray(st[K.master]) ? st[K.master] : [];
  var users = Array.isArray(st[K.users]) ? st[K.users] : [];
  var nameOf = {};
  users.forEach(function (u) { nameOf[u.id] = u.name; });

  if (withMaster) writeTable_(SH.master,
    ['Lokasi', 'Area', 'Bin', 'Status', 'Kode', 'Aging', 'Sinyal', 'Item', 'On Hand', 'Booking Susun', 'Booking Muat', 'Free Stock'],
    master.map(function (x) {
      return [x.lokasi || '', x.area || '', x.bin || '', x.status || '', String(x.kode || ''), x.aging == null ? '' : x.aging,
        x.sinyal || '', x.item || '', x.onhand || 0, x.bookingSusun || 0, x.bookingMuat || 0, x.freeStock || 0];
    }), [1, 2, 3, 4, 5, 7, 8]);

  var counts = st[K.counts] || {};
  var ents = binEntries_(master, counts);

  // ---- 02.Stock - Per Bin: semua bin (yang belum dicek berstatus "Belum dicek"), seperti referensi ----
  writeTable_(SH.counts,
    ['Area', 'Rak', 'Kode Item', 'Nama Item', 'Onhand', 'Aktual', 'Tgl Cek', 'Selisih', 'Status', 'Minggu (Senin)', 'Selisih Absolut',
      'Barang Sesuai', 'Barang Aktual', 'Catatan', 'Petugas', 'Waktu'],
    ents.map(function (e) {
      var c = e.c || {};
      return [e.area, e.bin, e.kode, e.item, e.onhand, e.checked ? e.actual : '', dateCell_(e.date),
        e.checked ? e.diff : '', e.status, dateCell_(e.mon), e.checked ? e.abs : '',
        e.checked ? (c.itemMatch === true ? 'Ya' : 'Tidak') : '', c.actualItem || '', c.note || '', c.by || '', fmtTime_(c.savedAt)];
    }),
    [1, 2, 3, 4, 9, 12, 13, 14, 15, 16], { 7: 'yyyy-mm-dd', 10: 'd mmm yyyy' });

  // ---- 03.Weekly-Stock Bin ----
  var areas = {};
  ents.forEach(function (e) { if (e.area) (areas[e.area] = areas[e.area] || []).push(e); });
  var areaRows = Object.keys(areas).sort(natCmp_).map(function (a) {
    var all = areas[a], chk = all.filter(function (e) { return e.checked; }), s = sumStats_(chk);
    return [a, all.length, s.n, all.length - s.n, pct_(s.n, all.length), s.ok, s.bad, pct_(s.ok, s.n), s.net];
  });
  var allChk = ents.filter(function (e) { return e.area && e.checked; }), tot = sumStats_(allChk), totBin = 0;
  areaRows.forEach(function (r) { totBin += r[1]; });
  areaRows.push(['TOTAL', totBin, tot.n, totBin - tot.n, pct_(tot.n, totBin), tot.ok, tot.bad, pct_(tot.ok, tot.n), tot.net]);

  var byWeek = {};
  allChk.forEach(function (e) { if (e.mon) (byWeek[e.mon] = byWeek[e.mon] || []).push(e); });
  var curMon = mondayOf_(ymd_(new Date())), wk = Object.keys(byWeek).concat([curMon]).sort();
  var wRows = [];
  for (var ms = utcMs_(wk[0]); ms <= utcMs_(wk[wk.length - 1]); ms += 7 * DAY_MS_) {
    var mon = isoOf_(ms), s2 = sumStats_(byWeek[mon] || []);
    wRows.push([dateCell_(mon), weekLabel_(mon), s2.n, s2.bad, pct_(s2.bad, s2.n), s2.onh, s2.act, s2.net, s2.abs, pct_(s2.abs, s2.onh), s2.plus, s2.minus]);
  }
  writeBlocks_(SH.weekly, [
    { title: 'WEEKLY MONITORING STOCK PER BIN',
      note: 'Dihitung otomatis dari sheet "' + SH.counts + '". Status: Sesuai bila Aktual = Onhand, Selisih bila beda, Belum dicek bila belum diperiksa.' },
    { title: 'A. Progres & akurasi per area (kumulatif)',
      header: ['Area', 'Total Bin', 'Sudah Dicek', 'Belum Dicek', '% Progres', 'Bin Sesuai', 'Bin Selisih', '% Akurasi', 'Total Selisih Qty'],
      rows: areaRows, textCols: [1], fmts: { 5: '0.0%', 8: '0.0%' } },
    { title: 'B. Summary deviasi stok per minggu',
      note: 'Selisih = Aktual - Onhand (minus = fisik kurang dari sistem). % Deviasi = Selisih Absolut / Onhand bin yang dicek. Dihitung dari Tgl Cek.',
      header: ['Mulai (Senin)', 'Minggu', 'Bin Dicek', 'Bin Selisih', '% Bin Selisih', 'Onhand (bin dicek)', 'Aktual', 'Selisih Net', 'Selisih Absolut', '% Deviasi', 'Qty Lebih (+)', 'Qty Kurang (-)'],
      rows: wRows, textCols: [2], fmts: { 1: 'd mmm yyyy', 5: '0.0%', 10: '0.0%' } }
  ]);

  // ---- 05.Monitoring JIS: bin item JIS yang sudah dicek, dikelompokkan per bulan & minggu ----
  var jis = allChk.filter(function (e) { return isJis_(e.item) && e.date; })
    .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : natCmp_(a.bin, b.bin); });
  var grp = {}, order = [];
  jis.forEach(function (e) {
    var w = Math.ceil(Number(e.date.slice(8, 10)) / 7), key = e.date.slice(0, 7) + '|' + w;
    if (!grp[key]) { grp[key] = []; order.push(key); }
    grp[key].push(e); e.jm = e.date.slice(0, 7); e.jw = w;
  });
  var jSum = order.map(function (key) {
    var s = sumStats_(grp[key]), p = key.split('|');
    return [bulanLbl_(p[0]), 'W' + p[1], s.n, s.ok, s.bad, pct_(s.ok, s.n), s.onh, s.act, s.net, s.abs, pct_(s.abs, s.onh),
      BLN_[Number(p[0].slice(5, 7)) - 1] + ' W' + p[1]];
  });
  var jDet = jis.map(function (e) {
    return [bulanLbl_(e.jm), 'W' + e.jw, e.area, e.bin, e.kode, e.item, e.onhand, e.actual, e.diff, e.status, dateCell_(e.date)];
  });
  writeBlocks_(SH.jis, [
    { title: 'Summary Monitoring JIS per Minggu',
      note: 'Hanya bin berisi item JIS yang sudah diperiksa. Minggu = W1 (tgl 1-7), W2 (8-14), dst. dalam bulan.',
      header: ['Bulan', 'Minggu', 'Bin dicek', 'Sesuai', 'Selisih', '% Akurasi Bin', 'Total Onhand', 'Total Aktual', 'Selisih Qty', 'Selisih Abs', '% Deviasi', 'Label grafik'],
      rows: jSum, textCols: [1, 2, 12], fmts: { 6: '0.0%', 11: '0.0%' } },
    { title: 'Detail bin JIS',
      header: ['Bulan', 'Minggu', 'Area', 'Rak', 'Kode Item', 'Nama Item', 'Onhand', 'Aktual', 'Selisih', 'Status', 'Tgl Cek'],
      rows: jDet, textCols: [1, 2, 3, 4, 5, 6, 10], fmts: { 11: 'yyyy-mm-dd' } }
  ]);

  renderKes_(st);
  renderMuat_(st);
  renderClr_(st);

  var dc = st[K.dc] || {};
  var dRows = [];
  Object.keys(dc).forEach(function (item) {
    var r = dc[item] || {};
    var rowsArr = Array.isArray(r.rows) ? r.rows : [];
    var fis = rowsArr.reduce(function (a, x) { return a + (Number(x.qty) || 0); }, 0);
    var sys = r.sys == null ? '' : Number(r.sys);
    var rak = rowsArr.map(function (x) { return x.rak + '=' + (x.qty === '' ? '-' : x.qty); }).join('; ');
    dRows.push([fmtTime_(r.at), r.by || '', item, sys, fis, sys === '' ? '' : fis - sys,
      r.done ? 'Selesai' : 'Draft', r.adj || '', rak]);
  });
  dRows.sort(function (a, b) { return String(b[0]).localeCompare(String(a[0])); });
  writeTable_(SH.dc, ['Waktu', 'Petugas', 'Item', 'Qty Sistem', 'Qty Fisik', 'Selisih', 'Status', 'Rak Adjust', 'Rincian Rak'], dRows, [1, 2, 3, 7, 8, 9]);

  writeTable_(SH.users, ['ID', 'Nama', 'Peran', 'Aktif', 'Area', 'Menu'],
    users.map(function (u) {
      var menus = u.role === 'admin' ? 'Semua menu'
        : (Array.isArray(u.menus) ? u.menus : MENU_OPERATOR).map(function (m) { return MENU_LABEL[m] || m; }).join(', ');
      return [u.id, u.name, u.role === 'admin' ? 'Admin' : 'Petugas', u.active === false ? 'Tidak' : 'Ya',
        (u.areas || []).join(', '), menus];
    }));

  var tasks = st[K.tasks] || {};
  var done = counts;
  writeTable_(SH.tasks, ['Bin', 'Petugas', 'Ditugaskan oleh', 'Waktu tugas', 'Status'],
    Object.keys(tasks).map(function (bin) {
      var t = tasks[bin] || {};
      var c = done[bin];
      var fin = !!(c && ts_(c.savedAt) >= ts_(t.at));
      return [bin, nameOf[t.u] || t.u || '', t.by || '', fmtTime_(t.at), fin ? 'Selesai' : 'Menunggu'];
    }));

  var closed = st[K.closed] || {};
  writeTable_(SH.closed, ['Area', 'Ditutup oleh', 'Waktu'],
    Object.keys(closed).sort().map(function (a) {
      return [a, (closed[a] || {}).by || '', fmtTime_((closed[a] || {}).at)];
    }));
}

// bangun ulang sheet dari _STATE secara manual (menu Run)
function rebuildSheets() {
  renderSheets_(readState_(), true, true);
  orderSheets_();
}

// urutan tab: laporan dulu (01-05, Clearing), lalu data pendukung
function orderSheets_() {
  var order = [SH.kes, SH.counts, SH.weekly, SH.muat, SH.jis, SH.clr, SH.dc, SH.tasks, SH.closed, SH.users, SH.master];
  var ss = ss_(), pos = 1;
  order.forEach(function (n) {
    var s = ss.getSheetByName(n);
    if (!s) return;
    ss.setActiveSheet(s);
    ss.moveActiveSheet(pos++);
  });
}


