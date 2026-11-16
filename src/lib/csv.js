/** Teks yang diawali = + @ (atau - diikuti bukan angka) dibaca Excel sebagai rumus: diberi awalan ' agar tetap teks. Angka tidak diubah. */
export function csvSafe(v) {
  const t = v == null ? "" : String(v);
  return typeof v === "string" && /^[\t\r=+@]|^-(?![\d.,]+$)/.test(t) ? "'" + t : t;
}
