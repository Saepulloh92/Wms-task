// Uji login lintas perangkat: password (hash PBKDF2 bergaram) ikut sinkron lewat server.
// Server = kode Apps Script ASLI (gas/*.gs) yang dijalankan di VM Node; hanya penyimpanan state yang diganti memori.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/login-sync.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
const GAS = (n) => fs.readFileSync(new URL("../gas/" + n, import.meta.url), "utf8");

let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

// ---------- server tiruan (kode GAS asli) ----------
function makeServer({ oldVersion = false } = {}) {
  const store = { state: {}, meta: { rev: 0, mrev: 0, at: "" } };
  const ctx = vm.createContext({
    console, Logger: { log() {} },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: (s) => ({ s, setMimeType() { return this; } }) },
    Utilities: {
      DigestAlgorithm: { MD5: "md5" }, Charset: { UTF_8: "utf8" },
      computeDigest: (a, s) => [...crypto.createHash("md5").update(s).digest()],
      base64Encode: (b) => Buffer.from(b).toString("base64"),
    },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => "TESTTOKEN" }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
  });
  for (const f of ["00-config.gs", "05-seed.gs", "70-util.gs", "30-merge.gs", "20-endpoint.gs"]) vm.runInContext(GAS(f), ctx, { filename: f });
  // penyimpanan memori menggantikan 40-state-storage.gs
  vm.runInContext(`
    var __S = { state: {}, meta: { rev: 0, mrev: 0, at: '' } };
    function readState_() { return JSON.parse(JSON.stringify(__S.state)); }
    function readMeta_() { return __S.meta; }
    var CORRUPT_ = []; function warn_() { return ''; }
    function keyHashes_(st) { var h = {}; Object.keys(st).forEach(function (k) { h[k] = canon_(st[k]); }); return h; }
    function sameAsStored_(h) { return canon_(h) === canon_(keyHashes_(__S.state)); }
    function commit_(state) {
      var mc = canon_(state[K.master] || []) !== canon_(__S.state[K.master] || []);
      __S.state = JSON.parse(JSON.stringify(state));
      __S.meta = { rev: __S.meta.rev + 1, mrev: (__S.meta.mrev || 0) + (mc ? 1 : 0), at: new Date().toISOString() };
      return __S.meta;
    }`, ctx);
  const handle = (req) => {
    if (oldVersion && req.data && Array.isArray(req.data["warehouse_so_users_v1"]))
      req.data["warehouse_so_users_v1"] = req.data["warehouse_so_users_v1"].map((u) => { const c = { ...u }; delete c.pin; return c; });
    const out = JSON.parse(ctx.handle_(req).s);
    if (oldVersion) delete out.pins;
    if (oldVersion && out.data && out.data["warehouse_so_users_v1"]) out.data["warehouse_so_users_v1"] = out.data["warehouse_so_users_v1"].map((u) => { const c = { ...u }; delete c.pin; return c; });
    return out;
  };
  const users = () => JSON.parse(vm.runInContext("JSON.stringify(__S.state['warehouse_so_users_v1'] || [])", ctx));
  return { handle, users };
}

async function route(c, server) {
  await c.route(/^https?:\/\/(?!localhost)/, async (r) => {
    const rq = r.request();
    if (!rq.url().startsWith("https://script.google.com/")) return r.abort();
    let req;
    if (rq.method() === "POST") req = JSON.parse(rq.postData() || "{}");
    else { const q = new URL(rq.url()).searchParams; req = { action: q.get("action"), token: q.get("token") }; }
    await r.fulfill({ status: 200, contentType: "text/plain", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(server.handle(req)) });
  });
}

const SYNC = { url: "https://script.google.com/macros/s/TEST/exec", token: "TESTTOKEN", auto: true };
const browser = await chromium.launch();
const errors = [];
async function device(server, { users, sync = true } = {}) {
  const c = await browser.newContext({ viewport: { width: 420, height: 900 } });
  await route(c, server);
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  await p.addInitScript(({ master, users, sync, SYNC }) => {
    if (localStorage.getItem("warehouse_so_master_v2") == null) localStorage.setItem("warehouse_so_master_v2", JSON.stringify(master));
    localStorage.setItem("warehouse_so_lgsetup_v1", "1"); // dialog "Aktifkan login" sudah dilihat
    if (users && localStorage.getItem("warehouse_so_users_v1") == null) localStorage.setItem("warehouse_so_users_v1", JSON.stringify(users));
    if (sync && localStorage.getItem("warehouse_so_sync_v1") == null) localStorage.setItem("warehouse_so_sync_v1", JSON.stringify(SYNC));
  }, { master: FX("master.json"), users, sync, SYNC });
  await p.goto(url);
  await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  return p;
}
const sync = async (p) => { await p.evaluate(() => syRun(true)); await p.waitForTimeout(500); await p.evaluate(() => syRun(true)); await p.waitForTimeout(400); };
const loginAs = async (p, name, pw) => {
  const label = await p.$$eval("#lgUser option", (o, n) => o.find((x) => x.textContent.startsWith(n))?.textContent, name);
  await p.selectOption("#lgUser", { label });
  await p.fill("#lgPin", pw);
  await p.click("#lgOk");
  await p.waitForTimeout(700);
};
const logout = async (p) => { await p.evaluate(() => document.getElementById("logoutBtn").click()); await p.waitForTimeout(300); };
const setAdminPw = async (p, pw) => {
  await p.evaluate(() => window.go("usr")); await p.waitForTimeout(250);
  await p.locator("#usrList [data-edit]").first().click();
  await p.fill("#uPin", pw);
  await p.click("#uAdd");
  await p.waitForTimeout(700);
};

