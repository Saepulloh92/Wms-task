// Ringkasan hasil Clearing untuk kartu di menu Monitoring. Murni (tanpa DOM).
// Baris ternormalisasi: { v, shift, lori, qR, qC, diff, st, done }  st: ok | qty | dup | nq | belum | extra

const LABEL = { "Dobel hitung": "dup", "Selisih qty": "qty", "Qty kosong": "nq", "Belum dihitung": "belum", "Tidak ada di laporan": "extra", Cocok: "ok" };
const num = (v) => (v === "" || v == null || isNaN(Number(v)) ? null : Number(v));

// baris riwayat tersimpan (clrRows): [v, shift, lori, tm, sms, qR, qC, diff, labelStatus, n, r, done, pic, grp]
export function fromHistRows(rows) {
  return (Array.isArray(rows) ? rows : []).filter(Array.isArray).map((a) => ({
    v: a[0], shift: a[1] || "", lori: a[2] || "", qR: num(a[5]), qC: num(a[6]), diff: num(a[7]), st: LABEL[a[8]] || "belum", done: !!a[11],
  }));
}

const ORD = { dup: 0, qty: 1, nq: 2, belum: 3, extra: 4, ok: 5 };

export function summarize(rows, topN = 5) {
  const list = (rows || []).filter((x) => x && x.st !== "extra");
  const extra = (rows || []).filter((x) => x && x.st === "extra").length;
  const c = { ok: 0, qty: 0, dup: 0, nq: 0, belum: 0 };
  list.forEach((x) => { if (c[x.st] != null) c[x.st]++; });
  const open = list.filter((x) => x.st !== "ok" && !x.done);
  const done = list.filter((x) => x.st !== "ok" && x.done).length;
  const wms = list.reduce((a, x) => a + (x.qR || 0), 0);
  const cnt = list.reduce((a, x) => a + (x.qC || 0), 0);
  const shifts = [...new Set(list.map((x) => x.shift).filter(Boolean))].sort();
  const byShift = shifts.map((s) => {
    const g = list.filter((x) => x.shift === s);
    return { shift: s, total: g.length, ok: g.filter((x) => x.st === "ok").length, open: g.filter((x) => x.st !== "ok" && !x.done).length };
  });
  const top = open.slice().sort((a, b) => ORD[a.st] - ORD[b.st] || Math.abs(b.diff || 0) - Math.abs(a.diff || 0) || String(a.v).localeCompare(String(b.v), "id", { numeric: true })).slice(0, topN);
  const total = list.length;
  return {
    total, ok: c.ok, qty: c.qty, dup: c.dup, nq: c.nq, belum: c.belum, extra, done, open: open.length,
    wms, cnt, sel: Math.round((cnt - wms) * 1000) / 1000,
    pct: total ? Math.round((c.ok / total) * 100) : 0, byShift, top,
    status: !total ? "kosong" : open.length === 0 ? "ok" : "cek",
  };
}

// tren dari riwayat tersimpan: n hari terakhir, urut lama -> baru
export function trend(hist, n = 7) {
  return (Array.isArray(hist) ? hist : []).filter((h) => h && h.tgl && h.n > 0)
    .slice().sort((a, b) => a.tgl.localeCompare(b.tgl)).slice(-n)
    .map((h) => ({ tgl: h.tgl, n: h.n, ok: h.ok, bad: h.bad, pct: Math.round((h.ok / h.n) * 100) }));
}
