// Uji logika murni aging:  node tests/aging.mjs
import { buildAging, normSignal, checklist, groupByClass } from "../src/lib/aging.js";
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
// prioritas kelas A > B > C; di dalam kelas Merah dulu, lalu sinyal, aging; tanpa kelas paling akhir
const pr = [
  { bin: "C-1", kode: "k3", onhand: 1, sinyal: "Merah", aging: 249 },
  { bin: "B-1", kode: "k2", onhand: 1, sinyal: "Kuning 3", aging: 100 },
  { bin: "A-2", kode: "k1", onhand: 1, sinyal: "Kuning 4", aging: 90 },
  { bin: "A-1", kode: "k1", onhand: 1, sinyal: "Merah", aging: 200 },
  { bin: "X-1", kode: "k9", onhand: 1, sinyal: "Kuning 3", aging: 95 },
];
const kc = { k1: "A", k2: "B", k3: "C" };
const cp = checklist(pr, "watch", "prioritas", kc);
ok(cp.map((x) => x.bin).join() === "A-1,A-2,B-1,C-1,X-1", "urutan prioritas: kelas A, B, C, lalu belum diatur; Merah dulu dalam kelas");
const gc = groupByClass(cp, kc);
ok(gc.map((g) => g.c + g.items.length + "m" + g.merah).join() === "A2m1,B1m0,C1m1,-1m0", "grup per kelas + hitung merah");
ok(checklist(rows).map((x) => x.bin).join() === "A-05,A-03,A-02", "urutan lama (terparah) tetap sama");
process.exit(fail ? 1 : 0);
