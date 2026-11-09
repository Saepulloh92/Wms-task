// Uji logika murni aging:  node tests/aging.mjs
import { buildAging, normSignal, checklist, groupByClass, buildPool, suggest, actualOf } from "../src/lib/aging.js";
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
// pilihan tumpak/item: campuran huruf+angka, nilai sistem di atas, saring saat mengetik
const pool = buildPool([{ v: "AJ896", area: "F" }, { v: "AJ896", area: "F" }, { v: "AJ767", area: "F" }, { v: "AK140", area: "G" }, { v: " ", area: "F" }, { v: "Sesuai" }, { v: "AJ10", area: "P" }]);
ok(pool.length === 4, "pool unik, abaikan kosong dan 'Sesuai'");
ok(suggest(pool, "", { pin: "AK140", area: "F" }).join() === "AK140,AJ896,AJ767,AJ10", "pilihan: nilai sistem dulu, lalu searea/terbanyak");
ok(suggest(pool, "aj", { area: "F" }).join() === "AJ896,AJ767,AJ10", "saring 'aj' (tidak peka huruf besar)");
ok(suggest(pool, "AJ896").length === 0, "nilai yang sudah sama persis tidak ditawarkan lagi");
ok(suggest(pool, "", { limit: 2 }).length === 2, "batas jumlah pilihan");
// --- actualOf: nilai aktual rak Aging (satu aturan untuk tampilan, laporan, CSV)
{
  const x = { tumpak: "AK140", item: "PIPA A", onhand: 100 };
  const t = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
  const s1 = actualOf(x, { tumpak: "Sesuai", pipa: "Sesuai", qty: "100", sesuai: true });
  t(s1.ok && s1.tumpak === "AK140" && s1.item === "PIPA A" && s1.qty === 100, "'Semua sama' → tumpak & item = nilai sistem (bukan teks 'Sesuai')");
  t(actualOf(x, { tumpak: " ak 140 ", pipa: "pipa a", qty: "100" }).ok, "tumpak/item sama walau beda huruf besar & spasi");
  const s3 = actualOf(x, { tumpak: "AK141", pipa: "PIPA A", qty: "100" });
  t(!s3.ok && !s3.tumpakOk && s3.reasons.join() === "tumpak beda", "tumpak beda → selisih walau qty sama");
  const s4 = actualOf(x, { tumpak: "AK140", pipa: "PIPA B", qty: "98" });
  t(!s4.ok && s4.diff === -2 && s4.reasons.join() === "qty -2,item beda", "qty & item beda → dua alasan");
  const s5 = actualOf(x, { tumpak: "AK140", pipa: "", qty: "" });
  t(!s5.ok && s5.reasons.join() === "qty belum diisi", "qty belum diisi → belum sesuai");
  t(actualOf({ item: "PIPA A", onhand: 5 }, { tumpak: "ZZ9", qty: "5" }).ok, "tumpak sistem kosong → tidak bisa dibandingkan, tidak dianggap beda");
  t(actualOf(x, null) === null, "tanpa catatan → null");
}

process.exit(fail ? 1 : 0);
