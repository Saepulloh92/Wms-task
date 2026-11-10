// Uji Clearing: nama foto counting berbentuk "4043742_2026-11-06-100438" harus cocok dengan voucher 4043742 di laporan.
// Meniru kasus nyata: 79 voucher di laporan, 10 di antaranya (4043733..4043742) bernama foto bertanggal; ada voucher dengan beberapa foto,
// foto sampah (photo_..., angka pendek), dan akhiran "(1)".
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/clearing-voucher.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const rep = [], cnt = [];
for (let i = 0; i < 79; i++) {
  const no = String(4043700 + i), q = 100 + i * 10;
  rep.push({ v: no, q, k: "10172010060058", n: "STD AW 2", r: "A-01", lr: "B 1234 XY", sh: "Shift 1", pic: "", grp: "" });
  const stamped = i >= 33 && i <= 42; // 4043733..4043742
  if (stamped) cnt.push({ v: `${no}_2026-11-06-1004${String(i).padStart(2, "0")}`, q, k: "AB1234567", t: "2026-11-06 10:04:00", lr: "" });
  else if (i % 7 === 0) cnt.push({ v: no, q, k: "AB1234567", t: "", lr: "" });
  else if (i % 5 === 0) cnt.push({ v: `${no}(1)`, q, k: "AB1234567", t: "", lr: "" });
  else cnt.push({ v: no, q, k: "AB1234567", t: "", lr: "" });
}
// satu voucher punya beberapa foto: yang waktunya terbaru dipakai (qty lama salah, qty baru benar)
const multi = String(4043700 + 35);
cnt.push({ v: `${multi}_2026-11-06-090000`, q: 999, k: "AB1234567", t: "2026-11-06 09:00:00", lr: "" });
cnt.find((c) => c.v.startsWith(multi + "_2026-11-06-10")).t = "2026-11-06 10:10:00";
// foto sampah yang tidak boleh mengganggu
["photo_2026-10-02_09-15-00", "photo_2026-10-02_09-15-01", "4521", "88", "20261106_100438"].forEach((v) => cnt.push({ v, q: 5, k: "", t: "", lr: "" }));

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.addInitScript(({ fx, rep, cnt }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
  localStorage.setItem("warehouse_so_clr_cnt_v1", JSON.stringify({ at: Date.now(), src: "file", rows: cnt }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep, cnt });
await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(600);
const R = await p.evaluate(() => { const l = clrBuild(); const c = {}; l.forEach((x) => (c[x.st] = (c[x.st] || 0) + 1)); return { n: l.length, c, stamped: l.filter((x) => +x.v >= 4043733 && +x.v <= 4043742).map((x) => x.st + ":" + x.qC), multi: l.find((x) => x.v === "4043735") }; });
console.log("hasil:", JSON.stringify(R.c), "dari", R.n);
ok(R.n === 79, "79 voucher laporan diproses");
ok(R.c.ok === 79 && !R.c.belum, "79 cocok, 0 belum dihitung (foto bertanggal ikut cocok)");
ok(R.stamped.length === 10 && R.stamped.every((s) => s.startsWith("ok:")), "10 voucher 4043733..4043742 (nama foto bertanggal) cocok qty-nya");
ok(R.multi && R.multi.st === "ok" && R.multi.rc === 2, "voucher dengan 2 foto: dipakai foto terbaru (qty benar), 2 baris counting");
const txt = await p.evaluate(() => document.getElementById("v-clr").innerText.replace(/\s+/g, " "));
ok(/79/.test(txt), "layar Clearing menampilkan angka 79");
ok(errs.length === 0, "tanpa error JavaScript " + errs.join(";"));
// skenario 2: ada voucher yang memang belum dihitung -> diagnosa menunjukkan versi aturan dan nama counting yang mirip
const p2 = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p2.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const cnt2 = cnt.filter((c) => !c.v.startsWith("4043750")); cnt2.push({ v: "404375", q: 5, k: "", t: "", lr: "" });
await p2.addInitScript(({ fx, rep, cnt }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep })); localStorage.setItem("warehouse_so_clr_cnt_v1", JSON.stringify({ at: Date.now(), src: "file", rows: cnt }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep, cnt: cnt2 });
await p2.goto(url); await p2.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await p2.evaluate(() => window.go("clr")); await p2.waitForTimeout(600);
const dg = await p2.evaluate(() => (document.getElementById("clrDiag").textContent || "").replace(/\s+/g, " "));
ok(/aturan angka-depan-v2/.test(dg), "diagnosa menampilkan versi aturan pencocokan");
ok(/4043750/.test(dg) && /404375/.test(dg) && /kunci 4043750/.test(dg), "diagnosa menjelaskan voucher belum dihitung + nomor counting yang mirip");
await b.close(); process.exit(fail ? 1 : 0);
