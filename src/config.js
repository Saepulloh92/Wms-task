// Konfigurasi dari environment (.env.local saat dev, GitHub Secrets saat deploy). JANGAN tulis token di kode.
export const config = {
  syncUrl: import.meta.env.VITE_SYNC_URL || "",
  syncToken: import.meta.env.VITE_SYNC_TOKEN || "",
  clearingUrl: import.meta.env.VITE_CLEARING_URL || "",
  monUrl: import.meta.env.VITE_MON_URL || "", // alamat spreadsheet Monitoring Kiriman (bawaan semua HP)
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "", // lapisan 2 (opsional): cache cepat antara HP dan Google Sheets
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "", // kunci anon (publik); keamanan diatur RLS, lihat docs/supabase-schema.sql
  deliveryUrl: import.meta.env.VITE_DELIVERY_URL || "", // alamat tab dashboard delivery (bawaan semua HP)
};
