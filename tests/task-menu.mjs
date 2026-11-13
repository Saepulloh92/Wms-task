// Uji pemantauan tugas admin di menu Distribusi (ganti petugas, hapus, tautan ke bin / aging / DC) dan sisi petugas di menu Task.
import { createRequire } from "node:module"; import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const fx=n=>JSON.parse(fs.readFileSync(new URL("./fixtures/"+n, import.meta.url),"utf8"));
const m=fx("master.json"), u=fx("users.json"); const items=[...new Set(m.map(x=>x.item))].slice(0,2);
const at=new Date(Date.now()-3*3600e3).toISOString();
const tasks={"B1-01-A":{u:"ua1budi",by:"Admin",at},"B1-01-B":{u:"ua2sari",by:"Admin",at},"AG|B1-02-A":{u:"ua1budi",by:"Admin",at},["DC|"+items[0]]:{u:"ua1budi",by:"Admin",at}};
const dp={}; items.forEach(i=>dp[i]=true);
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:390,height:844}}); const p=await ctx.newPage();
await p.route(/^https?:\/\/(?!localhost)/, r=>r.abort()); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.addInitScript(f=>{ if(!localStorage.getItem("seeded")){localStorage.setItem("seeded","1");["warehouse_so_lgsetup_v1"].forEach(k=>localStorage.setItem(k,"1"));localStorage.setItem("warehouse_so_master_v2",JSON.stringify(f.m));localStorage.setItem("warehouse_so_users_v1",JSON.stringify(f.u));localStorage.setItem("warehouse_so_tasks_v1",JSON.stringify(f.t));localStorage.setItem("warehouse_dc_pick_v1",JSON.stringify(f.dp));}},{m,u,t:tasks,dp});
await p.goto("http://localhost:4173/"); await p.waitForFunction(()=>document.getElementById("pgT")?.textContent.trim());
const L=(k,v)=>console.log(k.padEnd(28),v); const T=s=>p.evaluate(s=>document.querySelector(s)?.innerText.replace(/\s+/g," ").trim().slice(0,170),s);
const view=()=>p.evaluate(()=>[...document.querySelectorAll("main > section")].filter(s=>!s.hidden).map(s=>s.id).join());
await p.evaluate(()=>go("dist")); await p.waitForTimeout(400);
L("judul",await p.evaluate(()=>document.getElementById("pgT").textContent));
L("ringkasan (admin)",await T("#tskSum"));
L("chips",await T("#tskChips"));
L("jumlah kartu",await p.evaluate(()=>document.querySelectorAll("#tskList .card.tsk").length));
L("kartu 1",await T("#tskList .card.tsk"));
L("aksi admin ada?",await p.evaluate(()=>!!document.querySelector("#tskList [data-tsk=del]")&&!!document.querySelector("#tskList select[data-tsk=re]")));
// pindah petugas
await p.click('#tskList .card.tsk[data-key="B1-01-B"] .tk-more summary'); await p.selectOption('#tskList .card.tsk[data-key="B1-01-B"] select','ua3andi'); await p.waitForTimeout(400);
L("setelah ganti petugas",await p.evaluate(()=>JSON.parse(localStorage.getItem("warehouse_so_tasks_v1"))["B1-01-B"].u));
// filter petugas
await p.selectOption("#tskUser","ua1budi"); await p.waitForTimeout(250);
L("filter Budi: kartu",await p.evaluate(()=>document.querySelectorAll("#tskList .card.tsk").length)+" (harus 3)");
// kerjakan bin
await p.click('#tskList .card.tsk[data-key="B1-01-A"] .tk-title'); await p.waitForTimeout(500);
L("kerjakan bin -> view",await view()+" | sheet terbuka:"+await p.evaluate(()=>{const e=document.getElementById("sheet");const r=e.getBoundingClientRect();return r.height>50&&r.top<innerHeight})+" | bin:"+await T("#shBin, #shT, #sheet b"));
await p.reload(); await p.waitForFunction(()=>document.getElementById("pgT")?.textContent.trim());
await p.evaluate(()=>go("dist")); await p.waitForTimeout(300);
// kerjakan aging
await p.click('#tskList .card.tsk[data-key="AG|B1-02-A"] [data-tsk=go]'); await p.waitForTimeout(900);
L("kerjakan aging -> view",await view()+" | kartu terbuka:"+await p.evaluate(()=>document.querySelector('[data-rak="B1-02-A"]')?.open));
// kerjakan DC
await p.evaluate(()=>go("dist")); await p.waitForTimeout(300);
await p.click('#tskList .card.tsk[data-key^="DC|"] [data-tsk=go]'); await p.waitForTimeout(600);
L("kerjakan DC -> view",await view()+" | dialog DC terbuka:"+await p.evaluate(()=>{const e=document.getElementById("dcSheet");const r=e.getBoundingClientRect();return r.height>50&&r.top<innerHeight}));
await p.keyboard.press("Escape"); await p.waitForTimeout(400);
// hapus
await p.evaluate(()=>go("dist")); await p.waitForTimeout(300);
await p.click('#tskList .card.tsk[data-key^="DC|"] .tk-more summary'); await p.click('#tskList .card.tsk[data-key^="DC|"] [data-tsk=del]'); await p.waitForTimeout(300); await (await p.$("#dOk"))?.click(); await p.waitForTimeout(400);
L("setelah hapus DC: tersisa",await p.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem("warehouse_so_tasks_v1"))).length)+" (harus 3)");

// sebagai petugas Budi
await p.evaluate(()=>localStorage.setItem("warehouse_so_curuser_v1",JSON.stringify("ua1budi"))); await p.reload(); await p.waitForFunction(()=>document.getElementById("pgT")?.textContent.trim());
await p.evaluate(()=>go("task")); await p.waitForTimeout(400);
L("petugas: ringkasan",await T("#tskSum"));
L("petugas: kartu",await p.evaluate(()=>document.querySelectorAll("#tskList .card.tsk").length));
L("petugas: tanpa aksi admin",await p.evaluate(()=>!document.querySelector("#tskList [data-tsk=del]")&&!document.querySelector("#tskList select")));
L("petugas: pemilih petugas",await p.evaluate(()=>document.getElementById("tskWhoW").hidden)+" (harus true)");

L("petugas: menu Task/Distribusi",await p.evaluate(()=>{const v=k=>{const b=document.querySelector('.mi[data-v="'+k+'"]');return !!b&&!b.hidden&&getComputedStyle(b).display!=="none"};return "task="+v("task")+" dist="+v("dist")+" (harus task=true dist=false)"}));
L("ERRORS",errs.length?errs:"none"); await b.close(); process.exit(errs.length?1:0);
