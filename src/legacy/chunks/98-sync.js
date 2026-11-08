/* Sinkron Google Sheets (Apps Script) + start-up aplikasi
   asal: index-fixd.html baris 6812-7147 */
      /* ---------- sinkron Google Sheets (Apps Script) ---------- */
      /* SYNC-BEGIN */
      // Isi dua baris ini jika ingin semua perangkat langsung tersambung tanpa mengetik.
      const SYNC_DEFAULT = { url: WMS_CONFIG.syncUrl, token: WMS_CONFIG.syncToken }; // dari .env (VITE_SYNC_URL / VITE_SYNC_TOKEN), BUKAN ditulis di kode // tempel URL Web app (…/exec) di url sekali saja, semua HP otomatis tersambung
      const K_SYNC = "warehouse_so_sync_v1";
      const SY_STAMP = { counts: "savedAt", dc: "at", tasks: "at", closed: "at", aging: "at", agcls: "at" };
      const syKey = { counts: K_C, dc: K_D, tasks: K_T, closed: K_X, aging: K_AG, agcls: K_AGK };
      const syGetV = { counts: () => counts, dc: () => dc, tasks: () => tasks, closed: () => closed, aging: () => aging, agcls: () => agingCls };
      const sySetV = { counts: (v) => (counts = v), dc: (v) => (dc = v), tasks: (v) => (tasks = v), closed: (v) => (closed = v), aging: (v) => (aging = v), agcls: (v) => (agingCls = v) };
      const syPlain = { master: K_M, users: K_U, mon: K_MON, codefix: K_F, dcPick: K_DP, dest: "warehouse_so_dest_v1", areacfg: "warehouse_so_areacfg_v1", agingcfg: K_AGC };
      // riwayat laporan (Kesesuaian, Muat, Clearing): dikirim ke server per tanggal untuk dibuat sheet laporan
      const syRpt = { kesH: K_KESH, muatH: K_MUATH, clrH: K_CLRH };
      const syRptMap = {
        kesH: () => Object.fromEntries(kesHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", n: h.n, a: h.a, b: h.b, c: h.c, ar: h.ar || {} }])),
        muatH: () => Object.fromEntries(muatHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", dp: h.dp, ni: h.ni, total: h.total, tdkN: h.tdkN, masuk: h.masuk, cpS: h.cpS || 0, ci: h.ci || 0, rows: h.rows || [] }])),
        clrH: () => Object.fromEntries(clrHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", n: h.n, ok: h.ok, bad: h.bad, rows: h.rows || [] }])),
      };
      let syRkPend = {};
      const syAllKeys = [...Object.values(syKey), ...Object.values(syPlain), ...Object.values(syRpt)];
      let SY = Object.assign({ url: "", token: "", auto: true, rev: 0, mrev: null, lastAt: "", rep: [], known: {}, hj: {}, dirty: false }, ld(K_SYNC, {}));
      // bila URL & token bawaan diisi, selalu dipakai (token lama yang salah di perangkat otomatis tergantikan)
      if (SYNC_DEFAULT.url && SYNC_DEFAULT.token) {
        if (SY.url !== SYNC_DEFAULT.url || SY.token !== SYNC_DEFAULT.token) { SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; }
        SY.url = SYNC_DEFAULT.url; SY.token = SYNC_DEFAULT.token;
      }
      if (!SY.url && SYNC_DEFAULT.url) SY.url = SYNC_DEFAULT.url;
      if (!SY.token && SYNC_DEFAULT.token) SY.token = SYNC_DEFAULT.token;
      if (!Array.isArray(SY.rep)) SY.rep = [];
      if (typeof SY.rk !== "object" || !SY.rk) SY.rk = {};
      if (!SY.rptInit) { SY.rptInit = true; Object.keys(syRpt).forEach((n) => { if (!SY.rep.includes(n)) SY.rep.push(n); }); SY.dirty = true; } // sekali: kirim riwayat yang sudah ada
      if (typeof SY.known !== "object" || !SY.known) SY.known = {};
      if (typeof SY.hj !== "object" || !SY.hj) SY.hj = {};
      let syBusy = false, syAgain = false, syT = 0, syErr = "", syApplying = false, syRefreshPending = false;
      const sySave = () => {
        try { localStorage.setItem(K_SYNC, JSON.stringify(SY)); } catch (e) {}
      };
      const syReady = () => !!(SY.url && SY.token);
      const syTs = (v) => {
        const t = v ? Date.parse(v) : 0;
        return isNaN(t) ? 0 : t;
      };
      const syIds = (n) => {
        const o = syGetV[n](), m = {};
        Object.keys(o).forEach((id) => (m[id] = (o[id] && o[id][SY_STAMP[n]]) || ""));
        return m;
      };
      function sySoon(ms) {
        if (!syReady() || !SY.auto) return;
        clearTimeout(syT);
        syT = setTimeout(() => syRun(false), ms == null ? 4000 : ms);
      }
      // dipanggil dari sv(): tandai data yang berubah
      window.__syncHook = (k) => {
        if (syApplying || !syAllKeys.includes(k)) return;
        const name = Object.keys(syPlain).find((n) => syPlain[n] === k) || Object.keys(syRpt).find((n) => syRpt[n] === k);
        if (name && !SY.rep.includes(name)) SY.rep.push(name);
        SY.dirty = true;
        sySave();
        sySoon();
      };
      // dipanggil setelah pulihkan cadangan: semua data dianggap sumber terbaru
      window.__syncRestore = () => {
        SY.rep = [...Object.keys(syPlain), ...Object.keys(syRpt)];
        SY.dirty = true;
        sySave();
        sySoon(1500);
      };
      function syBuild() {
        const first = SY.mrev == null;
        const data = {}, del = {};
        Object.keys(SY_STAMP).forEach((n) => {
          const cur = syGetV[n](), known = SY.known[n] || {};
          data[syKey[n]] = cur;
          del[n] = Object.keys(known).filter((id) => !(id in cur));
        });
        const has = (n) => first || SY.rep.includes(n);
        if (has("master")) data[K_M] = DATA;
        // hash password ikut dikirim (PBKDF2 + salt) supaya login berlaku di semua perangkat; hash lama tanpa garam tidak pernah dikirim
        if (has("users")) data[K_U] = users.map((u) => { const c = { ...u }; if (pinIsLegacy(c.pin)) delete c.pin; return c; });
        if (has("mon")) data[K_MON] = mon;
        if (has("codefix")) data[K_F] = codeFix;
        if (has("dcPick")) data[K_DP] = dcPick;
        if (has("dest")) data[syPlain.dest] = dest;
        if (has("areacfg") && areaCfg) data[syPlain.areacfg] = areaCfg;
        if (has("agingcfg")) data[syPlain.agingcfg] = agingCfg;
        syRkPend = {};
        Object.keys(syRpt).forEach((n) => {
          if (!has(n)) return;
          const m = syRptMap[n]();
          data[syRpt[n]] = m;
          del[n] = (SY.rk[n] || []).filter((t) => !(t in m)); // entri riwayat yang dihapus di aplikasi
          syRkPend[n] = Object.keys(m);
        });
        return { data, del, replace: [...SY.rep] };
      }
      function syMerge(local, remote, field) {
        const out = Object.assign({}, local);
        Object.keys(remote || {}).forEach((id) => {
          const r = remote[id];
          if (!r) return;
          const c = out[id];
          if (!c || syTs(r[field]) >= syTs(c[field])) out[id] = r;
        });
        return out;
      }
      function syApply(resp, sentRep, sentIds) {
        const rd = resp.data || {};
        let changed = false;
        syApplying = true;
        const put = (k, v) => {
          try { localStorage.setItem(k, JSON.stringify(v)); failed.delete(k); } catch (e) { failed.add(k); }
        };
        try {
          Object.keys(SY_STAMP).forEach((n) => {
            const remote = rd[syKey[n]] || {}, cur = syGetV[n](), known = SY.known[n] || {};
            const merged = syMerge(cur, remote, SY_STAMP[n]);
            // dihapus di sini (termasuk saat sync berjalan): jangan dihidupkan lagi
            Object.keys(known).forEach((id) => { if (!(id in cur)) delete merged[id]; });
            // dikirim tapi tidak kembali dan belum berubah: sudah dihapus di perangkat lain
            Object.keys(sentIds[n]).forEach((id) => {
              if (id in cur && !(id in remote) && syTs(cur[id][SY_STAMP[n]]) === syTs(sentIds[n][id])) delete merged[id];
            });
            if (JSON.stringify(merged) !== JSON.stringify(cur)) {
              changed = true;
              sySetV[n](merged);
              put(syKey[n], merged);
            }
            const kn = {};
            Object.keys(remote).forEach((id) => (kn[id] = (remote[id] && remote[id][SY_STAMP[n]]) || ""));
            SY.known[n] = kn;
          });
          SY.rep = SY.rep.filter((n) => !sentRep.includes(n)); // yang berubah saat sync tetap tertunda
          Object.keys(syRkPend).forEach((n) => (SY.rk[n] = syRkPend[n]));

          // data WMS: hanya jika ada revisi baru dan tidak sedang diubah di sini
          if (rd[K_M] && Array.isArray(rd[K_M]) && rd[K_M].length && !SY.rep.includes("master") && resp.mrev !== SY.mrev) {
            DATA = rd[K_M];
            put(K_M, DATA);
            changed = true;
          }
          const same = (n, v) => {
            const j = JSON.stringify(v);
            const eq = SY.hj[n] === j;
            SY.hj[n] = j;
            return eq;
          };
          if (rd[K_U] && !SY.rep.includes("users") && !same("users", rd[K_U])) {
            // pertahankan password lokal (cocokkan lewat id) bila server tidak menyimpannya: server lama (tanpa resp.pins)
            // atau hash lama yang memang tidak pernah dikirim. Server baru yang tidak punya password berarti sudah dihapus.
            const lpin = {};
            users.forEach((u) => { if (u.pin) lpin[u.id] = u.pin; });
            users = rd[K_U].map((u) => (lpin[u.id] && !u.pin && (!resp.pins || pinIsLegacy(lpin[u.id])) ? { ...u, pin: lpin[u.id] } : u));
            migrateUsers();
            put(K_U, users);
            applySession();
            applyRole();
            loginUi();
            changed = true;
          }
          if (rd[K_MON] && !SY.rep.includes("mon") && !same("mon", rd[K_MON])) {
            mon = { ...mon, ...rd[K_MON] };
            put(K_MON, mon);
            if (curViewId === "mon") monEnter();
          }
          if (rd[K_F] && !SY.rep.includes("codefix") && !same("codefix", rd[K_F])) {
            codeFix = rd[K_F];
            put(K_F, codeFix);
            changed = true;
          }
          if (rd[K_DP] && !SY.rep.includes("dcPick") && !same("dcPick", rd[K_DP])) {
            dcPick = rd[K_DP];
            put(K_DP, dcPick);
            changed = true;
          }
          if (rd[syPlain.areacfg] && Array.isArray(rd[syPlain.areacfg].list) && !SY.rep.includes("areacfg") && !same("areacfg", rd[syPlain.areacfg])) {
            areaCfg = rd[syPlain.areacfg];
            put(syPlain.areacfg, areaCfg);
            changed = true;
          }
          if (rd[syPlain.agingcfg] && typeof rd[syPlain.agingcfg] === "object" && !SY.rep.includes("agingcfg") && !same("agingcfg", rd[syPlain.agingcfg])) {
            agingCfg = rd[syPlain.agingcfg];
            put(syPlain.agingcfg, agingCfg);
            changed = true;
          }
          if (rd[syPlain.dest] && !SY.rep.includes("dest") && !same("dest", rd[syPlain.dest])) {
            dest = rd[syPlain.dest];
            put(syPlain.dest, dest);
            changed = true;
          }
        } finally {
          syApplying = false;
        }
        SY.rev = resp.rev;
        SY.mrev = resp.mrev;
        SY.lastAt = new Date().toISOString();
        sySave();
        if (changed) syRefresh();
      }
      function syRefresh() {
        const open = ["sheet", "dcSheet", "dcPickSheet"].some((id) => $(id) && !$(id).hidden);
        if (open) { syRefreshPending = true; return; } // jangan ganggu petugas yang sedang mengisi
        syRefreshPending = false;
        const ar = $("area").value, q = $("search").value;
        initAll();
        if ([...$("area").options].some((o) => o.value === ar)) $("area").value = ar;
        $("search").value = q;
        renderBins();
        metrics();
        const v = curViewId;
        if (v === "dc") renderDc();
        else if (v === "check") renderCheck();
        else if (v === "task") renderTask();
        else if (v === "kpi" || v === "agi") WMS.emit(); // KpiView (React) menggambar ulang
        else if (v === "usr") renderUsr();
        else if (v === "kes") renderKes();
        else if (v === "adj") renderAdj();
        else if (v === "data") $("dataInfo").textContent = DATA.length + " bin dimuat dari " + areas().length + " area.";
      }
      async function syCall(method, obj) {
        const ac = new AbortController(), tm = setTimeout(() => ac.abort(), 90000);
        try {
          let r;
          if (method === "GET") r = await fetch(SY.url + (SY.url.includes("?") ? "&" : "?") + "action=" + obj.action + "&token=" + encodeURIComponent(SY.token), { signal: ac.signal });
          else r = await fetch(SY.url, { method: "POST", body: JSON.stringify({ token: SY.token, ...obj }), signal: ac.signal }); // tanpa header: menghindari preflight CORS
          const t = await r.text();
          try { return JSON.parse(t); } catch (e) { throw new Error("Jawaban server tidak valid. Pastikan Web app di-deploy dengan akses \"Anyone\"."); }
        } finally {
          clearTimeout(tm);
        }
      }
      async function syRun(manual) {
        if (!syReady()) { if (manual) toast("Isi URL dan token dulu."); return; }
        if (syBusy) { syAgain = true; return; }
        if (!navigator.onLine) {
          syErr = "Tidak ada koneksi. Data aman di perangkat, akan dikirim saat online.";
          syUi();
          if (manual) toast(syErr);
          return;
        }
        syBusy = true;
        syUi();
        const sentRep = [...SY.rep], sentIds = {};
        Object.keys(SY_STAMP).forEach((n) => (sentIds[n] = syIds(n)));
        const body = syBuild();
        SY.dirty = false;
        try {
          const resp = await syCall("POST", { action: "sync", ...body, mrev: SY.mrev });
          if (!resp.ok) throw new Error(resp.error || "Server menolak.");
          syApply(resp, sentRep, sentIds);
          syErr = "";
          if (manual) toast("Sinkron selesai");
        } catch (e) {
          SY.dirty = true;
          sySave();
          syErr = e && e.name === "AbortError" ? "Server terlalu lama menjawab." : String((e && e.message) || e);
          if (manual) toast("Sinkron gagal: " + syErr);
        } finally {
          syBusy = false;
          syUi();
          if (syAgain) { syAgain = false; sySoon(1500); }
        }
      }
      async function syPoll() {
        if (!syReady() || !SY.auto || syBusy || document.hidden || !navigator.onLine) return;
        if (SY.dirty) return syRun(false);
        try {
          const r = await syCall("GET", { action: "ping" });
          if (r && r.ok && (r.rev !== SY.rev || r.mrev !== SY.mrev)) syRun(false);
        } catch (e) {}
      }
      function netUi() {
        const el = $("netB");
        if (!el) return;
        let t = "", c = "", tip = "";
        if (!navigator.onLine) {
          t = "Offline";
          c = "warn";
          tip = "Tidak ada internet. Data tetap tersimpan di HP dan dikirim saat online.";
        } else if (syReady()) {
          if (syBusy) [t, c] = ["Menyinkronkan…", "info"];
          else if (syErr) [t, c, tip] = ["Sinkron gagal", "bad", syErr];
          else if (SY.dirty) [t, c] = ["Menunggu kirim", "warn"];
          else [t, c] = ["Tersinkron", "ok"];
        }
        el.hidden = !t;
        el.textContent = t;
        el.className = "netb " + c;
        if (tip) el.title = tip;
        else el.removeAttribute("title");
      }
      function syUi() {
        const t = SY.lastAt ? new Date(SY.lastAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "";
        const msg = !syReady() ? "Belum tersambung ke Google Sheets." : syBusy ? "Menyinkronkan…" : syErr ? "Gagal: " + syErr : "Tersambung" + (t ? ", terakhir " + t : "") + (SY.dirty ? " (ada perubahan belum terkirim)" : "");
        if ($("syInfo")) $("syInfo").textContent = msg;
        if ($("syBadge")) $("syBadge").textContent = !syReady() ? "" : syBusy ? " · menyinkronkan…" : syErr ? " · sinkron gagal" : SY.dirty ? " · menunggu kirim" : " · tersinkron" + (t ? " " + t : "");
        if ($("syNow")) $("syNow").disabled = syBusy;
        if ($("syOff")) $("syOff").hidden = !syReady();
        netUi();
      }
      if ($("syUrl")) {
        $("syUrl").value = SY.url;
        $("syTok").value = SY.token;
        $("syAuto").checked = !!SY.auto;
        $("syGo").onclick = () => {
          const u = $("syUrl").value.trim(), t = $("syTok").value.trim();
          if (!/^https:\/\/script\.google\.com\//i.test(u)) return toast("URL harus dari Apps Script: https://script.google.com/…/exec");
          if (!t) return toast("Isi token.");
          if (u !== SY.url || t !== SY.token) { SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; }
          SY.url = u; SY.token = t; SY.auto = $("syAuto").checked;
          sySave();
          syRun(true);
        };
        $("syNow").onclick = () => syRun(true);
        $("syAuto").onchange = () => { SY.auto = $("syAuto").checked; sySave(); };
        $("syOff").onclick = async () => {
          if (!(await ask("Putuskan sinkron?", "Data di perangkat ini tetap ada. Sinkron berhenti sampai disambungkan lagi.", "Putuskan", true))) return;
          SY.url = ""; SY.token = ""; SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; SY.rep = []; SY.dirty = false;
          sySave();
          $("syUrl").value = ""; $("syTok").value = "";
          syUi();
        };
      }
      setInterval(() => { if (syRefreshPending) syRefresh(); }, 3000);
      setInterval(syPoll, 45000);
      document.addEventListener("visibilitychange", () => { if (!document.hidden) sySoon(500); });
      window.addEventListener("online", () => {
        sySoon(1000);
        netUi();
      });
      window.addEventListener("offline", netUi);
      syUi();
      if (syReady()) setTimeout(() => syRun(false), 1200);
      /* SYNC-END */
      if (curU && DATA.some(isTaskPend)) lf = "task";
      delete cfg.pin;
      if (cfg.blind == null) cfg.blind = true; // default: hitung buta, supervisor boleh mematikan
      applySession();
      applyRole();
      loginUi();
      initAll();
      guardUi(true);
      try {
        const lv = localStorage.getItem("warehouse_so_view_v1");
        if (allowedView("mon")) go("mon"); // halaman utama = monitor kiriman
        else if (lv && allowedView(lv) && document.getElementById("v-" + lv)) go(lv);
        else if (allowedView("mon")) go("mon");
        else {
          const first = ["so", "dc", "task", "check", "kes", "adj", "clr", "muat", "kpi", "agi", "tg", "data", "usr"].find(allowedView);
          if (first) go(first);
        }
      } catch (e) {}
