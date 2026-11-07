# Migrasi menu legacy → React (satu menu per sesi)

Status (perbarui centang saat selesai):
- [x] kpi — `src/views/KpiView.jsx`, `src/lib/kpi.js`
- [ ] tg, mon, data, muat, clr, kes, adj, check, task, dc, usr, so  (urutan disarankan: dari yang paling sedikit ketergantungan ke state global)

## Pola (lihat KpiView.jsx sebagai contoh jadi)
1. **Baca** `src/markup/views/<id>.html` dan chunk logikanya (MODULE_MAP). Catat id elemen, kunci localStorage, fungsi yang dipanggil menu lain.
2. **Logika murni** (parser, hitung, format teks) → `src/lib/<id>.js` tanpa DOM, menerima data lewat argumen. Beri contoh uji kecil.
3. **Komponen** `src/views/<Id>View.jsx`:
   - Elemen akar: `<section id="v-<id>" hidden>` (atribut `hidden` diatur `go()` legacy; jangan dikontrol React).
   - `const wms = useWms();` → baca state legacy (`wms.DATA`, `wms.counts`, …). Tambahkan getter baru di `chunks/97-bridge-links.js` bila perlu.
   - Gambar isi hanya bila `wms.view === "<id>"`.
   - Pertahankan id/class yang dipakai CSS atau fungsi lain (mis. tombol `data-tg="…"` dipanggil Telegram lewat `$(id).click()`).
4. **Tulis state**: bila menu memiliki kunci localStorage sendiri, pindahkan kepemilikan ke komponen (`useState` + simpan lewat `sv`). Jika state dipakai menu lain, biarkan legacy sebagai pemilik dan panggil fungsinya lewat `WMS`.
5. **Putuskan legacy**: hapus `if (v === "<id>") renderX()` di `chunks/45-nav.js` dan di `98-sync.js` (ganti `WMS.emit()`), hapus bagian view dari chunk, sisakan shim bila menu lain memakai fungsinya (contoh: `65-kpi.js`).
6. **App.jsx**: pindahkan menu dari `LEGACY_VIEWS` ke komponen React pada posisi yang sama (urutan DOM = urutan asli); hapus file markup-nya.
7. **Uji**: `npm run build`, `npm run test:parity` (harus OK semua), uji klik manual untuk aksi menu itu.
8. Centang daftar di atas + perbarui `docs/MODULE_MAP.md`.

## Setelah semua menu selesai
Hapus `src/legacy/`, `bridge`, `97-bridge-links`; pindahkan state global ke store (mis. Zustand) dan ganti `ld/sv` dengan modul `src/lib/storage.js`.
Patch `patch-v18…v22` dilipat ke komponen terkait (tampilan lapangan, bip/jaringan, papan angka, layar petugas, tandai selesai Clearing).
