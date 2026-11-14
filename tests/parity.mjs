// Jalankan dengan build TANPA link sinkron: VITE_SYNC_URL= VITE_SYNC_TOKEN= VITE_CLEARING_URL= npx vite build --outDir /tmp/dist-test && npx vite preview --outDir /tmp/dist-test --port 4173
// Uji paritas tampilan: tiap menu dibuka dengan state yang sama, teksnya dibandingkan dengan snapshot dari aplikasi asli.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/parity.mjs            (bandingkan)
//   ORIGINAL=/path/index-fixd.html node tests/parity.mjs --update                              (buat ulang snapshot dari file asli)
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
// task dan dist sengaja berbeda dari aplikasi asli (menu dipisah), diuji lewat tests/tugas*.mjs dan task-menu.mjs
// clr juga sengaja berbeda dari aplikasi asli (UI Clearing dirombak); diuji lewat tests/clearing-*.mjs
const VIEWS = ["so", "dc", "check", "adj", "kes", "muat", "usr", "kpi", "tg", "mon", "data"];
const SNAP = new URL("./snapshots/views.json", import.meta.url);
const update = process.argv.includes("--update");
const url = update ? "file://" + process.env.ORIGINAL : process.env.APP_URL || "http://localhost:4173/";

const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
const seed = (fx) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); // fixture uji (bukan data aplikasi)
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
  const iso = (m) => new Date(Date.UTC(2026, 10, 7, 1, m)).toISOString();
  localStorage.setItem("warehouse_so_counts_v2", JSON.stringify({
    "B1-01-A": { itemMatch: true, actualItems: [], actualItem: "PIPA", actualQty: 630, note: "", savedAt: iso(0), by: "Andi", systemQty: 630 },
    "B1-02-A": { itemMatch: true, actualItems: [], actualItem: "PIPA", actualQty: 2700, note: "kurang", savedAt: iso(30), by: "Andi", systemQty: 2773 },
    "B1-03-A": { itemMatch: false, actualItems: [{ item: "LAIN", qty: 5 }], actualItem: "LAIN (5)", actualQty: 5, note: "", savedAt: iso(50), by: "Budi", systemQty: 6731 },
  }));
  localStorage.setItem("warehouse_so_closed_v1", JSON.stringify({}));
  localStorage.setItem("warehouse_so_clr_v1", JSON.stringify({ url: "" })); // asli punya URL bawaan; di versi baru kosong (lihat .env.example)
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.addInitScript(seed, { master: FX("master.json"), users: FX("users.json") });
await page.goto(url);
await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await page.waitForTimeout(500);
const out = {};
for (const v of VIEWS) {
  await page.evaluate((v) => window.go(v), v);
  await page.waitForTimeout(150);
  out[v] = await page.evaluate((v) => ({
    title: document.getElementById("pgT").textContent.trim(),
    sub: document.getElementById("hSub").textContent.trim(),
    hidden: [...document.querySelectorAll("main > section")].filter((s) => !s.hidden).map((s) => s.id),
    text: document.getElementById("v-" + v).innerText.replace(/\s+/g, " ").trim(),
  }), v);
}
await browser.close();
if (update) { fs.writeFileSync(SNAP, JSON.stringify(out, null, 1)); console.log("snapshot ditulis:", VIEWS.length, "menu"); process.exit(0); }
const want = JSON.parse(fs.readFileSync(SNAP, "utf8"));
const acc = (process.argv.find((a) => a.startsWith("--accept=")) || "").slice(9).split(",").filter(Boolean); // --accept=so,data : terima beda yang disengaja
if (acc.length) { acc.forEach((v) => (want[v] = out[v])); fs.writeFileSync(SNAP, JSON.stringify(want, null, 1)); console.log("snapshot diperbarui:", acc.join(",")); }
let bad = 0;
for (const v of VIEWS) {
  const same = JSON.stringify(out[v]) === JSON.stringify(want[v]);
  console.log((same ? "OK   " : "BEDA ") + v);
  if (!same) { bad++; {const a=want[v].text,b=out[v].text;let i=0;while(a[i]===b[i])i++;console.log("  beda di:",JSON.stringify(a.slice(Math.max(0,i-60),i+80)),"=>",JSON.stringify(b.slice(Math.max(0,i-60),i+80)));} }
}
if (errors.length) { console.log("JS error:", errors); bad++; }
process.exit(bad ? 1 : 0);
