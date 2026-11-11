// Konfigurasi dari environment (.env.local saat dev, GitHub Secrets saat deploy). JANGAN tulis token di kode.
export const config = {
  syncUrl: import.meta.env.VITE_SYNC_URL || "",
  syncToken: import.meta.env.VITE_SYNC_TOKEN || "",
  clearingUrl: import.meta.env.VITE_CLEARING_URL || "",
  monUrl: import.meta.env.VITE_MON_URL || "", // alamat spreadsheet Monitoring Kiriman (bawaan semua HP)
  deliveryUrl: import.meta.env.VITE_DELIVERY_URL || "", // alamat tab dashboard delivery (bawaan semua HP)
};
