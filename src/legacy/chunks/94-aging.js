/* Aging Stock: state milik legacy supaya ikut sinkron Sheets + cadangan. Tampilan: src/views/AgingView.jsx, logika: src/lib/aging.js */
      /* ---------- aging stock ---------- */
      const K_AG = "warehouse_so_aging_v1";        // cek fisik per rak: { bin: { tumpak, pipa, qty, by, at } }
      const K_AGK = "warehouse_so_agcls_v1";       // kelas pipa per kode item: { kode: { c: "A", at } }
      const K_AGC = "warehouse_so_agingcfg_v1";    // pengaturan: { pic: { A: "nama", ... } }
      let aging = ld(K_AG, {}), agingCls = ld(K_AGK, {}), agingCfg = ld(K_AGC, {});
      (function () {
        const raw = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
        const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
        // cap waktu harus teks ISO (dipakai penggabungan antar perangkat)
        Object.keys(aging).forEach((b) => { const r = aging[b]; if (r && typeof r.at === "number") r.at = new Date(r.at).toISOString(); });
        // pindahan dari kunci versi awal (kelas & nama petugas disimpan terpisah)
        const oc = raw("warehouse_so_aging_cls_v1"), op = raw("warehouse_so_aging_pic_v1");
        if (oc && typeof oc === "object") {
          Object.keys(oc).forEach((k) => { if (!agingCls[k] && typeof oc[k] === "string") agingCls[k] = { c: oc[k], at: nowIso() }; });
          put(K_AGK, agingCls); localStorage.removeItem("warehouse_so_aging_cls_v1");
        }
        if (op && typeof op === "object") { if (!agingCfg.pic) agingCfg.pic = op; put(K_AGC, agingCfg); localStorage.removeItem("warehouse_so_aging_pic_v1"); }
        put(K_AG, aging);
      })();
      if (typeof agingCfg !== "object" || !agingCfg) agingCfg = {};
