// Cadangan harian ke Drive
// asal: Code-fix.gs baris 911-937
/* ===================== CADANGAN KE DRIVE ===================== */

function backup_() {
  var state = pub_(readState_());   // tanpa catatan internal (_tomb)
  if (!Object.keys(state).length) throw new Error('Belum ada data untuk dicadangkan.');
  var it = DriveApp.getFoldersByName(BACKUP_FOLDER);
  var folder = it.hasNext() ? it.next() : DriveApp.createFolder(BACKUP_FOLDER);
  var now = new Date();
  var name = 'cadangan_stock_control_' + Utilities.formatDate(now, ss_().getSpreadsheetTimeZone(), 'yyyy-MM-dd_HHmm') + '.json';
  // format sama dengan tombol "Cadangan" di aplikasi, jadi bisa dipulihkan lewat menu Data WMS
  var body = JSON.stringify({ app: 'stock-control-wms', ver: 5, at: now.toISOString(), data: state });
  folder.createFile(name, body, MimeType.PLAIN_TEXT);

  var files = [];
  var fi = folder.getFiles();
  while (fi.hasNext()) files.push(fi.next());
  files.sort(function (a, b) { return b.getDateCreated() - a.getDateCreated(); });
  files.slice(BACKUP_KEEP).forEach(function (f) { f.setTrashed(true); });
  return name;
}

function dailyBackup() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try { backup_(); } finally { lock.releaseLock(); }
}

