// Uji login mulus & realtime: sesi tahan reload, keluar di satu tab diikuti tab lain, tombol sibuk, pilihan tidak ter-reset.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/login-smooth.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const master = JSON.parse(fs.readFileSync(new URL("./fixtures/master.json", import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 400, height: 860 } });
const a = await ctx.newPage(); const errors = [];
a.on("pageerror", (e) => errors.push(e.message));
for (const pg of [a]) await pg.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await a.addInitScript((m) => { if (!localStorage.getItem("warehouse_so_master_v2")) localStorage.setItem("warehouse_so_master_v2", JSON.stringify(m)); }, master);
await a.goto(url); await a.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
// aktifkan login (admin pertama)
await a.fill("#lsName", "Admin"); await a.fill("#lsPin", "rahasia123"); await a.fill("#lsPin2", "rahasia123"); await a.click("#lsOk"); await a.waitForTimeout(800);
ok(await a.evaluate(() => !document.getElementById("logoutBtn").hidden), "login aktif dan langsung masuk setelah aktivasi");
await a.reload(); await a.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await a.waitForTimeout(500);
ok(!(await a.locator("#login").isVisible()), "reload tidak meminta login lagi (sesi tersimpan)");
// tab kedua ikut sesi
const b = await ctx.newPage(); await b.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await b.goto(url); await b.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await b.waitForTimeout(400);
ok(!(await b.locator("#login").isVisible()), "tab baru langsung masuk");
// keluar di tab A -> tab B realtime ke layar login
await a.evaluate(() => { document.getElementById("logoutBtn").click(); }); await a.waitForTimeout(600);
ok(await a.locator("#login").isVisible(), "tab A: layar login tampil setelah keluar");
await b.waitForTimeout(500);
ok(await b.locator("#login").isVisible(), "tab B ikut keluar secara realtime");
// ketik password salah: tombol kembali normal, isian tidak hilang oleh sinkron latar
await a.fill("#lgPin", "salah"); await a.click("#lgOk"); await a.waitForTimeout(600);
ok((await a.locator("#lgOk").textContent()).trim() === "Masuk" && !(await a.locator("#lgOk").isDisabled()), "tombol kembali 'Masuk' setelah pemeriksaan");
ok((await a.locator("#lgErr").textContent()).includes("salah"), "pesan password salah");
// masuk benar di A -> B ikut masuk
await a.fill("#lgPin", "rahasia123"); await a.press("#lgPin", "Enter"); await a.waitForTimeout(900);
ok(!(await a.locator("#login").isVisible()), "tab A masuk");
await b.waitForTimeout(500);
ok(!(await b.locator("#login").isVisible()), "tab B ikut masuk secara realtime");
ok(errors.length === 0, "tanpa error JavaScript " + errors.join(";"));
await browser.close(); process.exit(fail ? 1 : 0);
