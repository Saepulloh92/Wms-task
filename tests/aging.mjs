// Uji logika murni aging:  node tests/aging.mjs
import { buildAging, normSignal, checklist } from "../src/lib/aging.js";
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
ok(normSignal(" KUNING  2 ") === "Kuning 2" && normSignal("merah") === "Merah" && normSignal("x") === "", "normSignal");
const rows = [
  { bin: "A-01", kode: "k1", onhand: 10, sinyal: "Hijau 1", aging: 3 },
  { bin: "A-02", kode: "k1", onhand: 5, sinyal: "Kuning 1", aging: 40 },
  { bin: "A-03", kode: "k2", onhand: 7, sinyal: "Kuning 3", aging: 90 },
  { bin: "A-04", kode: "k2", onhand: 0, sinyal: "Merah", aging: 200 },
  { bin: "A-05", kode: "k3", onhand: 2, sinyal: "Merah", aging: 150 },
];
const a = buildAging(rows, { k1: "A", k2: "B" });
ok(a.filled === 4, "rak kosong tidak dihitung");
ok(a.bySignal["Kuning 1"] === 1 && a.bySignal.Merah === 1, "hitung per sinyal");
ok(a.byClass.A["Kuning 1"] === 1 && a.byClass.B["Kuning 3"] === 1 && a.byClass["-"].Merah === 1, "hitung per kelas");
ok(a.kuning.A === 1 && a.kuning.B === 1 && a.kuningTotal === 2, "total kuning");
const c = checklist(rows);
ok(c.map((x) => x.bin).join() === "A-05,A-03,A-02", "ceklis urut terparah dulu");
process.exit(fail ? 1 : 0);
