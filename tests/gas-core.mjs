// Uji inti backend Apps Script tanpa jaringan (tiruan Properties/Lock/Sheet/Drive):  node tests/gas-core.mjs
import vm from "node:vm"; import fs from "node:fs"; import crypto from "node:crypto";
let okN = 0, bad = 0; const T = (n, c) => { console.log((c ? "OK   " : "GAGAL ") + n); c ? okN++ : bad++; };

function chain() { const p = new Proxy(function () {}, { get: (_, k) => (k === "then" ? undefined : p), apply: () => p }); return p; }
function makeEnv() {
  const props = new Map(), sheets = new Map(), env = { logs: [], formatCalls: 0, failSetValuesOn: null, files: [], tokenTries: 0 };
  class Sheet {
    constructor(n) { this.name = n; this.g = []; this.maxRows = 1000; this.hidden = false; }
    getName() { return this.name; } setName(n) { sheets.delete(this.name); this.name = n; sheets.set(n, this); }
    getMaxRows() { return this.maxRows; } insertRowsAfter(r, n) { this.maxRows += n; }
    getLastRow() { let l = 0; this.g.forEach((r, i) => { if (r && r.some((c) => c !== "" && c != null)) l = i + 1; }); return l; }
    hideSheet() { this.hidden = true; } clear() { this.g = []; return this; } clearContents() { this.g = []; return this; }
    getRange(a, b, c, d) {
      const sh = this;
      if (typeof a === "string") return new Proxy({}, { get: (_, k) => (k === "setNumberFormat" ? () => { env.formatCalls++; return chain(); } : () => chain()) });
      const r0 = a, c0 = b, nr = c || 1, nc = d || 1;
      const rg = {
        setValues(v) { if (env.failSetValuesOn === sh.name) { env.failSetValuesOn = null; throw new Error("gagal tulis (simulasi)"); } if (r0 + nr - 1 > sh.maxRows) throw new Error("range di luar batas"); v.forEach((row, i) => { sh.g[r0 - 1 + i] = sh.g[r0 - 1 + i] || []; row.forEach((x, j) => (sh.g[r0 - 1 + i][c0 - 1 + j] = x)); }); return rg; },
        getValues() { const o = []; for (let i = 0; i < nr; i++) { const row = []; for (let j = 0; j < nc; j++) row.push(((sh.g[r0 - 1 + i] || [])[c0 - 1 + j]) ?? ""); o.push(row); } return o; },
        clearContent() { for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) if (sh.g[r0 - 1 + i]) sh.g[r0 - 1 + i][c0 - 1 + j] = ""; return rg; },
        setNumberFormat() { env.formatCalls++; return rg; },
      };
      const px = new Proxy(rg, { get: (t, k) => (k in t ? t[k] : () => px) });
      return px;
    }
    setFrozenRows() {} getSheetId() { return 1; }
  }
  const ss = { getSheetByName: (n) => sheets.get(n) || null, insertSheet: (n) => { const s = new Sheet(n); sheets.set(n, s); return s; }, getSpreadsheetTimeZone: () => "Asia/Jakarta", setActiveSheet() {}, moveActiveSheet() {} };
  env.sheets = sheets; env.props = props;
  const folderFiles = env.files;
  const mkFile = (name, t) => ({ name, t, trashed: false, getName() { return this.name; }, getDateCreated() { return new Date(this.t); }, setTrashed(v) { this.trashed = v; } });
  const folder = { createFile(n) { folderFiles.push(mkFile(n, Date.now() + folderFiles.length)); }, getFiles() { const l = folderFiles.filter((f) => !f.trashed); let i = 0; return { hasNext: () => i < l.length, next: () => l[i++] }; } };
  env.mkFile = mkFile;
  const out = (s) => ({ s, getContent: () => s, setMimeType() { return this; } });
  const sandbox = {
    console, JSON, Date, Math, Object, Array, String, Number, isNaN, RegExp, Error, parseInt,
    Logger: { log: (m) => env.logs.push(String(m)) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => (props.has(k) ? props.get(k) : null), setProperty: (k, v) => props.set(k, String(v)), deleteProperty: (k) => props.delete(k) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, waitLock() {}, releaseLock() {} }) },
    ContentService: { createTextOutput: out, MimeType: { JSON: "json" } },
    SpreadsheetApp: { getActiveSpreadsheet: () => ss },
    DriveApp: { getFoldersByName: () => ({ hasNext: () => true, next: () => folder }), createFolder: () => folder },
    MimeType: { PLAIN_TEXT: "text/plain" },
    ScriptApp: { getProjectTriggers: () => [], newTrigger: () => chain(), deleteTrigger() {} },
    Utilities: {
      parseDate: (str) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(str)); if (!m) throw new Error("Tanggal tidak valid"); return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]) - 7 * 3600e3); },
      getUuid: () => crypto.randomUUID(), DigestAlgorithm: { MD5: "md5" }, Charset: { UTF_8: "utf8" },
      computeDigest: (_a, s) => [...crypto.createHash("md5").update(String(s)).digest()], base64Encode: (b) => Buffer.from(b).toString("base64"),
      formatDate: (d, _tz, f) => { if (isNaN(d.getTime())) throw new Error("Invalid time value"); const j = new Date(d.getTime() + 7 * 3600e3), p = (n, w = 2) => String(n).padStart(w, "0");
        return f.replace("yyyy", j.getUTCFullYear()).replace("MM", p(j.getUTCMonth() + 1)).replace("dd", p(j.getUTCDate())).replace("HH", p(j.getUTCHours())).replace("mm", p(j.getUTCMinutes())).replace("ss", p(j.getUTCSeconds())); },
    },
  };
  const ctx = vm.createContext(sandbox);
  const files = fs.readdirSync(new URL("../gas", import.meta.url)).filter((f) => f.endsWith(".gs")).sort();
  vm.runInContext(files.map((f) => fs.readFileSync(new URL("../gas/" + f, import.meta.url), "utf8")).join("\n"), ctx);
  env.ctx = ctx; env.call = (req) => JSON.parse(ctx.handle_(req).getContent());
  return env;
}

