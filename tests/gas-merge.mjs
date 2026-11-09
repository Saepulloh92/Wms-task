// Uji penggabungan sisi server (GAS) tanpa jaringan: node tests/gas-merge.mjs
import vm from "node:vm"; import fs from "node:fs";
const files=fs.readdirSync(new URL("../gas", import.meta.url)).filter(f=>f.endsWith(".gs")).sort();
const ctx=vm.createContext({console,Logger:{log(){}},JSON,Date,Math,Object,Array,String,Number,isNaN});
vm.runInContext(files.map(f=>fs.readFileSync(new URL("../gas/"+f, import.meta.url),"utf8")).join("\n")+"\nthis.__K=K; this.__merge=merge_;",ctx);
const K=ctx.__K, merge=ctx.__merge; const t=(s)=>new Date(Date.UTC(2026,10,9,0,0,s)).toISOString();
let ok=0,bad=0; const T=(n,c)=>{console.log((c?"OK   ":"GAGAL")+" "+n); c?ok++:bad++;};
// --- tugas berprefiks ---
const server={[K.tasks]:{"AG|B1-01-A":{u:"ua1",at:t(10)},"DC|PIPA X":{u:"ua2",at:t(10)},"B1-02-A":{u:"ua1",at:t(10)}},[K.counts]:{},[K.dc]:{},[K.closed]:{},[K.aging]:{},[K.agcls]:{}};
const client={[K.tasks]:{"AG|B1-01-A":{u:"ua3",at:t(20)},"AG|B1-09-Z":{u:"ua1",at:t(15)}},[K.counts]:{},[K.dc]:{},[K.closed]:{},[K.aging]:{},[K.agcls]:{}};
const del={tasks:["DC|PIPA X"],counts:[],dc:[],closed:[],aging:[],agcls:[]};
let out=merge(JSON.parse(JSON.stringify(server)),client,del,[]);
const tk=out[K.tasks];
T("tugas AG lebih baru dari klien menang",tk["AG|B1-01-A"].u==="ua3");
T("tugas AG baru dari klien masuk",!!tk["AG|B1-09-Z"]);
T("tugas bin biasa tetap utuh",!!tk["B1-02-A"]);
console.log("   DC|PIPA X setelah daftar hapus:",tk["DC|PIPA X"]?"masih ada (server menang)":"terhapus");
// --- linkcfg ---
const L=(at,u)=>({data:{dlv:{url:u},clr:{url:"c"}},at});
const s1={[K.linkcfg]:L(t(50),"BARU")}, c1={[K.linkcfg]:L(t(10),"LAMA")};
const base={[K.tasks]:{},[K.counts]:{},[K.dc]:{},[K.closed]:{},[K.aging]:{},[K.agcls]:{}};
let o=merge({...base,...s1},{...base,...c1},{tasks:[],counts:[],dc:[],closed:[],aging:[],agcls:[]},[]);
T("linkcfg: klien lama TIDAK menimpa server yang lebih baru",o[K.linkcfg].data.dlv.url==="BARU");
o=merge({...base,[K.linkcfg]:L(t(10),"LAMA")},{...base,[K.linkcfg]:L(t(50),"BARU")},{tasks:[],counts:[],dc:[],closed:[],aging:[],agcls:[]},[]);
T("linkcfg: klien lebih baru menang",o[K.linkcfg].data.dlv.url==="BARU");
o=merge({...base,[K.linkcfg]:L(t(50),"BARU")},{...base},{tasks:[],counts:[],dc:[],closed:[],aging:[],agcls:[]},[]);
T("linkcfg: klien tanpa tautan tidak menghapus server",o[K.linkcfg].data.dlv.url==="BARU");
console.log(`${ok} OK, ${bad} gagal`);
