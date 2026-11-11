// HP baru (tanpa pengaturan) harus langsung punya semua tautan laporan bawaan. Bangun dulu dengan variabel VITE_*:
//   VITE_SYNC_URL=https://script.google.com/macros/s/AKTEST/exec VITE_CLEARING_URL=https://script.google.com/macros/s/CLRTEST/exec VITE_DELIVERY_URL=https://docs.google.com/spreadsheets/d/DLVTEST/edit VITE_MON_URL=https://docs.google.com/spreadsheets/d/MONTEST/edit npx vite build --outDir /tmp/dist-links && npx vite preview --outDir /tmp/dist-links --port 4175
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const b=await chromium.launch(); const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.route("https://script.google.com/**", r=>r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({ok:false,error:"tes"})}));
await p.route(/^https?:\/\/(?!localhost|script\.google)/, r=>r.abort());
await p.addInitScript(()=>localStorage.setItem("warehouse_so_lgsetup_v1","1"));   // HP BARU: tanpa pengaturan apa pun
await p.goto("http://localhost:4175/"); await p.waitForFunction(()=>document.getElementById("pgT")?.textContent.trim());
await p.evaluate(()=>go("data")); await p.waitForTimeout(500);
console.log("panel Tautan laporan:\n"+(await p.evaluate(()=>[...document.querySelectorAll("#lkList .lk-row")].map(r=>"  "+r.innerText.replace(/\s+/g," ")).join("\n"))));
console.log("kolom Sinkron terisi :",await p.evaluate(()=>document.getElementById("syUrl").value.slice(0,45)));
await p.evaluate(()=>go("clr")); await p.waitForTimeout(300); console.log("kolom Clearing terisi:",await p.evaluate(()=>document.getElementById("clrUrl").value.slice(0,45)));
console.log("ERRORS:",errs.length?errs:"none"); await b.close();
