// Uji UX Clearing: kartu ringkasan = pintasan filter, filter "Selisih / dobel" & "Belum dihitung", urutan, jumlah hasil, bar filter menempel.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/clearing-ux.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

// 40 voucher: 0-14 cocok, 15-26 selisih (besar bervariasi), 27-39 belum dihitung
const rep = [], cnt = [];
for (let i = 0; i < 40; i++) {
  const v = String(4044000 + i), q = 200;
  rep.push({ v, q, k: "10172010060058", n: "STD AW 2", r: "A-01", lr: "B 1234 XY", sh: i % 2 ? "Shift 1" : "Shift 2", pic: "", grp: "" });
  if (i < 15) cnt.push({ v, q, k: "AB1234567", t: "", lr: "" });
  else if (i < 27) cnt.push({ v, q: q - (((i * 7) % 12) + 1) * 5, k: "AB1234567", t: "", lr: "" }); // selisih -5 .. -60, tidak berurutan (terbesar -60: voucher 4044017)
}

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await p.addInitScript(({ fx, rep, cnt }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
  localStorage.setItem("warehouse_so_clr_cnt_v1", JSON.stringify({ at: Date.now(), src: "file", rows: cnt }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep, cnt });
await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(600);

const cards = () => p.$$eval("#clrList .vc", (a) => a.length);
const count = () => p.$eval("#clrCount", (e) => e.textContent.trim());
const on = () => p.$eval("#clrChips .chip.on", (e) => e.dataset.k);

ok((await on()) === "bad", "data pertama termuat: langsung ke 'Perlu dicek'");
ok((await count()) === "Menampilkan 25 dari 40 voucher", "jumlah hasil: " + (await count()));

await p.click('#clrStats [data-go="ok"]'); await p.waitForTimeout(300);
ok((await on()) === "ok" && (await cards()) === 15, "kartu Cocok -> filter Cocok, 15 voucher");
await p.click('#clrStats [data-go="ok"]'); await p.waitForTimeout(300);
ok((await on()) === "all" && (await cards()) === 40, "ketuk lagi -> kembali ke Semua (40)");

await p.click('#clrStats [data-go="sel"]'); await p.waitForTimeout(300);
ok((await on()) === "sel" && (await cards()) === 12, "kartu Selisih -> 12 voucher selisih");
const chipSel = await p.$eval('#clrChips [data-k="sel"]', (e) => e.textContent.trim());
ok(/12$/.test(chipSel), "angka chip sama dengan kartu: " + chipSel);

await p.click('#clrStats [data-go="belum"]'); await p.waitForTimeout(300);
ok((await on()) === "belum" && (await cards()) === 13, "kartu Belum dihitung -> 13 voucher");

await p.click('#clrChips [data-k="sel"]'); await p.waitForTimeout(200);
await p.selectOption("#clrSort", "selisih"); await p.waitForTimeout(300);
const first = await p.$eval("#clrList .vc .id", (e) => e.textContent.trim());
ok(first === "4044017", "urut 'Selisih terbesar': teratas 4044017 (" + first + ")");
await p.selectOption("#clrSort", "voucher"); await p.waitForTimeout(300);
const first2 = await p.$eval("#clrList .vc .id", (e) => e.textContent.trim());
ok(first2 === "4044026", "urut 'No voucher (terbaru)': teratas 4044026 (" + first2 + ")");
await p.selectOption("#clrSort", "asli"); await p.waitForTimeout(300);
const first3 = await p.$eval("#clrList .vc .id", (e) => e.textContent.trim());
ok(first3 === "4044015", "urut 'Urutan laporan': teratas 4044015 (" + first3 + ")");

await p.click('#clrChips [data-k="all"]'); await p.waitForTimeout(200);
await p.fill("#clrQ", "4044031"); await p.waitForTimeout(500);
ok((await cards()) === 1 && (await count()) === "Menampilkan 1 dari 40 voucher", "pencarian: 1 voucher, jumlah hasil ikut");
await p.fill("#clrQ", ""); await p.waitForTimeout(500);

// bar filter tetap terlihat di bawah header saat daftar digulir
await p.evaluate(() => { const l = document.getElementById("clrList"); window.scrollTo(0, l.getBoundingClientRect().top + window.scrollY + 600); });
await p.waitForTimeout(300);
const pos = await p.evaluate(() => ({ bar: document.getElementById("clrBar").getBoundingClientRect().top, hdr: document.querySelector("header").getBoundingClientRect().bottom }));
ok(Math.abs(pos.bar - pos.hdr) <= 2, `bar filter menempel di bawah header (bar ${Math.round(pos.bar)}px, header ${Math.round(pos.hdr)}px)`);
const noHs = await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
ok(noHs, "tanpa geser horizontal");
await p.keyboard.press("Escape");
if (process.env.SHOT) { await p.evaluate(() => window.scrollTo(0, 0)); await p.screenshot({ path: process.env.SHOT + "-atas.png" }); await p.evaluate(() => window.scrollTo(0, 900)); await p.screenshot({ path: process.env.SHOT + "-scroll.png" }); }
ok(errs.length === 0, "tanpa error JavaScript " + errs.join("|"));
await b.close();
console.log(fail ? fail + " gagal" : "semua OK");
process.exit(fail ? 1 : 0);
