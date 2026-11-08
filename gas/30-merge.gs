// Penggabungan data antar perangkat ("yang terbaru menang")
// asal: Code-fix.gs baris 255-378
/* ===================== MERGE ===================== */

var STAMP = { counts: 'savedAt', dc: 'at', tasks: 'at', closed: 'at', aging: 'at', agcls: 'at', kesH: 'at', muatH: 'at', clrH: 'at' };

function ts_(v) {
  var t = v ? new Date(v).getTime() : 0;
  return isNaN(t) ? 0 : t;
}

function isObj_(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

// gabungkan dua map; rekaman dengan cap waktu lebih baru menang.
// rekaman yang cap waktunya tidak lebih baru dari waktu penghapusan (tb) diabaikan.
function mergeStamped_(a, b, field, tb) {
  var out = isObj_(a) ? JSON.parse(JSON.stringify(a)) : {};
  if (!isObj_(b)) return out;
  Object.keys(b).forEach(function (k) {
    if (!b[k]) return;
    var t = ts_(b[k][field]);
    if (tb && tb[k] && t <= tb[k]) return;
    var cur = out[k];
    if (!cur || t >= ts_(cur[field])) out[k] = b[k];
  });
  return out;
}

function merge_(server, client, del, replace) {
  var out = {};
  var rep = {};
  (replace || []).forEach(function (r) { rep[r] = true; });
  var now = Date.now();
  var tomb = isObj_(server[TOMB]) ? JSON.parse(JSON.stringify(server[TOMB])) : {};

  // data dengan cap waktu
  Object.keys(STAMP).forEach(function (name) {
    var key = K[name];
    var tb = tomb[name] = isObj_(tomb[name]) ? tomb[name] : {};
    var dels = Array.isArray(del[name]) ? del[name] : [];
    dels.forEach(function (id) { tb[id] = now; });
    var res = mergeStamped_(server[key], client[key], STAMP[name], tb);
    dels.forEach(function (id) { delete res[id]; });
    Object.keys(tb).forEach(function (id) {
      if (now - tb[id] > TOMB_DAYS * 86400000) delete tb[id];
    });
    if (name === 'kesH' || name === 'muatH' || name === 'clrH') {   // simpan hanya tanggal terbaru
      Object.keys(res).sort().reverse().slice(REPORT_KEEP).forEach(function (t) { delete res[t]; });
    }
    out[key] = res;
  });
  out[TOMB] = tomb;

  // data tanpa cap waktu: klien menimpa jika diminta (replace), selain itu server dipertahankan
  ['master', 'users', 'mon'].forEach(function (name) {
    var key = K[name];
    // data awal (seed) atau data kosong di server boleh langsung digantikan data klien
    var useClient = rep[name] || server[key] == null || isEmpty_(server[key]) ||
      (name === 'master' && isSeed_(server[key]));
    var v = useClient && client[key] != null ? client[key] : server[key];
    if (v != null) out[key] = v;
  });

  // map sederhana: gabungkan, nilai klien menang
  ['codefix', 'dcPick', 'dest', 'areacfg', 'agingcfg'].forEach(function (name) {
    var key = K[name];
    var sv = isObj_(server[key]) ? server[key] : {};
    var c = isObj_(client[key]) ? client[key] : {};
    out[key] = rep[name] ? c : Object.assign({}, sv, c);
  });

  return out;
}

function isEmpty_(v) {
  return Array.isArray(v) ? !v.length : (isObj_(v) ? !Object.keys(v).length : false);
}

function isSeed_(m) {
  try { return hash_(JSON.stringify(m)) === hash_(JSON.stringify(SEED_MASTER)); } catch (e) { return false; }
}

// hanya kunci yang dikenal yang boleh disimpan (curuser per-perangkat sengaja tidak ikut)
function whitelist_(d) {
  var ok = {};
  Object.keys(K).forEach(function (n) { ok[K[n]] = true; });
  ok[TOMB] = true;
  var out = {};
  Object.keys(d || {}).forEach(function (k) { if (ok[k]) out[k] = d[k]; });
  // TANPA PIN: server tidak pernah menyimpan atau mengirim PIN petugas
  if (Array.isArray(out[K.users])) {
    out[K.users] = out[K.users].map(function (u) {
      var c = {};
      Object.keys(u || {}).forEach(function (f) { if (f !== 'pin') c[f] = u[f]; });
      return c;
    });
  }
  return out;
}

// salinan untuk klien: tanpa data internal, dan tanpa master bila klien sudah punya revisi terbarunya
function pubFor_(state, meta, req) {
  var o = pub_(state);
  if (req && req.mrev != null && Number(req.mrev) === (meta.mrev || 0)) delete o[K.master];
  delete o[K.kesH]; delete o[K.muatH]; delete o[K.clrH];   // hanya untuk sheet laporan, aplikasi tidak memerlukannya
  return o;
}

// salinan untuk klien tanpa data internal
function pub_(state) {
  var o = {};
  Object.keys(state).forEach(function (k) { if (k !== TOMB) o[k] = state[k]; });
  return o;
}

function validate_(d) {
  if (!isObj_(d)) return 'Data tidak valid.';
  var m = d[K.master];
  if (!Array.isArray(m) || !m.length || m.some(function (x) { return !isObj_(x) || !x.bin || !x.item || !x.area; })) {
    return 'Data WMS tidak lengkap.';
  }
  return '';
}

