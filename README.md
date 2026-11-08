# Stock Control WMS

Aplikasi pemeriksaan Stock Opname per bin & pendukung gudang (React + Vite, backend Google Apps Script).

## Jalankan
```bash
npm install
cp .env.example .env.local   # opsional
npm run dev                  # http://localhost:5173
npm run build                # hasil di dist/
```

## Backend (Google Apps Script)
Kode di `gas/` (banyak file `.gs`, dimuat berurutan nama). Dua cara pasang:
- **Manual:** buat Spreadsheet baru → Ekstensi → Apps Script → buat file sesuai nama di `gas/` dan tempel isinya.
- **clasp:** `cp gas/.clasp.json.example gas/.clasp.json` (isi scriptId), `cd gas && clasp push`.

Lalu jalankan `setup()` sekali (token dibuat otomatis, lihat Execution log / Script properties `API_TOKEN`),
`Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)`, salin URL `/exec`,
dan isi URL + token di aplikasi (menu Data → Sinkron) atau di `.env.local`.

## Deploy ke GitHub Pages
Repo → Settings → Pages → Source: **GitHub Actions**. Opsional: Settings → Secrets → Actions untuk `VITE_SYNC_URL`, `VITE_SYNC_TOKEN`
(ingat: nilai ini terbaca di bundel publik; untuk repo/hosting publik lebih baik dikosongkan dan diisi dari aplikasi).

## Tes
`npm run test:rak`, `npm run test:parity`, dan `npm run test:weekly` (butuh `playwright` + `npx vite preview --port 4173`).

## Struktur & kontribusi
Lihat `CLAUDE.md` (aturan kerja), `docs/MODULE_MAP.md` (peta fitur → file), `docs/MIGRATION.md` (migrasi ke React bertahap).
