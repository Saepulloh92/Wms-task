// Util umum (json_, canon_, hash_, safeEq_)
// asal: Code-fix.gs baris 938-962
/* ===================== UTIL ===================== */

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// JSON dengan urutan kunci tetap, untuk membandingkan dua state
function canon_(v) {
  if (Array.isArray(v)) return '[' + v.map(canon_).join(',') + ']';
  if (v && typeof v === 'object') {
    return '{' + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ':' + canon_(v[k]); }).join(',') + '}';
  }
  return JSON.stringify(v === undefined ? null : v);
}

function hash_(str) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str, Utilities.Charset.UTF_8));
}

function safeEq_(a, b) {
  if (a.length !== b.length) return false;
  var r = 0;
  for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function randomToken_() {          // 28 karakter acak (huruf besar/kecil + angka)
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789', out = '';
  for (var i = 0; i < 28; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}
