// Pemeriksaan kesehatan data: murni (tanpa DOM), dipakai panel "Kesehatan data" di menu Data WMS dan lencana di header.
// Setiap temuan: { id, level: "bad" | "warn", title, detail, bins: [bin...], act: "bin" | "data" | "usr" | "sync" }.
//   bad  = data/sinkron salah, harus ditindaklanjuti.   warn = perlu dicek, belum tentu salah.

const MAX_BINS = 12; // bin yang ditampilkan per temuan (jumlah sebenarnya tetap di `n`)
const FUTURE_MS = 10 * 60 * 1000; // cap waktu lebih dari 10 menit di depan jam server = jam HP salah
const STALE_SYNC_MS = 15 * 60 * 1000; // perubahan belum terkirim selama ini = bermasalah
const num = (v) => (v === "" || v == null ? NaN : Number(v));
const ts = (v) => {
  const t = v ? Date.parse(v) : NaN;
  return isNaN(t) ? NaN : t;
};

export function healthCheck({ data = [], counts = {}, users = [], tasks = {}, closed = {}, sync = null, now = Date.now() } = {}) {
  const out = [];
  const add = (id, level, title, detail, bins, act) => {
    const list = [...new Set(bins || [])];
    out.push({ id, level, title, detail, bins: list.slice(0, MAX_BINS), n: list.length, act: act || "bin" });
  };

  // ---------- data WMS (master) ----------
  const seen = new Map(),
    dup = [],
    badRow = [];
  data.forEach((x) => {
    if (!x || !x.bin || !x.area) return badRow.push((x && x.bin) || "(tanpa bin)");
    const q = num(x.onhand);
    if (isNaN(q) || q < 0) badRow.push(x.bin);
    const key = x.bin + "\u0000" + String(x.kode || "") + "\u0000" + String(x.item || "");
    if (seen.has(key)) dup.push(x.bin);
    else seen.set(key, 1);
  });
  if (dup.length) add("dup-master", "bad", "Baris data WMS ganda", "Bin + kode + item yang sama muncul lebih dari sekali. Impor ulang file WMS yang sudah dibersihkan.", dup, "data");
  if (badRow.length) add("bad-master", "bad", "Baris data WMS tidak valid", "Bin/area kosong atau Onhand kosong, bukan angka, atau negatif.", badRow, "data");

  const binSet = new Set(data.map((x) => x && x.bin).filter(Boolean));
  const onhandOf = {},
    rowsOf = {};
  data.forEach((x) => {
    if (x && x.bin) {
      onhandOf[x.bin] = (onhandOf[x.bin] || 0) + (num(x.onhand) || 0);
      rowsOf[x.bin] = (rowsOf[x.bin] || 0) + 1;
    }
  });

  // ---------- hasil periksa ----------
  const orphan = [],
    badQty = [],
    noBy = [],
    badTime = [],
    future = [],
    stale = [],
    afterClose = [],
    bigNoNote = [];
  const areaOf = {};
  data.forEach((x) => x && x.bin && (areaOf[x.bin] = x.area));
  Object.keys(counts).forEach((bin) => {
    const c = counts[bin];
    if (!c || typeof c !== "object") return badQty.push(bin);
    if (!binSet.has(bin)) orphan.push(bin);
    const q = num(c.actualQty);
    if (isNaN(q) || q < 0) badQty.push(bin);
    if (!String(c.by || "").trim()) noBy.push(bin);
    const t = ts(c.savedAt);
    if (isNaN(t)) badTime.push(bin);
    else if (t > now + FUTURE_MS) future.push(bin);
    if (binSet.has(bin) && c.systemQty != null && num(c.systemQty) !== onhandOf[bin] && rowsOf[bin] === 1) stale.push(bin);
    const cl = closed[areaOf[bin]];
    if (cl && !isNaN(t) && t > ts(cl.at)) afterClose.push(bin);
    const sys = num(c.systemQty);
    if (!isNaN(q) && !isNaN(sys) && sys > 0 && Math.abs(q - sys) / sys >= 0.5 && Math.abs(q - sys) >= 10 && !String(c.note || "").trim()) bigNoNote.push(bin);
  });
  if (badQty.length) add("bad-qty", "bad", "Hasil periksa dengan qty tidak valid", "Qty aktual kosong, bukan angka, atau negatif. Periksa ulang bin ini.", badQty);
  if (future.length) add("future", "bad", "Cap waktu di masa depan", "Jam HP petugas salah (lebih dari 10 menit lebih maju). Urutan 'yang terbaru menang' bisa keliru; periksa ulang bin ini.", future);
  if (orphan.length) add("orphan", "warn", "Hasil periksa untuk bin yang tidak ada di data WMS", "Bin sudah tidak ada setelah impor ulang. Cek apakah salah rak.", orphan);
  if (stale.length) add("stale", "warn", "Stok sistem berubah sesudah bin diperiksa", "Selisih dihitung dari Onhand lama. Periksa ulang jika perlu.", stale);
  if (afterClose.length) add("after-close", "warn", "Diperiksa sesudah area ditutup", "Hasil tercatat setelah supervisor menutup areanya.", afterClose);
  if (bigNoNote.length) add("big-nonote", "warn", "Selisih besar tanpa catatan", "Selisih 50% atau lebih tanpa keterangan. Minta petugas menambah catatan atau hitung ulang.", bigNoNote);
  if (noBy.length) add("no-by", "warn", "Hasil periksa tanpa nama petugas", "Tidak jelas siapa yang memeriksa.", noBy);
  if (badTime.length) add("bad-time", "warn", "Hasil periksa tanpa waktu yang valid", "Cap waktu kosong atau rusak; urutan sinkron bisa keliru.", badTime);

  // ---------- tugas ----------
  const taskOrphan = Object.keys(tasks).filter((k) => !k.includes("|") && !binSet.has(k));
  if (taskOrphan.length) add("task-orphan", "warn", "Tugas untuk bin yang tidak ada", "Tugas menunjuk bin yang tidak ada di data WMS.", taskOrphan);

  // ---------- pengguna ----------
  const names = {},
    dupNames = [];
  users.forEach((u) => {
    const n = String((u && u.name) || "").trim().toLowerCase();
    if (!n) return;
    if (names[n]) dupNames.push(u.name);
    names[n] = 1;
  });
  if (dupNames.length) add("dup-user", "bad", "Nama pengguna ganda", "Dua pengguna bernama sama membuat login dan laporan membingungkan: " + dupNames.join(", "), [], "usr");
  const activeAdmin = users.some((u) => u && u.role === "admin" && u.active !== false);
  if (users.length && !activeAdmin) add("no-admin", "bad", "Tidak ada admin aktif", "Aktifkan minimal satu admin.", [], "usr");
  const areaSet = new Set(data.map((x) => x && x.area).filter(Boolean));
  const noArea = users.filter((u) => u && u.active !== false && (u.role === "petugas" || u.role === "penerimaan") && !(u.areas || []).length).map((u) => u.name);
  if (noArea.length) add("user-no-area", "warn", "Petugas tanpa area", "Belum diberi area: " + noArea.join(", "), [], "usr");
  const ghostArea = [...new Set(users.flatMap((u) => (u && u.areas) || []).filter((a) => areaSet.size && !areaSet.has(a)))];
  if (ghostArea.length) add("user-ghost-area", "warn", "Area petugas tidak ada di data WMS", "Area: " + ghostArea.join(", "), [], "usr");

  // ---------- sinkron ----------
  if (sync) {
    if (!sync.ready) add("sync-off", "warn", "Belum tersambung ke server", "Data hanya ada di perangkat ini. Isi URL dan token di menu Data > Sinkron.", [], "sync");
    else {
      if (sync.err) add("sync-err", "bad", "Sinkron gagal", sync.err, [], "sync");
      if (sync.dirty && sync.lastAt && now - ts(sync.lastAt) > STALE_SYNC_MS && !sync.err) add("sync-stale", "bad", "Perubahan belum terkirim terlalu lama", "Terakhir tersinkron " + Math.round((now - ts(sync.lastAt)) / 60000) + " menit lalu.", [], "sync");
      if (sync.warn) add("server-warn", "bad", "Server melaporkan masalah", String(sync.warn), [], "sync");
      if (Math.abs(Number(sync.clk) || 0) > 60000) add("clock", "warn", "Jam perangkat ini berbeda dari server", "Selisih " + Math.round(Math.abs(sync.clk) / 1000) + " detik. Cap waktu otomatis dikoreksi, tetapi perbaiki jam HP.", [], "sync");
    }
  }

  const rank = { bad: 0, warn: 1 };
  out.sort((a, b) => rank[a.level] - rank[b.level]);
  return {
    issues: out,
    bad: out.filter((i) => i.level === "bad").length,
    warn: out.filter((i) => i.level === "warn").length,
    ok: out.length === 0,
  };
}
