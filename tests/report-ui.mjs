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
  counts[x.bin] = { itemMatch: i !== 7, actualItems: [], actualItem: i === 7 ? "PIPA LAIN 2\"" : x.item, actualQty: Number(x.onhand) + (bad ? -2 : 0), note: "", savedAt: at(2 + (i % 5), 8 + (i % 6)), by: names[i % 3], systemQty: Number(x.onhand), systemItem: x.item };
});
const dc = {};
[...new Set(master.map((x) => x.item))].slice(0, 5).forEach((it, i) => { const sys = master.filter((x) => x.item === it).reduce((a, x) => a + Number(x.onhand), 0); dc[it] = { rows: [{ rak: "B1-01-A", qty: sys + (i === 1 ? 4 : 0) }], sys: null, done: true, by: names[i % 3], at: at(3 + (i % 3), 10), adj: "" }; });
const aging = {};
master.slice(14, 20).forEach((x, i) => { x.tumpak = "AK1" + i; aging[x.bin] = { tumpak: i === 3 ? "AK999" : "AK1" + i, pipa: x.item, qty: Number(x.onhand) + (i === 2 ? -1 : 0), by: names[i % 3], at: at(4 + (i % 3), 13) }; }); // i=2: qty -1; i=3: tumpak beda (qty sama)
aging[master[20].bin] = { tumpak: "Sesuai", pipa: "Sesuai", qty: String(master[20].onhand), sesuai: true, by: "Sari", at: at(5, 9) }; // "Semua sama": sesuai
const muat = ["2026-11-02", "2026-11-03", "2026-11-05", "2026-11-06"].map((tgl, i) => ({ tgl, at: at(2 + i, 17), by: "Sari", dp: 12 + i, ni: 30, total: 9 + i, tdkN: 0, masuk: 0, cpS: i === 1 ? 2 : 0, ci: 0, rows: [], text: "" }));
const clr = [{ tgl: "2026-11-04", at: at(4, 16), by: "Andi", sig: "x", n: 25, ok: 23, bad: 2, text: "", rows: [] }, { tgl: "2026-10-28", at: at(1, 16), by: "Andi", sig: "y", n: 20, ok: 20, bad: 0, text: "", rows: [] }];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.addInitScript((s) => {
  const RealDate = Date, off = new RealDate(2026, 10, 8, 10).getTime() - RealDate.now();
  class D extends RealDate { constructor(...a) { if (a.length) super(...a); else super(RealDate.now() + off); } static now() { return RealDate.now() + off; } }
  window.Date = D;
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(s.master));
  localStorage.setItem("warehouse_so_users_v1", JSON.stringify(s.users));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1");
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
await p.evaluate(() => window.go("rpt")); await p.waitForTimeout(400);
const tc = (sel) => p.locator(sel).evaluateAll((els) => els.map((e) => e.textContent.trim())); // textContent: bagian di luar layar tidak dirender (innerText kosong)
const big = async () => (await tc(".rpt-big")).join(",");
const lab = async () => (await tc(".rpt-wk b"))[0];
const flags = async () => (await tc(".rpt-f")).join("|");
// --- Mingguan
ok((await lab()) === "2–8 Nov 2026", "mingguan: periode 2–8 Nov 2026");
ok((await big()) === "14,1,5,7,4,25", "mingguan: Stok Bin 14, Item beda 1, DC 5, Aging 7, Muat 4 hari, Clearing 25 (" + (await big()) + ")");
const fl = await flags();
ok(fl.includes("3 bin selisih qty") && fl.includes("1 rak item tidak sama") && fl.includes("1 item DC selisih") && fl.includes("2 rak Aging selisih") && fl.includes("2 voucher Clearing") && fl.includes("Kuning/Merah belum dicek"), "mingguan: daftar perlu perhatian lengkap");
ok(((await tc(".rpt-p"))[0] || "").startsWith("Sari"), "petugas teraktif = Sari");
ok((await tc(".rpt-art b"))[0] === "B1", "tabel per area memuat B1");
ok(((await tc(".rpt-b"))[0] || "").includes("B1-"), "selisih terbesar menampilkan bin");
// --- Ketuk -> detail
await p.locator(".rpt-tb .rpt-b.click").first().click(); await p.waitForTimeout(150);
const md = ((await tc(".rpt-md"))[0]) || "";
ok(md.includes("Stok sistem") && md.includes("Qty fisik") && md.includes("Petugas") && md.includes("Waktu"), "ketuk catatan selisih terbesar -> jendela detail lengkap");
await p.locator(".rpt-md .btn").click(); await p.waitForTimeout(100);
ok((await p.locator(".rpt-md").count()) === 0, "tombol Tutup menutup jendela detail");
await p.locator(".rpt-art.click").first().click(); await p.waitForTimeout(150);
ok((await p.locator(".rpt-ag.open .rpt-b").count()) > 0, "ketuk baris area -> daftar bin di area itu");
await p.locator(".rpt-ag.open .rpt-art.click").first().click(); await p.waitForTimeout(100);
await p.locator(".rpt-p.click").first().click(); await p.waitForTimeout(150);
ok((await p.locator(".rpt-pg.open .rpt-b").count()) > 0, "ketuk petugas -> daftar aktivitasnya");
await p.locator(".rpt-pg.open .rpt-b").first().click(); await p.waitForTimeout(100);
ok((await p.locator(".rpt-md").count()) === 1, "ketuk aktivitas petugas -> jendela detail");
await p.keyboard.press("Escape"); await p.locator(".rpt-md").waitFor({ state: "detached", timeout: 1500 }).catch(() => {});
if (await p.locator(".rpt-md").count()) await p.locator(".rpt-md .btn").click();
await p.locator(".rpt-p.click").first().click(); await p.waitForTimeout(100);
const ag = (await tc(".rpt-tb")).join("\n");
ok(ag.includes("tumpak beda") && ag.includes("qty -1") && ag.includes("AK999"), "daftar Rak Aging selisih: alasan 'tumpak beda' & 'qty -1', tumpak AK3→AK999 tampil");
ok(!(await tc(".rpt-tb")).join("").includes(master[20].bin + "tumpak beda"), "rak 'Semua sama dengan sistem' tidak masuk daftar selisih");
const nmRows = (await tc(".rpt-nm b")).join(",");
ok(nmRows.startsWith("Stok per Bin,Kesesuaian Rak,DC Harian"), "dua laporan dari satu input Per Bin: Stok per Bin + Kesesuaian Rak (" + nmRows + ")");
const tags = await tc(".rpt-tag");
ok(tags[0] === "79%" && tags[1] === "93%", "akurasi qty 79% (11/14) dan kesesuaian item 93% (13/14) dihitung terpisah (" + tags.slice(0, 2).join(",") + ")");
ok((await tc(".rpt-dt .card")).some((t) => t.includes("Kesesuaian Rak") && t.includes("Item tidak sama1")), "rincian Kesesuaian Rak: item tidak sama = 1");
// --- Daftar bin: filter item beda
await p.getByRole("button", { name: /^Item beda/ }).click(); await p.waitForTimeout(150);
const ib = (await tc(".rpt-tb")).join("|");
ok(ib.includes("Item beda") && ib.includes("ditemukan: PIPA LAIN"), "filter 'Item beda': menampilkan item yang ditemukan");
// --- Daftar bin: filter
await p.getByRole("button", { name: /^Semua/ }).last().click(); await p.waitForTimeout(150);
ok((await p.locator(".rpt-tb").last().locator(".rpt-b").count()) === 10, "daftar bin 'Semua' (14) dibatasi 10 + tombol Tampilkan lebih");
await p.getByText(/Tampilkan lebih/).click(); await p.waitForTimeout(150);
ok((await p.locator(".rpt-tb").last().locator(".rpt-b").count()) === 14, "Tampilkan lebih → 14 bin");
// --- Filter petugas
await p.locator(".rpt-flt select").nth(1).selectOption("Sari"); await p.waitForTimeout(200);
ok((await big()).split(",")[0] === "5", "filter petugas Sari: Per Bin 5 (" + (await big()) + ")");
await p.locator(".rpt-flt select").nth(1).selectOption(""); await p.waitForTimeout(150);
// --- Navigasi periode
await p.getByRole("button", { name: "Sebelumnya", exact: true }).click(); await p.waitForTimeout(150);
ok((await lab()) === "26 Okt–1 Nov 2026" && (await big()).split(",")[0] === "0" && (await big()).split(",")[5] === "20", "minggu lalu: 26 Okt–1 Nov, Bin 0, Clearing 20 (" + (await big()) + ")");
await p.getByText("Kembali ke minggu ini").click(); await p.waitForTimeout(150);
ok(await p.getByRole("button", { name: "Berikutnya", exact: true }).isDisabled(), "tidak bisa maju melewati periode berjalan");
// --- Bulanan & Tahunan
await p.getByRole("button", { name: "Bulanan" }).click(); await p.waitForTimeout(250);
ok((await lab()) === "November 2026" && (await big()) === "14,1,5,7,4,25", "bulanan: November 2026, angka sama dengan minggu ini (" + (await big()) + ")");
await p.getByRole("button", { name: "Sebelumnya", exact: true }).click(); await p.waitForTimeout(150);
ok((await lab()) === "Oktober 2026" && (await big()).split(",")[5] === "20", "bulan lalu: Oktober 2026, Clearing 20");
await p.getByText("Kembali ke bulan ini").click();
await p.getByRole("button", { name: "Tahunan" }).click(); await p.waitForTimeout(250);
ok((await lab()) === "2026" && (await big()).split(",")[5] === "45", "tahunan: 2026, Clearing 20+25 = 45 (" + (await big()) + ")");
ok((await p.evaluate(() => localStorage.getItem("warehouse_so_rptp_v1"))) === "year", "pilihan periode diingat");
// --- Unduh CSV
const [dl] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: /Unduh CSV/ }).click()]);
ok(/^laporan-year-2026-01-01\.csv$/.test(dl.suggestedFilename()), "CSV: nama file " + dl.suggestedFilename());
const csv = fs.readFileSync(await dl.path(), "utf8");
ok(csv.includes("Per Bin") && csv.includes("DC Harian") && csv.includes("Aging"), "CSV memuat baris Per Bin, DC, Aging");
ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "tanpa scroll horizontal");
ok(errs.length === 0, "tanpa error JavaScript " + errs.join(";"));
await b.close();
process.exit(bad ? 1 : 0);
