// Uji lapisan 3 Peringatan dini voucher: qty tidak biasa terhadap qty standar mesin+item.
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const R = (v, mc, n, q, extra = {}) => ({ v: String(v), q, k: "", n, r: "", lr: "", sh: "", pic: "", grp: "", mc, nw: null, gw: null, afk: false, ...extra });
const rows = []; let no = 4050000;
for (let i = 0; i < 7; i++) rows.push(R(no++, "PPL40", 'Z 5"', 100));            // standar 100
const v60 = no; rows.push(R(no++, "PPL40", 'Z 5"', 60));                            // -40% -> cek
const v30 = no; rows.push(R(no++, "PPL40", 'Z 5"', 30));                            // -70% -> tinggi
const v90 = no; rows.push(R(no++, "PPL40", 'Z 5"', 90));                            // -10% -> tidak ditandai
const vAf = no; rows.push(R(no++, "PPL40", 'Z 5"', 10, { afk: true }));             // afkir dikecualikan
[10, 20, 30, 40, 50].forEach((q) => rows.push(R(no++, "PPL41", 'Y 6"', q)));       // tidak ada qty standar
for (let i = 0; i < 3; i++) rows.push(R(no++, "PPL42", 'X 7"', 100)); rows.push(R(no++, "PPL42", 'X 7"', 20)); // pembanding < 4
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const cnt = [{ v: String(v30), q: 99, k: "", t: "", lr: "" }, { v: String(v60), q: 60, k: "", t: "", lr: "" }];
await p.addInitScript(({ fx, rep, cnt }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
  localStorage.setItem("warehouse_so_clr_cnt_v1", JSON.stringify({ at: Date.now(), name: "counting", rows: cnt }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep: rows, cnt });
await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
const A = await p.evaluate((r) => clrAnomaly(r, 3), rows);
const q = (v) => A.qty.find((x) => x.v === String(v));
ok(q(v60) && q(v60).usual === 100 && q(v60).hi === false && Math.round(q(v60).dev) === -40, "qty 60 (standar 100, -40%) ditandai 'cek'");
ok(q(v30) && q(v30).hi === true, "qty 30 (-70%) ditandai tinggi");
ok(!q(v90), "qty 90 (-10%) tidak ditandai");
ok(!q(vAf), "voucher afkir dikecualikan");
ok(!A.qty.some((x) => x.mc === "PPL41"), "tanpa qty standar yang jelas (10,20,30,40,50) tidak dinilai");
ok(!A.qty.some((x) => x.mc === "PPL42"), "pembanding kurang dari 4 tidak dinilai");
ok(A.qty[0].v === String(v30), "urut dari penyimpangan terbesar");
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(400);
const T = await p.locator("#clrAnom").innerText();
ok(/Qty tidak biasa/i.test(T) && new RegExp(String(v30)).test(T) && /biasanya 100/.test(T) && /−70,0%/.test(T), "layar: bagian 'Qty tidak biasa' tampil dengan qty biasanya dan deviasi");
ok(/2 qty/.test(T), "layar: ringkasan memuat jumlah qty: " + (T.match(/\d+ qty/) || [""])[0]);
// pembuktian akurasi: cocokkan dengan counting + putusan petugas
const T2 = await p.locator("#clrAnom").innerText();
ok(/Counting selisih/i.test(T2) && /Counting cocok/i.test(T2), "baris bertanda menampilkan hasil counting (selisih untuk " + v30 + ", cocok untuk " + v60 + ")");
ok(/Belum ada putusan petugas/.test(T2), "akurasi: belum ada putusan");
await p.locator('[data-anfb$="|salah"]').first().click(); await p.waitForTimeout(200);
await p.locator('[data-anfb$="|normal"]').nth(1).click(); await p.waitForTimeout(200);
const T3 = await p.locator("#clrAnom").innerText();
ok(/Dari 2 voucher yang sudah diperiksa, 1 terbukti salah item \(50%\)/.test(T3), "akurasi: 1 dari 2 diputuskan salah item = 50%: " + (T3.match(/Dari 2[^.]*\./) || [""])[0]);
ok(/Dari 2 voucher bertanda yang sudah dihitung counting, 1 juga selisih qty/.test(T3), "akurasi: 1 dari 2 bertanda juga selisih di counting");
await p.reload(); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.evaluate(() => window.go("clr")); await p.waitForTimeout(400);
ok(!(await p.evaluate(() => document.getElementById("clrSrc").contains(document.getElementById("clrAnom")))), "kartu peringatan berada di luar panel 'Mulai di sini' (selalu terlihat)");
const fbv = await p.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_clr_anfb_v1")));
ok(Object.values(fbv).every((x) => x && x.at && (x.v === "salah" || x.v === "normal")), "putusan tersimpan sebagai {v, at, by} agar bisa disinkronkan");
ok(/Dari 2 voucher yang sudah diperiksa/.test(await p.locator("#clrAnom").innerText()), "putusan tersimpan setelah muat ulang");
// kartu Clearing di Monitoring memuat ringkasan akurasi
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(500);
const M = await p.locator("#monClr").innerText();
ok(/Peringatan dini voucher/i.test(M) && /2 ditandai/.test(M) && /1 terbukti salah item/.test(M) && /akurasi 50%/.test(M), "Monitoring: '2 ditandai · 1 terbukti salah item · akurasi 50%': " + (M.match(/\d+ ditandai[^\n]*/) || ["(tidak ada)"])[0]);
ok(errs.length === 0, "tanpa error JavaScript " + errs.join("|"));
await b.close(); process.exit(fail ? 1 : 0);
