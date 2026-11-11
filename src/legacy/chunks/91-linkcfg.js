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

      /* Ringkasan tautan laporan: dari mana tiap sumber data berasal, dan mana yang belum diisi. */
      function linkStatus() {
        const C = WMS_CONFIG || {}, sh = (u, b) => (!u ? ["bad", "Belum diisi"] : b && u === b ? ["ok", "Bawaan aplikasi"] : linkCfg && linkCfg.data && ((linkCfg.data.dlv && linkCfg.data.dlv.url === u) || (linkCfg.data.clr && linkCfg.data.clr.url === u)) ? ["ok", "Tersimpan di server"] : ["wip", "Hanya di HP ini"]);
        const sync = (() => { try { const S = JSON.parse(localStorage.getItem("warehouse_so_sync_v1") || "{}"); return S.url || C.syncUrl || ""; } catch (e) { return C.syncUrl || ""; } })();
        return [
          { n: "Sinkron server (GAS)", u: sync, st: sync ? (sync === C.syncUrl ? ["ok", "Bawaan aplikasi"] : ["wip", "Hanya di HP ini"]) : ["bad", "Belum diisi"] },
          { n: "Dashboard Delivery", u: dlv.url, st: sh(dlv.url, C.deliveryUrl) },
          { n: "Clearing (counting)", u: clr.url, st: sh(clr.url, C.clearingUrl) },
          { n: "Monitoring Kiriman", u: mon.url, st: !mon.url ? ["bad", "Belum diisi"] : mon.url === C.monUrl ? ["ok", "Bawaan aplikasi"] : ["ok", "Tersimpan di server"] },
        ];
      }
      function renderLinks() {
        const el = document.getElementById("lkList");
        if (!el) return;
        el.innerHTML = linkStatus().map((r) => `<div class="lk-row"><div><b>${esc(r.n)}</b><small>${r.u ? esc(r.u.replace(/^https?:\/\//, "").slice(0, 46)) + (r.u.length > 52 ? "…" : "") : "Isi sekali di menu terkait; HP lain mengikuti otomatis"}</small></div><span class="lk-st ${r.st[0]}">${r.st[1]}</span></div>`).join("");
      }
