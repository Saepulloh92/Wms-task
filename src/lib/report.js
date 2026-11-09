// Laporan SPV: ringkas aktivitas Per Bin, DC, Aging, Muat, dan Clearing per minggu / bulan / tahun.
// Fungsi murni (tanpa DOM/state) agar bisa diuji di Node: lihat tests/report.mjs.

export const PERIODS = [
  { id: "week", name: "Mingguan" },
  { id: "month", name: "Bulanan" },
  { id: "year", name: "Tahunan" },
];
export const MODS = [
  { id: "bin", name: "Per Bin" },
  { id: "dc", name: "DC Harian" },
  { id: "aging", name: "Aging" },
  { id: "muat", name: "Muat" },
  { id: "clr", name: "Clearing" },
];
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const BULAN_PANJANG = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const HARI = ["S", "S", "R", "K", "J", "S", "M"]; // Sen..Min

const p2 = (n) => String(n).padStart(2, "0");
export const dayKey = (d) => d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** Senin 00:00 (waktu lokal) dari minggu yang memuat tanggal d. */
export function weekStart(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return addDays(x, -((x.getDay() + 6) % 7));
}
const toKey = (v) => {
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const t = new Date(v);
  return isNaN(t) ? "" : dayKey(t);
};

/** Awal periode yang memuat anchor. */
export function periodStart(period, anchor) {
  if (period === "month") return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  if (period === "year") return new Date(anchor.getFullYear(), 0, 1);
  return weekStart(anchor);
}
/** Geser periode sebanyak dir (+1 / -1) dari awal periode. */
export function shiftPeriod(period, start, dir) {
  if (period === "month") return new Date(start.getFullYear(), start.getMonth() + dir, 1);
  if (period === "year") return new Date(start.getFullYear() + dir, 0, 1);
  return addDays(start, 7 * dir);
}
/** Label periode: "2–8 Nov 2026", "November 2026", "2026". */
export function periodLabel(period, start) {
  if (period === "year") return String(start.getFullYear());
  if (period === "month") return BULAN_PANJANG[start.getMonth()] + " " + start.getFullYear();
  const e = addDays(start, 6);
  const a = start.getDate() + (start.getMonth() === e.getMonth() ? "" : " " + BULAN[start.getMonth()]);
  return a + "–" + e.getDate() + " " + BULAN[e.getMonth()] + " " + e.getFullYear();
}
/** Ember (bucket) waktu: 7 hari (minggu), tiap hari (bulan), 12 bulan (tahun). */
export function buckets(period, start, today) {
  const tk = dayKey(today);
  if (period === "year") {
    const y = start.getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const key = y + "-" + p2(i + 1);
      return { key, label: BULAN[i][0], name: BULAN[i], isToday: key === tk.slice(0, 7), isFuture: key > tk.slice(0, 7) };
    });
  }
  const n = period === "month" ? new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() : 7;
  return Array.from({ length: n }, (_, i) => {
    const d = addDays(start, i), key = dayKey(d);
    return { key, label: period === "month" ? String(i + 1) : HARI[i], name: String(d.getDate()), isToday: key === tk, isFuture: key > tk };
  });
}
const bucketOf = (period, key) => (period === "year" ? key.slice(0, 7) : key);
const sum = (a) => a.reduce((x, y) => x + y, 0);
const mainOf = (id, perB) => sum(perB); // Muat: satu laporan per hari; Clearing: jumlah voucher
const accOf = (ok, n) => (n ? ok / n : null);

/** Status satu cek Per Bin: qty (stok) dan item (kesesuaian rak) dinilai terpisah dari satu input yang sama. */
export function binStatus(e) {
  const itemOk = e.itemOk == null ? true : e.itemOk !== false;
  const qtyOk = e.qtyOk == null ? Number(e.diff) === 0 : e.qtyOk !== false;
  return { itemOk, qtyOk, label: itemOk && qtyOk ? "Sesuai" : !itemOk && !qtyOk ? "Item beda + selisih qty" : !itemOk ? "Item beda" : "Selisih qty" };
}

