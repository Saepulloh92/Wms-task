/* Tautan sumber data yang dipakai bersama: Dashboard Delivery dan Clearing.
   Diatur sekali di satu HP, tersimpan di server (kunci linkcfg, ikut sinkron), lalu HP lain otomatis memakainya.
   Tautan Monitoring Kiriman (mon) sudah ikut tersinkron lewat kunci mon. Token Telegram sengaja TIDAK dibagikan. */
      const K_LK = "warehouse_so_linkcfg_v1";
      let linkCfg = ld(K_LK, null); // { data: { dlv, clr }, at } terakhir yang dikenal perangkat ini
      const linkLocal = () => ({
        dlv: { url: dlv.url || "", auto: dlv.auto },
        clr: { url: clr.url || "", start: clr.start, cv: clr.cv, cq: clr.cq, ck: clr.ck, auto: clr.auto },
      });
      const lkPut = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }; // tulis tanpa menandai "perlu kirim"
      const linkHas = (d) => !!((d && d.dlv && d.dlv.url) || (d && d.clr && d.clr.url));
      /* Dipanggil saat menyusun kiriman sinkron: bila tautan di perangkat ini berubah, jadikan versi terbaru. Perangkat baru tanpa tautan tidak menimpa server. */
      function linkSnap() {
        const cur = linkLocal();
        if (!linkHas(cur)) return linkCfg;
        if (!linkCfg || JSON.stringify(linkCfg.data) !== JSON.stringify(cur)) {
          linkCfg = { data: cur, at: new Date().toISOString() };
          sv(K_LK, linkCfg);
        }
        return linkCfg;
      }
      /* Dipanggil saat menerima dari server: pakai bila lebih baru dari yang dikenal perangkat ini. */
      function linkApply(rc) {
        if (!rc || !rc.data || !linkHas(rc.data)) return false;
        if (linkCfg && String(linkCfg.at) >= String(rc.at)) return false;
        const d = rc.data;
        if (d.dlv) { dlv = { ...dlv, url: d.dlv.url || "", auto: d.dlv.auto == null ? dlv.auto : d.dlv.auto }; lkPut(K_DLV, dlv); }
        if (d.clr) { clr = { ...clr, ...d.clr }; lkPut(K_CLR, clr); }
        linkCfg = rc;
        lkPut(K_LK, linkCfg);
        if (curViewId === "mon" && typeof dlvEnter === "function") dlvEnter();
        else if (curViewId === "clr" && typeof renderClr === "function") renderClr();
        return true;
      }
