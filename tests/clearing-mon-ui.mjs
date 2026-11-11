// Uji kartu Clearing di Monitoring:  npm run build && npx vite preview --port 4173 &  lalu  node tests/clearing-mon-ui.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

// 20 voucher: 12 cocok, 4 selisih qty (3 qty kurang + 1 voucher dengan 2 foto qty beda), 4 belum ada fotonya
const rep = [], cnt = [];
for (let i = 0; i < 20; i++) {
  const no = String(4050000 + i), q = 100 + i * 10;
  rep.push({ v: no, q, k: "K", n: "STD", r: "A-01", lr: "B 12" + i, sh: i % 2 ? "Shift 2" : "Shift 1", pic: "", grp: "" });
  if (i < 12) cnt.push({ v: no, q, k: "K", t: "", lr: "" });
  else if (i < 15) cnt.push({ v: no, q: q - 20, k: "K", t: "", lr: "" });
  else if (i === 15) { cnt.push({ v: no, q: q, k: "K", t: "2026-11-06 09:00:00", lr: "" }); cnt.push({ v: no, q: q + 7, k: "K", t: "2026-11-06 09:00:00", lr: "" }); }
}
const base = ({ fx, extra }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
  localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  for (const [k, v] of Object.entries(extra)) localStorage.setItem(k, JSON.stringify(v));
};
const b = await chromium.launch();
async function page(extra, vp = { width: 390, height: 844 }) {
  const p = await (await b.newContext({ viewport: vp })).newPage();
  p.errs = []; p.on("pageerror", (e) => p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(base, { fx: { master: FX("master.json"), users: FX("users.json") }, extra });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  return p;
}
const live = { warehouse_so_clr_rep_v1: { at: Date.now(), name: "l.xlsx", rows: rep }, warehouse_so_clr_cnt_v1: { at: Date.now(), src: "file", rows: cnt } };

// 1) data langsung
let p = await page(live);
await p.waitForTimeout(1200);
ok(await p.locator("#monClr .cm-t").count() === 4 && await p.locator("#monClr").isVisible(), "buka aplikasi (tanpa pindah menu): kartu langsung tampil di Beranda");
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(500);
const truth = await p.evaluate(() => { const l = clrBuild(), c = {}; l.forEach((x) => (c[x.st] = (c[x.st] || 0) + 1)); return { n: l.length, c, wms: l.reduce((a, x) => a + (x.qR || 0), 0), cnt: l.reduce((a, x) => a + (x.qC || 0), 0) }; });
console.log("kebenaran dari mesin pencocokan:", JSON.stringify(truth));
ok(truth.n === 20 && truth.c.ok === 12 && truth.c.qty === 4 && truth.c.belum === 4 && !truth.c.dup, "skenario: 12 cocok, 4 selisih, 4 belum (" + JSON.stringify(truth.c) + ")");
ok(await p.locator("#monClr").isVisible() && await p.locator("#monClr .cm-t").first().isVisible(), "kartu benar-benar terlihat di layar (bukan hanya ada di DOM)");
const tiles = await p.evaluate(() => [...document.querySelectorAll("#monClr .cm-t")].map((e) => e.querySelector("b").textContent.trim() + "|" + e.querySelector("span").textContent.trim()));
ok(tiles[0] === "20|Voucher", "kartu: 20 voucher (" + tiles[0] + ")");
ok(tiles[1].startsWith("12|Cocok (60%)"), "kartu: 12 cocok 60% (" + tiles[1] + ")");
ok(tiles[2] === "8|Perlu tindak", "kartu: 8 perlu tindak (" + tiles[2] + ")");
const selExp = truth.cnt - truth.wms;
ok(tiles[3].startsWith((selExp > 0 ? "+" : "") + selExp.toLocaleString("id-ID").replace("-", "-")) || tiles[3].split("|")[0].replace(/[^\d-]/g, "") === String(selExp), "kartu: selisih qty = counting - WMS (" + tiles[3] + ", seharusnya " + selExp + ")");
const txt = await p.locator("#monClr").innerText();
ok(/Per shift/.test(txt) && /Shift 1/.test(txt) && /Shift 2/.test(txt), "kartu: ringkasan per shift");
ok(/Perlu ditindaklanjuti \(5 dari 8\)/.test(txt), "kartu: 5 teratas dari 8");
ok(await p.locator("#monClr .cm-todo li").count() === 5, "kartu: 5 baris tindak lanjut");
const worst = await p.evaluate(() => clrBuild().filter((x) => x.st === "qty").sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0].v);
ok((await p.locator("#monClr .cm-todo li").first().innerText()).includes(worst), "kartu: baris teratas = selisih qty terbesar (" + worst + ")");
ok(await p.locator("#monClr .cm-bar").getAttribute("aria-valuenow") === "60", "kartu: bar progres 60%");
ok(await p.locator("#cmOpen").isVisible(), "tombol Buka Clearing terlihat");
ok(await p.locator("#cmRef").count() === 0, "sumber file: tanpa tombol muat ulang counting");
// tandai selesai satu voucher belum-dihitung -> perlu tindak turun jadi 7
await p.evaluate(() => { const x = clrBuild().find((y) => y.st === "belum"); clrDone[clrKey(x.v)] = { by: "t", at: new Date().toISOString(), note: "" }; sv(K_CLRD, clrDone); renderClr(); });
await p.waitForTimeout(300);
ok((await p.locator("#monClr .cm-t").nth(2).innerText()).startsWith("7"), "ditandai selesai di Clearing -> kartu Monitoring ikut turun jadi 7");
await p.locator("#cmOpen").click(); await p.waitForTimeout(300);
ok(await p.evaluate(() => !document.getElementById("v-clr").hidden), "klik Buka Clearing pindah ke menu Clearing");
ok(p.errs.length === 0, "tanpa galat JS " + p.errs.join(";"));