function build(period, start, today, { events, muat, clr }) {
  const bk = buckets(period, start, today);
  const idx = new Map(bk.map((b, i) => [b.key, i]));
  const blank = () => ({ n: 0, ok: 0, bad: 0, acc: null, perB: bk.map(() => 0), pos: 0, neg: 0 });
  const m = { bin: blank(), dc: blank(), aging: blank(), muat: blank(), clr: blank() };
  // Satu input Per Bin menghasilkan DUA laporan: stok per bin (qty) dan kesesuaian rak (item sama/tidak).
  Object.assign(m.bin, { qtyOk: 0, qtyBad: 0, itemOk: 0, itemBad: 0, perItemBad: bk.map(() => 0) });
  const who = {};
  const bump = (name, mod) => { const k = name || "Tanpa petugas"; (who[k] = who[k] || { bin: 0, dc: 0, aging: 0, muat: 0, clr: 0 })[mod]++; };
  const inRange = [];

  for (const e of events) {
    const i = idx.get(bucketOf(period, toKey(e.at)));
    if (i == null || !m[e.mod]) continue;
    const x = m[e.mod];
    x.n++; x.perB[i]++;
    if (e.ok) x.ok++; else x.bad++;
    const d = Number(e.diff) || 0;
    if (d > 0) x.pos += d; else x.neg += d;
    if (e.mod === "bin") {
      const { qtyOk, itemOk } = binStatus(e);
      if (qtyOk) x.qtyOk++; else x.qtyBad++;
      if (itemOk) x.itemOk++; else { x.itemBad++; x.perItemBad[i]++; }
    }
    bump(e.by, e.mod);
    inRange.push(e);
  }
  Object.assign(m.muat, { spm: 0, mobil: 0, cp: 0, days: 0 });
  for (const h of muat) {
    const i = idx.get(bucketOf(period, toKey(h.tgl)));
    if (i == null) continue;
    m.muat.perB[i]++; m.muat.n++; m.muat.days++;
    m.muat.spm += Number(h.dp) || 0; m.muat.mobil += Number(h.total) || 0; m.muat.cp += Number(h.cpS) || 0;
    bump(h.by, "muat");
  }
  Object.assign(m.clr, { vouchers: 0, days: 0 });
  for (const h of clr) {
    const i = idx.get(bucketOf(period, toKey(h.tgl)));
    if (i == null) continue;
    const n = Number(h.n) || 0;
    m.clr.perB[i] += n; m.clr.n++; m.clr.days++;
    m.clr.vouchers += n; m.clr.ok += Number(h.ok) || 0; m.clr.bad += Number(h.bad) || 0;
    bump(h.by, "clr");
  }
  for (const k of ["bin", "dc", "aging"]) m[k].acc = accOf(m[k].ok, m[k].n);
  m.clr.acc = accOf(m.clr.ok, m.clr.vouchers);
  m.bin.accQty = accOf(m.bin.qtyOk, m.bin.n);
  m.bin.accItem = accOf(m.bin.itemOk, m.bin.n);
  return { m, who, bk, inRange };
}

const lastDay = (period, start) => (period === "year" ? new Date(start.getFullYear(), 11, 31) : period === "month" ? new Date(start.getFullYear(), start.getMonth() + 1, 0) : addDays(start, 6));
const daysBetween = (a, b) => Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()) - new Date(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5) + 1;

/**
 * period: "week" | "month" | "year"; start: awal periode (lihat periodStart/shiftPeriod).
 * events: [{mod:"bin"|"dc"|"aging", at, by, ok, diff, key, area?, item?, sys?, fis?}]
 * muat: riwayat Muat [{tgl, by, dp, total, cpS}], clr: riwayat Clearing [{tgl, by, n, ok, bad}]
 * filters: {area, by}. area hanya berlaku untuk Per Bin & Aging (DC/Muat/Clearing tidak punya area).
 */
