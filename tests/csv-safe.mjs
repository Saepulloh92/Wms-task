import { csvSafe } from "../src/lib/csv.js";
let bad = 0; const ok = (c, m) => { console.log((c ? "OK   " : "GAGAL ") + m); if (!c) bad++; };
ok(csvSafe("=HYPERLINK(\"x\")") === "'=HYPERLINK(\"x\")", "= diberi awalan '");
ok(csvSafe("+1+1") === "'+1+1" && csvSafe("@SUM(A1)") === "'@SUM(A1)", "+ dan @ diberi awalan '");
ok(csvSafe("-cmd|' /C calc'!A0") === "'-cmd|' /C calc'!A0", "- diikuti teks diberi awalan '");
ok(csvSafe("-3") === "-3" && csvSafe(-3) === "-3" && csvSafe("-3,5") === "-3,5", "angka negatif tidak diubah");
ok(csvSafe(4043814) === "4043814" && csvSafe("4043814") === "4043814" && csvSafe(null) === "" && csvSafe("B1-02-A") === "B1-02-A", "angka, kosong, kode bin biasa tidak diubah");
process.exit(bad ? 1 : 0);
