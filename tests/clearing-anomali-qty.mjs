// Uji lapisan 3 Peringatan dini voucher: qty tidak biasa memakai skor-z robust (median/MAD), per voucher dan per lori; plus akurasi dan putusan petugas.
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const R = (v, mc, n, q, extra = {}) => ({ v: String(v), q, k: "", n, r: "", lr: "", sh: "", pic: "", grp: "", mc, nw: null, gw: null, afk: false, ...extra });
const rows = []; let no = 4050000;
// A) PPL40 Z 5": qty normal 97..103 (sebaran kecil), satu 106 (wajar), 60 dan 130 (pencilan), satu afkir 10 (dikecualikan)
[98, 100, 102, 99, 101, 100, 103, 97, 100, 101].forEach((q) => rows.push(R(no++, "PPL40", 'Z 5"', q)));
const v106 = no; rows.push(R(no++, "PPL40", 'Z 5"', 106));
const v60 = no; rows.push(R(no++, "PPL40", 'Z 5"', 60));
const v130 = no; rows.push(R(no++, "PPL40", 'Z 5"', 130));
const vAf = no; rows.push(R(no++, "PPL40", 'Z 5"', 10, { afk: true }));
// B) PPL41 Y 6": pembanding persis sama (100 x5) lalu 90 -> dinilai pencilan (sebaran nol)
for (let i = 0; i < 5; i++) rows.push(R(no++, "PPL41", 'Y 6"', 100));
const v90 = no; rows.push(R(no++, "PPL41", 'Y 6"', 90));
// C) tidak cukup pembanding (< 4)
for (let i = 0; i < 3; i++) rows.push(R(no++, "PPL42", 'X 7"', 100)); rows.push(R(no++, "PPL42", 'X 7"', 20));
// D) lori: item W 8" mesin PPL50, 7 lori; tiap lori 2 voucher. L1..L6 ~ total 200, L7 total 600
const lq = { L1: [100, 100], L2: [98, 103], L3: [101, 99], L4: [100, 102], L5: [97, 100], L6: [101, 101], L7: [300, 300] };
Object.entries(lq).forEach(([lr, qs]) => qs.forEach((q) => rows.push(R(no++, "PPL50", 'W 8"', q, { lr }))));
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const cnt = [{ v: String(v60), q: 60, k: "", t: "", lr: "" }, { v: String(v130), q: 99, k: "", t: "", lr: "" }];
await p.addInitScript(({ fx, rep, cnt }) => {
  localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
  localStorage.setItem("warehouse_so_clr_rep_v1", JSON.stringify({ at: Date.now(), name: "laporan.xlsx", rows: rep }));
  localStorage.setItem("warehouse_so_clr_cnt_v1", JSON.stringify({ at: Date.now(), name: "counting", rows: cnt }));
}, { fx: { master: FX("master.json"), users: FX("users.json") }, rep: rows, cnt });
await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
const A = await p.evaluate((r) => clrAnomaly(r, 3), rows);
const q = (v) => A.qty.find((x) => x.v === String(v));
ok(q(v60) && q(v60).z < -3.5 && q(v60).hi && q(v60).usual >= 99 && q(v60).usual <= 101, "qty 60 pencilan (z " + (q(v60) && q(v60).z.toFixed(1)) + ", median " + (q(v60) && q(v60).usual) + ") ditandai tinggi");
ok(q(v130) && q(v130).z > 3.5 && q(v130).hi, "qty 130 pencilan ke atas ditandai tinggi");
ok(!q(v106), "qty 106 (dalam sebaran normal) tidak ditandai");
ok(!A.qty.some((x) => x.v === String(vAf)), "voucher afkir dikecualikan");
ok(q(v90) && !isFinite(q(v90).z) && q(v90).n === 5, "pembanding persis sama (100 x5): 90 ditandai (z tak hingga)");
ok(!A.qty.some((x) => x.mc === "PPL42"), "pembanding kurang dari 4 tidak dinilai");
ok(A.qty.every((x) => Math.abs(x.z) >= 3.5), "semua tanda memakai ambang z >= 3,5");
const lo = A.lori;
ok(lo.length === 1 && lo[0].lr === "L7" && lo[0].q === 600 && lo[0].nv === 2 && lo[0].hi, "lori L7 (total 600 vs median lori lain ~200) ditandai; L1-L6 tidak: " + lo.map((x) => x.lr).join(","));
ok(!A.qty.some((x) => x.mc === "PPL50" && x.q < 300), "qty voucher normal di lori tidak ikut ditandai");
await p.evaluate(() => window.go("clr")); await p.waitForTimeout(400);
const T = await p.locator("#clrAnom").innerText();
ok(/Qty tidak biasa/i.test(T) && new RegExp(String(v60)).test(T) && /z −/.test(T) && /pembanding seragam/.test(T), "layar: bagian 'Qty tidak biasa' dengan skor z");
ok(/Qty per lori tidak biasa/i.test(T) && /Lori L7/i.test(T) && /total Qty 600/.test(T), "layar: bagian 'Qty per lori' memuat Lori L7 total 600");
ok(/1 lori/.test(T) && /\d+ qty/.test(T), "layar: ringkasan memuat jumlah qty dan lori");
ok(/skor-z robust/.test(T), "layar: keterangan metode statistik tampil");
// pembuktian akurasi: cocokkan counting + putusan
const T2 = await p.locator("#clrAnom").innerText();
ok(/Counting selisih/i.test(T2) && /Counting cocok/i.test(T2), "baris bertanda menampilkan hasil counting");
ok(/Belum ada putusan petugas/.test(T2), "akurasi: belum ada putusan");
await p.locator('[data-anfb$="|salah"]').first().click(); await p.waitForTimeout(200);
await p.locator('[data-anfb$="|normal"]').nth(1).click(); await p.waitForTimeout(200);
const T3 = await p.locator("#clrAnom").innerText();
ok(/Dari 2 voucher yang sudah diperiksa, 1 terbukti salah item \(50%\)/.test(T3), "akurasi: 1 dari 2 diputuskan salah item = 50%");
ok(/Dari 2 voucher bertanda yang sudah dihitung counting, 1 juga selisih qty/.test(T3), "akurasi: 1 dari 2 bertanda juga selisih di counting");
await p.reload(); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.evaluate(() => window.go("clr")); await p.waitForTimeout(400);
ok(!(await p.evaluate(() => document.getElementById("clrSrc").contains(document.getElementById("clrAnom")))), "kartu peringatan berada di luar panel 'Mulai di sini'");
ok(/Dari 2 voucher yang sudah diperiksa/.test(await p.locator("#clrAnom").innerText()), "putusan tersimpan setelah muat ulang");
const fbv = await p.evaluate(() => JSON.parse(localStorage.getItem("warehouse_so_clr_anfb_v1")));
ok(Object.values(fbv).every((x) => x && x.at && (x.v === "salah" || x.v === "normal")), "putusan tersimpan sebagai {v, at, by}");
await p.evaluate(() => window.go("mon")); await p.waitForTimeout(500);
const M = await p.locator("#monClr").innerText();
ok(/Peringatan dini voucher/i.test(M) && /1 terbukti salah item/.test(M) && /akurasi 50%/.test(M), "Monitoring: akurasi 50%: " + (M.match(/\d+ ditandai[^\n]*/) || ["(tidak ada)"])[0]);
// daftar kerja di Monitoring: voucher paling perlu dicek + tombol putusan langsung
ok(/Cek hari ini/i.test(M) && /belum diputuskan/.test(M), "Monitoring: judul 'Cek hari ini' dan jumlah belum diputuskan");
const nRows = await p.locator("#monClr .cm-pl").count();
ok(await p.locator("#monClr .cm-plan .cm-pl").first().locator('[data-anfb$="|salah"]').count() === 1 && /Lori L7/.test(M), "Monitoring: tiap voucher punya tombol Salah item / Normal, dan Lori L7 perlu dicek");
const firstV = (await p.locator("#monClr .cm-pl .cm-pt b").first().innerText()).trim();
ok(/Qty/.test(await p.locator("#monClr .cm-why").first().innerText()), "Monitoring: alasan singkat tampil ('Qty ... median ...')");
await p.locator("#monClr .cm-plan .cm-pl").first().locator('[data-anfb$="|salah"]').click(); await p.waitForTimeout(300);
const M2 = await p.locator("#monClr").innerText();
ok(/2 terbukti salah item/.test(M2), "Monitoring: tekan 'Salah item' langsung tercatat (2 terbukti)");
ok(!(await p.locator("#monClr .cm-pt b").allInnerTexts()).some((t) => t.trim() === firstV), "Monitoring: voucher yang sudah diputuskan hilang dari daftar kerja (" + firstV + ")");
ok((await p.locator("#monClr .cm-plan .cm-pl").count()) === nRows - 2 || (await p.locator("#monClr .cm-pl").count()) < nRows, "Monitoring: daftar kerja berkurang");
ok(await p.locator("#cmAnCopy").count() === 1, "Monitoring: tombol 'Bagikan daftar' tersedia");
const share = await p.evaluate(() => cmAnText(anSummary()));
ok(/Cek hari ini/.test(share) && /Lori L7/.test(share) && /1\. \d{7}/.test(share) && /Salah item \/ Normal/.test(share), "teks bagikan: judul, voucher berurut, lori, dan petunjuk tindakan");
ok(errs.length === 0, "tanpa error JavaScript " + errs.join("|"));
await b.close(); process.exit(fail ? 1 : 0);
