// Laporan mingguan SPV: ringkas aktivitas Per Bin, DC, Aging, Muat, dan Clearing dalam satu minggu (Senin-Minggu).
// Fungsi murni (tanpa DOM/state) agar bisa diuji di Node: lihat tests/weekly.mjs.

export const DAY_NAMES = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const MODS = [
  { id: "bin", name: "Per Bin", unit: "bin diperiksa" },
  { id: "dc", name: "DC Harian", unit: "item selesai" },
  { id: "aging", name: "Aging", unit: "rak dicek" },
  { id: "muat", name: "Muat", unit: "hari lapor" },
  { id: "clr", name: "Clearing", unit: "voucher" },
];

const p2 = (n) => String(n).padStart(2, "0");
/** Kunci hari lokal "YYYY-MM-DD". */
export const dayKey = (d) => d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** Senin 00:00 (waktu lokal) dari minggu yang memuat tanggal d. */
export function weekStart(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return addDays(x, -((x.getDay() + 6) % 7));
}
/** "2-8 Nov 2026" atau "28 Okt-3 Nov 2026". */
export function weekLabel(start) {
  const e = addDays(start, 6);
  const a = start.getDate() + (start.getMonth() === e.getMonth() ? "" : " " + BULAN[start.getMonth()]);
  return a + "–" + e.getDate() + " " + BULAN[e.getMonth()] + " " + e.getFullYear();
}
const toKey = (v) => {
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const t = new Date(v);
  return isNaN(t) ? "" : dayKey(t);
};
const accOf = (ok, n) => (n ? ok / n : null);

function emptyMod() { return { n: 0, ok: 0, bad: 0, acc: null, perDay: [0, 0, 0, 0, 0, 0, 0], pos: 0, neg: 0 }; }

function build(start, { events = [], muat = [], clr = [] }) {
  const keys = Array.from({ length: 7 }, (_, i) => dayKey(addDays(start, i)));
  const idx = new Map(keys.map((k, i) => [k, i]));
  const m = { bin: emptyMod(), dc: emptyMod(), aging: emptyMod(), muat: emptyMod(), clr: emptyMod() };
  const who = {};
  const bump = (name, mod) => { const w = (who[name || "Tanpa petugas"] = who[name || "Tanpa petugas"] || { bin: 0, dc: 0, aging: 0, muat: 0, clr: 0 }); w[mod]++; };

  for (const e of events) {
    const i = idx.get(toKey(e.at));
    if (i == null || !m[e.mod]) continue;
    const x = m[e.mod];
    x.n++; x.perDay[i]++;
    if (e.ok) x.ok++; else x.bad++;
    const d = Number(e.diff) || 0;
    if (d > 0) x.pos += d; else x.neg += d;
    bump(e.by, e.mod);
  }
  m.muat.spm = 0; m.muat.mobil = 0; m.muat.cp = 0;
  for (const h of muat) {
    const i = idx.get(toKey(h.tgl));
    if (i == null) continue;
    if (!m.muat.perDay[i]) { m.muat.n++; }
    m.muat.perDay[i]++;
    m.muat.spm += Number(h.dp) || 0; m.muat.mobil += Number(h.total) || 0; m.muat.cp += Number(h.cpS) || 0;
    bump(h.by, "muat");
  }
  m.muat.ok = m.muat.n; // hari yang sudah ada laporan
  m.clr.vouchers = 0;
  for (const h of clr) {
    const i = idx.get(toKey(h.tgl));
    if (i == null) continue;
    m.clr.n++; m.clr.perDay[i] += Number(h.n) || 0;
    m.clr.vouchers += Number(h.n) || 0; m.clr.ok += Number(h.ok) || 0; m.clr.bad += Number(h.bad) || 0;
    bump(h.by, "clr");
  }
  for (const k of ["bin", "dc", "aging"]) m[k].acc = accOf(m[k].ok, m[k].n);
  m.clr.acc = accOf(m.clr.ok, m.clr.vouchers);
  // angka utama tiap modul (untuk perbandingan minggu lalu)
  m.bin.main = m.bin.n; m.dc.main = m.dc.n; m.aging.main = m.aging.n; m.muat.main = m.muat.n; m.clr.main = m.clr.vouchers;
  return { m, who, keys };
}

/**
 * start: Senin minggu yang dilaporkan. today: tanggal hari ini.
 * events: [{mod:"bin"|"dc"|"aging", at, by, ok, diff, key}], muat: riwayat Muat, clr: riwayat Clearing.
 * staff: nama petugas aktif; agingTodo: jumlah rak Kuning/Merah yang belum dicek.
 */