// 2) hanya riwayat tersimpan (HP lain belum memuat laporan)
const hist = [{ tgl: "2026-11-10", at: "2026-11-10T09:30:00.000Z", by: "A", n: 3, ok: 2, bad: 1, sig: "s", rows: [
  ["1", "Shift 1", "B 1", "", "", 100, 100, 0, "Cocok", "", "", 0, "", ""], ["2", "Shift 1", "B 2", "", "", 50, 50, 0, "Cocok", "", "", 0, "", ""], ["3", "Shift 2", "B 3", "", "", 70, 60, -10, "Selisih qty", "", "", 0, "", ""]] },
  { tgl: "2026-11-09", at: "2026-11-09T09:30:00.000Z", by: "A", n: 10, ok: 10, bad: 0, sig: "t", rows: [] }];
p = await page({ warehouse_so_clr_hist_v1: hist });
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(500);
ok(await p.locator("#monClr").isVisible(), "riwayat: kartu terlihat");
const t2 = await p.locator("#monClr").innerText();
ok(/Dari riwayat tersimpan/.test(t2), "riwayat: sumber ditandai 'riwayat tersimpan'");
ok(/3\s*\n?\s*Voucher/.test(t2) && /Perlu tindak\s*1|1\s*\n?\s*Perlu tindak/.test(t2), "riwayat: 3 voucher, 1 perlu tindak");
ok(await p.locator("#monClr .cm-tr").count() === 1, "riwayat: tren 2 hari tampil");
ok(await p.locator("#cmRef").count() === 0, "riwayat: tanpa tombol muat ulang counting (belum ada laporan di HP ini)");
ok(p.errs.length === 0, "riwayat: tanpa galat JS");
// riwayat lama tanpa baris (rows kosong) tetap tampil dari angka ringkas
p = await page({ warehouse_so_clr_hist_v1: [hist[1]] });
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(400);
ok(/10[\s\S]*Voucher/.test(await p.locator("#monClr").innerText()) && /Semua cocok/.test(await p.locator("#monClr").innerText()), "riwayat tanpa baris: tampil dari angka ringkas, status Semua cocok");

// 3) tanpa data clearing sama sekali: kartu tidak muncul
p = await page({});
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(400);
ok((await p.locator("#monClr").innerHTML()).trim() === "" && !(await p.locator("#monClr").isVisible()), "tanpa data clearing: kartu tidak tampil");

// 4) tablet + tanpa geser horizontal
p = await page(live, { width: 820, height: 1000 });
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(400);
ok(await p.locator("#monClr .cm-grid").isVisible(), "tablet: kartu terlihat");
ok(await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), "tablet: tanpa geser horizontal");
ok(await p.locator("#monClr .cm-grid").evaluate((e) => getComputedStyle(e).gridTemplateColumns.split(" ").length) === 4, "tablet: 4 kolom statistik");
await b.close();
console.log(fail ? fail + " gagal" : "semua OK"); process.exit(fail ? 1 : 0);
