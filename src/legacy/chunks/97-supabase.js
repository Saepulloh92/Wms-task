/* Lapisan 2: Supabase sebagai cache cepat. Alur: HP (lapisan 1) -> Supabase (lapisan 2) -> Google Sheets (lapisan 3).
   Hanya data operasional per-record (counts, dc, tasks, closed, aging, agcls, clrdone) yang lewat sini; master & user
   tetap lewat Google Sheets. Cap waktu terbaru menang (sama seperti sinkron Sheets), jadi kedua jalur aman berjalan bersamaan.
   Opsional: tanpa URL & kunci Supabase, aplikasi bekerja seperti biasa. Skema: docs/supabase-schema.sql */
      const K_SBL = "warehouse_so_sbl_v1";
      let SBL = Object.assign({ url: "", key: "", on: true, cursor: 0, known: {}, last: "", err: "" }, ld(K_SBL, {}));
      if (WMS_CONFIG.supabaseUrl && WMS_CONFIG.supabaseKey && (SBL.url !== WMS_CONFIG.supabaseUrl || SBL.key !== WMS_CONFIG.supabaseKey)) {
        SBL = Object.assign(SBL, { url: WMS_CONFIG.supabaseUrl, key: WMS_CONFIG.supabaseKey, cursor: 0, known: {} });
      }
      if (typeof SBL.known !== "object" || !SBL.known) SBL.known = {};
      let sblBusy = false, sblAgain = false, sblT = 0, sblFails = 0;
      const sblReady = () => !!(SBL.url && SBL.key && SBL.on !== false);
      const sblSave = () => { try { localStorage.setItem(K_SBL, JSON.stringify(SBL)); } catch (e) {} };
      async function sblFetch(path, opt) {
        const ac = new AbortController(), tm = setTimeout(() => ac.abort(), 15000);
        try {
          const r = await fetch(SBL.url.replace(/\/+$/, "") + path, {
            ...opt,
            headers: { apikey: SBL.key, Authorization: "Bearer " + SBL.key, "Content-Type": "application/json", ...((opt && opt.headers) || {}) },
            signal: ac.signal,
          });
          if (!r.ok) throw new Error("Supabase " + r.status);
          return r.status === 204 ? null : await r.json();
        } finally {
          clearTimeout(tm);
        }
      }
      // kirim perubahan lokal (record baru/berubah + penghapusan) dalam satu-dua permintaan
      async function sblPush() {
        const items = [];
        Object.keys(SY_STAMP).forEach((n) => {
          const cur = syGetV[n](), kn = SBL.known[n] || {}, f = SY_STAMP[n];
          Object.keys(cur).forEach((id) => {
            const v = cur[id];
            if (!v) return;
            const st = v[f] || "";
            if (kn[id] !== st) items.push({ coll: n, id, value: v, at: st || nowIso(), deleted: false, _st: st });
          });
          Object.keys(kn).forEach((id) => { if (!(id in cur)) items.push({ coll: n, id, value: null, at: nowIso(), deleted: true }); });
        });
        for (let i = 0; i < items.length; i += 300) {
          const part = items.slice(i, i + 300);
          await sblFetch("/rest/v1/rpc/wms_put_many", { method: "POST", body: JSON.stringify({ items: part.map(({ _st, ...r }) => r) }) });
          part.forEach((it) => {
            const kn = SBL.known[it.coll] || (SBL.known[it.coll] = {});
            if (it.deleted) delete kn[it.id];
            else kn[it.id] = it._st;
          });
          sblSave();
        }
      }
      // ambil perubahan baru sejak kursor terakhir (delta), gabungkan: cap waktu terbaru menang
      async function sblPull() {
        let changed = false;
        for (let guard = 0; guard < 30; guard++) {
          const rows = await sblFetch("/rest/v1/wms_records?select=coll,id,value,at,deleted,srv&srv=gt." + (Number(SBL.cursor) || 0) + "&order=srv.asc&limit=1000");
          if (!Array.isArray(rows) || !rows.length) break;
          const next = {};
          rows.forEach((r) => {
            const n = r.coll;
            if (!syGetV[n]) return;
            const f = SY_STAMP[n], kn = SBL.known[n] || (SBL.known[n] = {}), cur = next[n] || syGetV[n](), loc = cur[r.id];
            if (r.deleted) {
              if (loc && syTs(loc[f]) <= syTs(r.at)) { if (!next[n]) next[n] = { ...cur }; delete next[n][r.id]; delete kn[r.id]; }
              return;
            }
            if (!r.value) return;
            if (!loc && kn[r.id] !== undefined) return; // dihapus di sini, batu nisan menunggu terkirim: jangan dihidupkan lagi
            const rs = syTs(r.value[f]);
            if (!loc || rs > syTs(loc[f])) { if (!next[n]) next[n] = { ...cur }; next[n][r.id] = r.value; kn[r.id] = r.value[f] || ""; }
            else if (rs === syTs(loc[f])) kn[r.id] = r.value[f] || "";
          });
          const prev = syApplying;
          syApplying = true;
          try {
            Object.keys(next).forEach((n) => {
              sySetV[n](next[n]);
              try { localStorage.setItem(syKey[n], JSON.stringify(next[n])); failed.delete(syKey[n]); } catch (e) { failed.add(syKey[n]); }
              changed = true;
            });
          } finally { syApplying = prev; }
          SBL.cursor = rows[rows.length - 1].srv;
          sblSave();
          if (rows.length < 1000) break;
        }
        if (changed) { syRefresh(); if (typeof hlRun === "function") hlRun(); }
      }
      async function sblRun() {
        if (!sblReady()) return;
        if (sblBusy) { sblAgain = true; return; }
        if (!navigator.onLine) return;
        sblBusy = true;
        try {
          await sblPush(); // dorong dulu: penghapusan lokal tidak hidup lagi oleh data lama dari server
          await sblPull();
          SBL.err = ""; SBL.last = new Date().toISOString(); sblFails = 0;
        } catch (e) {
          SBL.err = e && e.name === "AbortError" ? "Supabase terlalu lama menjawab." : String((e && e.message) || e);
          sblFails = Math.min(sblFails + 1, 6);
        } finally {
          sblBusy = false;
          sblSave();
          sblUi();
          if (sblAgain) { sblAgain = false; sblSoon(300); }
        }
      }
      function sblSoon(ms) {
        if (!sblReady()) return;
        clearTimeout(sblT);
        sblT = setTimeout(sblRun, ms == null ? 400 : ms);
      }
      function sblUi() {
        if (!$("sblInfo")) return;
        const t = SBL.last ? new Date(SBL.last).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "";
        $("sblInfo").textContent = !SBL.url || !SBL.key ? "Belum tersambung. Opsional: mempercepat sinkron antar HP (dalam hitungan detik)." : SBL.on === false ? "Dimatikan di perangkat ini." : SBL.err ? "Gagal: " + SBL.err + " (data aman di HP & Google Sheets, dicoba lagi otomatis)" : "Tersambung" + (sblWsOk ? " (realtime aktif)" : "") + (t ? ", terakhir " + t : "") + ".";
        if ($("sblOff")) $("sblOff").hidden = !SBL.url;
      }
      /* Realtime: WebSocket Supabase hanya sebagai pemicu "ada perubahan" -> langsung tarik delta (data tetap lewat jalur yang sama).
         Bila putus/ditolak, poll 4 dtk tetap menjaga data tetap terbarui. */
      let sblWs = null, sblWsOk = false, sblWsFails = 0, sblWsT = 0, sblHb = 0;
      function sblWsStop() {
        const w = sblWs; sblWs = null; sblWsOk = false;
        clearInterval(sblHb); clearTimeout(sblWsT);
        if (w) { try { w.close(); } catch (e) {} }
      }
      function sblWsRetry() {
        clearTimeout(sblWsT);
        sblWsFails = Math.min(sblWsFails + 1, 6);
        sblWsT = setTimeout(sblWsOpen, Math.min(2000 * 2 ** sblWsFails, 60000) * (0.75 + Math.random() * 0.5));
      }
      function sblWsOpen() {
        if (!sblReady() || sblWs || document.hidden || !navigator.onLine || typeof WebSocket === "undefined") return;
        let ws, ref = 0;
        try { ws = new WebSocket(SBL.url.replace(/^http/i, "ws").replace(/\/+$/, "") + "/realtime/v1/websocket?apikey=" + encodeURIComponent(SBL.key) + "&vsn=1.0.0"); } catch (e) { return sblWsRetry(); }
        sblWs = ws;
        const send = (topic, event, payload) => { try { ws.send(JSON.stringify({ topic, event, payload, ref: String(++ref) })); } catch (e) {} };
        ws.onopen = () => {
          send("realtime:wms", "phx_join", { config: { broadcast: { self: false }, presence: { key: "" }, postgres_changes: [{ event: "*", schema: "public", table: "wms_records" }] }, access_token: SBL.key });
          clearInterval(sblHb);
          sblHb = setInterval(() => send("phoenix", "heartbeat", {}), 25000);
        };
        ws.onmessage = (e) => {
          let m; try { m = JSON.parse(e.data); } catch (x) { return; }
          if (m.event === "phx_reply" && m.topic === "realtime:wms") {
            sblWsOk = !!(m.payload && m.payload.status === "ok");
            if (sblWsOk) { sblWsFails = 0; sblSoon(100); } // kejar yang terlewat selama terputus
            sblUi();
          } else if (m.event === "postgres_changes") sblSoon(60);
        };
        const gone = () => { if (sblWs !== ws) return; sblWs = null; sblWsOk = false; clearInterval(sblHb); sblUi(); sblWsRetry(); };
        ws.onclose = gone; ws.onerror = gone;
      }
      function sblStart() {
        if ($("sblUrl")) {
          $("sblUrl").value = SBL.url; $("sblKey").value = SBL.key; $("sblOn").checked = SBL.on !== false;
          $("sblGo").onclick = () => {
            const u = $("sblUrl").value.trim().replace(/\/+$/, ""), k = $("sblKey").value.trim();
            if (!/^https:\/\/[^\s/]+/i.test(u)) return toast("URL harus diawali https:// (contoh: https://xxxx.supabase.co)");
            if (!k) return toast("Isi kunci anon (anon public key).");
            if (u !== SBL.url || k !== SBL.key) { SBL.cursor = 0; SBL.known = {}; }
            SBL.url = u; SBL.key = k; SBL.on = $("sblOn").checked; SBL.err = "";
            sblWsStop(); sblSave(); sblUi(); sblRun(); sblWsOpen(); toast("Supabase disimpan");
          };
          $("sblOn").onchange = () => { SBL.on = $("sblOn").checked; sblSave(); sblWsStop(); sblUi(); if (sblReady()) { sblSoon(100); sblWsOpen(); } };
          $("sblOff").onclick = async () => {
            if (!(await ask("Putuskan Supabase?", "Data di HP dan Google Sheets tetap ada. Sinkron kembali hanya lewat Google Sheets.", "Putuskan", true))) return;
            SBL = { url: "", key: "", on: true, cursor: 0, known: {}, last: "", err: "" };
            sblWsStop(); sblSave(); $("sblUrl").value = ""; $("sblKey").value = ""; sblUi();
          };
        }
        sblUi();
        // poll ringan (delta kecil) tiap ±4 dtk saat layar aktif; mundur bertahap bila gagal
        (function loop() {
          setTimeout(() => { if (!document.hidden) sblRun(); loop(); }, (sblFails ? Math.min(4000 * 2 ** sblFails, 60000) : sblWsOk ? 20000 : 4000) + Math.random() * 1000);
        })();
        document.addEventListener("visibilitychange", () => { if (document.hidden) sblWsStop(); else { sblSoon(200); sblWsOpen(); } });
        window.addEventListener("online", () => { sblSoon(500); sblWsOpen(); });
        window.addEventListener("offline", sblWsStop);
        if (sblReady()) { sblSoon(600); sblWsOpen(); }
      }
