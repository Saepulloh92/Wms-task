// Konfigurasi dari environment (.env.local saat dev, GitHub Secrets saat deploy). JANGAN tulis token di kode.
export const config = {
  syncUrl: import.meta.env.VITE_SYNC_URL || "",
  syncToken: import.meta.env.VITE_SYNC_TOKEN || "",
  clearingUrl: import.meta.env.VITE_CLEARING_URL || "",
};
