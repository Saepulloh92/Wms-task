// Uji: HP baru (penyimpanan kosong) langsung tersambung ke sinkron dan menampilkan data tanpa pengaturan manual.
// Membangun aplikasi dengan URL/token PALSU, lalu menjalankan server Apps Script palsu.   node tests/auto-config.mjs
import { createRequire } from "node:module";
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const OUT = "/tmp/dist-auto-config", PORT = 4179;
execSync(`npx vite build --outDir ${OUT} --emptyOutDir`, { env: { ...process.env, VITE_SYNC_URL: "https://mock.test/exec", VITE_SYNC_TOKEN: "token-uji" }, stdio: "ignore" });
const srv = spawn("npx", ["vite", "preview", "--outDir", OUT, "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 3500));
const master = FX("master.json"), users = FX("users.json");
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); // HP baru: tanpa localStorage
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  const reqs = [];
  await page.route(/^https?:\/\/(?!localhost|mock\.test)/, (r) => r.abort());
  await page.route("https://mock.test/**", async (r) => {
    const q = r.request(), h = { "access-control-allow-origin": "*", "content-type": "application/json" };
    if (q.method() === "OPTIONS") return r.fulfill({ status: 204, headers: h });
    const body = q.method() === "POST" ? JSON.parse(q.postData() || "{}") : {};
    reqs.push(body.token || new URL(q.url()).searchParams.get("token"));
    r.fulfill({ headers: h, body: JSON.stringify({ ok: true, rev: 5, mrev: 3, data: { warehouse_so_master_v2: master, warehouse_so_users_v1: users } }) });
  });
  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  await page.waitForTimeout(3500);
  ok(reqs.length > 0 && reqs.every((t) => t === "token-uji"), "HP baru langsung menyambung ke server memakai token bawaan");
  const n = await page.evaluate(() => DATA.length);
  ok(n === master.length, `data gudang terisi otomatis (${n} bin) tanpa impor/pengaturan`);
  const u = await page.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_users_v1") || "[]").length);
  ok(u === users.length, "daftar petugas ikut terisi");
  const cfg = await page.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_sync_v1") || "{}"));
  ok(cfg.url === "https://mock.test/exec" && cfg.token === "token-uji", "pengaturan sinkron terisi otomatis");
  ok(errors.length === 0, "tanpa error JavaScript " + errors.join(";"));
} finally { await browser.close(); srv.kill(); }
process.exit(fail ? 1 : 0);
