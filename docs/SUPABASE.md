# Lapisan 2: Supabase (cache cepat) — opsional

Alur data: **HP (lapisan 1) → Supabase (lapisan 2) → Google Sheets (lapisan 3)**.

- Lapisan 1: `localStorage` di HP (instan, tetap jalan offline).
- Lapisan 2: Supabase. Perubahan terkirim ±0,4 dtk dan HP lain menerimanya ±3-5 dtk (poll delta ringan).
- Lapisan 3: Google Sheets lewat Apps Script (arsip & laporan). Tetap berjalan di latar seperti biasa; lebih lambat tetapi sudah tidak menahan alur kerja.

Kedua jalur memakai aturan sama: **cap waktu terbaru menang** per record, jadi aman berjalan bersamaan. Tanpa Supabase aplikasi bekerja seperti sebelumnya.

## Yang lewat Supabase
`counts` (hasil periksa), `dc`, `tasks`, `closed`, `aging`, `agcls`, `clrdone`. **Master bin, user, dan password TIDAK dikirim ke Supabase** (tetap di Google Sheets / HP).

## Setup
1. Buat project di supabase.com. Buka SQL Editor, tempel isi `docs/supabase-schema.sql`, Run.
2. Salin **Project URL** dan **anon public key** (Settings > API).
3. Isi di aplikasi: menu Data > "Supabase (cepat, opsional)", atau lewat `.env.local` / GitHub Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

## Keamanan (baca)
- Kunci anon bersifat publik (tertanam di aplikasi). Keamanan bergantung pada skema: tabel hanya bisa **dibaca** anon, **penulisan hanya lewat fungsi** `wms_put_many` yang membatasi koleksi, ukuran, dan menolak data lebih lama.
- Siapa pun yang punya URL + kunci anon bisa membaca data operasional. Pakai repo/hosting privat atau isi kunci dari menu aplikasi per perangkat. Jangan simpan `service_role` key di aplikasi.

## Perilaku
- Gagal/offline: pesan jelas di panel, data aman di HP dan Sheets, dicoba lagi dengan jeda bertahap (maks 60 dtk).
- Penghapusan memakai batu nisan (`deleted`) supaya ikut terhapus di HP lain; bersihkan berkala (SQL di akhir skema).
- Kode: `src/legacy/chunks/97-supabase.js` (hook di `98-sync.js`). Uji: `node tests/supabase-layer.mjs` (server Supabase tiruan).
