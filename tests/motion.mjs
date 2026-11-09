// Uji kehalusan UI: transisi menu, mode "kurangi gerakan", dashboard tanpa kedip + skeleton, alur keyboard form cek Aging.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/motion.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const rows = Array.from({ length: 80 }, () => Array(50).fill(""));
const cell = (a, v) => { const m = /^([A-Z]+)(\d+)$/.exec(a); let n = 0; for (const ch of m[1]) n = n * 26 + ch.charCodeAt(0) - 64; rows[+m[2] - 1][n - 1] = v; };
Object.entries({ B28: "28", N43: "27", J43: "0", F43: "27", B43: "0", S12: "5", W12: "4" }).forEach(([k, v]) => cell(k, v));
const b = await chromium.launch();
async function open(opts = {}) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, ...opts });
  const p = await ctx.newPage();
  p.errs = []; p.on("pageerror", (e) => p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rows }) => {
    localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
    localStorage.setItem("warehouse_so_dlv_v1", JSON.stringify({ url: "", auto: 0 })); localStorage.setItem("warehouse_so_dlvc_v1", JSON.stringify({ at: Date.now(), rows }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rows });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  return p;
}
// 1) pindah menu memakai animasi pudar, lalu selesai tampil penuh
let p = await open();
await p.evaluate(() => window.go("mon"));
ok((await p.evaluate(() => getComputedStyle(document.getElementById("v-mon")).animationName)) === "viewIn", "menu baru tampil dengan animasi pudar");
await p.waitForTimeout(450);
ok((await p.evaluate(() => getComputedStyle(document.getElementById("v-mon")).opacity)) === "1", "animasi selesai, menu tampil penuh");
// 2) dashboard tidak dipasang ulang bila datanya sama (tanpa kedip, scroll tetap)
const same = await p.evaluate(() => { const el = document.getElementById("dlvBody").firstElementChild; el.__m = 1; dlvRender(); return document.getElementById("dlvBody").firstElementChild.__m === 1; });
ok(same, "muat ulang dengan data sama tidak membangun ulang tampilan");
// 3) skeleton saat pertama dimuat
const skl = await p.evaluate(() => { const c = dlvCache, bz = dlvBusy; dlvCache = null; dlvBusy = true; dlvRender(); const has = !!document.querySelector("#dlvBody .skl"); dlvCache = c; dlvBusy = bz; dlvRender(); return has; });
ok(skl, "kerangka pemuat (skeleton) tampil saat dashboard dimuat");
ok(await p.evaluate(() => !!document.querySelector("#dlvBody .kc")), "setelah dimuat kartu KPI kembali tampil");
// 4) alur Aging: Enter berpindah kolom, simpan di kolom terakhir, pilihan tumpak memindahkan fokus
await p.evaluate(() => window.go("data"));
await p.setInputFiles("#file", new URL("./fixtures/aging-excel.csv", import.meta.url).pathname); await p.click("#btnImp"); await p.waitForTimeout(400);
const d = p.getByRole("button", { name: /Ganti data/ }); if (await d.count()) await d.first().click();
await p.waitForTimeout(700); await p.evaluate(() => window.go("agi")); await p.waitForTimeout(500);
await p.locator("#v-agi .agi-rak > summary").first().click();
const inp = p.locator("#v-agi .agi-rak[open] .agi-form input");
await inp.nth(0).waitFor({ state: "visible", timeout: 1500 });
ok(true, "kartu rak terbuka dan form terlihat (animasi buka tidak menahan)");
const act = () => p.evaluate(() => { const a = document.activeElement; return [...document.querySelectorAll("#v-agi .agi-rak[open] .agi-form input")].indexOf(a); });
await p.locator('#v-agi .agi-rak[open] [aria-label="Pilihan tumpak"] button').first().click();
await p.waitForFunction(() => document.activeElement && document.activeElement.placeholder === "Ketik atau pilih item", null, { timeout: 1500 }).catch(() => {});
ok((await act()) === 1, "pilih tumpak -> fokus pindah ke kolom Item");
await inp.nth(0).click(); await inp.nth(0).fill("AJ790"); await p.keyboard.press("Enter");
ok((await act()) === 1, "Enter di tumpak -> kolom Item");
await p.keyboard.type("STD D"); await p.keyboard.press("Enter");
ok((await act()) === 2, "Enter di Item -> kolom Qty");
await p.keyboard.type("7"); await p.keyboard.press("Enter"); await p.waitForTimeout(400);
const rec = await p.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_aging_v1") || "{}")["P-77"]);
ok(rec && rec.qty === "7" && rec.tumpak === "AJ790", "Enter di Qty -> tersimpan tanpa menekan tombol");
ok(p.errs.length === 0, "tanpa error JavaScript " + p.errs.join(";"));
await p.context().close();
// 5) mode kurangi gerakan: animasi mati
p = await open({ reducedMotion: "reduce" });
await p.evaluate(() => window.go("mon"));
ok((await p.evaluate(() => getComputedStyle(document.getElementById("v-mon")).animationName)) === "none", "mode 'kurangi gerakan' mematikan animasi");
await p.context().close();
await b.close(); process.exit(fail ? 1 : 0);