export function buildWeekly({ start, today = new Date(), events = [], muat = [], clr = [], staff = [], agingTodo = 0 }) {
  const cur = build(start, { events, muat, clr });
  const prev = build(addDays(start, -7), { events, muat, clr });
  const tk = dayKey(today);
  const days = cur.keys.map((k, i) => ({ key: k, label: DAY_NAMES[i], isToday: k === tk, isFuture: k > tk, day: Number(k.slice(8)) }));

  const people = Object.entries(cur.who)
    .map(([name, w]) => ({ name, ...w, total: w.bin + w.dc + w.aging + w.muat + w.clr }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const quiet = staff.filter((n) => !cur.who[n]);

  const flags = [];
  const M = cur.m;
  if (M.bin.bad) flags.push({ lvl: "r", mod: "bin", t: M.bin.bad + " bin selisih qty/item minggu ini" });
  if (M.dc.bad) flags.push({ lvl: "r", mod: "dc", t: M.dc.bad + " item DC selisih dengan stok sistem" });
  if (M.aging.bad) flags.push({ lvl: "r", mod: "aging", t: M.aging.bad + " rak Aging selisih dengan stok sistem" });
  if (M.clr.bad) flags.push({ lvl: "r", mod: "clr", t: M.clr.bad + " voucher Clearing belum sesuai" });
  if (agingTodo) flags.push({ lvl: "a", mod: "aging", t: agingTodo + " rak Kuning/Merah belum dicek fisik" });
  const missing = days.filter((d, i) => !d.isFuture && !d.isToday && !M.muat.perDay[i]).map((d) => d.label);
  if (missing.length) flags.push({ lvl: "a", mod: "muat", t: "Laporan Muat kosong: " + missing.join(", ") });
  if (quiet.length) flags.push({ lvl: "i", mod: "usr", t: "Belum ada aktivitas: " + quiet.slice(0, 4).join(", ") + (quiet.length > 4 ? " +" + (quiet.length - 4) : "") });
  const rank = { r: 0, a: 1, i: 2 };
  flags.sort((a, b) => rank[a.lvl] - rank[b.lvl]);

  const total = MODS.reduce((s, x) => s + M[x.id].main, 0);
  const prevTotal = MODS.reduce((s, x) => s + prev.m[x.id].main, 0);
  return {
    start, days, mods: M, prev: prev.m, people, flags, total, prevTotal,
    delta: Object.fromEntries(MODS.map((x) => [x.id, M[x.id].main - prev.m[x.id].main])),
  };
}

/** Warna status dari akurasi (0-1): hijau >=95%, kuning >=85%, selain itu merah; null = tanpa data. */
export const tone = (acc) => (acc == null ? "n" : acc >= 0.95 ? "g" : acc >= 0.85 ? "a" : "r");
const pct = (a) => (a == null ? "–" : Math.round(a * 100) + "%");

/** Teks ringkasan untuk ditempel di WhatsApp. */
export function weeklyText(r) {
  const M = r.mods, d = (id) => (r.delta[id] > 0 ? " (+" + r.delta[id] + ")" : r.delta[id] < 0 ? " (" + r.delta[id] + ")" : "");
  const L = [
    "*LAPORAN MINGGUAN GUDANG*",
    weekLabel(r.start),
    "",
    "Per Bin: " + M.bin.n + " diperiksa, akurasi " + pct(M.bin.acc) + ", selisih " + M.bin.bad + d("bin"),
    "DC Harian: " + M.dc.n + " item selesai, sesuai " + pct(M.dc.acc) + ", selisih " + M.dc.bad + d("dc"),
    "Aging: " + M.aging.n + " rak dicek, sesuai " + pct(M.aging.acc) + ", selisih " + M.aging.bad + d("aging"),
    "Muat: " + M.muat.n + "/7 hari lapor, " + M.muat.spm + " SPM, " + M.muat.mobil + " mobil" + d("muat"),
    "Clearing: " + M.clr.vouchers + " voucher, sesuai " + pct(M.clr.acc) + ", belum sesuai " + M.clr.bad + d("clr"),
  ];
  if (r.people.length) {
    L.push("", "*Petugas teraktif*");
    r.people.slice(0, 5).forEach((p, i) => L.push(i + 1 + ". " + p.name + " – " + p.total + " aktivitas"));
  }
  L.push("", "*Perlu perhatian*");
  if (r.flags.length) r.flags.forEach((f) => L.push("- " + f.t)); else L.push("- Tidak ada");
  return L.join("\n");
}
