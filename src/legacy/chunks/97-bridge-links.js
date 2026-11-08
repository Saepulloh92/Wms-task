/* Jembatan: membuka state & helper legacy ke React lewat window.WMS (lihat src/legacy/bridge.js).
   Tambahkan di sini HANYA yang dibutuhkan view React; hapus saat view legacy terakhir selesai dimigrasi. */
      Object.defineProperties(WMS, {
        DATA: { get: () => DATA },
        counts: { get: () => counts },
        view: { get: () => curViewId },
        aging: { get: () => aging },
        agingCls: { get: () => agingCls },
        agingCfg: { get: () => agingCfg },
        dcRec: { get: () => dc },
        muatHist: { get: () => muatHist },
        clrHist: { get: () => clrHist },
      });
      // Status DC per item (todo/draft/ok/bad) dari fungsi legacy yang sama dengan menu DC Harian, agar angka laporan identik.
      WMS.dcRows = () => dcItems().map((e) => ({ item: e.item, st: dcSt(e), sys: dcSysOf(e), fis: dc[e.item] ? dcFis(dc[e.item].rows) : 0, diff: dc[e.item] ? dcFis(dc[e.item].rows) - dcSysOf(e) : 0, at: dc[e.item] && dc[e.item].at, by: dc[e.item] && dc[e.item].by }));
      Object.assign(WMS, { areas, isClosed, owners, staff, stat, toast, outText, esc, curName });
      Object.assign(WMS, {
        setAging(v) { aging = v; sv(K_AG, v); WMS.emit(); },
        setAgingCls(v) { agingCls = v; sv(K_AGK, v); WMS.emit(); },
        setAgingCfg(v) { agingCfg = v; sv(K_AGC, v); WMS.emit(); },
      });
