import { fmt, signed, pc } from "./format.js";

/** Ringkasan KPI untuk sekumpulan bin. counts = hasil periksa per bin, stat = fungsi status bin ("ok"/...). */
export function kpiOf(rows, counts, stat) {
  const done = rows.filter((x) => counts[x.bin]),
    ok = done.filter((x) => stat(x) === "ok");
  let pos = 0,
    neg = 0;
  done.forEach((x) => {
    const d = counts[x.bin].actualQty - x.onhand;
    if (d > 0) pos += d;
    else neg += d;
  });
  const t = done.map((x) => Date.parse(counts[x.bin].savedAt)).filter(Boolean),
    span = t.length > 1 ? Math.max(...t) - Math.min(...t) : 0;
  return {
    total: rows.length,
    done: done.length,
    ok: ok.length,
    bad: done.length - ok.length,
    pos,
    neg,
    span,
    speed: span > 0 ? (done.length / (span / 36e5)).toFixed(1).replace(".", ",") : "–",
  };
}

/** Teks KPI untuk WhatsApp/Telegram. */
export function kpiText({ areas, data, counts, stat, isClosed }) {
  const all = kpiOf(data, counts, stat),
    B = "```",
    rows = areas.map((a) => {
      const k = kpiOf(data.filter((x) => x.area === a), counts, stat);
      return a.slice(0, 6).padEnd(7) + (k.done + "/" + k.total).padStart(8) + pc(k.ok, k.done).padStart(9) + (isClosed(a) ? "  TUTUP" : "  JALAN");
    });
  return `*KPI STOCK OPNAME PER AREA*\n${new Date().toLocaleString("id-ID")}\n━━━━━━━━━━━━━━━━━━━━\n${B}\nAREA      BIN  AKURASI  STATUS\n${rows.join("\n")}\n${B}\nProgres total : ${pc(all.done, all.total)}\nAkurasi total : ${pc(all.ok, all.done)}\nSelisih qty   : ${signed(all.pos)} / ${fmt(all.neg)}\n_Akurasi = bin sesuai / bin diperiksa_`;
}