// ===== 1. HP A: atur password admin + buat petugas, lalu sinkron =====
{
  const server = makeServer();
  const A = await device(server);
  await setAdminPw(A, "admin-rahasia");
  await A.fill("#uName", "Budi"); await A.selectOption("#uRole", "petugas"); await A.fill("#uPin", "budi-rahasia");
  await A.locator("#uAreas .chip").first().click(); await A.click("#uAdd"); await A.waitForTimeout(700);
  await sync(A);
  const su = server.users();
  const adm = su.find((u) => u.name === "Admin"), bud = su.find((u) => u.name === "Budi");
  ok(/^p1\$\d+\$[0-9a-f]{32}\$[0-9a-f]{64}$/.test(adm?.pin || ""), "server menyimpan hash PBKDF2 bergaram untuk admin");
  ok(adm.pin !== bud.pin && adm.pin.split("$")[2] !== bud.pin.split("$")[2], "garam tiap user berbeda");
  ok(!JSON.stringify(su).includes("rahasia"), "server tidak menyimpan password teks biasa");

  // ===== 2. HP B (baru, belum tahu apa pun): sinkron lalu wajib login =====
  const B = await device(server);
  ok(!(await B.locator("#login").isVisible()), "HP B baru: mode terbuka sebelum sinkron pertama");
  await sync(B);
  ok(await B.evaluate(() => authOn()), "HP B setelah sinkron: login wajib (password ikut terbawa)");
  ok(await B.locator("#login").isVisible(), "HP B menampilkan layar login");
  await loginAs(B, "Admin", "salah-sekali");
  ok(/Password salah/.test((await B.locator("#lgErr").textContent()) || ""), "HP B: password salah ditolak");
  await loginAs(B, "Admin", "admin-rahasia");
  ok(!(await B.locator("#login").isVisible()) && (await B.evaluate(() => isAdmin())), "HP B: admin masuk dengan password dari HP A");
  await logout(B);
  await loginAs(B, "Budi", "budi-rahasia");
  ok(await B.evaluate(() => allowedView("so") && !allowedView("usr")), "HP B: petugas masuk, menu sesuai peran");

  // ===== 3. hapus semua password di A -> menyebar ke B =====
  await A.evaluate(async () => { users.forEach((u) => delete u.pin); sv(K_U, users); });
  await sync(A);
  ok(server.users().every((u) => !u.pin), "server: password terhapus setelah reset di HP A");
  await sync(B);
  ok(!(await B.evaluate(() => authOn())), "HP B: reset menyebar, kembali ke mode terbuka");
  await A.context().close(); await B.context().close();
}

// ===== 4. hash lama (SHA-256 polos) tetap bisa login, ditingkatkan, tidak pernah dikirim sebagai hash lama =====
{
  const server = makeServer();
  const legacy = crypto.createHash("sha256").update("sc-wms|lama1234").digest("hex");
  const C = await device(server, { users: [{ id: "ua0admin", name: "Admin", role: "admin", active: true, areas: [], pin: legacy }] });
  ok(await C.evaluate(() => authOn()), "hash lama: login tetap wajib");
  await sync(C);
  ok(server.users().every((u) => !u.pin), "hash lama tidak pernah dikirim ke server");
  ok(await C.evaluate(() => authOn()), "setelah sinkron, password lama di perangkat tidak hilang");
  await loginAs(C, "Admin", "lama1234");
  ok(!(await C.locator("#login").isVisible()), "hash lama: login berhasil dengan password lama");
  const up = await C.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_users_v1"))[0].pin);
  ok(up.startsWith("p1$"), "hash ditingkatkan ke format baru setelah login");
  await sync(C);
  ok(/^p1\$/.test(server.users()[0]?.pin || ""), "hash yang sudah ditingkatkan ikut tersinkron");
  await C.context().close();
}

// ===== 5. server lama (belum di-deploy ulang): password lokal tidak hilang =====
{
  const server = makeServer({ oldVersion: true });
  const D = await device(server);
  await setAdminPw(D, "admin-rahasia");
  await sync(D);
  ok(server.users().every((u) => !u.pin), "server lama: tidak ada password di server");
  ok(await D.evaluate(() => authOn()), "server lama: password di perangkat tetap utuh setelah sinkron");
  await logout(D);
  await loginAs(D, "Admin", "admin-rahasia");
  ok(!(await D.locator("#login").isVisible()), "server lama: login tetap berfungsi");
  await D.context().close();
}

ok(errors.length === 0, "tanpa error JavaScript" + (errors.length ? ": " + errors.join("; ") : ""));
await browser.close();
process.exit(fail ? 1 : 0);
