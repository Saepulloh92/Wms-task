// doGet / doPost / handle_ (API)
// asal: Code-fix.gs baris 195-254
/* ===================== ENDPOINT ===================== */

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (!p.action && !p.token) return ContentService.createTextOutput('Stock Control WMS: server aktif.');
  return handle_(p);
}

function doPost(e) {
  var req = {};
  try {
    req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'Body bukan JSON yang valid.' });
  }
  return handle_(req);
}

function handle_(req) {
  var action = '';
  try {
    if (!isObj_(req)) return json_({ ok: false, error: 'Permintaan tidak valid.' });
    var saved = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
    if (!saved) return json_({ ok: false, error: 'Belum setup. Jalankan setup() dulu.' });
    if (!safeEq_(String(req.token || ''), saved)) return json_({ ok: false, error: 'Token salah.' });

    action = String(req.action || 'ping');
    if (action === 'ping') { var pm = readMeta_(); return json_(withWarn_({ ok: true, time: new Date().toISOString(), srv: new Date().toISOString(), ver: GAS_VERSION, rev: pm.rev, mrev: pm.mrev || 0 })); }

    // masukan dari klien dipastikan bertipe benar; yang salah tipe dianggap kosong (bukan galat)
    var data = isObj_(req.data) ? req.data : {};
    var del = isObj_(req.del) ? req.del : {};
    var replace = Array.isArray(req.replace) ? req.replace : [];

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(20000)) return json_({ ok: false, error: 'Server sibuk, coba lagi.' });
    try {
      if (action === 'pull') {
        var m0 = readMeta_();
        var st0 = readState_();
        return json_(withWarn_({ ok: true, pins: 1, ver: GAS_VERSION, rev: m0.rev, mrev: m0.mrev || 0, at: m0.at, data: pubFor_(st0, m0, req) }));
      }
      if (action === 'sync') {
        var cur = readState_();
        var merged = whitelist_(merge_(cur, data, del, replace));
        // tanpa perubahan: jangan tulis ulang dan jangan naikkan rev (mencegah sync bolak-balik antar perangkat)
        var m1 = readMeta_();
        var hs = keyHashes_(merged);
        var meta = m1.rev > 0 && sameAsStored_(hs) ? m1 : commit_(merged, hs);
        return json_(withWarn_({ ok: true, pins: 1, ver: GAS_VERSION, rev: meta.rev, mrev: meta.mrev || 0, at: meta.at, srv: new Date().toISOString(), data: pubFor_(merged, meta, req) }));
      }
      if (action === 'push') {
        var bad = validate_(req.data);
        if (bad) return json_({ ok: false, error: bad });
        var meta2 = commit_(whitelist_(req.data));
        return json_({ ok: true, rev: meta2.rev, at: meta2.at });
      }
      if (action === 'backup') {
        return json_({ ok: true, file: backup_() });
      }
      return json_({ ok: false, error: 'Action tidak dikenal: ' + action });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    Logger.log('handle_(' + action + '): ' + (err && err.stack ? err.stack : err));
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

// peringatan untuk klien/admin (mis. bagian data rusak, sheet gagal dibuat); kosong = tidak ada kunci "warn"
function withWarn_(o) {
  var w = warn_();
  if (w) o.warn = w;
  return o;
}
