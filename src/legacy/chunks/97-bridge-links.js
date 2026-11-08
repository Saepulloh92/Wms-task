/* Jembatan: membuka state & helper legacy ke React lewat window.WMS (lihat src/legacy/bridge.js).
   Tambahkan di sini HANYA yang dibutuhkan view React; hapus saat view legacy terakhir selesai dimigrasi. */
      Object.defineProperties(WMS, {
        DATA: { get: () => DATA },
        counts: { get: () => counts },
        view: { get: () => curViewId },
      });
      Object.assign(WMS, { areas, isClosed, owners, staff, stat, toast, outText, esc, curName });
