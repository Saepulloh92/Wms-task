// Uji Dashboard Delivery: semua blok pada dashboard Excel "DASHBOARD SUPPLY CHAIN MANAGEMENT LA 2026" harus tampil di Beranda.
// Dijalankan dua kali: tata letak dasar, dan varian dengan pojok sel gabungan bergeser 1 baris (tahan terhadap pergeseran).
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/dash-delivery.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0;
const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };

const BASE = {
  F2: "DASHBOARD SUPPLY CHAIN MANAGEMENT LA 2026", AJ2: "07/11/2026", F8: "20:02", B13: "18:12", E20: "10:44", J10: "20:02",
  S12: "160,97", W12: "160,61", AA14: "-0,36", AD14: "99,8%", S19: "160,97", W19: "160,61", AA19: "100,0%", S25: "0,00", W25: "0,00", AA25: "0,0%",
  B28: "28", F28: "BOX", J28: "4", F30: "FUSO", J30: "17", F32: "CONTAINER", J32: "4", F34: "TRONTON", J34: "3",
  M26: "9:00", P26: "6", M28: "11:00", P28: "17", M30: "13:00", P30: "17", M32: "15:00", P32: "19", P34: "100%",
  B43: "0", F43: "27", J43: "0", N43: "27",
  S33: "1", S39: "0", V39: "1", S46: "0", V46: "0", AA35: "SADAR JAYA JETAK", AE35: "1",
  AM9: "NOVEMBER 2026", AL13: "167", AL15: "163", AL17: "1228,97", AL19: "1202,46", AR13: "97,60%", AR17: "1202,46", AR19: "100,0%",
  AL23: "27", AR23: "204,83", AL25: "12:43", AR25: "200,41", AL27: "18:18", AR27: "200,41", AL29: "20:25", AL33: "5", AL35: "1", AL37: "9",
  AL41: "38", AO41: "Kamis, 5 November 2026", AL43: "231,749", AO43: "Rabu, 4 November 2026", AL45: "19:20:57", AO45: "Rabu, 4 November 2026", AL47: "22:01:40", AO47: "Jumat, 6 November 2026",
  AG53: "JAKARTA", AL55: "72", AL57: "311,33",
};
// blok yang pojok sel gabungannya bisa berbeda: posisi dasar dan varian +1 baris
const SHIFT = {
  base: { B20: "13", J21: "0", M21: "13", P21: "13", J14: "1", P54: "100%", P56: "0%", P58: "100%", S55: "0" },
  geser: { B21: "13", J22: "0", M22: "13", P22: "13", J15: "1", P53: "100%", P55: "0%", P57: "100%", S56: "0" },
};
const mk = (o) => { const rows = Array.from({ length: 80 }, () => Array(50).fill("")); Object.entries(o).forEach(([a, v]) => { const m = /^([A-Z]+)(\d+)$/.exec(a); let n = 0; for (const ch of m[1]) n = n * 26 + ch.charCodeAt(0) - 64; rows[+m[2] - 1][n - 1] = v; }); return rows; };

const b = await chromium.launch();
for (const [name, extra] of Object.entries(SHIFT)) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rows }) => {
    localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users)); localStorage.setItem("warehouse_so_lgsetup_v1", "1");
    localStorage.setItem("warehouse_so_dlv_v1", JSON.stringify({ url: "", auto: 0 })); localStorage.setItem("warehouse_so_dlvc_v1", JSON.stringify({ at: Date.now(), rows }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rows: mk({ ...BASE, ...extra }) });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim());
  await p.evaluate(() => window.go("mon")); await p.waitForTimeout(400);
  const T = await p.evaluate(() => document.getElementById("dlvBody").textContent.replace(/\s+/g, " "));
  const has = (s) => T.includes(s);
  const tag = "[" + name + "] ";
  ok(["28", "27"].every(has) && has("Total Mobil") && has("Mobil Keluar"), tag + "kartu total/keluar/proses");
  ok(["BOX", "FUSO", "CONTAINER", "TRONTON"].every(has) && has("17"), tag + "jenis mobil");
  ok(["9:00", "11:00", "13:00", "15:00"].every(has), tag + "jam keluar mobil (4 slot)");
  ok(has("Progress delivery") && has("Mobil masuk") && has("Mobil proses") && has("Mobil keluar"), tag + "tiga bar progress delivery");
  ok(["20:02", "18:12", "10:44"].every(has) && has("07/11/2026"), tag + "jam update, finish loading, selesai SJ, finish delivery, tanggal");
  ok(has("Plan 160,97") && has("Aktual 160,61") && has("-0,36") && has("99,8%"), tag + "tonase delivery: plan, aktual, selisih, realisasi");
  ok(has("Omzet") && has("100,0%") && has("Non omzet") && has("0,00"), tag + "omzet dan non omzet");
  ok(has("Total 13") && has("Plan 13") && has("Deliv 13") && has("Gap 0"), tag + "dalam kota: total, plan, deliv, gap");
  ok(has("Mobil masuk > 14:00") && has("1 mobil"), tag + "mobil masuk > 14:00 hari ini");
  ok(has("Belum / tidak masuk") && has("SADAR JAYA JETAK") && has("1 mobil"), tag + "belum masuk + daftar agen gagal masuk");
  ok(has("Under tonage"), tag + "under tonage hari ini");
  ok(has("NOVEMBER 2026") && has("167") && has("163") && has("97,60%"), tag + "ringkasan bulan: nama bulan, plan/actual mobil");
  ok(has("1228,97") && has("1202,46") && has("97,8%"), tag + "plan/actual tonase bulan + realisasi dihitung (97,8%)");
  ok(has("204,83") && has("200,41") && has("12:43") && has("18:18") && has("20:25"), tag + "rata-rata per hari dan finish rata-rata");
  ok(has("Total abnormal bulan ini") && has("5") && has("9"), tag + "total abnormal bulan ini (diberi label bulan)");
  ok(has("Kamis, 5 November 2026") && has("231,749") && has("19:20:57") && has("22:01:40"), tag + "rekor harian");
  ok(has("JAKARTA") && has("72 mobil") && has("311,33 ton"), tag + "destinasi terbanyak");
  ok(!/NaN|undefined|null/.test(T), tag + "tidak ada NaN/undefined");
  ok(errs.length === 0, tag + "tanpa error JavaScript " + errs.join(";"));
  await p.context().close();
}
await b.close(); process.exit(fail ? 1 : 0);
