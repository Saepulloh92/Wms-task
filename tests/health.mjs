// Uji logika kesehatan data (murni): node tests/health.mjs
import { healthCheck } from "../src/lib/health.js";
let ok = 0, bad = 0; const T = (n, c) => { console.log((c ? "OK   " : "GAGAL") + " " + n); c ? ok++ : bad++; };
const NOW = Date.parse("2026-11-10T03:00:00Z"), iso = (m) => new Date(NOW + m * 60000).toISOString();
const row = (bin, onhand = 10, extra = {}) => ({ bin, area: "B1", kode: "K" + bin, item: "PIPA " + bin, onhand, ...extra });
const good = { data: [row("B1-01"), row("B1-02")], counts: { "B1-01": { actualQty: 10, systemQty: 10, by: "Andi", savedAt: iso(-5), itemMatch: true } },
  users: [{ id: "a", name: "Admin", role: "admin", active: true, areas: [] }, { id: "b", name: "Budi", role: "petugas", active: true, areas: ["B1"] }], tasks: {}, closed: {}, now: NOW };
const ids = (h) => h.issues.map((i) => i.id);

let h = healthCheck(good);
T("data bersih: tanpa temuan", h.ok && h.bad === 0 && h.warn === 0);
T("input kosong tidak error", healthCheck().ok && healthCheck({ data: null === 1 ? [] : [] }).ok);

h = healthCheck({ ...good, data: [row("B1-01"), row("B1-01"), row("B1-02")] });
T("baris master ganda terdeteksi (bad)", ids(h).includes("dup-master") && h.issues[0].level === "bad");
h = healthCheck({ ...good, data: [row("B1-01"), { ...row("B1-01"), item: "LAIN", kode: "X" }] });
T("bin sama item beda BUKAN ganda", !ids(h).includes("dup-master"));
h = healthCheck({ ...good, data: [row("B1-01", -3), row("B1-02", "abc"), { bin: "", area: "B1" }] });
T("onhand negatif/bukan angka/bin kosong terdeteksi", ids(h).includes("bad-master") && h.issues.find((i) => i.id === "bad-master").n === 3);

h = healthCheck({ ...good, counts: { ...good.counts, "B1-02": { actualQty: "x", by: "A", savedAt: iso(-1) }, "B1-03": { actualQty: -1, by: "A", savedAt: iso(-1) } } });
T("qty tidak valid terdeteksi", h.issues.find((i) => i.id === "bad-qty").n === 2);
h = healthCheck({ ...good, counts: { "B1-01": { ...good.counts["B1-01"], savedAt: iso(120) } } });
T("cap waktu masa depan terdeteksi (bad)", ids(h).includes("future"));
h = healthCheck({ ...good, counts: { "B1-01": { ...good.counts["B1-01"], savedAt: iso(5) } } });
T("selisih jam kecil (5 menit) ditoleransi", !ids(h).includes("future"));
h = healthCheck({ ...good, counts: { "ZZ-99": { actualQty: 1, systemQty: 1, by: "A", savedAt: iso(-1) } } });
T("hasil periksa yatim terdeteksi", ids(h).includes("orphan"));
h = healthCheck({ ...good, counts: { "B1-01": { ...good.counts["B1-01"], systemQty: 99 } } });
T("stok sistem berubah terdeteksi", ids(h).includes("stale"));
h = healthCheck({ ...good, counts: { "B1-01": { ...good.counts["B1-01"], by: "", savedAt: "rusak" } } });
T("tanpa petugas & waktu rusak terdeteksi", ids(h).includes("no-by") && ids(h).includes("bad-time"));
h = healthCheck({ ...good, closed: { B1: { at: iso(-60), by: "SPV" } } });
T("diperiksa setelah area ditutup terdeteksi", ids(h).includes("after-close"));
h = healthCheck({ ...good, data: [row("B1-01", 100)], counts: { "B1-01": { actualQty: 20, systemQty: 100, by: "A", savedAt: iso(-1), note: "" } } });
T("selisih besar tanpa catatan terdeteksi", ids(h).includes("big-nonote"));
h = healthCheck({ ...good, data: [row("B1-01", 100)], counts: { "B1-01": { actualQty: 20, systemQty: 100, by: "A", savedAt: iso(-1), note: "rusak" } } });
T("selisih besar DENGAN catatan tidak ditandai", !ids(h).includes("big-nonote"));

h = healthCheck({ ...good, tasks: { "B1-01": {}, "B9-9": {}, "AG|B1-01-A": {}, "DC|PIPA": {} } });
T("tugas yatim: hanya bin polos yang dicek", h.issues.find((i) => i.id === "task-orphan").bins.join() === "B9-9");

h = healthCheck({ ...good, users: [...good.users, { id: "c", name: " budi ", role: "petugas", active: true, areas: ["B1"] }] });
T("nama pengguna ganda (tanpa peduli huruf/spasi)", ids(h).includes("dup-user"));
h = healthCheck({ ...good, users: [{ id: "b", name: "Budi", role: "petugas", active: true, areas: [] }] });
T("tidak ada admin + petugas tanpa area", ids(h).includes("no-admin") && ids(h).includes("user-no-area"));
h = healthCheck({ ...good, users: [...good.users, { id: "d", name: "Cici", role: "petugas", active: true, areas: ["Z9"] }] });
T("area petugas tidak ada di data WMS", ids(h).includes("user-ghost-area"));

const S = (o) => healthCheck({ ...good, sync: { ready: true, dirty: false, err: "", lastAt: iso(-1), warn: "", clk: 0, ...o } });
T("sinkron sehat: tanpa temuan", S({}).ok);
T("sinkron belum tersambung", ids(healthCheck({ ...good, sync: { ready: false } })).includes("sync-off"));
T("sinkron gagal (bad)", ids(S({ err: "Server sibuk" })).includes("sync-err"));
T("perubahan belum terkirim >15 menit", ids(S({ dirty: true, lastAt: iso(-30) })).includes("sync-stale"));
T("perubahan belum terkirim baru saja: wajar", !ids(S({ dirty: true, lastAt: iso(-2) })).includes("sync-stale"));
T("peringatan server diteruskan", ids(S({ warn: "Data rusak dibaca server: counts" })).includes("server-warn"));
T("selisih jam > 60 dtk", ids(S({ clk: 150000 })).includes("clock") && !ids(S({ clk: 30000 })).includes("clock"));

h = healthCheck({ ...good, data: [row("B1-01"), row("B1-01")], counts: { Z: { actualQty: 1, by: "A", savedAt: iso(-1) } } });
T("urutan: bad sebelum warn", h.issues[0].level === "bad" && h.issues.at(-1).level === "warn");
const many = Array.from({ length: 50 }, (_, i) => row("B" + i)); many.push(...many.slice(0, 30));
h = healthCheck({ ...good, data: many });
T("daftar bin dibatasi 12, jumlah sebenarnya di n", h.issues[0].bins.length === 12 && h.issues[0].n === 30);
const big = Array.from({ length: 60000 }, (_, i) => row("R" + i)); const t0 = Date.now();
healthCheck({ ...good, data: big, counts: Object.fromEntries(big.slice(0, 20000).map((r) => [r.bin, { actualQty: 10, systemQty: 10, by: "A", savedAt: iso(-1) }])) });
T("60.000 bin + 20.000 hasil periksa < 1 detik (" + (Date.now() - t0) + " ms)", Date.now() - t0 < 1000);
console.log(`${ok} OK, ${bad} gagal`); process.exit(bad ? 1 : 0);