export function buildReport({ period = "week", start, today = new Date(), events = [], muat = [], clr = [], staff = [], agingTodo = 0, areaTotals = {}, binTodo = 0, filters = {} }) {
  const fArea = filters.area || "", fBy = filters.by || "";
  const keep = (e) => (!fBy || (e.by || "Tanpa petugas") === fBy) && (!fArea || e.area == null || e.area === fArea);
  const ev = events.filter(keep);
  const mu = muat.filter((h) => !fBy || (h.by || "Tanpa petugas") === fBy);
  const cl = clr.filter((h) => !fBy || (h.by || "Tanpa petugas") === fBy);
  const data = { events: ev, muat: mu, clr: cl };

  const cur = build(period, start, today, data);
  const prevStart = shiftPeriod(period, start, -1);
  const prev = build(period, prevStart, today, data);
  const elapsed = Math.max(1, cur.bk.filter((b) => !b.isFuture).length);
  const end = lastDay(period, start);
  const totalDays = daysBetween(start, end);
  const elapsedDays = Math.max(1, Math.min(totalDays, daysBetween(start, today)));
  const M = cur.m, P = prev.m;

  const mains = {}, prevMains = {};
  for (const x of MODS) { mains[x.id] = mainOf(x.id, M[x.id].perB); prevMains[x.id] = mainOf(x.id, P[x.id].perB.slice(0, elapsed)); }
  const total = sum(MODS.map((x) => mains[x.id]));
  const prevTotal = sum(MODS.map((x) => prevMains[x.id]));

  const people = Object.entries(cur.who)
    .map(([name, w]) => ({ name, ...w, total: w.bin + w.dc + w.aging + w.muat + w.clr }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const quiet = staff.filter((n) => !cur.who[n] && (!fBy || n === fBy));

  // Per area & daftar bin (hanya Per Bin)
  const binEv = cur.inRange.filter((e) => e.mod === "bin");
  const areaMap = {};
  Object.keys(areaTotals).forEach((a) => (areaMap[a] = { area: a, total: areaTotals[a], n: 0, ok: 0, bad: 0, pos: 0, neg: 0 }));
  binEv.forEach((e) => {
    const a = (areaMap[e.area || "–"] = areaMap[e.area || "–"] || { area: e.area || "–", total: 0, n: 0, ok: 0, bad: 0, pos: 0, neg: 0 });
    a.n++; if (e.ok) a.ok++; else a.bad++;
    { const st = binStatus(e); a.qtyBad = (a.qtyBad || 0) + (st.qtyOk ? 0 : 1); a.itemBad = (a.itemBad || 0) + (st.itemOk ? 0 : 1); }
    const d = Number(e.diff) || 0; if (d > 0) a.pos += d; else a.neg += d;
  });
  const areas = Object.values(areaMap).filter((a) => !fArea || a.area === fArea).sort((a, b) => b.bad - a.bad || a.area.localeCompare(b.area));
  const bins = [...binEv].sort((a, b) => (b.at > a.at ? 1 : -1));
  const agingBad = cur.inRange.filter((e) => e.mod === "aging" && !e.ok).sort((a, b) => Math.abs(Number(b.diff) || 0) - Math.abs(Number(a.diff) || 0) || (b.at > a.at ? 1 : -1)).slice(0, 8);
  const topBad = binEv.filter((e) => !e.ok).sort((a, b) => Math.abs(Number(b.diff) || 0) - Math.abs(Number(a.diff) || 0)).slice(0, 8);

  // Cakupan data riwayat Muat/Clearing (hanya menyimpan 60 hari terakhir)
  const firstOf = (arr) => arr.map((h) => toKey(h.tgl)).filter(Boolean).sort()[0] || "";
  const muatSince = firstOf(muat), clrSince = firstOf(clr);

  // Hari tanpa laporan Muat: hanya dihitung sejak laporan pertama tersimpan, dan hanya hari yang sudah lewat
  const tk = dayKey(today);
  const haveMuat = new Set(mu.map((h) => toKey(h.tgl)));
  const missing = [];
  for (let i = 0; i < totalDays; i++) {
    const k = dayKey(addDays(start, i));
    if (k >= tk || (muatSince && k < muatSince) || !muatSince) continue;
    if (!haveMuat.has(k)) missing.push(addDays(start, i));
  }

  const flags = [];
  if (M.bin.qtyBad) flags.push({ lvl: "r", mod: "bin", t: M.bin.qtyBad + " bin selisih qty (stok per bin)" });
  if (M.bin.itemBad) flags.push({ lvl: "r", mod: "bin", t: M.bin.itemBad + " rak item tidak sama (kesesuaian rak)" });
  if (M.dc.bad) flags.push({ lvl: "r", mod: "dc", t: M.dc.bad + " item DC selisih dengan stok sistem" });
  if (M.aging.bad) flags.push({ lvl: "r", mod: "aging", t: M.aging.bad + " rak Aging selisih (qty, tumpak, atau item)" });
  if (M.clr.bad) flags.push({ lvl: "r", mod: "clr", t: M.clr.bad + " voucher Clearing belum sesuai" });
  if (agingTodo) flags.push({ lvl: "a", mod: "aging", t: agingTodo + " rak Kuning/Merah belum dicek fisik" });
  if (binTodo) flags.push({ lvl: "a", mod: "bin", t: binTodo + " bin belum pernah diperiksa" });
  if (missing.length) {
    const names = period === "week" ? missing.map((d) => ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][d.getDay()]) : missing.slice(0, 6).map((d) => String(d.getDate()) + (period === "year" ? " " + BULAN[d.getMonth()] : ""));
    flags.push({ lvl: "a", mod: "muat", t: "Laporan Muat kosong " + missing.length + " hari" + (period === "year" ? "" : ": " + names.join(", ") + (missing.length > names.length ? " +" + (missing.length - names.length) : "")) });
  }
  if (quiet.length) flags.push({ lvl: "i", mod: "usr", t: "Belum ada aktivitas: " + quiet.slice(0, 4).join(", ") + (quiet.length > 4 ? " +" + (quiet.length - 4) : "") });
  const rank = { r: 0, a: 1, i: 2 };
  flags.sort((a, b) => rank[a.lvl] - rank[b.lvl]);

  return {
    period, start, end, label: periodLabel(period, start), prevLabel: periodLabel(period, prevStart),
    buckets: cur.bk, elapsed, totalDays, elapsedDays,
    mods: M, mains, prevMains, delta: { ...Object.fromEntries(MODS.map((x) => [x.id, mains[x.id] - prevMains[x.id]])), kes: M.bin.itemBad - prev.m.bin.itemBad },
    total, prevTotal, people, flags, areas, bins, topBad, agingBad, missing: missing.length,
    coverage: { muatSince, clrSince, muatCut: !!muatSince && muatSince > dayKey(start), clrCut: !!clrSince && clrSince > dayKey(start) },
  };
}

/** Warna status dari akurasi (0-1): hijau >=95%, kuning >=85%, selain itu merah; null = tanpa data. */
export const tone = (acc) => (acc == null ? "n" : acc >= 0.95 ? "g" : acc >= 0.85 ? "a" : "r");
export const pct = (a) => (a == null ? "–" : Math.round(a * 100) + "%");
/** Cakupan hari lapor Muat terhadap hari yang sudah berjalan. */
export const muatTone = (days, elapsedDays) => tone(elapsedDays ? Math.min(1, days / elapsedDays) : null);

const kataPeriode = { week: "MINGGUAN", month: "BULANAN", year: "TAHUNAN" };
/** Teks ringkasan untuk ditempel di WhatsApp. */
export function reportText(r, { area = "", by = "" } = {}) {
  const M = r.mods, d = (id) => (r.delta[id] > 0 ? " (+" + r.delta[id] + ")" : r.delta[id] < 0 ? " (" + r.delta[id] + ")" : "");
  const L = ["*LAPORAN " + kataPeriode[r.period] + " GUDANG*", r.label + (area ? " · Area " + area : "") + (by ? " · " + by : ""), ""];
  L.push("Stok per Bin: " + M.bin.n + " diperiksa, qty sesuai " + pct(M.bin.accQty) + ", selisih qty " + M.bin.qtyBad + d("bin"));
  L.push("Kesesuaian Rak: item sama " + pct(M.bin.accItem) + ", item tidak sama " + M.bin.itemBad);
  L.push("DC Harian: " + M.dc.n + " item selesai, sesuai " + pct(M.dc.acc) + ", selisih " + M.dc.bad + d("dc"));
  L.push("Aging: " + M.aging.n + " rak dicek, sesuai " + pct(M.aging.acc) + ", selisih " + M.aging.bad + d("aging"));
  L.push("Muat: " + M.muat.days + "/" + r.elapsedDays + " hari lapor, " + M.muat.spm + " SPM, " + M.muat.mobil + " mobil" + d("muat"));
  L.push("Clearing: " + M.clr.vouchers + " voucher, sesuai " + pct(M.clr.acc) + ", belum sesuai " + M.clr.bad + d("clr"));
  if (r.areas.some((a) => a.n)) {
    L.push("", "*Per area (bin)*");
    r.areas.filter((a) => a.n).slice(0, 8).forEach((a) => L.push("- " + a.area + ": " + a.n + "/" + a.total + " diperiksa, selisih " + a.bad));
  }
  if (r.agingBad.length) {
    L.push("", "*Rak Aging selisih*");
    r.agingBad.slice(0, 5).forEach((e) => L.push("- " + e.key + ": " + (e.why || "selisih") + (e.tumpakSys ? " (tumpak " + e.tumpakSys + (e.tumpak && e.tumpak !== e.tumpakSys ? " → " + e.tumpak : "") + ")" : "") + (e.by ? " (" + e.by + ")" : "")));
  }
  if (r.topBad.length) {
    L.push("", "*Selisih terbesar*");
    r.topBad.slice(0, 5).forEach((e) => L.push("- " + e.key + ": " + (Number(e.diff) > 0 ? "+" : "") + (Number(e.diff) || 0) + (e.by ? " (" + e.by + ")" : "")));
  }
  if (r.people.length) {
    L.push("", "*Petugas teraktif*");
    r.people.slice(0, 5).forEach((p, i) => L.push(i + 1 + ". " + p.name + " – " + p.total + " aktivitas"));
  }
  L.push("", "*Perlu perhatian*");
  if (r.flags.length) r.flags.forEach((f) => L.push("- " + f.t)); else L.push("- Tidak ada");
  return L.join("\n");
}

/** Semua aktivitas bin/DC/Aging pada periode sebagai CSV (dibuka di Excel). */
export function reportCsv(r, events) {
  const q = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  const rows = [["Modul", "Waktu", "Petugas", "Bin/Item", "Area", "Item", "Sistem", "Fisik", "Selisih", "Status", "Tumpak Sistem", "Tumpak Aktual", "Item Aktual", "Keterangan"]];
  const lbl = { bin: "Per Bin", dc: "DC Harian", aging: "Aging" };
  const a = dayKey(r.start), b = dayKey(r.end);
  events.filter((e) => { const k = toKey(e.at); return k >= a && k <= b; })
    .sort((x, y) => (x.at > y.at) - (x.at < y.at))
    .forEach((e) => rows.push([lbl[e.mod] || e.mod, e.at, e.by || "", e.key || "", e.area || "", e.item || "", e.sys ?? "", e.fis ?? "", Number(e.diff) || 0, e.mod === "bin" ? binStatus(e).label : e.ok ? "Sesuai" : "Selisih", e.tumpakSys || "", e.tumpak || "", e.itemAct || "", e.why || ""]));
  return "\ufeff" + rows.map((x) => x.map(q).join(",")).join("\r\n");
}
