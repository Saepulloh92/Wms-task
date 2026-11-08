import { weekStart, weekLabel, dayKey, buildWeekly, weeklyText, tone } from "../src/lib/weekly.js";
let bad = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) bad++; };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + (JSON.stringify(a) === JSON.stringify(b) ? "" : "  → " + JSON.stringify(a) + " ≠ " + JSON.stringify(b)));

// Minggu Senin 2 Nov 2026 - Minggu 8 Nov 2026 (hari ini = Minggu 8 Nov 2026)
eq(dayKey(weekStart(new Date(2026, 10, 8))), "2026-11-02", "Minggu 8 Nov → Senin 2 Nov");
eq(dayKey(weekStart(new Date(2026, 10, 2))), "2026-11-02", "Senin tetap Senin");
eq(weekLabel(weekStart(new Date(2026, 10, 8))), "2–8 Nov 2026", "label satu bulan");
eq(weekLabel(weekStart(new Date(2026, 9, 30))), "26 Okt–1 Nov 2026", "label lintas bulan");

const start = new Date(2026, 10, 2), today = new Date(2026, 10, 5, 10); // Kamis
const t = (d, h = 9) => new Date(2026, 10, d, h).toISOString();
const r = buildWeekly({
  start, today,
  events: [
    { mod: "bin", at: t(2), by: "Ani", ok: true, diff: 0 },
    { mod: "bin", at: t(2), by: "Ani", ok: false, diff: -3 },
    { mod: "bin", at: t(4), by: "Budi", ok: true, diff: 0 },
    { mod: "bin", at: t(26 - 20 /* 6 Nov */, 9), by: "Budi", ok: true, diff: 0 }, // 6 Nov = Jumat (masa depan, tetap dihitung)
    { mod: "bin", at: new Date(2026, 9, 28).toISOString(), by: "Ani", ok: true, diff: 0 }, // minggu lalu
    { mod: "dc", at: t(3), by: "Budi", ok: false, diff: 5 },
    { mod: "aging", at: t(4), by: "Ani", ok: true, diff: 0 },
  ],
  muat: [{ tgl: "2026-11-02", by: "Ani", dp: 10, total: 8, cpS: 1 }, { tgl: "2026-11-04", by: "Budi", dp: 5, total: 4, cpS: 0 }],
  clr: [{ tgl: "2026-11-03", by: "Ani", n: 20, ok: 18, bad: 2 }],
  staff: ["Ani", "Budi", "Citra"], agingTodo: 3,
});
eq([r.mods.bin.n, r.mods.bin.ok, r.mods.bin.bad], [4, 3, 1], "Per Bin: 4 dihitung, minggu lalu tidak ikut");
eq(r.mods.bin.perDay, [2, 0, 1, 0, 1, 0, 0], "Per Bin per hari");
eq(r.prev.bin.n, 1, "Minggu lalu terbaca terpisah");
eq(r.delta.bin, 3, "Selisih terhadap minggu lalu");
eq([r.mods.dc.n, r.mods.dc.pos], [1, 5], "DC: selisih lebih dicatat");
eq([r.mods.muat.n, r.mods.muat.spm, r.mods.muat.mobil], [2, 15, 12], "Muat: hari lapor, SPM, mobil");
eq([r.mods.clr.vouchers, r.mods.clr.bad], [20, 2], "Clearing: voucher & belum sesuai");
eq(r.mods.bin.acc, 0.75, "akurasi Per Bin 75%");
eq(r.people[0].name, "Ani", "Ani teraktif");
eq(r.people[0].total, 5, "Ani: 2 bin + 1 aging + 1 muat + 1 clearing");
ok(r.flags.some((f) => f.t.includes("Citra")), "petugas tanpa aktivitas ditandai");
ok(r.flags.some((f) => f.t.includes("Kuning/Merah")), "rak Kuning/Merah belum dicek ditandai");
ok(r.flags.some((f) => f.t.startsWith("Laporan Muat kosong: Sel")), "hari Muat kosong (Sel) ditandai, hari ini tidak");
ok(r.flags[0].lvl === "r", "masalah merah di urutan teratas");
ok(!r.flags.some((f) => f.t.includes("Rab")), "Rabu ada laporan Muat, tidak ditandai");
eq([tone(0.97), tone(0.9), tone(0.5), tone(null)], ["g", "a", "r", "n"], "warna status");
ok(weeklyText(r).includes("*LAPORAN MINGGUAN GUDANG*") && weeklyText(r).includes("2–8 Nov 2026"), "teks WhatsApp memuat judul & periode");
const kosong = buildWeekly({ start, today, events: [], staff: [] });
eq([kosong.total, kosong.flags.some((f) => f.lvl === "r")], [0, false], "minggu kosong tidak error");
process.exit(bad ? 1 : 0);
