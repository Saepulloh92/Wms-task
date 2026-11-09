// Uji penyimpanan state server (GAS) dengan Spreadsheet/Properties palsu: node tests/gas-storage.mjs
import vm from "node:vm"; import fs from "node:fs"; import crypto from "node:crypto";
const files = fs.readdirSync(new URL("../gas", import.meta.url)).filter(f => f.endsWith(".gs")).sort();

// --- sheet palsu ---
let grid = [], maxRows = 1000, writes = [];
const sheet = {
  getLastRow() { for (let i = grid.length - 1; i >= 0; i--) if (grid[i] && grid[i].some(v => v !== "" && v != null)) return i + 1; return 0; },
  getMaxRows() { return maxRows; }, insertRowsAfter(_, n) { maxRows += n; },
  clearContents() { grid = []; }, hideSheet() {},
  getRange(r, c, nr = 1, nc = 1) {
    if (typeof c === "string" || r === "A:C") return { setNumberFormat() {} };
    if (r + nr - 1 > maxRows) throw new Error("di luar batas sheet");
    return {
      getValues() { const o = []; for (let i = 0; i < nr; i++) { const row = grid[r - 1 + i] || []; o.push([0, 1, 2].map(j => row[j] ?? "")); } return o; },
      setValues(v) { writes.push([r, nr]); v.forEach((row, i) => { grid[r - 1 + i] = row.slice(); }); },
      clearContent() { for (let i = 0; i < nr; i++) grid[r - 1 + i] = ["", "", ""]; },
      setNumberFormat() {},
    };
  },
};
const store = {};
const PropertiesService = { getScriptProperties: () => ({ getProperty: k => store[k] ?? null, setProperty: (k, v) => { store[k] = String(v); }, deleteProperty: k => { delete store[k]; } }) };
const SpreadsheetApp = { getActiveSpreadsheet: () => ({ getSheetByName: n => n === "_STATE" ? sheet : null, insertSheet: () => sheet }) };
const Utilities = { base64Encode: b => Buffer.from(b).toString("base64"), computeDigest: (_, s) => crypto.createHash("md5").update(s).digest(), DigestAlgorithm: { MD5: 1 }, Charset: { UTF_8: 1 } };
const ContentService = { createTextOutput: t => ({ t, setMimeType() { return this; } }), MimeType: { JSON: 1 } };
const LockService = { getScriptLock: () => ({ tryLock: () => true, releaseLock() {}, waitLock() {} }) };
const ctx = vm.createContext({ console, Logger: { log() {} }, JSON, Date, Math, Object, Array, String, Number, isNaN, PropertiesService, SpreadsheetApp, Utilities, ContentService, LockService });
vm.runInContext(files.map(f => fs.readFileSync(new URL("../gas/" + f, import.meta.url), "utf8")).join("\n") +
  "\nrenderSheets_=function(){};this.__=function(n){return eval(n)};", ctx);
const G = ctx.__;
const K = G("K");
let ok = 0, bad = 0; const T = (n, c) => { console.log((c ? "OK   " : "GAGAL") + " " + n); c ? ok++ : bad++; };

const mkMaster = n => Array.from({ length: n }, (_, i) => ({ bin: "B1-" + i, item: "I" + i, area: "B1", onhand: i }));
const call = req => JSON.parse(G("handle_")({ token: "T", ...req }).t);
store.API_TOKEN = "T";

// 1) sync pertama: master + counts
let r = call({ action: "sync", data: { [K.master]: mkMaster(3000), [K.counts]: { "B1-1": { by: "a", savedAt: "2026-11-09T01:00:00.000Z", n: 1 } }, [K.users]: [{ id: "u1", name: "A" }] }, del: {}, replace: ["master", "users"] });
T("sync pertama ok", r.ok && r.rev === 1);
const lay = JSON.parse(store.STATE_LAYOUT);
T("tata letak dibuat, tiap kunci punya blok", lay.v === 1 && lay.keys[K.master] && lay.keys[K.counts]);
T("master besar dibaca utuh", G("readState_")()[K.master].length === 3000);

// 2) hanya counts berubah: master tidak ditulis ulang
writes = [];
const mS = lay.keys[K.master].r, mEnd = mS + lay.keys[K.master].c - 1;
r = call({ action: "sync", data: { [K.counts]: { "B1-2": { by: "b", savedAt: "2026-11-09T02:00:00.000Z", n: 2 } } }, del: {}, replace: [] });
T("rev naik saat counts berubah", r.rev === 2);
T("blok master tidak ditulis ulang", writes.length > 0 && writes.every(([row, n]) => row + n - 1 < mS || row > mEnd));
T("kedua catatan counts ada", Object.keys(G("readState_")()[K.counts]).length === 2);

// 3) tanpa perubahan: tidak ada tulisan dan rev tetap
writes = [];
r = call({ action: "sync", data: { [K.counts]: { "B1-2": { by: "b", savedAt: "2026-11-09T02:00:00.000Z", n: 2 } } }, del: {}, replace: [] });
T("sync identik: rev tetap", r.rev === 2);
T("sync identik: tidak ada tulisan ke sheet", writes.length === 0);

// 4) counts membesar melebihi blok: susun ulang tanpa kehilangan data
const big = {}; for (let i = 0; i < 4000; i++) big["B1-" + i] = { by: "x".repeat(40), savedAt: "2026-11-09T03:00:00.000Z", n: i, note: "catatan " + i };
r = call({ action: "sync", data: { [K.counts]: big }, del: {}, replace: [] });
let st = G("readState_")();
T("susun ulang: counts besar utuh", r.ok && Object.keys(st[K.counts]).length === 4000);
T("susun ulang: master & users tetap utuh", st[K.master].length === 3000 && st[K.users].length === 1);

// 5) hapus lewat del tetap bekerja
r = call({ action: "sync", data: {}, del: { counts: ["B1-5"] }, replace: [] });
st = G("readState_")();
T("penghapusan rekaman", !st[K.counts]["B1-5"] && Object.keys(st[K.counts]).length === 3999);

// 6) penjaga: kiriman master/users kosong tidak menghapus server
r = call({ action: "sync", data: { [K.master]: [], [K.users]: [] }, del: {}, replace: ["master", "users"] });
st = G("readState_")();
T("master kosong dari klien ditolak", st[K.master].length === 3000);
T("daftar user kosong dari klien ditolak", st[K.users].length === 1);
r = call({ action: "sync", data: { [K.master]: [{ foo: 1 }] }, del: {}, replace: ["master"] });
T("master tanpa kolom bin ditolak", G("readState_")()[K.master].length === 3000);
r = call({ action: "sync", data: { [K.master]: mkMaster(10) }, del: {}, replace: ["master"] });
T("master valid dari admin menggantikan", G("readState_")()[K.master].length === 10 && r.mrev > 0);

// 7) kompatibel dengan data lama (tanpa tata letak): satu kali tulis ulang penuh
delete store.STATE_LAYOUT;
r = call({ action: "sync", data: {}, del: {}, replace: [] });
T("tanpa tata letak: dibuat ulang tanpa kehilangan data", !!store.STATE_LAYOUT && G("readState_")()[K.master].length === 10 && Object.keys(G("readState_")()[K.counts]).length === 3999);
console.log(`${ok} OK, ${bad} gagal`); process.exit(bad ? 1 : 0);
