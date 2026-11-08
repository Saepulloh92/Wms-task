// setup(), setupTriggers(), seed_()
// asal: Code-fix.gs baris 154-194
/* ===================== SETUP ===================== */

function setup() {
  var props = PropertiesService.getScriptProperties();
  var token = TOKEN_TETAP || props.getProperty('API_TOKEN') || randomToken_();   // urutan: kode (kalau diisi) > properti yang sudah ada > acak baru
  props.setProperty('API_TOKEN', token);
  stateSheet_();
  Object.keys(SH).forEach(function (k) { if (k !== 'state') sheet_(SH[k]); });
  var seeded = seed_();
  Logger.log(seeded ? 'Server diinisialisasi kosong (siap go live). Impor data WMS dari aplikasi.' : 'Data sudah ada, tidak ditimpa.');
  Logger.log('API_TOKEN = ' + token);
  Logger.log('Selanjutnya: Deploy > New deployment > Web app (Anyone).');
  return token;
}

function setupTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'dailyBackup') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('dailyBackup').timeBased().everyDays(1).atHour(22).create();
  Logger.log('Cadangan harian aktif (jam 22:00).');
}

// inisialisasi state kosong hanya jika server belum berisi (tidak pernah menimpa data yang ada)
function seed_() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var st = readState_();
    if (Array.isArray(st[K.master]) && st[K.master].length) return false;
    var d = {};
    d[K.master] = JSON.parse(JSON.stringify(SEED_MASTER));
    d[K.counts] = {}; d[K.dc] = {}; d[K.tasks] = {}; d[K.closed] = {}; d[K.aging] = {}; d[K.agcls] = {};
    d[K.users] = SEED_USERS(); d[K.dcPick] = {}; d[K.dest] = {}; d[K.codefix] = {};
    commit_(d);
    return true;
  } finally {
    lock.releaseLock();
  }
}

