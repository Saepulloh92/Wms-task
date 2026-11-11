// Uji ringkasan Clearing untuk Monitoring (murni): node tests/clearing-summary.mjs
import { summarize, fromHistRows, trend } from "../src/lib/clearing-summary.js";
let ok = 0, bad = 0; const T = (n, c) => { console.log((c ? "OK   " : "GAGAL") + " " + n); c ? ok++ : bad++; };
const r = (v, st, qR, qC, extra = {}) => ({ v, shift: "Shift 1", lori: "B 1 X", qR, qC, diff: qC == null ? null : qC - qR, st, done: false, ...extra });
const rows = [r("1", "ok", 100, 100), r("2", "ok", 50, 50), r("3", "qty", 100, 90), r("4", "qty", 100, 130, { shift: "Shift 2" }), r("5", "belum", 70, null, { shift: "Shift 2" }),
  r("6", "dup", 40, 40), r("7", "nq", 10, null), r("8", "qty", 20, 10, { done: true })];
let s = summarize(rows);
T("total & cocok", s.total === 8 && s.ok === 2 && s.pct === 25);
T("rincian status", s.qty === 3 && s.dup === 1 && s.nq === 1 && s.belum === 1);
T("perlu tindak tidak menghitung yang ditandai selesai", s.open === 5 && s.done === 1);
T("qty WMS 490, counting 420", s.wms === 490 && s.cnt === 420);
T("selisih = counting - WMS = -70", s.sel === -70);
T("status cek bila ada yang terbuka", s.status === "cek");
T("daftar teratas: dobel dulu, lalu selisih terbesar", s.top.map((x) => x.v).join() === "6,4,3,7,5");
T("daftar teratas tidak memuat yang selesai/cocok", !s.top.some((x) => x.v === "8" || x.st === "ok"));
T("per shift", s.byShift.length === 2 && s.byShift[0].shift === "Shift 1" && s.byShift[0].total === 6 && s.byShift[1].total === 2 && s.byShift[1].open === 2);
T("topN dibatasi", summarize(rows, 2).top.length === 2);

s = summarize([r("1", "ok", 5, 5), r("2", "qty", 5, 4, { done: true })]);
T("semua cocok/selesai = status ok", s.status === "ok" && s.open === 0);
s = summarize([]); T("kosong aman", s.status === "kosong" && s.total === 0 && s.pct === 0);
s = summarize([r("1", "ok", 5, 5), { v: "9", st: "extra", qR: null, qC: 3 }]);
T("'tidak ada di laporan' tidak dihitung ke total", s.total === 1 && s.extra === 1);
T("input null aman", summarize(null).status === "kosong");
s = summarize([r("1", "ok", 0.1, 0.1), r("2", "ok", 0.2, 0.2), r("3", "qty", 0.3, 0.6)]);
T("desimal tidak berderet (0,1+0,2)", s.sel === 0.3 && String(s.sel).length < 6);

// riwayat tersimpan
const hr = [["10", "Shift 1", "B 1", "10:00", "x", 100, 100, 0, "Cocok", "n", "r", 0, "", ""], ["11", "Shift 2", "B 2", "", "x", 50, 40, -10, "Selisih qty", "n", "r", 0, "", ""],
  ["12", "", "", "", "", 30, null, null, "Belum dihitung", "", "", 1, "", ""], ["13", "", "", "", "", 5, 7, 2, "Label asing", "", "", 0, "", ""]];
const n = fromHistRows(hr);
T("baris riwayat: label status dipetakan", n[0].st === "ok" && n[1].st === "qty" && n[2].st === "belum" && n[3].st === "belum");
T("baris riwayat: qty/diff angka, kosong = null", n[1].qC === 40 && n[1].diff === -10 && n[2].qC === null && n[2].done === true);
T("riwayat rusak/null aman", fromHistRows(null).length === 0 && fromHistRows([null, "x", 5]).length === 0);
s = summarize(n);
T("ringkasan dari riwayat", s.total === 4 && s.ok === 1 && s.done === 1 && s.open === 2);

const h = (tgl, n, ok) => ({ tgl, n, ok, bad: n - ok });
const t = trend([h("2026-11-05", 10, 9), h("2026-11-03", 10, 5), h("2026-11-04", 0, 0), h("2026-11-06", 20, 20)], 7);
T("tren: urut lama->baru, buang hari kosong", t.map((x) => x.tgl).join() === "2026-11-03,2026-11-05,2026-11-06");
T("tren: persen cocok", t.map((x) => x.pct).join() === "50,90,100");
T("tren dibatasi n hari terakhir", trend(Array.from({ length: 12 }, (_, i) => h("2026-10-" + String(10 + i), 10, 10)), 7).length === 7 && trend(null).length === 0);
console.log(`${ok} OK, ${bad} gagal`); process.exit(bad ? 1 : 0);
