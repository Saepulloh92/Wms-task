// Uji buat tugas otomatis dari data master tanpa import, walau belum ada petugas; lalu dibagikan sesuai area.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/tugas-otomatis.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errors = []; page.on("pageerror", (e) => errors.push(e.message));
const adminOnly = [{ id: "ua0admin", name: "Admin", role: "admin", active: true, areas: [] }];
await page.addInitScript(({ m, u }) => { localStorage.setItem("warehouse_so_master_v2", JSON.stringify(m)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(u)); }, { m: FX("master.json"), u: adminOnly });
await page.goto(url);
await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
if (await page.locator("#lsLater").isVisible()) await page.click("#lsLater");
await page.evaluate(() => window.go("dist")); await page.waitForTimeout(300);
ok(!(await page.locator("#dgGo").isDisabled()), "tombol Buat tugas aktif walau belum ada petugas");
await page.click("#dgMore > summary"); await page.click("#dgGo"); await page.waitForTimeout(300);
await page.getByRole("button", { name: "Buat tugas" }).last().click(); await page.waitForTimeout(600);
const t = (await page.innerText("#tkStats")).replace(/\s+/g, " ");
ok(/Total tugas [1-9]/.test(t), "tugas bin dibuat otomatis dari data master: " + t);
ok((await page.locator("#tkUn [data-tk=auto]").count()) === 1, "tombol Bagikan sesuai area tersedia");
// ulang: tugas yang masih berjalan tidak ditimpa, tombol cepat tidak menambah lagi
await page.evaluate(() => window.go("dist")); await page.waitForTimeout(300);
await page.click("#tskJump").catch(() => {}); await page.waitForTimeout(400);
ok(((await page.innerText("#tkStats")).replace(/\s+/g, " ")).includes("Total tugas 36"), "ulang tidak menggandakan tugas");
ok(errors.length === 0, "tanpa error JavaScript " + errors.join(";"));
await browser.close(); process.exit(fail ? 1 : 0);
