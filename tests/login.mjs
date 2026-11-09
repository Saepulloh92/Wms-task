// Uji login nama + password dan hak akses peran (Admin, SPV, Petugas, Penerimaan).
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/login.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));

let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 420, height: 900 } });
const page = await ctx.newPage();
await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
// hanya master yang diisi di awal; user dibuat lewat form (seperti pemakaian nyata)
await page.addInitScript((master) => {
  if (!localStorage.getItem("warehouse_so_master_v2")) localStorage.setItem("warehouse_so_master_v2", JSON.stringify(master));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1"); // dialog "Aktifkan login" sudah dilihat
}, FX("master.json"));
await page.goto(url);
await page.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());

const visible = (id) => page.locator("#" + id).isVisible();
const toast = async () => (await page.locator("#toast").textContent().catch(() => "")) || "";
const gotoUsr = async () => { await page.evaluate(() => window.go("usr")); await page.waitForTimeout(200); };
const saveUser = async ({ edit, name, role, pin, areas }) => {
  await gotoUsr();
  if (edit) await page.locator(`#usrList [data-edit]`, { hasText: "" }).nth(edit.index ?? 0).click();
  if (name !== undefined) await page.fill("#uName", name);
  if (role) await page.selectOption("#uRole", role);
  if (pin !== undefined) await page.fill("#uPin", pin);
  if (areas) {
    const on = await page.$$eval("#uAreas .chip", (c) => c.filter((x) => x.getAttribute("aria-pressed") === "true").map((x) => x.textContent.trim()));
    for (const a of areas) if (!on.includes(a)) await page.locator("#uAreas .chip", { hasText: new RegExp("^" + a) }).first().click();
  }
  await page.click("#uAdd");
  await page.waitForTimeout(400);
};
const login = async (name, pw) => {
  await page.selectOption("#lgUser", { label: new RegExp("^" + name + " ").source ? await page.$$eval("#lgUser option", (o, n) => o.find((x) => x.textContent.startsWith(n + " "))?.textContent, name) : name });
  await page.fill("#lgPin", pw);
  await page.click("#lgOk");
  await page.waitForTimeout(400);
};
const menus = () => page.$$eval("#tabs button, nav button, #nav button", (b) => b.filter((x) => x.offsetParent).map((x) => x.dataset.v || x.textContent.trim()));
const reach = async (v) => { await page.evaluate((v) => window.go(v), v); await page.waitForTimeout(150); return page.evaluate(() => document.querySelector(".view.on, .view.active, section:not([hidden])")?.id || ""); };

// 1. mode awal: belum ada admin ber-password -> terbuka, tanpa login
ok(!(await visible("login")), "awal: tanpa login (belum ada password admin)");

// 2. atur password admin (min. 6 karakter): wajib dan divalidasi
await gotoUsr();
await page.locator("#usrList [data-edit]").first().click();
await page.fill("#uPin", "");
await page.click("#uAdd");
ok(/Password wajib/i.test(await toast()), "admin tanpa password ditolak");
await page.fill("#uPin", "12345");
await page.click("#uAdd");
ok(/minimal 6/i.test(await toast()), "password 5 karakter ditolak");
await page.fill("#uPin", "admin-rahasia");
await page.click("#uAdd");
await page.waitForTimeout(400);
ok(!(await visible("login")), "setelah admin diatur, admin yang mengatur tetap masuk");

// 3. buat user tiap peran
await saveUser({ name: "Rina", role: "spv", pin: "spv-rahasia" });
await saveUser({ name: "Budi", role: "petugas", pin: "budi-rahasia", areas: ["B1"] });
await saveUser({ name: "Tari", role: "penerimaan", pin: "tari-rahasia", areas: ["B1"] });
await saveUser({ name: "Dodi", role: "petugas", pin: "", areas: ["B1"] });
ok(/Password wajib/i.test(await toast()), "petugas tanpa password ditolak");
const roles = await page.$$eval("#usrList .uid small", (p) => p.map((x) => x.textContent.trim()));
ok(["Admin", "SPV", "Petugas", "Penerimaan"].every((r) => roles.includes(r)), "daftar user menampilkan 4 peran: " + [...new Set(roles)].join(", "));
ok(!roles.includes("Tanpa PIN"), "tidak ada teks PIN yang tersisa");

