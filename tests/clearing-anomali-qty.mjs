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
await p.addInitScript(({ fx, rep }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep: rows });
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
ok(errs.length === 0, "tanpa error JavaScript " + errs.join("|"));
await b.close(); process.exit(fail ? 1 : 0);
