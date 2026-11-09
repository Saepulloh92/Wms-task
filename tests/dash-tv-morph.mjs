// Uji kehalusan layar TV: data berubah -> hanya angka yang berubah disentuh (elemen tetap), donat/bar bergeser halus,
// skala panggung tidak hilang, dan mode "kurangi gerakan" mematikan transisi.
//   npm run build && npx vite preview --port 4173 &   lalu   node tests/dash-tv-morph.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = process.env.APP_URL || "http://localhost:4173/";
const FX = (n) => JSON.parse(fs.readFileSync(new URL("./fixtures/" + n, import.meta.url), "utf8"));
let fail = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) fail++; };
const rows = Array.from({ length: 80 }, () => Array(50).fill(""));
const cell = (a, v) => { const m = /^([A-Z]+)(\d+)$/.exec(a); let n = 0; for (const ch of m[1]) n = n * 26 + ch.charCodeAt(0) - 64; rows[+m[2] - 1][n - 1] = v; };
Object.entries({ F2: "DASHBOARD SUPPLY CHAIN", AJ2: "07/11/2026", B28: "20", N43: "10", J43: "5", F43: "5", F28: "BOX", J28: "20", S12: "100,00", W12: "90,00", P34: "50%", P57: "50%" }).forEach(([k, v]) => cell(k, v));
const b = await chromium.launch();
async function open(opts = {}) {
  const p = await (await b.newContext({ viewport: { width: 3840, height: 2160 }, ...opts })).newPage();
  p.errs = []; p.on("pageerror", (e) => p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await p.addInitScript(({ fx, rows }) => {
    localStorage.setItem("warehouse_so_lgsetup_v1", "1"); localStorage.setItem("warehouse_so_master_v2", JSON.stringify(fx.master)); localStorage.setItem("warehouse_so_users_v1", JSON.stringify(fx.users));
    localStorage.setItem("warehouse_so_dlv_v1", JSON.stringify({ url: "", auto: 0 })); localStorage.setItem("warehouse_so_dlvc_v1", JSON.stringify({ at: Date.now(), rows }));
  }, { fx: { master: FX("master.json"), users: FX("users.json") }, rows });
  await p.goto(url); await p.waitForFunction(() => document.getElementById("pgT")?.textContent.trim()); await p.waitForTimeout(900);
  return p;
}
const ubah = (p) => p.evaluate(() => { dlvCache.rows[27][1] = "40"; dlvCache.rows[42][13] = "30"; dlvCache.rows[11][18] = "100,50"; dlvRender(); });

let p = await open();
ok(await p.locator(".tv-stage").count() === 1, "desain TV tampil");
await p.evaluate(() => { const s = document.querySelector(".tv-stage"); s.__m = 1; document.querySelectorAll(".tv-card").forEach((c, i) => (c.__m = i)); document.querySelector(".tv-donut").__m = "donat"; });
const sebelum = await p.evaluate(() => ({ w: document.querySelector(".tv-wrap").style.width, txt: document.querySelector(".tv-donut strong").textContent, pv: getComputedStyle(document.querySelector(".tv-donut")).getPropertyValue("--p") }));
await ubah(p);
await p.waitForTimeout(250);
const tengah = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".tv-donut")).getPropertyValue("--p")));
await p.waitForTimeout(1300);
const sesudah = await p.evaluate(() => ({
  panggung: document.querySelector(".tv-stage").__m === 1, kartu: [...document.querySelectorAll(".tv-card")].every((c, i) => c.__m === i), donat: document.querySelector(".tv-donut").__m === "donat",
  w: document.querySelector(".tv-wrap").style.width, txt: document.querySelector(".tv-donut strong").textContent, pv: parseFloat(getComputedStyle(document.querySelector(".tv-donut")).getPropertyValue("--p")), adaStyle: !!document.querySelector(".tv-wrap").style.getPropertyValue("--tv-s"),
}));
ok(sebelum.txt === "20" && sesudah.txt === "40", `angka berubah tampil (${sebelum.txt} -> ${sesudah.txt})`);
ok(sesudah.panggung && sesudah.kartu && sesudah.donat, "elemen yang sama dipakai ulang (tidak dibangun ulang, tanpa kedip)");
ok(sesudah.w === sebelum.w && sesudah.adaStyle, "skala panggung tetap utuh setelah pembaruan");
ok(tengah > Math.min(+sebelum.pv, sesudah.pv) && tengah < Math.max(+sebelum.pv, sesudah.pv), `donat bergeser halus (nilai tengah ${tengah.toFixed(1)} di antara ${(+sebelum.pv).toFixed(0)} dan ${sesudah.pv.toFixed(0)})`);
// data sama: tidak ada perubahan DOM sama sekali
const mut = await p.evaluate(() => new Promise((res) => { let n = 0; const o = new MutationObserver((l) => (n += l.length)); o.observe(document.getElementById("dlvBody"), { subtree: true, childList: true, characterData: true, attributes: true }); dlvRender(); setTimeout(() => { o.disconnect(); res(n); }, 300); }));
ok(mut === 0, "data sama: tidak ada satu pun perubahan DOM");
ok(p.errs.length === 0, "tanpa error JavaScript " + p.errs.join(";"));

// kurangi gerakan
const q = await open({ reducedMotion: "reduce" });
const tr = await q.evaluate(() => getComputedStyle(document.querySelector(".tv-donut")).transitionDuration);
ok(parseFloat(tr) < 0.01, "'kurangi gerakan' mematikan transisi donat (" + tr + ")");
await b.close(); process.exit(fail ? 1 : 0);
