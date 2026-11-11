// Uji: data laporan (Laporan Voucher Clearing, tanda selesai, Laporan Muat) tersimpan di server dan langsung dipakai HP lain.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/sync-reports.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const K = { rep: "warehouse_so_clr_rep_v1", done: "warehouse_so_clr_done_v1", md: "warehouse_so_muat_data_v1", ms: "warehouse_so_muat_sum_v1" };

// server tiruan dengan aturan gabung yang sama seperti gas/30-merge.gs
const server = { rev: 1, mrev: 1, data: {
  [K.rep]: { at: 2000000000000, name: "voucher-server.xlsx", rows: [{ v: "4043733", q: 100, k: "", n: "PIPA", r: "", lr: "", sh: "Shift 1", pic: "", grp: "" }, { v: "4043734", q: 50, k: "", n: "PIPA", r: "", lr: "", sh: "Shift 1", pic: "", grp: "" }] },
  [K.done]: { "4043733": { at: "2030-01-01T00:00:00.000Z", by: "Budi", note: "dari HP lain" } },
  [K.md]: { at: 2000000000000, name: "muat-server.xlsx", tgl: "2026-11-10", total: "3", tdk: "0", recs: [["SPM001", 0, "2026-11-10", "Andi", 0], ["SPM002", 0, "2026-11-10", "Andi", 0]] },
  [K.ms]: { at: 2000000000000, sig: "x", tgl: "2026-11-10" },
} };
const posts = [];
function mergeInto(c) {
  ["rep", "md", "ms"].forEach((n) => { const k = K[n], s = server.data[k], v = c[k]; if (v && (!s || Number(v.at || 0) >= Number(s.at || 0))) server.data[k] = v; });
  const sd = server.data[K.done] || {}, cd = c[K.done] || {};
  Object.keys(cd).forEach((id) => { if (!sd[id] || Date.parse(cd[id].at) > Date.parse(sd[id].at)) sd[id] = cd[id]; });
  server.data[K.done] = sd; server.rev++;
}
const b = await chromium.launch();
async function device(seed = {}) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  p.errs = []; p.on("pageerror", (e) => p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost|mock\.test)/, (r) => r.abort());
  await p.route("https://mock.test/**", async (r) => {
    const q = r.request(), h = { "access-control-allow-origin": "*", "content-type": "application/json" };
    if (q.method() === "OPTIONS") return r.fulfill({ status: 204, headers: h });
    if (q.method() === "POST") { const body = JSON.parse(q.postData() || "{}"); posts.push(body); mergeInto(body.data || {}); }
    r.fulfill({ headers: h, body: JSON.stringify({ ok: true, rev: server.rev, mrev: server.mrev, data: server.data }) });
  });
  await p.addInitScript(({ fx, seed }) => {
    localStorage.setItem("warehouse_so_lgsetup_v1", "1");
    localStorage.setItem("warehouse_so_sync_v1", JSON.stringify({ url: "https://mock.test/exec", token: "t", auto: true }));
    if (!localStorage.getItem("warehouse_so_master_v2")) { localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); }
    Object.entries(seed).forEach(([k, v]) => localStorage.getItem(k) == null && localStorage.setItem(k, JSON.stringify(v)));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, seed });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.waitForTimeout(3500);
  return p;
}
const ls = (p, k) => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || "null"), k);

// 1) HP baru: semua data laporan dari server langsung dipakai tanpa mengunggah apa pun
let a = await device();
ok((await ls(a, K.rep))?.rows?.length === 2 && (await ls(a, K.rep)).name === "voucher-server.xlsx", "HP baru menerima Laporan Voucher dari server");
ok((await ls(a, K.done))?.["4043733"]?.by === "Budi", "HP baru menerima tanda selesai Clearing dari HP lain");
ok((await ls(a, K.md))?.recs?.length === 2, "HP baru menerima data Laporan Muat");
ok(await a.evaluate(() => clrRep && clrRep.rows.length === 2 && Object.keys(clrDone).length === 1 && mRecs.length === 2), "data langsung dipakai aplikasi (tanpa muat ulang halaman)");
await a.evaluate(() => go("clr")); await a.waitForTimeout(500);
ok(/2 voucher/.test(await a.innerText("#clrRepInfo")), "menu Clearing langsung menampilkan laporan dari server");

// 2) tidak saling menimpa terus-menerus: cap waktu data muat tetap milik server
const before = posts.length; await a.waitForTimeout(7000);
ok((await ls(a, K.md)).at === 2000000000000 && server.data[K.md].at === 2000000000000, "cap waktu Laporan Muat tidak berubah-ubah setelah diterima (tidak ada saling menimpa)");

// 3) tanda selesai baru di HP ini sampai ke server, tanda lama dari HP lain tetap
await a.evaluate(() => { clrDone["4043734"] = { at: new Date().toISOString(), by: "Sari", note: "" }; sv(K_CLRD, clrDone); });
await a.waitForTimeout(6500);
ok(server.data[K.done]["4043734"]?.by === "Sari" && server.data[K.done]["4043733"]?.by === "Budi", "tanda selesai digabung per voucher di server");

// 4) HP dengan laporan LEBIH BARU tidak tertimpa data lama server
server.data[K.rep] = { at: 1000, name: "lama.xlsx", rows: [] };
const c = await device({ [K.rep]: { at: 3000000000000, name: "lokal-baru.xlsx", rows: [{ v: "4043999", q: 1, k: "", n: "", r: "", lr: "", sh: "", pic: "", grp: "" }] } });
ok((await ls(c, K.rep)).name === "lokal-baru.xlsx", "data lokal yang lebih baru tidak ditimpa data lama dari server");
ok(server.data[K.rep].name === "lokal-baru.xlsx", "server menyimpan laporan yang paling baru");
ok(a.errs.length === 0 && c.errs.length === 0, "tanpa error JavaScript " + [...a.errs, ...c.errs].join(";"));
await b.close(); process.exit(fail ? 1 : 0);
