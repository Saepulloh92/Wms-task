import { periodStart, shiftPeriod, periodLabel, buckets, dayKey, buildReport, reportText, reportCsv, tone, muatTone } from "../src/lib/report.js";
let bad = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) bad++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? "" : "  → " + JSON.stringify(a) + " ≠ " + JSON.stringify(b))); };
const D = (m, d, h = 9) => new Date(2026, m - 1, d, h);
const t = (m, d, h = 9) => D(m, d, h).toISOString();

// ---- Periode
eq(dayKey(periodStart("week", D(11, 8))), "2026-11-02", "Minggu 8 Nov → Senin 2 Nov");
eq(dayKey(periodStart("month", D(11, 8))), "2026-11-01", "Bulan: tanggal 1");
eq(dayKey(periodStart("year", D(11, 8))), "2026-01-01", "Tahun: 1 Jan");
eq([periodLabel("week", D(11, 2)), periodLabel("week", D(10, 26)), periodLabel("month", D(11, 1)), periodLabel("year", D(1, 1))], ["2–8 Nov 2026", "26 Okt–1 Nov 2026", "November 2026", "2026"], "label periode");
eq(dayKey(shiftPeriod("month", D(1, 1), -1)), "2025-12-01", "mundur satu bulan lintas tahun");
eq(dayKey(shiftPeriod("year", D(1, 1), 1)), "2027-01-01", "maju satu tahun");
eq([buckets("week", D(11, 2), D(11, 5)).length, buckets("month", D(2, 1), D(2, 5)).length, buckets("month", D(11, 1), D(11, 5)).length, buckets("year", D(1, 1), D(11, 5)).length], [7, 28, 30, 12], "jumlah ember: 7 / 28 (Feb 2026) / 30 / 12");
ok(buckets("week", D(11, 2), D(11, 5))[3].isToday && buckets("week", D(11, 2), D(11, 5))[4].isFuture, "hari ini & masa depan ditandai");

// ---- Data uji
const events = [
  { mod: "bin", at: t(11, 2), by: "Ani", ok: true, diff: 0, key: "B1-01-A", area: "B1", item: "PIPA 3", sys: 10, fis: 10 },
  { mod: "bin", at: t(11, 2, 10), by: "Ani", ok: false, diff: -3, key: "B1-02-A", area: "B1", item: "PIPA 4", sys: 10, fis: 7 },
  { mod: "bin", at: t(11, 4), by: "Budi", ok: true, diff: 0, key: "B2-01-A", area: "B2", item: "PIPA 5", sys: 5, fis: 5 },
  { mod: "bin", at: t(11, 6), by: "Budi", ok: false, diff: 8, key: "B2-02-A", area: "B2", item: "PIPA 6", sys: 2, fis: 10 },
  { mod: "bin", at: t(10, 28), by: "Ani", ok: true, diff: 0, key: "B1-09-A", area: "B1", item: "PIPA 7", sys: 1, fis: 1 }, // bulan lalu & minggu lalu
  { mod: "bin", at: t(3, 10), by: "Ani", ok: true, diff: 0, key: "B1-10-A", area: "B1", item: "PIPA 8", sys: 1, fis: 1 }, // Maret
  { mod: "dc", at: t(11, 3), by: "Budi", ok: false, diff: 5, key: "PIPA 3" },
  { mod: "aging", at: t(11, 4), by: "Ani", ok: true, diff: 0, key: "B1-05-A", area: "B1" },
];
const muat = [{ tgl: "2026-10-28", by: "Ani", dp: 7, total: 6, cpS: 0 }, { tgl: "2026-11-02", by: "Ani", dp: 10, total: 8, cpS: 1 }, { tgl: "2026-11-04", by: "Budi", dp: 5, total: 4, cpS: 0 }];
const clr = [{ tgl: "2026-11-03", by: "Ani", n: 20, ok: 18, bad: 2 }];
const base = { today: D(11, 5, 10), events, muat, clr, staff: ["Ani", "Budi", "Citra"], agingTodo: 3, binTodo: 9, areaTotals: { B1: 20, B2: 16 } };

