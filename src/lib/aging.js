// Logika murni Monitoring Aging Stock (tanpa DOM). Data: baris WMS {area, bin, kode, item, onhand, aging, sinyal}.
export const SIGNALS = ["Hijau 1", "Hijau 2", "Kuning 1", "Kuning 2", "Kuning 3", "Kuning 4", "Merah"];
export const CLASSES = ["A", "B", "C", "PTM"];
export const NO_CLASS = "-";
export const SIGNAL_COLOR = { "Hijau 1": "#a9d99a", "Hijau 2": "#4caf50", "Kuning 1": "#fbd3b5", "Kuning 2": "#f2a96e", "Kuning 3": "#c0561b", "Kuning 4": "#f4b400", Merah: "#d32f2f" };
export const DEFAULT_PIC = { A: "Pak Kelik", B: "Pak Syaipul", C: "Pak Encup", PTM: "" };

/** "KUNING  2" -> "Kuning 2"; tidak dikenal -> "" */
export function normSignal(s) {
  const t = String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
  if (t === "merah") return "Merah";
  const m = t.match(/^(hijau|kuning)\s*(\d)$/);
  if (!m) return "";
  const v = m[1][0].toUpperCase() + m[1].slice(1) + " " + m[2];
  return SIGNALS.includes(v) ? v : "";
}
export const isKuning = (sig) => sig.startsWith("Kuning");
/** Perlu dipantau = Kuning atau Merah (kertas lama hanya mencatat rak yang perlu dicek). */
export const needsWatch = (sig) => isKuning(sig) || sig === "Merah";
export const isFilled = (x) => Number(x.onhand) > 0;

const zero = () => Object.fromEntries(SIGNALS.map((s) => [s, 0]));

/** Rekap untuk dasbor. rows = baris WMS (sudah difilter area), cls = {kode: "A"|"B"|"C"|"PTM"} */
export function buildAging(rows, cls = {}) {
  const bySignal = zero();
  const byClass = Object.fromEntries([...CLASSES, NO_CLASS].map((c) => [c, zero()]));
  let filled = 0;
  rows.forEach((x) => {
    if (!isFilled(x)) return;
    filled++;
    const s = normSignal(x.sinyal);
    if (!s) return;
    bySignal[s]++;
    const c = CLASSES.includes(cls[x.kode]) ? cls[x.kode] : NO_CLASS;
    byClass[c][s]++;
  });
  const kuning = {};
  Object.keys(byClass).forEach((c) => (kuning[c] = SIGNALS.filter(isKuning).reduce((n, s) => n + byClass[c][s], 0)));
  const kuningTotal = Object.values(kuning).reduce((a, b) => a + b, 0);
  return { filled, bySignal, byClass, kuning, kuningTotal };
}

/** Daftar rak untuk ceklis: mode "watch" (Kuning/Merah), "all" (semua rak isi). Urut: sinyal terparah dulu, lalu aging, lalu rak. */
export const classRank = (c) => { const i = CLASSES.indexOf(c); return i < 0 ? CLASSES.length : i; }; // A, B, C, PTM, lalu belum diatur
/** order "prioritas" = kelas A dulu, lalu B, C (cls = {kode: kelas}); di dalam kelas Merah dulu, lalu aging terlama. order lain = sinyal terparah dulu. */
export function checklist(rows, mode = "watch", order = "parah", cls = {}) {
  const rank = (s) => SIGNALS.indexOf(s);
  const list = rows.filter((x) => isFilled(x) && (mode === "all" || needsWatch(normSignal(x.sinyal))));
  if (order === "prioritas")
    return list.sort((a, b) => classRank(cls[a.kode]) - classRank(cls[b.kode]) || rank(normSignal(b.sinyal)) - rank(normSignal(a.sinyal)) || Number(b.aging) - Number(a.aging) || String(a.bin).localeCompare(String(b.bin), "id", { numeric: true }));
  return list
    .sort((a, b) => rank(normSignal(b.sinyal)) - rank(normSignal(a.sinyal)) || Number(b.aging) - Number(a.aging) || String(a.bin).localeCompare(String(b.bin), "id", { numeric: true }));
}

/** Kelompokkan daftar (sudah terurut prioritas) per kelas: [{ c, items, merah }], urutan A, B, C, PTM, belum diatur. */
export function groupByClass(list, cls = {}) {
  const g = new Map();
  list.forEach((x) => {
    const c = CLASSES.includes(cls[x.kode]) ? cls[x.kode] : NO_CLASS;
    if (!g.has(c)) g.set(c, { c, items: [], merah: 0 });
    const r = g.get(c);
    r.items.push(x);
    if (normSignal(x.sinyal) === "Merah") r.merah++;
  });
  return [...g.values()].sort((a, b) => classRank(a.c) - classRank(b.c));
}

/** Teks ringkas untuk WhatsApp/Telegram. */
export function agingText({ area, agg, pic, done, total, date }) {
  const L = [`MONITORING AGING STOCK${area ? " – " + area : ""}`, date || "", `Rak isi: ${agg.filled}`];
  L.push("Sinyal: " + SIGNALS.map((s) => `${s} ${agg.bySignal[s]}`).join(", "));
  L.push("", "Total Kuning per kelas:");
  [...CLASSES, NO_CLASS].forEach((c) => {
    if (c === NO_CLASS && !agg.kuning[c]) return;
    L.push(`${c === NO_CLASS ? "Belum diatur" : c}${pic[c] ? " (" + pic[c] + ")" : ""}: ${agg.kuning[c]}`);
  });
  L.push(`Total: ${agg.kuningTotal}`, "", `Sudah dicek fisik: ${done} dari ${total}`);
  return L.join("\n");
}

/** Kumpulan pilihan unik (tumpak atau nama item) beserta jumlah kemunculan dan area asalnya. items = [{ v, area }] */
export function buildPool(items) {
  const m = new Map();
  items.forEach(({ v, area }) => {
    const t = String(v == null ? "" : v).trim();
    if (!t || t === "Sesuai") return;
    const r = m.get(t) || { v: t, n: 0, areas: new Set() };
    r.n++;
    if (area) r.areas.add(area);
    m.set(t, r);
  });
  return [...m.values()];
}
/** Pilihan untuk kolom isian: nilai sistem rak ini (pin) paling atas, lalu yang cocok dengan ketikan (awalan dulu), lalu yang sering/searea. */
export function suggest(pool, q, { pin = "", area = "", limit = 10 } = {}) {
  const ql = String(q || "").trim().toLowerCase();
  const sw = (r) => (ql && r.v.toLowerCase().startsWith(ql) ? 1 : 0);
  return pool
    .filter((r) => (!ql || r.v.toLowerCase().includes(ql)) && r.v.toLowerCase() !== ql)
    .sort((a, b) => (b.v === pin) - (a.v === pin) || sw(b) - sw(a) || b.areas.has(area) - a.areas.has(area) || b.n - a.n || a.v.localeCompare(b.v, "id", { numeric: true }))
    .slice(0, limit)
    .map((r) => r.v);
}
