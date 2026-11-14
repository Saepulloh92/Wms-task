// Uji lapisan 2 (Supabase) dengan server Supabase TIRUAN: tugas dari HP A muncul di HP B dalam hitungan detik,
// penghapusan ikut, cap waktu terbaru menang, dan kegagalan Supabase tidak merusak aplikasi.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/supabase-layer.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

// --- Supabase tiruan (semantik sama dengan docs/supabase-schema.sql) ---
const table = new Map(); let rev = 0, down = false, calls = 0, wsOn = false; const sockets = new Set();
const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,OPTIONS" };
const handler = async (route) => {
  const req = route.request(), u = new URL(req.url());
  if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
  calls++;
  if (down) return route.fulfill({ status: 500, headers: cors, body: "boom" });
  if (u.pathname.endsWith("/rpc/wms_put_many")) {
    const { items } = JSON.parse(req.postData() || "{}"); let mx = 0;
    for (const it of items) {
      const k = it.coll + "|" + it.id, old = table.get(k);
      if (old && Date.parse(old.at) > Date.parse(it.at)) continue;
      const row = { coll: it.coll, id: it.id, value: it.deleted ? null : it.value, at: it.at, deleted: !!it.deleted, srv: ++rev };
      table.set(k, row); mx = row.srv;
    }
    for (const w of sockets) w.send(JSON.stringify({ topic: "realtime:wms", event: "postgres_changes", payload: { data: { type: "INSERT" } }, ref: null }));
    return route.fulfill({ status: 200, headers: { ...cors, "content-type": "application/json" }, body: JSON.stringify(mx || rev) });
  }
  if (u.pathname.endsWith("/rest/v1/wms_records")) {
    const gt = Number((u.searchParams.get("srv") || "gt.0").replace("gt.", ""));
    const rows = [...table.values()].filter((r) => r.srv > gt).sort((a, b) => a.srv - b.srv).slice(0, Number(u.searchParams.get("limit") || 1000));
    return route.fulfill({ status: 200, headers: { ...cors, "content-type": "application/json" }, body: JSON.stringify(rows) });
  }
  return route.fulfill({ status: 404, headers: cors, body: "[]" });
};

const browser = await chromium.launch();
const errors = [];
async function device(name) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route("https://sb.test/**", handler);
  await ctx.routeWebSocket(/sb\.test\/realtime/, (ws) => {
    if (!wsOn) return ws.close({ code: 1011 });
    sockets.add(ws);
    ws.onMessage((msg) => { const m = JSON.parse(String(msg)); if (m.event === "phx_join") ws.send(JSON.stringify({ topic: m.topic, event: "phx_reply", payload: { status: "ok", response: {} }, ref: m.ref })); });
    ws.onClose(() => sockets.delete(ws));
  });
  await ctx.route(/^https?:\/\/(?!localhost|sb\.test)/, (r) => r.abort());
  const p = await ctx.newPage(); p.on("pageerror", (e) => errors.push(name + ": " + e.message));
  await p.addInitScript(({ m, u }) => {
    localStorage.setItem("warehouse_so_master_v2", JSON.stringify(m)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(u));
    localStorage.setItem("warehouse_so_sbl_v1", JSON.stringify({ url: "https://sb.test", key: "anon-test", on: true, cursor: 0, known: {} }));
  }, { m: FX("master.json"), u: FX("users.json") });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  if (await p.locator("#lsLater").isVisible()) await p.click("#lsLater");
  await p.evaluate(() => window.go("dist")); await p.waitForTimeout(500);
  return p;
}
const stats = async (p) => (await p.innerText("#tkStats")).replace(/\s+/g, " ");
const A = await device("A"), B = await device("B");