// 4. logout -> layar login; salah password ditolak; reset kunci setelah 5x
await page.evaluate(() => document.getElementById("logoutBtn").click());
await page.waitForTimeout(300);
ok(await visible("login"), "setelah keluar, layar login tampil");
await login("Budi", "salah-total");
ok(/Password salah/.test((await page.locator("#lgErr").textContent()) || ""), "password salah ditolak");
ok(await visible("login"), "tetap di layar login setelah salah");

// 5. Petugas (Budi): hanya menu Petugas
await login("Budi", "budi-rahasia");
ok(!(await visible("login")), "Budi (petugas) masuk dengan password benar");
const budi = await page.evaluate(() => ({ so: allowedView("so"), dc: allowedView("dc"), clr: allowedView("clr"), kpi: allowedView("kpi"), usr: allowedView("usr"), sup: isSup() }));
ok(budi.so && budi.dc && !budi.clr && !budi.kpi && !budi.usr && !budi.sup, "petugas: so+dc ya; clr, kpi, usr tidak; bukan SPV");
await page.evaluate(() => document.getElementById("logoutBtn").click());

// 6. Penerimaan (Tari): Periksa Bin + Clearing, tanpa DC
await login("Tari", "tari-rahasia");
const tari = await page.evaluate(() => ({ so: allowedView("so"), clr: allowedView("clr"), dc: allowedView("dc"), usr: allowedView("usr"), sup: isSup() }));
ok(tari.so && tari.clr && !tari.dc && !tari.usr && !tari.sup, "penerimaan: so+clr ya; dc, usr tidak; bukan SPV");
await page.evaluate(() => document.getElementById("logoutBtn").click());

// 7. SPV (Rina): review + laporan, bisa lihat semua petugas, tapi bukan User & Area
await login("Rina", "spv-rahasia");
const rina = await page.evaluate(() => ({ check: allowedView("check"), kpi: allowedView("kpi"), clr: allowedView("clr"), usr: allowedView("usr"), tg: allowedView("tg"), sup: isSup(), admin: isAdmin(), semua: !!document.querySelector('#user option[value=""]') }));
ok(rina.check && rina.kpi && rina.clr && !rina.usr && !rina.tg && rina.sup && !rina.admin, "SPV: review, KPI, clearing ya; usr dan telegram tidak; bukan admin");
ok(rina.semua, "SPV bisa memilih 'Semua petugas'");
await page.evaluate(() => document.getElementById("logoutBtn").click());

// 8. Admin: akses penuh
await login("Admin", "admin-rahasia");
const adm = await page.evaluate(() => ({ usr: allowedView("usr"), tg: allowedView("tg"), admin: isAdmin() }));
ok(adm.usr && adm.tg && adm.admin, "admin: akses penuh");

// 9. tombol 'tampilkan password' di layar login
await page.evaluate(() => document.getElementById("logoutBtn").click());
await page.waitForTimeout(200);
await page.click("#lgShow");
ok((await page.getAttribute("#lgPin", "type")) === "text", "tombol Tampilkan password membuka isi");
await page.click("#lgShow");
ok((await page.getAttribute("#lgPin", "type")) === "password", "klik lagi menyembunyikan");

// 10. password tersimpan sebagai hash, bukan teks biasa, dan tidak ikut sinkron
const raw = await page.evaluate(() => localStorage.getItem("warehouse_so_users_v1"));
ok(!/rahasia/.test(raw), "password tidak tersimpan sebagai teks biasa");

ok(errors.length === 0, "tanpa error JavaScript" + (errors.length ? ": " + errors.join("; ") : ""));
await browser.close();
process.exit(fail ? 1 : 0);
