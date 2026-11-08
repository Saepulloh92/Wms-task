// Konfigurasi: kunci state, nama sheet, konstanta
// asal: Code-fix.gs baris 1-105
/**
 * STOCK CONTROL WMS v26 — Backend Google Apps Script (cocok dengan Oke.html / index.html)
 * ---------------------------------------------------------------
 * Fungsi:
 *  1. Sinkronisasi data antar perangkat (hasil periksa bin, DC harian,
 *     tugas, area ditutup, petugas) dengan aturan "yang terbaru menang".
 *  2. Menyimpan snapshot lengkap di sheet tersembunyi _STATE.
 *  3. Membuat sheet yang bisa dibaca manusia: Master_WMS, 02.Stock - Per Bin,
 *     03.Weekly-Stock Bin, 05.Monitoring JIS, DC_Harian, Petugas, Tugas_Bin,
 *     Area_Ditutup (format laporan mengikuti spreadsheet referensi "Laporan WMS").
 *     Setelah mengganti kode: jalankan rebuildSheets() sekali.
 *  4. Cadangan harian otomatis (JSON) ke Google Drive.
 *
 * CARA PASANG:
 *  1. Buat Google Spreadsheet baru > Ekstensi > Apps Script > tempel kode ini.
 *  2. Jalankan fungsi setup() satu kali (izinkan akses). setup() juga langsung
 *     mengisi data awal (36 bin contoh) dan membuat sheet. Lihat token di
 *     Execution log. Token juga ada di Project Settings >
 *     Script properties (API_TOKEN).
 *  3. Deploy > New deployment > Web app
 *       Execute as : Me
 *       Who has access : Anyone
 *     Salin URL web app (…/exec).
 *  4. (Opsional) Jalankan setupTriggers() untuk cadangan harian ke Drive.
 *
 * PASSWORD: login memakai nama + password. Server menyimpan HANYA hash PBKDF2 bergaram ("p1$...") di data user supaya
 * login berlaku di semua perangkat; password teks biasa dan hash lama tanpa garam dibuang. Hash tidak ditulis ke sheet
 * Pengguna yang terbaca manusia. Setelah mengubah script ini: Deploy > Kelola deployment > Edit > Versi baru.
 * Tanpa admin ber-password, aplikasi berjalan mode terbuka (semua menu bisa diakses).
 *
 * API (semua pakai token):
 *  GET  ?action=ping&token=XXX
 *  GET  ?action=pull&token=XXX
 *  POST body JSON (kirim sebagai text/plain agar tanpa preflight CORS):
 *    { token, action:"sync",  data:{...}, del:{...}, replace:[...], mrev:N }
 *      (mrev = revisi master terakhir yang dimiliki klien; jika sama, master tidak dikirim balik)
 *    { token, action:"push",  data:{...} }      // timpa semua isi server
 *    { token, action:"backup" }                 // cadangan ke Drive sekarang
 *
 * Contoh dari aplikasi HTML:
 *    const r = await fetch(GAS_URL, { method:"POST",
 *      body: JSON.stringify({ token:GAS_TOKEN, action:"sync", data: BK_KEYS() }) });
 *    const j = await r.json();   // j.data = hasil gabungan, siap di-apply
 *
 * "data" memakai nama kunci yang sama dengan localStorage aplikasi:
 *   warehouse_so_master_v2, warehouse_so_counts_v2, warehouse_so_codefix_v1,
 *   warehouse_so_users_v1, warehouse_so_closed_v1, warehouse_dc_v1,
 *   warehouse_dc_pick_v1, warehouse_so_dest_v1, warehouse_so_areacfg_v1, warehouse_so_tasks_v1,
 *   warehouse_so_mon_v1
 *
 * "del" (opsional) = rekaman yang dihapus/diurungkan di perangkat:
 *   { counts:["B1-18-A"], dc:["NAMA ITEM"], tasks:["B1-18-A"], closed:["B1"] }
 *
 * "replace" (opsional) = daftar kunci yang HARUS ditimpa oleh kiriman klien
 *   (untuk data tanpa cap waktu), misalnya ["master","users","mon"] setelah
 *   admin upload data WMS baru atau mengubah petugas.
 */

