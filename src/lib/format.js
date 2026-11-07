// Pemformat angka/teks murni (tanpa DOM, tanpa state). Dipakai React dan (lewat WMSLib) kode legacy.
export const fmt = (n) => Number(n || 0).toLocaleString("id-ID");
export const signed = (n) => (n > 0 ? "+" : "") + fmt(n);
export const pc = (a, b) => (b ? Math.round((a / b) * 100) + "%" : "–");
export const fmtDur = (ms) => {
  if (!(ms > 0)) return "–";
  const m = Math.round(ms / 6e4);
  return m >= 60 ? Math.floor(m / 60) + "j " + (m % 60) + "m" : m + "m";
};
