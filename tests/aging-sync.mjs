// Uji sinkron Aging Stock dengan server Apps Script palsu:  npm run build && npx vite preview --port 4173 &  lalu  node tests/aging-sync.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const seed = ({ master, users }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(users));
  localStorage.setItem("warehouse_so_counts_v2", "{}");
  localStorage.setItem("warehouse_so_closed_v1", "{}");
  localStorage.setItem("warehouse_so_sync_v1", JSON.stringify({ url: "https://mock.test/exec", token: "t", auto: true }));
  // data versi awal: cap waktu berupa angka (harus dikonversi ke teks ISO)
  localStorage.setItem("warehouse_so_aging_v1", JSON.stringify({ "B1-01-A": { tumpak: "AK1", pipa: "AW 3", qty: "10", at: 1700000000000 } }));
  localStorage.setItem("warehouse_so_aging_cls_v1", JSON.stringify({ "10172005089004": "A" }));
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
await page.route(/^https?:\/\/(?!localhost|mock\.test)/, (r) => r.abort());
const errors = []; page.on("pageerror", (e) => errors.push(e.message));
const sent = [];
const remote = { warehouse_so_aging_v1: { "B1-09-A": { tumpak: "AK9", pipa: "D4", qty: "77", by: "Budi", at: "2030-01-01T00:00:00.000Z" } } };
await page.route("https://mock.test/**", async (r) => {
  const req = r.request();
  const cors = { "access-control-allow-origin": "*", "content-type": "application/json" };
  if (req.method() === "OPTIONS") return r.fulfill({ status: 204, headers: cors });
  if (req.method() === "GET") return r.fulfill({ headers: cors, body: JSON.stringify({ ok: true, rev: 1, mrev: 1, data: remote }) });
  const b = JSON.parse(req.postData() || "{}"); sent.push(b);
  const merged = { ...b.data, warehouse_so_aging_v1: { ...(b.data.warehouse_so_aging_v1 || {}), ...remote.warehouse_so_aging_v1 } };
  r.fulfill({ headers: cors, body: JSON.stringify({ ok: true, rev: 2, mrev: 1, data: merged }) });
});
await page.addInitScript(seed, { master: FX("master.json"), users: FX("users.json") });
await page.goto(url);
await page.waitForTimeout(1500);
await page.evaluate("go('agi')");
await page.waitForTimeout(500);

const st = await page.evaluate(() => ({ ag: JSON.parse(localStorage.getItem("warehouse_so_aging_v1")), k: JSON.parse(localStorage.getItem("warehouse_so_agcls_v1")), old: localStorage.getItem("warehouse_so_aging_cls_v1") }));
ok(typeof st.ag["B1-01-A"].at === "string" && !isNaN(Date.parse(st.ag["B1-01-A"].at)), "cap waktu lama dikonversi ke teks ISO");
ok(st.k["10172005089004"]?.c === "A" && st.old === null, "kelas versi awal dipindah ke kunci baru");

// isi cek rak pertama lewat UI
await page.locator(".agi-rak > summary").first().click();
const f = page.locator(".agi-form input:not([type=checkbox])");
await f.nth(0).fill("AK140"); await f.nth(1).fill("AW 3"); await f.nth(2).fill("400");
await page.getByText("Simpan cek").first().click();
await page.waitForTimeout(6500); // sinkron otomatis menunggu ±4 dtk
ok(sent.length >= 1, "sinkron otomatis terkirim setelah simpan");
const d = sent[sent.length - 1]?.data || {};
ok(Object.values(d.warehouse_so_aging_v1 || {}).some((r) => r.qty === "400" && r.tumpak === "AK140"), "cek fisik ikut terkirim");
ok(!!d.warehouse_so_agcls_v1 && sent.some((b) => !!b.data.warehouse_so_agingcfg_v1), "kelas pipa dan pengaturan ikut terkirim");
const got = await page.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_aging_v1")));
ok(got["B1-09-A"]?.qty === "77", "data perangkat lain diterima dan digabung");
ok((await page.locator(".agi-rak.done").count()) >= 1, "tampilan menampilkan rak yang sudah dicek");
ok(errors.length === 0, "tanpa error JavaScript " + errors.join(";"));
await browser.close();
process.exit(fail ? 1 : 0);
