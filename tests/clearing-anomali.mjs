// Uji Peringatan dini voucher (Clearing): pembacaan kolom Mesin/Berat/Jenis, deteksi mesin selang-seling, berat menyimpang, tampilan.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/clearing-anomali.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const R = (v, mc, n, q, nw, gw, extra = {}) => ({ v: String(v), q, k: "", n, r: "", lr: "", sh: "", pic: "", grp: "", mc, nw, gw, afk: false, ...extra });
const rows = [];
let no = 4043250;
// PPL20: D 4" x5, lalu AW 3" (selang-seling), lalu D 4" x3
for (let i = 0; i < 5; i++) rows.push(R(no++, "PPL20", 'D 4"', 80, 400, 420));
rows.push(R(no++, "PPL20", 'AW 3"', 70, 441, 460));
for (let i = 0; i < 3; i++) rows.push(R(no++, "PPL20", 'D 4"', 80, 400, 420));
// PPL16 konsisten
for (let i = 0; i < 6; i++) rows.push(R(no++, "PPL16", 'AW 3"', 70, 420, 440));
// PPL30 memang ganti-ganti item (tidak ada item dominan)
for (let i = 0; i < 4; i++) rows.push(R(no++, "PPL30", i % 2 ? 'D 6"' : 'D 8"', 40, 400, 420));
// PPL24 AW 4": 8 normal (9,0 kg/btg), satu +4,1% (562), satu -2,2% (528)
const w24 = [540, 540, 540, 562, 540, 540, 528, 540, 540, 540];
w24.forEach((w) => rows.push(R(no++, "PPL24", 'AW 4"', 60, w, w + 20)));
// afkir: berat aneh tetapi dikecualikan
rows.push(R(no++, "PPL24", 'AW 4"', 60, 900, 920, { afk: true }));
// berat kotor < bersih
rows.push(R(no++, "PPL16", 'AW 3"', 70, 420, 300));
// grup kecil (item langka) tidak dinilai
rows.push(R(no++, "PPL99", "X 9", 10, 100, 110), R(no++, "PPL99", "X 9", 10, 300, 310));
// urutan input diacak: deteksi harus tetap memakai urutan nomor voucher
const shuffled = rows.slice().sort((a, b) => ((Number(a.v) * 7919) % 101) - ((Number(b.v) * 7919) % 101));

const b = await chromium.launch();
const mk = async (rep) => {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  p.errs = []; p.on("pageerror", (e) => p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rep }) => {
    localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
    if (rep) localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rep });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  return p;
};
let p = await mk(shuffled);
// 1) pembacaan kolom laporan
const parsed = await p.evaluate(() => clrParseRep([
  ["Laporan Voucher"], ["No Voucher", "Mesin", "Nama Item", "Qty", "Berat Bersih", "Berat Kotor", "Jenis", "Status"],
  ["4043290", "PPL20", 'D 4"', "82", "418", "440", "Standar", "Close"], ["4043291", "PPL20", 'D 4"', "10", "1.234,5", "1.300", "Afkir", "Close"],
]));
ok(parsed.length === 2 && parsed[0].mc === "PPL20" && parsed[0].nw === 418 && parsed[0].gw === 440 && parsed[0].afk === false, "laporan: kolom Mesin, Berat bersih, Berat kotor terbaca");
ok(parsed[1].nw === 1234.5 && parsed[1].afk === true, "laporan: angka format Indonesia (1.234,5) dan baris Afkir dikenali");
// 2) lapisan 1: mesin
const A = await p.evaluate((rows) => clrAnomaly(rows, 3), shuffled);
const m = A.machine;
ok(m.length === 1 && m[0].mc === "PPL20" && m[0].item === 'AW 3"' && m[0].usual === 'D 4"' && m[0].alt === true, "PPL20: AW 3\" di antara D 4\" ditandai selang-seling (urutan input diacak)");
ok(!m.some((x) => x.mc === "PPL16" || x.mc === "PPL30"), "mesin konsisten (PPL16) dan mesin ganti-ganti (PPL30) tidak ditandai");
// 3) lapisan 2: berat
const w = A.weight, vv = (x) => w.find((y) => y.v === String(x));
const v562 = rows.filter((r) => r.mc === "PPL24" && r.nw === 562)[0].v, v528 = rows.filter((r) => r.mc === "PPL24" && r.nw === 528)[0].v;
ok(vv(v562) && vv(v562).f[0].dev > 3.9 && vv(v562).f[0].dev < 4.3, "berat bersih 562 (+4,1%) ditandai pada ambang 3%");
ok(!vv(v528), "berat 528 (-2,2%) tidak ditandai pada ambang 3%");
ok(!w.some((x) => x.item === "X 9"), "item langka dengan data terlalu sedikit tidak dinilai");
ok(!w.some((x) => x.f && x.f.some((f) => f.val === 900)), "voucher afkir dikecualikan dari penilaian berat");
const bad = w.find((x) => x.bad);
ok(bad && /lebih kecil/.test(bad.bad) && bad.hi, "berat kotor < berat bersih ditandai sebagai data janggal");
const A2 = await p.evaluate((rows) => clrAnomaly(rows, 2), shuffled);
ok(A2.weight.some((x) => x.v === v528), "ambang 2%: berat 528 ikut ditandai");
// 4) tampilan
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(700);
const T = await p.evaluate(() => document.getElementById("clrAnom").innerText.replace(/\s+/g, " "));
ok(/Peringatan dini voucher/.test(T) && /Selang-seling/.test(T) && /PPL20/.test(T), "layar: ringkasan + baris selang-seling PPL20");
ok(new RegExp(v562).test(T) && /\+4,1%/.test(T), "layar: voucher berat menyimpang tampil dengan deviasi +4,1%");
ok(await p.evaluate(() => document.getElementById("clrAnD").open), "layar: terbuka otomatis karena ada peringatan tinggi");
const nBefore = await p.evaluate(() => document.querySelectorAll("#clrAnom .lrow").length);
await p.evaluate(() => { document.getElementById("clrAnD").open = true; });
await p.selectOption("#clrAnPct", "8"); await p.waitForTimeout(300);
const nAfter = await p.evaluate(() => document.querySelectorAll("#clrAnom .lrow").length);
ok(nAfter < nBefore, "layar: ambang 8% mengurangi peringatan (" + nBefore + " -> " + nAfter + ")");
ok(p.errs.length === 0, "tanpa error JavaScript " + p.errs.join(";"));
await p.context().close();
// 5) laporan tanpa kolom mesin/berat: pesan jelas
p = await mk([{ v: "4043001", q: 10, k: "", n: "AW 3", r: "", lr: "", sh: "", pic: "", grp: "" }]);
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(500);
const T2 = await p.evaluate(() => document.getElementById("clrAnom").innerText.replace(/\s+/g, " "));
ok(/kolom belum terbaca/.test(T2), "laporan lama tanpa kolom mesin/berat: pesan 'kolom belum terbaca'");
await p.context().close();
await b.close(); process.exit(fail ? 1 : 0);
