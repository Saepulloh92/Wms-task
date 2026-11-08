// Uji fungsional filter posisi rak (Bawah B / Atas A / Tanpa huruf) di menu Periksa Bin.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/rakfilter.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));

// fixture + dua rak tambahan: rak tanpa huruf (G-02) dan penulisan tanpa tanda hubung (B1-20B)
const master = FX("master.json");
const extra = (bin, area) => ({ ...master[0], bin, area });
master.push(extra("G-02", "B1"), extra("B1-20B", "B1"));

const seed = ({ master, users }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(users));
  localStorage.setItem("warehouse_so_counts_v2", JSON.stringify({}));
  localStorage.setItem("warehouse_so_closed_v1", JSON.stringify({}));
};

let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.addInitScript(seed, { master, users: FX("users.json") });
await page.goto(url);
await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await page.evaluate(() => window.go("so"));
await page.waitForTimeout(300);

const bins = () => page.$$eval("#binList .bin b", (e) => e.map((x) => x.textContent.trim()));
const chip = (re) => page.locator("#chipsR .chip", { hasText: re });
const press = async (re) => { await chip(re).click(); await page.waitForTimeout(150); };
const isB = (b) => /\d-?B$/i.test(b), isA = (b) => /\d-?A$/i.test(b);

const all = await bins();
const nB = all.filter(isB).length, nA = all.filter(isA).length, nN = all.length - nA - nB;
ok(await page.locator("#chipsR").isVisible(), "baris filter rak tampil");
ok(all.length === 38 && nB === 19 && nA === 18 && nN === 1, `data uji: total ${all.length}, B ${nB}, A ${nA}, tanpa huruf ${nN}`);
ok((await chip(/Bawah \(B\)\s*19/).count()) === 1 && (await chip(/Atas \(A\)\s*18/).count()) === 1 && (await chip(/Tanpa huruf\s*1/).count()) === 1, "jumlah di chip sesuai");

await press(/Bawah/);
let l = await bins();
ok(l.length === nB && l.every(isB), `Bawah: ${l.length} bin, semuanya berakhiran B`);
const nxt = await page.locator("#nextBin").getAttribute("data-b");
ok(l.includes(nxt), `tombol Lanjut mengikuti filter (${nxt})`);

await press(/Atas/);
l = await bins();
ok(l.length === nA && l.every(isA), `Atas: ${l.length} bin, semuanya berakhiran A`);

await press(/Tanpa huruf/);
l = await bins();
ok(l.length === 1 && l[0] === "G-02", "Tanpa huruf: hanya G-02");

await press(/Bawah/);
await page.reload();
await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await page.evaluate(() => window.go("so"));
await page.waitForTimeout(300);
l = await bins();
ok(l.length === nB && l.every(isB), "pilihan Bawah tersimpan setelah muat ulang");

await press(/Semua rak/);
ok((await bins()).length === all.length, "Semua rak: kembali ke seluruh bin");
ok(errors.length === 0, "tanpa error JavaScript" + (errors.length ? ": " + errors.join("; ") : ""));

await browser.close();
process.exit(fail ? 1 : 0);