// --- token & keamanan ---
{
  const e = makeEnv(), C = e.ctx;
  const a = C.randomToken_(), b = C.randomToken_();
  T("token acak 28 karakter, tidak ada karakter membingungkan", a.length === 28 && /^[A-HJ-NP-Za-km-z2-9]+$/.test(a));
  T("token acak berbeda tiap pembuatan", a !== b);
  T("token acak memakai generator aman (bukan Math.random)", !/Math\.random/.test(fs.readFileSync(new URL("../gas/70-util.gs", import.meta.url), "utf8").replace(/\/\/.*$/gm, "")));
  T("safeEq_ benar/salah/beda panjang", C.safeEq_("abc", "abc") && !C.safeEq_("abc", "abd") && !C.safeEq_("abc", "abcd") && !C.safeEq_("", "x"));
  e.props.set("API_TOKEN", "RAHASIA-TOKEN-UJI");
  T("token salah ditolak", e.call({ token: "salah", action: "ping" }).ok === false);
  T("tanpa token ditolak", e.call({ action: "pull" }).ok === false);
  const p = e.call({ token: "RAHASIA-TOKEN-UJI", action: "ping" });
  T("ping memberi versi kode server (untuk memastikan sudah di-deploy)", p.ok && /^\d{4}-\d{2}-\d{2}/.test(p.ver || ""));
  T("permintaan bukan objek ditolak rapi", e.ctx.handle_(null) && JSON.parse(e.ctx.handle_(null).getContent()).ok === false);
  T("action tak dikenal ditolak", e.call({ token: "RAHASIA-TOKEN-UJI", action: "hapus-semua" }).ok === false);
}
// --- sinkron dasar + masukan aneh ---
{
  const e = makeEnv(), C = e.ctx, K = C.K; e.props.set("API_TOKEN", "TOK");
  C.seed_();
  const base = { token: "TOK", action: "sync" };
  const r1 = e.call({ ...base, data: { [K.dcPick]: { a: 1 } }, del: "bukan-objek", replace: "bukan-array" });
  T("sinkron tahan terhadap del/replace bertipe salah", r1.ok === true);
  const r2 = e.call({ ...base, data: "bukan-objek" });
  T("sinkron tahan terhadap data bertipe salah", r2.ok === true);
  const s1 = e.call({ ...base, data: { [K.aging]: { "B1-01-A": { qty: "5", at: "2026-11-10T01:00:00Z" } } } });
  const rev1 = s1.rev; const s2 = e.call({ ...base, data: { [K.aging]: { "B1-01-A": { qty: "5", at: "2026-11-10T01:00:00Z" } } } });
  T("data sama tidak menaikkan revisi", s2.rev === rev1);
  T("data aging tersimpan dan dikembalikan", s2.data[K.aging]["B1-01-A"].qty === "5");
}
// --- penulisan state aman ---
{
  const e = makeEnv(), C = e.ctx, K = C.K; e.props.set("API_TOKEN", "TOK"); C.seed_();
  const before = JSON.stringify(C.readState_());
  e.failSetValuesOn = C.SH.state;
  let threw = false; try { C.commit_({ ...C.readState_(), [K.dcPick]: { x: "baru" } }); } catch (er) { threw = true; }
  T("gagal tulis di tengah commit melempar galat", threw);
  T("data lama TIDAK hilang saat penulisan gagal", JSON.stringify(C.readState_()) === before);
  C.commit_({ ...C.readState_(), [K.dcPick]: { x: "ok" } });
  T("commit normal tetap berhasil sesudahnya", C.readState_()[K.dcPick].x === "ok");
  // state mengecil: baris sisa dibersihkan
  const st = C.readState_(); const big = { ...st, [K.dcPick]: { teks: "x".repeat(200000) } }; C.commit_(big);
  C.commit_({ ...st, [K.dcPick]: {} });
  T("setelah state mengecil tidak ada sisa baris lama yang merusak", JSON.stringify(C.readState_()[K.dcPick]) === "{}");
  // bagian rusak dilaporkan, bukan diam-diam
  const s = C.stateSheet_(); const g = s.g; const row = g.findIndex((r) => r && r[0] === K.dcPick); g[row][2] = "{rusak";
  C.readState_();
  T("bagian state rusak tercatat di log", e.logs.some((l) => l.includes("rusak") && l.includes(K.dcPick)));
  const pl = e.call({ token: "TOK", action: "pull" });
  T("pull menyertakan peringatan data rusak", /rusak/i.test(pl.warn || "") && pl.ok);
}
// --- cadangan hanya menyentuh berkas miliknya ---
{
  const e = makeEnv(), C = e.ctx; e.props.set("API_TOKEN", "TOK"); C.seed_();
  e.files.push(e.mkFile("catatan-penting.docx", 1), e.mkFile("foto.jpg", 2));
  for (let i = 0; i < C.BACKUP_KEEP + 5; i++) C.backup_();
  const cad = e.files.filter((f) => f.name.startsWith("cadangan_stock_control_") && !f.trashed).length;
  T(`cadangan dibatasi ${C.BACKUP_KEEP} berkas terbaru`, cad === C.BACKUP_KEEP);
  T("berkas lain di folder cadangan tidak pernah dibuang", e.files.filter((f) => !f.name.startsWith("cadangan_")).every((f) => !f.trashed));
}
// --- sheet laporan ---
{
  const e = makeEnv(), C = e.ctx; e.props.set("API_TOKEN", "TOK");
  C.setup();
  T("sheet laporan terbentuk dari data awal", !!e.sheets.get(C.SH.counts) && !!e.sheets.get(C.SH.master));
  T("render sehat: tidak ada sheet yang gagal (" + C.warn_() + ")", C.warn_() === "");
  const stm = C.readState_(); stm[C.K.master] = [1, 2, 3].map((i) => ({ bin: "B1-0" + i + "-A", area: "B1", kode: "K" + i, item: "PIPA " + i, onhand: i * 10 }));
  C.commit_(stm);
  T("Master_WMS ikut terisi saat data WMS berubah (judul + 3 bin)", e.sheets.get(C.SH.master).getLastRow() === 4);
  T("rentang kolom teks digabung (hemat panggilan API)", JSON.stringify(C.textRuns_([1, 2, 3, 5, 6, 9])) === "[[1,3],[5,6],[9,9]]" && JSON.stringify(C.textRuns_([3, 1, 2, 2])) === "[[1,3]]");
  const hapus = C.SH.users; e.sheets.delete(hapus);
  C.renderSheets_(C.readState_(), false);
  T("sheet laporan yang terhapus dibuat ulang otomatis", !!e.sheets.get(hapus));
  const st = C.readState_(); const buruk = JSON.parse(JSON.stringify(st)); buruk[C.K.tasks] = { "B1-01-A": null, "X": { u: 1 } };
  let lempar = false; try { C.renderSheets_(buruk, false, true); } catch (er) { lempar = true; }
  T("data tugas janggal tidak menggagalkan sinkron", lempar === false);
  // satu sheet gagal ditulis (mis. kuota/proteksi sheet): sheet lain tetap diperbarui dan masalahnya dilaporkan
  e.failSetValuesOn = C.SH.closed;
  const stx = JSON.parse(JSON.stringify(st)); stx[C.K.closed] = { B1: { by: "Budi", at: "2026-11-10T01:00:00Z" } }; stx[C.K.aging] = { "B1-01-A": { qty: "9", at: "2026-11-10T02:00:00Z" } };
  C.renderSheets_(stx, false, true);
  T("sheet yang gagal dilaporkan lewat warn_()", C.warn_().includes(C.SH.closed));
  T("sheet lain tetap diperbarui walau satu gagal", e.sheets.get(C.SH.aging).getLastRow() >= 2);
  C.renderSheets_(stx, false, false);
  T("sheet yang gagal dicoba lagi di render berikutnya dan peringatan hilang", C.warn_() === "" && e.sheets.get(C.SH.closed).getLastRow() >= 2);
}
// --- data laporan bersama: yang terbaru menang, tanda selesai digabung per voucher ---
{
  const e = makeEnv(), C = e.ctx, K = C.K; e.props.set("API_TOKEN", "TOK"); C.seed_();
  const sync = (data, extra = {}) => e.call({ token: "TOK", action: "sync", data, ...extra });
  sync({ [K.clrrep]: { at: 2000, name: "baru.xlsx", rows: [{ v: "1" }] }, [K.muatdata]: { at: 500, recs: [["A"]] }, [K.muatsum]: { at: 500, sig: "s1" } });
  const r2 = sync({ [K.clrrep]: { at: 1000, name: "lama.xlsx", rows: [] }, [K.muatdata]: { at: 900, recs: [["B"]] } });
  T("laporan voucher lama tidak menimpa yang baru", r2.data[K.clrrep].name === "baru.xlsx" && r2.data[K.clrrep].rows.length === 1);
  T("data muat yang lebih baru menggantikan yang lama", r2.data[K.muatdata].recs[0][0] === "B" && r2.data[K.muatsum].sig === "s1");
  sync({ [K.clrdone]: { "4043733": { at: "2026-11-10T01:00:00Z", by: "Budi" } } });
  const r3 = sync({ [K.clrdone]: { "4043734": { at: "2026-11-10T02:00:00Z", by: "Sari" }, "4043733": { at: "2026-11-10T00:30:00Z", by: "Lama" } } });
  T("tanda selesai digabung per voucher, yang lebih baru menang", r3.data[K.clrdone]["4043733"].by === "Budi" && r3.data[K.clrdone]["4043734"].by === "Sari");
  const r4 = sync({}, { del: { clrdone: ["4043734"] } });
  T("tanda selesai yang dibatalkan (dihapus) ikut terhapus di server", !r4.data[K.clrdone]["4043734"] && !!r4.data[K.clrdone]["4043733"]);
  const r5 = e.call({ token: "TOK", action: "pull" });
  T("pull mengembalikan semua data laporan", !!r5.data[K.clrrep] && !!r5.data[K.muatdata] && !!r5.data[K.clrdone]);
}
console.log(`${okN} OK, ${bad} gagal`); process.exit(bad ? 1 : 0);
