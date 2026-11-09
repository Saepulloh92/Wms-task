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

// banding dua teks lewat digest (panjang selalu sama): waktu proses tidak membocorkan panjang atau isi token
function safeEq_(a, b) {
  var x = hash_(String(a)), y = hash_(String(b)), r = x.length ^ y.length;
  for (var i = 0; i < x.length && i < y.length; i++) r |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return r === 0;
}

// 28 karakter acak (huruf besar/kecil + angka tanpa yang membingungkan). Sumber acak: UUID Google (kriptografis), bukan Math.random.
function randomToken_() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789', out = '';
  var hex = (Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');   // 96 digit heksa
  for (var i = 0; i < 28; i++) out += chars.charAt(parseInt(hex.substr(i * 3, 3), 16) % chars.length);   // 12 bit per karakter: bias diabaikan
  return out;
}
