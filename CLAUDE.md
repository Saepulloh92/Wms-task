# Stock Control WMS — panduan untuk agen (Claude/akun mana pun)

Aplikasi gudang offline-first (Periksa Bin / Stock Opname, DC Harian, Clearing, Monitoring, dst.), UI React + Vite,
backend Google Apps Script (folder `gas/`). Bahasa UI dan komentar: Indonesia.

## Aturan hemat token (WAJIB)
1. **Jangan baca satu folder penuh.** Mulai dari `docs/MODULE_MAP.md` (1 halaman), cari menu/fungsi, buka SATU file.
2. Satu tugas = satu file kecil (rata-rata 100–450 baris). Chunk legacy yang besar: `55-muat.js`.
3. Pakai `grep -n "namaFungsi" src/legacy/chunks/*.js` lalu `Read` dengan offset/limit; bukan membaca seluruh file.
4. Jangan membaca `dist/`, `node_modules/`, `tests/snapshots/`. Jangan `cat gas/*.gs` (seed data panjang ada di `gas/05-seed.gs`).

## Peta singkat
- `src/views/*.jsx`  : menu yang SUDAH React (saat ini: KPI). Logika murni di `src/lib/*.js`.
- `src/legacy/chunks/NN-*.js` : menu yang BELUM dimigrasi, kode asli yang dipecah per fitur (dijalankan berurutan, scope global bersama).
- `src/markup/**.html` : markup menu legacy. `src/styles/*.css` : CSS (urutan nama file = urutan cascade).
- `src/legacy/bridge.js` + `chunks/97-bridge-links.js` : jembatan React <-> legacy (`window.WMS`, `window.WMSLib`).
- `gas/*.gs` : backend, file dimuat berurutan nama (`00-config` … `70-util`). Peta: lihat header tiap file.

## Cara kerja & perintah
- `npm install` · `npm run dev` · `npm run build`
- Uji paritas tampilan (13 menu vs snapshot aplikasi asli): `npx vite preview --port 4173 &` lalu `npm run test:parity` (butuh `playwright`).
- Jika perubahan memang mengubah tampilan, periksa bedanya, lalu perbarui `tests/snapshots/views.json` secara sadar.

## Menambah / memperbaiki fitur
- Perbaikan di menu legacy: edit chunk-nya saja. Jangan menambah variabel global baru tanpa perlu; cek namanya di MODULE_MAP.
- Memigrasi menu ke React: ikuti `docs/MIGRATION.md` (satu menu per sesi, tidak mengganggu menu lain).
- Setelah memindah/menambah fungsi, perbarui baris terkait di `docs/MODULE_MAP.md`.

## Keamanan
- **Jangan pernah** menulis token sinkron, token bot Telegram, URL Apps Script, atau ID Google Sheet di kode/commit.
  Token sinkron: Script Properties `API_TOKEN` (GAS) + `.env.local`/GitHub Secrets (`VITE_SYNC_TOKEN`). Lihat `.env.example`.
- Nilai `VITE_*` tertanam di bundel publik: gunakan repo/hosting privat atau isi dari menu aplikasi per perangkat.
- Format commit: ringkas, bahasa Indonesia atau Inggris, satu topik per commit.
