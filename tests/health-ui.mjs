// Uji UI Kesehatan data:  npm run build && npx vite preview --port 4173 &  lalu  node tests/health-ui.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const master = FX("master.json"), users = FX("users.json");
const seed = ({ master, users, counts }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(users));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_counts_v2", JSON.stringify(counts));
  localStorage.setItem("warehouse_so_closed_v1", "{}");
};
const browser = await chromium.launch();
async function run(name, { m, c, u }, fn) {
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  await page.addInitScript(seed, { master: m, users: u, counts: c });
  await page.goto(url);
  await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  await fn(page);
  ok(errs.length === 0, name + ": tanpa galat JS" + (errs.length ? " " + errs[0] : ""));
  await page.close();
}
const iso = (min) => new Date(Date.now() + min * 60000).toISOString();
const first = master[0];

// 1) data rusak: master ganda + hasil periksa yatim + cap waktu masa depan
await run("data rusak", {
  m: [...master, { ...first }],
  c: { "ZZ-NOPE-1": { itemMatch: true, actualItems: [], actualItem: "X", actualQty: 5, note: "", savedAt: iso(-1), by: "Andi", systemQty: 5 },
       [first.bin]: { itemMatch: true, actualItems: [], actualItem: first.item, actualQty: first.onhand, note: "", savedAt: iso(180), by: "Andi", systemQty: first.onhand } },
  u: users,
}, async (page) => {
  await page.waitForTimeout(3200); // hlRun pertama (2,5 dtk) -> sinkron belum tersambung juga ditandai
  await page.evaluate(() => window.go("data"));
  await page.waitForTimeout(300);
  const txt = await page.locator("#hlPanel").innerText();
  ok(/Baris data WMS ganda/.test(txt), "panel: master ganda tampil");
  ok(/tidak ada di data WMS/.test(txt), "panel: hasil periksa yatim tampil");
  ok(/masa depan/.test(txt), "panel: cap waktu masa depan tampil");
  ok(/perlu ditindaklanjuti/.test(txt), "panel: ringkasan jumlah tampil");
  const b = page.locator("#hlB");
  ok(await b.isVisible(), "lencana header tampil");
  ok(/bad/.test(await b.getAttribute("class")) && Number(await b.innerText()) >= 3, "lencana merah dengan jumlah temuan");
  await page.locator("#hlPanel .hl-bins button", { hasText: first.bin }).first().click();
  await page.waitForTimeout(400);
  ok(await page.locator("#sheet").isVisible(), "klik bin di panel membuka lembar periksa");
  ok((await page.evaluate(() => document.getElementById("v-so") && !document.getElementById("v-so").hidden)), "pindah ke menu Periksa Bin");
});

// 2) data bersih
await run("data bersih", { m: master, c: {}, u: users }, async (page) => {
  await page.evaluate(() => { window.SY_DUMMY = 1; });
  await page.waitForTimeout(3200);
  await page.evaluate(() => window.go("data"));
  await page.waitForTimeout(300);
  const txt = await page.locator("#hlPanel").innerText();
  // satu-satunya temuan yang wajar: belum tersambung ke server (peringatan, bukan galat)
  ok(!/Baris data WMS ganda|tidak valid|masa depan/.test(txt), "bersih: tidak ada temuan data");
  ok(/Belum tersambung ke server/.test(txt), "bersih: hanya peringatan belum tersambung");
});
await browser.close();
console.log(fail ? fail + " gagal" : "semua OK"); process.exit(fail ? 1 : 0);
