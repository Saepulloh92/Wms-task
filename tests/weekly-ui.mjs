import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/home/claude/Wms-task/")("playwright");
const FX = (n) => JSON.parse(fs.readFileSync("/home/claude/Wms-task/tests/fixtures/" + n, "utf8"));
const master = FX("master.json"), users = FX("users.json");
const at = (d, h) => new Date(2026, 10, d, h).toISOString(); // November 2026
const names = ["Budi", "Sari", "Andi"];
const counts = {};
master.slice(0, 14).forEach((x, i) => {
  const bad = i % 5 === 0;
  counts[x.bin] = { itemMatch: true, actualItems: [], actualItem: x.item, actualQty: Number(x.onhand) + (bad ? -2 : 0), note: "", savedAt: at(2 + (i % 5), 8 + (i % 6)), by: names[i % 3], systemQty: Number(x.onhand), systemItem: x.item };
});
const dc = {};
[...new Set(master.map((x) => x.item))].slice(0, 5).forEach((it, i) => { const sys = master.filter((x) => x.item === it).reduce((a, x) => a + Number(x.onhand), 0); dc[it] = { rows: [{ rak: "B1-01-A", qty: sys + (i === 1 ? 4 : 0) }], sys: null, done: true, by: names[i % 3], at: at(3 + (i % 3), 10), adj: "" }; });
const aging = {};
master.slice(14, 20).forEach((x, i) => { aging[x.bin] = { tumpak: "AK1" + i, pipa: "AW 3", qty: Number(x.onhand) + (i === 2 ? -1 : 0), by: names[i % 3], at: at(4 + (i % 3), 13) }; });
const muat = ["2026-11-02", "2026-11-03", "2026-11-05", "2026-11-06"].map((tgl, i) => ({ tgl, at: at(2 + i, 17), by: "Sari", dp: 12 + i, ni: 30, total: 9 + i, tdkN: 0, masuk: 0, cpS: i === 1 ? 2 : 0, ci: 0, rows: [], text: "" }));
const clr = [{ tgl: "2026-11-04", at: at(4, 16), by: "Andi", sig: "x", n: 25, ok: 23, bad: 2, text: "", rows: [] }, { tgl: "2026-10-28", at: at(1, 16), by: "Andi", sig: "y", n: 20, ok: 20, bad: 0, text: "", rows: [] }];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.addInitScript((s) => {
  const RealDate = Date, off = new RealDate(2026, 10, 8, 10).getTime() - RealDate.now();
  class D extends RealDate { constructor(...a) { if (a.length) super(...a); else super(RealDate.now() + off); } static now() { return RealDate.now() + off; } }
  window.Date = D;
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(s.master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(s.users));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1"); // dialog "Aktifkan login" sudah dilihat
  localStorage.setItem("warehouse_so_counts_v2", JSON.stringify(s.counts));
  localStorage.setItem("warehouse_dc_v1", JSON.stringify(s.dc));
  localStorage.setItem("warehouse_so_aging_v1", JSON.stringify(s.aging));
  localStorage.setItem("warehouse_so_muat_hist_v1", JSON.stringify(s.muat));
  localStorage.setItem("warehouse_so_clr_hist_v1", JSON.stringify(s.clr));
}, { master, users, counts, dc, aging, muat, clr });
let bad = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) bad++; };
await p.goto("http://localhost:4173/");
await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
await p.evaluate(() => window.go("rpt")); await p.waitForTimeout(300);
const big = await p.locator(".rpt-big").allInnerTexts();
ok(JSON.stringify(big) === JSON.stringify(["14", "5", "6", "4/7", "25"]), "angka utama: Bin 14, DC 5, Aging 6, Muat 4/7, Clearing 25 (" + big.join(",") + ")");
ok((await p.locator(".rpt-wk b").innerText()) === "2–8 Nov 2026", "periode minggu 2–8 Nov 2026");
const fl = (await p.locator(".rpt-f").allInnerTexts()).join("|");
ok(fl.includes("3 bin selisih") && fl.includes("1 item DC selisih") && fl.includes("1 rak Aging") && fl.includes("2 voucher Clearing"), "daftar perlu perhatian lengkap");
ok((await p.locator(".rpt-p").first().innerText()).startsWith("Sari"), "petugas teraktif = Sari");
await p.getByLabel("Minggu sebelumnya").click(); await p.waitForTimeout(150);
const big2 = await p.locator(".rpt-big").allInnerTexts();
ok(big2[0] === "0" && big2[4] === "20", "minggu lalu: Bin 0, Clearing 20 (" + big2.join(",") + ")");
ok(await p.getByLabel("Minggu berikutnya").isEnabled(), "tombol minggu berikutnya aktif di minggu lalu");
await p.getByText("Kembali ke minggu ini").click(); await p.waitForTimeout(150);
ok(await p.getByLabel("Minggu berikutnya").isDisabled(), "tidak bisa maju melewati minggu ini");
ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "tanpa scroll horizontal");
ok(errs.length === 0, "tanpa error JavaScript " + errs.join(";"));
await b.close();
process.exit(bad ? 1 : 0);
