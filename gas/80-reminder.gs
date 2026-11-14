// Pengingat server: kirim ke Telegram bila masih ada bin belum diperiksa. Jalan walau aplikasi di HP ditutup.
// Cara pakai (sekali, di editor Apps Script):
//   1) setTelegram('TOKEN_BOT', 'CHAT_ID')   -> disimpan di Script Properties (bukan di kode)
//   2) setupReminder(15)                       -> pengingat tiap hari jam 15:00 (zona waktu proyek), Senin-Sabtu
//   3) remindUnchecked()                       -> uji kirim sekarang
// Mematikan: stopReminder()

function setTelegram(token, chat) {
  var p = PropertiesService.getScriptProperties();
  p.setProperty('TG_TOKEN', String(token));
  p.setProperty('TG_CHAT', String(chat));
  Logger.log('Telegram tersimpan.');
}

function setupReminder(hour) {
  stopReminder();
  var h = Math.max(0, Math.min(23, Number(hour) || 15));
  ScriptApp.newTrigger('remindUnchecked').timeBased().everyDays(1).atHour(h).create();
  Logger.log('Pengingat aktif tiap hari jam ' + h + ':00.');
}

function stopReminder() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'remindUnchecked') ScriptApp.deleteTrigger(t);
  });
}

function remindUnchecked() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TG_TOKEN'), chat = props.getProperty('TG_CHAT');
  if (!token || !chat) { Logger.log('Telegram belum diatur: jalankan setTelegram().'); return false; }
  if (new Date().getDay() === 0) return false;                       // Minggu libur
  var st = readState_();
  var master = Array.isArray(st[K.master]) ? st[K.master] : [], counts = st[K.counts] || {}, closed = st[K.closed] || {};
  var per = {}, total = 0;
  master.forEach(function (x) {
    if (!x || !x.bin || closed[x.area] || counts[x.bin]) return;
    per[x.area] = (per[x.area] || 0) + 1; total++;
  });
  if (!total) return false;
  var lines = Object.keys(per).sort().map(function (a) { return '• ' + a + ': ' + per[a] + ' bin'; });
  var text = 'Pengingat Stock Control\nMasih ' + total + ' bin belum diperiksa:\n' + lines.slice(0, 15).join('\n') + (lines.length > 15 ? '\n…' : '');
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post', muteHttpExceptions: true, payload: { chat_id: chat, text: text }
  });
  if (res.getResponseCode() !== 200) { Logger.log('Telegram gagal: ' + res.getResponseCode()); return false; }
  return true;
}
