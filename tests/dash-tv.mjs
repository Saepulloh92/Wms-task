// Uji tata letak Dashboard Delivery di HP, Full HD, dan 4K + mode TV, serta kelengkapan angka dari dashboard Excel.
//   VITE_SYNC_URL= npx vite build --outDir /tmp/dist-test && npx vite preview --outDir /tmp/dist-test --port 4173 &   lalu   node tests/dash-tv.mjs
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


const rows = mk({ ...BASE, ...SHIFT.base });
// semua angka/teks pada dashboard Excel yang harus terbaca di Beranda
const HARUS = ["20:02","18:12","10:44","160,97","160,61","-0,36","99,8%","100,0%","0,00","28","BOX","FUSO","CONTAINER","TRONTON","17","9:00","11:00","13:00","15:00","SADAR JAYA JETAK","NOVEMBER 2026","167","163","97,60%","1228,97","1202,46","204,83","200,41","12:43","18:18","20:25","38","231,749","19:20:57","22:01:40","JAKARTA","72","311,33","Kamis, 5 November 2026","Jumat, 6 November 2026"];
const b = await chromium.launch();
for (const [nama, w, h, kolom] of [["HP 390", 390, 844, 1], ["Full HD", 1920, 1080, 3], ["4K", 3840, 2160, 4]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rows }) => {
    localStorage.setItem("warehouse_so_lgsetup_v1", "1"); localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
    localStorage.setItem("warehouse_so_dlv_v1", JSON.stringify({ url: "", auto: 0 })); localStorage.setItem("warehouse_so_dlvc_v1", JSON.stringify({ at: Date.now(), rows }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rows });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.waitForTimeout(700);
  const teks = await p.evaluate(() => document.getElementById("dlvBody").textContent.replace(/\s+/g, " "));
  const hilang = HARUS.filter((x) => !teks.includes(x));
  ok(!hilang.length, nama + ": semua angka dashboard Excel tampil" + (hilang.length ? " (hilang: " + hilang.join(", ") + ")" : ""));
  const m = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: innerWidth, cols: getComputedStyle(document.getElementById("dlvBody")).columnCount }));
  ok(m.sw <= m.vw, nama + ": tanpa scroll horizontal");
  if (w >= 900) {
    ok(String(m.cols) === String(kolom), nama + ": " + kolom + " kolom (dapat " + m.cols + ")");
    await p.click("#dlvTv"); await p.waitForTimeout(600);
    const t = await p.evaluate(() => ({ dh: document.documentElement.scrollHeight, vh: innerHeight, side: getComputedStyle(document.querySelector(".side")).display, head: getComputedStyle(document.querySelector("header")).display }));
    ok(t.dh <= t.vh + 1, nama + ": mode TV muat satu layar tanpa scroll (" + t.dh + "/" + t.vh + ")");
    ok(t.side === "none" && t.head === "none", nama + ": mode TV menyembunyikan menu");
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    ok(!(await p.evaluate(() => document.body.classList.contains("tv"))), nama + ": Esc keluar dari mode TV");
  }
  ok(!errs.length, nama + ": tanpa error JavaScript");
  await p.close();
}
await b.close();
process.exit(fail ? 1 : 0);