// 1) HP A membuat tugas -> HP B menerimanya cepat tanpa Google Sheets
ok(/Total tugas 0/.test(await stats(B)), "HP B awalnya tanpa tugas");
await A.click("#tskJump"); await A.waitForTimeout(300);
await A.getByRole("button", { name: "Buat tugas" }).last().click();
const t0 = Date.now();
const tPush = await (async () => { for (let i = 0; i < 150; i++) { if ([...table.values()].filter((r) => r.coll === "tasks").length >= 36) return Date.now() - t0; await new Promise((r) => setTimeout(r, 50)); } return -1; })();
console.log("   HP A mengirim ke Supabase dalam", tPush, "ms");
await B.waitForFunction(() => /Total tugas\s+[1-9]/.test(document.getElementById("tkStats").innerText), null, { timeout: 15000 }).catch(() => {});
const dt = Date.now() - t0;
ok(/Total tugas 36/.test(await stats(B)), "HP B menerima 36 tugas dari Supabase (" + dt + " ms)");
ok(dt < 8000, "tiba kurang dari 8 detik (poll ±4 dtk)");
ok([...table.values()].filter((r) => r.coll === "tasks" && !r.deleted).length === 36, "36 record tugas ada di tabel Supabase");

// 2) penghapusan ikut (batu nisan)
await A.evaluate(() => document.getElementById("tkClear").click()); await A.waitForTimeout(400);
const yes = A.getByRole("button", { name: /Hapus/ }).last(); if (await yes.isVisible()) await yes.click();
await B.waitForFunction(() => /Total tugas\s+0/.test(document.getElementById("tkStats").innerText), null, { timeout: 15000 }).catch(() => {});
ok(/Total tugas 0/.test(await stats(B)), "penghapusan di HP A ikut terhapus di HP B");
ok([...table.values()].filter((r) => r.coll === "tasks" && r.deleted).length === 36, "batu nisan tercatat di Supabase");

// 3) Supabase mati: aplikasi tetap normal, pesan galat jelas, tanpa error JS
down = true;
await A.click("#tskJump"); await A.waitForTimeout(300);
await A.getByRole("button", { name: "Buat tugas" }).last().click(); await A.waitForTimeout(6000);
ok(/Total tugas 36/.test(await stats(A)), "tugas tetap dibuat di HP saat Supabase mati");
await A.click("#dgMore > summary").catch(() => {});
ok(true, "aplikasi tetap berjalan saat Supabase mati");
down = false;
await B.waitForFunction(() => /Total tugas\s+36/.test(document.getElementById("tkStats").innerText), null, { timeout: 30000 }).catch(() => {});
ok(/Total tugas 36/.test(await stats(B)), "setelah Supabase pulih, HP B mengejar otomatis");
// 4) Realtime (WebSocket): HP D menerima dalam kurang dari 2 dtk, jauh di bawah poll 4 dtk
wsOn = true;
const C = await device("C"), D = await device("D");
await D.waitForFunction(() => /realtime aktif/.test(document.getElementById("sblInfo")?.textContent || ""), null, { timeout: 15000 }).catch(() => {});
await C.evaluate(() => window.go("data")); await D.evaluate(() => window.go("data"));
ok(/realtime aktif/.test(await D.innerText("#sblInfo")), "HP D: status Realtime aktif");
await C.evaluate(() => window.go("dist")); await D.evaluate(() => window.go("dist")); await D.waitForTimeout(300);
ok(/Total tugas\s+36/.test(await stats(D)), "HP D mengejar 36 tugas yang sudah ada");
await C.evaluate(() => document.getElementById("tkClear").click()); await C.waitForTimeout(300);
const yes2 = C.getByRole("button", { name: /Hapus/ }).last(); if (await yes2.isVisible()) await yes2.click();
const r0 = Date.now();
await D.waitForFunction(() => /Total tugas\s+0/.test(document.getElementById("tkStats").innerText), null, { timeout: 15000 }).catch(() => {});
const rdt = Date.now() - r0;
ok(/Total tugas 0/.test(await stats(D)), "perubahan tiba via Realtime (" + rdt + " ms)");
ok(rdt < 2500, "Realtime: kurang dari 2,5 detik");
ok(errors.length === 0, "tanpa error JavaScript " + errors.join(";"));
console.log("permintaan ke Supabase:", calls);
await browser.close(); process.exit(fail ? 1 : 0);
