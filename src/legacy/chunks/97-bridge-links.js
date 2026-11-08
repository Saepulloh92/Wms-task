/* Jembatan: membuka state & helper legacy ke React lewat window.WMS (lihat src/legacy/bridge.js).
   Tambahkan di sini HANYA yang dibutuhkan view React; hapus saat view legacy terakhir selesai dimigrasi. */
      Object.defineProperties(WMS, {
        DATA: { get: () => DATA },
        counts: { get: () => counts },
        view: { get: () => curViewId },
        aging: { get: () => aging },
        agingCls: { get: () => agingCls },
        agingCfg: { get: () => agingCfg },
      });
      Object.assign(WMS, { areas, isClosed, owners, staff, stat, toast, outText, esc, curName });
      Object.assign(WMS, {
        setAging(v) { aging = v; sv(K_AG, v); WMS.emit(); },
        setAgingCls(v) { agingCls = v; sv(K_AGK, v); WMS.emit(); },
        setAgingCfg(v) { agingCfg = v; sv(K_AGC, v); WMS.emit(); },
      });