var K = {
  master: 'warehouse_so_master_v2',
  counts: 'warehouse_so_counts_v2',
  codefix: 'warehouse_so_codefix_v1',
  users: 'warehouse_so_users_v1',
  closed: 'warehouse_so_closed_v1',
  dc: 'warehouse_dc_v1',
  dcPick: 'warehouse_dc_pick_v1',
  dest: 'warehouse_so_dest_v1',
  areacfg: 'warehouse_so_areacfg_v1',   // daftar area yang diatur admin: { list: ["A1", ...] }
  tasks: 'warehouse_so_tasks_v1',
  aging: 'warehouse_so_aging_v1',          // cek fisik aging per rak: { bin: { tumpak, pipa, qty, by, at } }
  agcls: 'warehouse_so_agcls_v1',          // kelas pipa per kode item: { kode: { c, at } }
  agingcfg: 'warehouse_so_agingcfg_v1',    // { pic: { A: 'nama' } }
  mon: 'warehouse_so_mon_v1',
  // riwayat laporan per tanggal (dikirim aplikasi, hanya untuk membuat sheet laporan)
  kesH: 'warehouse_so_kes_hist_v1',
  muatH: 'warehouse_so_muat_hist_v1',
  clrH: 'warehouse_so_clr_hist_v1'
};
var REPORT_KEEP = 60;        // maksimal jumlah tanggal riwayat laporan yang disimpan di server
var TOMB = '_tomb';          // catatan rekaman yang dihapus (agar tidak hidup lagi dari perangkat lama)
var TOMB_DAYS = 30;
var SH = {
  state: '_STATE',
  master: 'Master_WMS',
  kes: '01.Kesesuaian Rak',
  counts: '02.Stock - Per Bin',
  weekly: '03.Weekly-Stock Bin',
  muat: '04.Proses Muat',
  jis: '05.Monitoring JIS',
  clr: 'Rekap Clearing',
  dc: 'DC_Harian',
  users: 'Petugas',
  tasks: 'Tugas_Bin',
  closed: 'Area_Ditutup',
  aging: 'Aging_Stock',
  agrekap: 'Aging_Rekap'
};
var MENU_LABEL = {
  so: 'Periksa Bin', dc: 'DC Harian', task: 'Tugas Bin', check: 'Review Supervisor', kes: 'Cek Kesesuaian',
  adj: 'File Adjust', clr: 'Clearing', mon: 'Beranda', muat: 'Laporan Muat', kpi: 'KPI Area', agi: 'Aging Stock', tg: 'Telegram', data: 'Data WMS', usr: 'User & Area'
};
var MENU_OPERATOR = ['mon', 'so', 'dc', 'task'];   // menu standar Petugas di aplikasi
var MENU_SPV = ['so', 'dc', 'task', 'check', 'kes', 'adj', 'clr', 'mon', 'muat', 'kpi', 'agi'];
var MENU_PENERIMAAN = ['mon', 'so', 'clr'];
var ROLE_LABEL = { admin: 'Admin', spv: 'SPV', petugas: 'Petugas', penerimaan: 'Penerimaan' };
var CHUNK = 45000;          // batas aman per sel (maks 50.000 karakter)
var BACKUP_FOLDER = 'Stock Control Backup';
var BACKUP_KEEP = 30;

/* Token API. JANGAN ditulis di sini kalau repo ini di-push ke GitHub.
   Cara yang disarankan: kosongkan TOKEN_TETAP, lalu jalankan setup() -> token acak dibuat dan disimpan di
   Project Settings > Script properties (API_TOKEN). Salin token itu ke aplikasi (menu Data > Sinkron) atau ke VITE_SYNC_TOKEN.
   Ingin token sendiri? Isi properti API_TOKEN langsung di Script properties, bukan di kode. */
var TOKEN_TETAP = '';   // biarkan kosong di repo

/* Data awal (36 bin contoh, area B1) = DEMO_DATA bawaan aplikasi.
   Dipakai otomatis oleh setup() kalau server masih kosong.
   Setelah itu admin cukup upload data WMS asli dari aplikasi. */
