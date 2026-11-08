/* Inti: penyimpanan (ld/sv), state global, util (fmt/esc/stat), toast, dialog ask
   asal: index-fixd.html baris 2410-2622 */
      const K_M = "warehouse_so_master_v2",
        K_C = "warehouse_so_counts_v2",
        K_F = "warehouse_so_codefix_v1",
        K_B = "warehouse_so_backup_v1";
      const $ = (id) => document.getElementById(id);
      const corrupt = [];
      const ld = (k, d) => {
        let raw = null;
        try {
          raw = localStorage.getItem(k);
          return JSON.parse(raw) || d;
        } catch (e) {
          // data rusak: simpan salinan mentah supaya tidak tertimpa diam-diam
          if (raw) {
            corrupt.push(k);
            try {
              if (raw.length < 1e6) localStorage.setItem(k + "__rusak", raw);
            } catch (_) {}
          }
          return d;
        }
      };
      const failed = new Set(); // kunci yang gagal ditulis ke penyimpanan
      let bk = ld(K_B, { at: null, n: 0 }); // cadangan terakhir + jumlah perubahan sejak itu
      const saveBk = () => {
        try {
          localStorage.setItem(K_B, JSON.stringify(bk));
        } catch (e) {}
      };
      let gdT = 0;
      const gdSoon = () => {
        clearTimeout(gdT);
        gdT = setTimeout(() => guardUi(), 300);
      };
      const sv = (k, v) => {
        try {
          localStorage.setItem(k, JSON.stringify(v));
          failed.delete(k);
          // string literal (bukan K_U/K_T): konstanta itu dideklarasikan lebih bawah dan belum siap saat sv() dipanggil awal
          if (k === K_C || k === "warehouse_dc_v1" || k === "warehouse_so_users_v1" || k === "warehouse_so_tasks_v1") {
            bk.n++;
            saveBk();
          }
          gdSoon();
          if (window.__syncHook) window.__syncHook(k);
          return true;
        } catch (e) {
          failed.add(k);
          gdSoon();
          return false;
        }
      };
      const undoStack = [];
      let navList = [];
      let DATA = ld(K_M, null) || DEMO_DATA,
        counts = ld(K_C, {}),
        codeFix = ld(K_F, {}),
        sel = null,
        match = null,
        lf = "all",
        cf = "problem",
        list = [];
      const K_CFG = "warehouse_so_cfg_v1";
      let cfg = ld(K_CFG, {});
      if (typeof cfg !== "object" || Array.isArray(cfg)) cfg = {};
      const CFG_IDS = ["kfa", "kfb", "klow", "aSite", "aKat", "aLoc", "mgudang", "mpelapor", "mdefcp"];
      const applyCfg = () => CFG_IDS.forEach((i) => { if (cfg[i] != null && $(i)) $(i).value = cfg[i]; });
      document.addEventListener("input", (e) => {
        const id = e.target && e.target.id;
        if (CFG_IDS.includes(id)) {
          cfg[id] = e.target.value;
          sv(K_CFG, cfg);
        }
      });
      const isDemoData = () => false;
      let saveBusy = false;
      const K_T = "warehouse_so_tasks_v1";
      let tasks = ld(K_T, {});
      if (typeof tasks !== "object" || Array.isArray(tasks)) tasks = {};
      const isTaskPend = (x) => {
        const t = tasks[x.bin];
        if (!t) return false;
        const c = counts[x.bin];
        if (c && c.savedAt >= t.at) return false;
        return !curU || t.u === curU;
      };
      const tkMine = () => DATA.filter((x) => tasks[x.bin] && (!curU || tasks[x.bin].u === curU));
      /* Hash password (field user.pin) dan kunci percobaan masuk */
      let supUntil = 0, pinFails = 0, pinLock = 0;
      /* Format baru "p1$iterasi$salt$hash" (PBKDF2-SHA256, salt acak per user). Hash ini ikut sinkron antar perangkat,
         jadi harus lambat dan bergaram. Hash lama (SHA-256 polos "sc-wms|", atau "w…") masih bisa dicek lalu
         otomatis ditingkatkan saat user berhasil masuk. Butuh HTTPS (crypto.subtle). */
      const PW_ITER = 100000;
      const pwHex = (u8) => [...u8].map((x) => x.toString(16).padStart(2, "0")).join("");
      async function pwDerive(p, salt, iter) {
        const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(p), "PBKDF2", false, ["deriveBits"]);
        return pwHex(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, k, 256)));
      }
      async function pinMake(p) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        return "p1$" + PW_ITER + "$" + pwHex(salt) + "$" + (await pwDerive(p, salt, PW_ITER));
      }
      async function pinLegacy(p) {
        const s0 = "sc-wms|" + p;
        try {
          const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s0));
          return pwHex(new Uint8Array(b));
        } catch (e) {
          let h = 5381;
          for (let i = 0; i < s0.length; i++) h = ((h << 5) + h + s0.charCodeAt(i)) | 0;
          return "w" + h;
        }
      }
      const pinIsLegacy = (s) => typeof s === "string" && !s.startsWith("p1$");
      async function pinCheck(p, stored) {
        if (typeof stored !== "string" || !stored) return false;
        if (pinIsLegacy(stored)) return (await pinLegacy(p)) === stored;
        const [, it, sh, hh] = stored.split("$");
        const iter = Number(it);
        if (!(iter >= 1000 && iter <= 1000000) || !/^[0-9a-f]{32}$/.test(sh || "") || !/^[0-9a-f]{64}$/.test(hh || "")) return false;
        try {
          const got = await pwDerive(p, new Uint8Array(sh.match(/../g).map((h) => parseInt(h, 16))), iter);
          let d = 0;
          for (let i = 0; i < 64; i++) d |= got.charCodeAt(i) ^ hh.charCodeAt(i);
          return d === 0;
        } catch (e) {
          return false;
        }
      }
      async function supAuth() {
        if (isAdmin()) return true;
        toast("Hanya admin yang bisa melakukan ini.");
        return false;
      }
      // pekerjaan tingkat supervisor (tugas bin, mulai DC baru): admin atau SPV
      async function leadAuth() {
        if (isSup()) return true;
        toast("Hanya admin atau SPV yang bisa melakukan ini.");
        return false;
      }
            async function nav(v) {
        if (!allowedView(v)) return toast("Anda tidak punya akses ke menu ini.");
        go(v);
        document.title = $("pgT").textContent + " | Stock Control";
        $("pgT").focus({ preventScroll: true });
      }
      const fmt = (n) => Number(n || 0).toLocaleString("id-ID");
      const esc = (s) =>
        String(s ?? "").replace(
          /[&<>"']/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
        );
      // ukuran (3", 2 1/2", 1/2") ditandai kuning supaya tidak tertukar
      const szHtml = (n) => esc(n).replace(/(\d+ \d+\/\d+|\d+\/\d+|\d+)&quot;/g, '<mark class="sz">$1&quot;</mark>');
      const rakFmt = (r) =>
        String(r)
          .trim()
          .toUpperCase()
          .replace(/-([A-Z])$/, "$1");
      const isProb = (c) => c && (c.itemMatch !== true || Number(c.actualQty) !== Number(c.systemQty));
      const stat = (x) => {
        const c = counts[x.bin];
        return !c ? "todo" : isProb(c) ? "bad" : "ok";
      };
      // tandai input yang salah supaya pembaca layar tahu input mana dan pesannya di mana
      function markInvalid(el, errId) {
        if (!el) return;
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", errId);
      }
      function clearInvalid(root) {
        root.querySelectorAll("[aria-invalid]").forEach((e) => {
          e.removeAttribute("aria-invalid");
          e.removeAttribute("aria-describedby");
        });
      }
      function toast(m, act) {
        const t = $("toast");
        t.textContent = m;
        if (act) {
          const b = document.createElement("button");
          b.textContent = act.label;
          b.onclick = () => {
            hideToast();
            act.fn();
          };
          t.appendChild(b);
        }
        // di atas tombol Simpan jika ada lembar yang terbuka
        t.classList.toggle("up", !!document.querySelector(".sheet:not([hidden])"));
        t.classList.remove("off");
        clearTimeout(toast.h);
        toast.h = setTimeout(hideToast, act ? 6500 : /gagal|tidak|belum|salah|ditolak|penuh|ditutup|selisih/i.test(m) ? 5500 : 3200);
      }
      function hideToast() {
        const t = $("toast");
        t.classList.add("off");
        setTimeout(() => { if (t.classList.contains("off")) t.textContent = ""; }, 200);
      }
      function ask(title, msg, ok, danger) {
        return new Promise((res) => {
          const d = $("dlg");
          d.innerHTML = `<div><h3 id="dlgT">${esc(title)}</h3><p>${esc(msg)}</p><button class="btn ${danger ? "dng" : "pri"}" id="dOk">${esc(ok)}</button><button class="btn sec" id="dNo">Batal</button></div>`;
          d.hidden = false;
          const f = (v) => {
            d.hidden = true;
            res(v);
          };
          $("dOk").onclick = () => f(true);
          $("dNo").onclick = () => f(false);
          $("dNo").focus();
        });
      }
      // konfirmasi berbahaya: harus mengetik kata tertentu (huruf besar-kecil dibedakan) dan menunggu hitung mundur
      function askType(title, msg, word, ok, wait) {
        return new Promise((res) => {
          const d = $("dlg");
          d.innerHTML = `<div><h3 id="dlgT">${esc(title)}</h3><p>${esc(msg)}</p><label for="dTy" style="margin:0">Ketik <b>${esc(word)}</b> (huruf besar semua) untuk melanjutkan</label><input id="dTy" autocomplete="off" autocapitalize="characters" spellcheck="false" /><button class="btn dng" id="dOk" disabled></button><button class="btn sec" id="dNo">Batal</button></div>`;
          d.hidden = false;
          let left = wait == null ? 3 : wait;
          const inp = $("dTy"), okb = $("dOk");
          const upd = () => {
            okb.disabled = left > 0 || inp.value !== word;
            okb.textContent = left > 0 ? ok + " (" + left + " dtk)" : ok;
          };
          const tm = setInterval(() => {
            left--;
            if (left <= 0) clearInterval(tm);
            upd();
          }, 1000);
          const f = (v) => {
            clearInterval(tm);
            d.hidden = true;
            res(v);
          };
          inp.oninput = upd;
          okb.onclick = () => {
            if (!okb.disabled) f(true);
          };
          $("dNo").onclick = () => f(false);
          upd();
          inp.focus();
        });
      }
