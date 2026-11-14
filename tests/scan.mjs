import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/home/claude/Wms-task/")("playwright");
const FX = (n) => JSON.parse(fs.readFileSync("/home/claude/Wms-task/tests/fixtures/" + n, "utf8"));
const master = FX("master.json"), users = FX("users.json");
const b = await chromium.launch({ args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"] });
let bad = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) bad++; };
const mk = async (stub) => {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, permissions: ["camera"] });
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript((s) => {
    localStorage.setItem("warehouse_so_master_v2", JSON.stringify(s.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(s.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
    if (s.stub) window.BarcodeDetector = class { async detect() { return window.__codes || []; } };
    else delete window.BarcodeDetector;
  }, { master, users, stub });
  await p.goto("http://localhost:4173/"); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  await p.evaluate(() => window.go("so")); await p.waitForTimeout(300);
  return [p, errs];
};
// 1) tanpa BarcodeDetector: tombol tersembunyi, papan angka tetap ada
let [p, errs] = await mk(false);
ok(!(await p.locator("#scanBtn").isVisible()) && await p.locator("#padBtn").isVisible(), "tanpa BarcodeDetector: tombol Scan tersembunyi, papan angka tetap");
// 2) dengan BarcodeDetector: scan bin dikenal -> lembar bin terbuka
[p, errs] = await mk(true);
const bin = master[3].bin;
ok(await p.locator("#scanBtn").isVisible(), "dengan BarcodeDetector: tombol Scan terlihat");
await p.locator("#scanBtn").click(); await p.waitForTimeout(600);
ok(await p.locator("#scanSheet").isVisible(), "ketuk Scan -> lembar kamera terbuka");
await p.evaluate(() => (window.__codes = [{ rawValue: "XX-TIDAK-ADA" }])); await p.waitForTimeout(700);
ok((await p.locator("#scanMsg").textContent()).includes("tidak cocok"), "kode tak dikenal -> pesan tidak cocok, kamera tetap jalan");
await p.evaluate((c) => (window.__codes = [{ rawValue: "rak " + c.toLowerCase() + " " }]), bin); await p.waitForTimeout(900);
ok(!(await p.locator("#scanSheet").isVisible()), "kode cocok -> lembar kamera menutup");
ok(await p.locator("#sheet").isVisible() && (await p.locator("#sheet").textContent()).includes(bin), "lembar periksa bin " + bin + " terbuka");
ok(errs.length === 0, "tanpa error JavaScript " + errs.join("|"));
await b.close(); process.exit(bad ? 1 : 0);
