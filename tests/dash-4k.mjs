// Uji desain Dashboard 4K / TV: tampil di mode TV dan otomatis di layar >= 2400px, satu layar tanpa scroll,
// tanpa elemen terpotong, angka spreadsheet muncul. SHOT=1 menyimpan tangkapan layar ke /tmp/shot-*.png
//   VITE_SYNC_URL= npx vite build --outDir /tmp/dist-test && npx vite preview --outDir /tmp/dist-test --port 4173 &   lalu   node tests/dash-4k.mjs
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
const HARUS = ["20:02", "18:12", "10:44", "160,97", "160,61", "-0,36", "99,8%", "28", "BOX", "FUSO", "CONTAINER", "TRONTON", "17", "SADAR JAYA JETAK", "NOVEMBER 2026", "167", "97,60%", "1228,97", "1202,46", "38", "231,749", "19:20:57", "22:01:40", "JAKARTA", "72", "311,33", "Plan Delivery", "Act Delivery"];
const b = await chromium.launch();
async function buka(w, h, q = "") {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rows }) => {
    localStorage.setItem("warehouse_so_lgsetup_v1", "1"); localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
    localStorage.setItem("warehouse_so_dlv_v1", JSON.stringify({ url: "", auto: 0 })); localStorage.setItem("warehouse_so_dlvc_v1", JSON.stringify({ at: Date.now(), rows }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rows });
  await p.goto(url + q); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.waitForTimeout(900);
  return { p, errs };
}
const geom = (p) => p.evaluate(() => {
  const st = document.querySelector(".tv-stage"), r = st?.getBoundingClientRect(), bad = [];
  st?.querySelectorAll(".tv-card, .tv-stack").forEach((c) => { if (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1) bad.push((c.className || "").slice(0, 30) + " " + c.scrollHeight + "/" + c.clientHeight); });
  const main = st?.querySelector(".tv-main"), mb = main?.getBoundingClientRect().bottom || 0, cards = [...(st?.querySelectorAll(".tv-stack") || [])].map((s) => Math.round(s.getBoundingClientRect().bottom - mb));
  const outL = [...document.querySelectorAll("body *")].filter((e) => { const q = e.getBoundingClientRect(); return q.width > 0 && (q.bottom > innerHeight + 0.5 || q.right > innerWidth + 0.5) && !e.closest(".tv-stage") && getComputedStyle(e).position !== "fixed"; }), out = outL.length, lock = getComputedStyle(document.body).overflow;
  return { out, outN: outL.map((e) => e.tagName + "#" + e.id + "." + String(e.className).slice(0, 20) + " " + Math.round(e.getBoundingClientRect().bottom)).slice(0, 6), lock, has: !!st, w: r && Math.round(r.width), h: r && Math.round(r.height), vw: innerWidth, vh: innerHeight, sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, bad, over: cards, text: document.getElementById("dlvBody").textContent.replace(/\s+/g, " ") };
});
for (const [nama, w, h] of [["4K 3840x2160", 3840, 2160], ["Full HD 1920x1080", 1920, 1080], ["TV 1366x768", 1366, 768]]) {
  const { p, errs } = await buka(w, h);
  if (w >= 2400) {
    const g = await geom(p);
    ok(g.has, nama + ": desain 4K tampil otomatis di Beranda (tanpa menekan Layar TV)");
    ok(g.sw <= g.vw, nama + ": tanpa scroll horizontal");
  } else ok(!(await geom(p)).has, nama + ": Beranda biasa tetap kartu (belum mode TV)");
  await p.click("#dlvTv"); await p.waitForTimeout(700);
  const g = await geom(p);
  ok(g.has, nama + ": mode TV memakai desain 4K");
  ok(g.out === 0 && g.sw <= g.vw + 1, nama + ": satu layar, tidak ada elemen keluar batas (" + g.out + (g.out ? " " + g.outN.join(", ") : "") + ")");
  ok(g.lock === "hidden", nama + ": halaman terkunci dari scroll di mode TV");
  ok(Math.abs(g.w / g.h - 16 / 9) < 0.02, nama + ": rasio 16:9 terjaga (" + g.w + "x" + g.h + ")");
  ok(g.w >= g.vw - 2 || g.h >= g.vh - 2, nama + ": mengisi layar");
  ok(!g.bad.length && g.over.every((x) => x <= 1), nama + ": tidak ada kartu terpotong (kelebihan tinggi kolom: " + g.over.join("/") + "px)" + (g.bad.length ? " " + g.bad.join("; ") : ""));
  const hilang = HARUS.filter((x) => !g.text.includes(x));
  ok(!hilang.length, nama + ": semua angka tampil" + (hilang.length ? " (hilang: " + hilang.join(", ") + ")" : ""));
  if (process.env.SHOT) await p.screenshot({ path: "/tmp/shot-" + w + ".png" });
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  ok(!(await p.evaluate(() => document.body.classList.contains("tv"))), nama + ": Esc keluar mode TV");
  ok(!errs.length, nama + ": tanpa error JavaScript " + errs.join(";"));
  await p.close();
}
// Tautan ?tv=1: langsung mode TV (desain 4K) walau layar < 2400px, mis. TV 4K dengan skala tampilan 150-200%
for (const [nama, w, h] of [["Full HD 1920x1080", 1920, 1080], ["TV 4K skala 200% (1920x1080)", 1920, 1080], ["layar 2560x1440", 2560, 1440]]) {
  const { p, errs } = await buka(w, h, "?tv=1"); await p.waitForTimeout(700);
  const g = await geom(p);
  ok(g.has && await p.evaluate(() => document.body.classList.contains("tv")), nama + ": ?tv=1 langsung membuka desain 4K (mode TV)");
  ok(g.out === 0 && g.sw <= g.vw + 1, nama + ": ?tv=1 satu layar tanpa elemen keluar batas");
  ok(!errs.length, nama + ": ?tv=1 tanpa error JavaScript " + errs.join(";"));
  await p.close();
}
{ const { p } = await buka(1920, 1080, "#tv"); await p.waitForTimeout(700); ok((await geom(p)).has, "#tv juga membuka desain 4K"); await p.close(); }
// HP: tidak memakai desain 4K
{ const { p } = await buka(390, 844); ok(!(await geom(p)).has, "HP 390: tetap kartu biasa"); await p.close(); }
await b.close(); process.exit(fail ? 1 : 0);