// ---- Mingguan
const w = buildReport({ ...base, period: "week", start: D(11, 2) });
eq([w.mods.bin.n, w.mods.bin.ok, w.mods.bin.bad], [4, 2, 2], "Mingguan: Per Bin 4 diperiksa, 2 sesuai, 2 selisih (minggu lalu tidak ikut)");
eq(w.mods.bin.perB, [2, 0, 1, 0, 1, 0, 0], "Mingguan: ember harian");
eq([w.mods.bin.pos, w.mods.bin.neg], [8, -3], "qty lebih/kurang");
eq([w.mains.muat, w.mods.muat.spm, w.mods.muat.mobil], [2, 15, 12], "Muat minggu ini: 2 hari, 15 SPM, 12 mobil");
eq([w.elapsedDays, w.totalDays], [4, 7], "hari berjalan 4 dari 7");
eq(w.prevMains.bin, 1, "minggu lalu (sampai hari yang sama): 1 bin");
ok(w.flags.some((f) => f.t.includes("Laporan Muat kosong 1 hari: Sel")) || w.flags.some((f) => f.t.includes("kosong")), "Muat kosong terdeteksi sejak laporan pertama");
ok(w.flags.some((f) => f.t.includes("9 bin belum pernah")) && w.flags.some((f) => f.t.includes("Citra")), "bin belum diperiksa & petugas tanpa aktivitas ditandai");
eq(w.areas.map((a) => [a.area, a.n, a.bad, a.total]), [["B1", 2, 1, 20], ["B2", 2, 1, 16]], "Per area: B1 & B2 (2 diperiksa, 1 selisih)");
eq(w.topBad.map((e) => e.key), ["B2-02-A", "B1-02-A"], "Selisih terbesar urut |selisih|");
eq(w.bins.length, 4, "daftar bin periode");

// ---- Bulanan
const mo = buildReport({ ...base, period: "month", start: D(11, 1) });
eq([mo.mods.bin.n, mo.buckets.length, mo.mods.bin.perB[1], mo.mods.bin.perB[5]], [4, 30, 2, 1], "Bulanan: 4 bin, 30 ember, tgl 2 = 2, tgl 6 = 1");
const okt = buildReport({ ...base, period: "month", start: D(10, 1), today: D(11, 5) });
eq([okt.mods.bin.n, okt.mains.muat, okt.elapsedDays], [1, 1, 31], "Oktober (lewat): 1 bin, 1 laporan Muat, 31 hari penuh");

// ---- Tahunan
const th = buildReport({ ...base, period: "year", start: D(1, 1) });
eq([th.mods.bin.n, th.buckets.length, th.mods.bin.perB[2], th.mods.bin.perB[9], th.mods.bin.perB[10]], [6, 12, 1, 1, 4], "Tahunan: 6 bin; Mar=1, Okt=1, Nov=4");
eq(th.mains.muat, 3, "Tahunan: 3 hari laporan Muat");
eq(th.prevMains.bin, 0, "Tahun lalu kosong");

// ---- Filter
const fa = buildReport({ ...base, period: "week", start: D(11, 2), filters: { area: "B2" } });
eq([fa.mods.bin.n, fa.mods.aging.n, fa.mods.dc.n], [2, 0, 1], "Filter area B2: bin 2, aging 0 (area B1), DC tetap (tanpa area)");
const fb = buildReport({ ...base, period: "week", start: D(11, 2), filters: { by: "Budi" } });
eq([fb.mods.bin.n, fb.mods.dc.n, fb.mods.muat.days, fb.mods.clr.vouchers, fb.people.length], [2, 1, 1, 0, 1], "Filter petugas Budi: hanya aktivitas Budi");
ok(!fb.flags.some((f) => f.t.includes("Citra")), "Filter petugas: tidak menampilkan petugas lain sebagai tak aktif");

// ---- Keluaran
const tx = reportText(w), tm = reportText(mo, { area: "B1" });
ok(tx.includes("*LAPORAN MINGGUAN GUDANG*") && tx.includes("2–8 Nov 2026") && tx.includes("*Per area (bin)*") && tx.includes("*Selisih terbesar*"), "teks WhatsApp mingguan lengkap");
ok(tm.includes("LAPORAN BULANAN") && tm.includes("Area B1"), "teks WhatsApp bulanan memuat area terfilter");
const csv = reportCsv(w, events);
const lines = csv.replace("\ufeff", "").split("\r\n");
eq([lines.length, lines[0].split(",").length], [1 + 6, 10], "CSV: header + 6 baris (4 bin + 1 DC + 1 aging), 10 kolom");
ok(csv.startsWith("\ufeff"), "CSV pakai BOM agar Excel membaca UTF-8");
eq([tone(0.97), tone(0.9), tone(0.5), tone(null), muatTone(4, 4), muatTone(1, 4)], ["g", "a", "r", "n", "g", "r"], "warna status");
const kosong = buildReport({ period: "month", start: D(11, 1), today: D(11, 5), events: [], staff: [] });
eq([kosong.total, kosong.flags.some((f) => f.lvl === "r")], [0, false], "periode kosong tidak error");
process.exit(bad ? 1 : 0);
