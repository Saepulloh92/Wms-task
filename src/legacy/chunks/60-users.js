/* Petugas, area, hak akses menu, navigasi bawah
   asal: index-fixd.html baris 4146-4575 */
      /* ---------- petugas & area ---------- */
      const K_U = "warehouse_so_users_v1",
        K_X = "warehouse_so_closed_v1",
        K_CU = "warehouse_so_curuser_v1";
      /* Bawaan: hanya satu akun Admin tanpa PIN (mode terbuka). Tambah petugas dan PIN dari menu User & Area. */
      const DEFAULT_USERS = () => [{ id: "ua0admin", name: "Admin", role: "admin", active: true, areas: [] }];
      let users = ld(K_U, null) || DEFAULT_USERS(),
        closed = ld(K_X, {}),
        curU = ld(K_CU, ""),
        uEdit = null,
        uSel = [];
      const K_ME = "warehouse_so_me_v1";
      let meId = "";
      try { meId = sessionStorage.getItem(K_ME) || ""; } catch (e) {}
      /* ---- v13: hak akses menu per user ---- */
      const MENU_DEF = { so: "Periksa Bin", dc: "DC Harian", task: "Tugas Bin", check: "Review Supervisor", kes: "Cek Kesesuaian", adj: "File Adjust", clr: "Clearing", mon: "Beranda", muat: "Laporan Muat", kpi: "KPI Area", tg: "Telegram", data: "Data WMS" };
      const ALL_VIEWS = [...Object.keys(MENU_DEF), "usr"];
      const PRESETS = { operator: ["mon", "so", "dc", "task"], supervisor: ["so", "dc", "task", "check", "kes", "adj", "clr", "mon", "muat", "kpi"] };
      const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
      const menusOf = (u) => (u.role === "admin" ? ALL_VIEWS : Array.isArray(u.menus) ? u.menus : PRESETS.operator);
      const menuLabel = (u) => {
        const m = menusOf(u);
        return sameSet(m, PRESETS.operator) ? "Operator" : sameSet(m, PRESETS.supervisor) ? "Supervisor" : "Kustom, " + m.length + " menu";
      };
      let uMenus = [...PRESETS.operator];
      /* ---- v17: menu yang tampil di navigasi bawah (per perangkat) ---- */
      const K_NAV = "warehouse_so_nav_v1";
      const NAV_ORDER = ["mon", "so", "dc", "check", "task", "kes", "adj", "clr", "muat", "kpi", "usr", "tg", "data"];
      const NAV_DEFAULT = ["mon", "so", "dc", "check", "adj"];
      const NAV_MAX = 5;
      const NAV_NAME = Object.assign({}, MENU_DEF, { usr: "User & Area" });
      let navCfg = ld(K_NAV, null);
      var curViewId = "so";
      function navPicks() {
        const allowed = NAV_ORDER.filter(allowedView);
        let pick = (Array.isArray(navCfg) ? navCfg : NAV_DEFAULT).filter((v) => allowed.includes(v));
        if (!pick.length) pick = allowed.filter((v) => NAV_DEFAULT.includes(v));
        if (!pick.length) pick = allowed.slice(0, 4);
        return NAV_ORDER.filter((v) => pick.includes(v)).slice(0, NAV_MAX);
      }
      function migrateUsers() {
        users.forEach((u) => {
          u.role = u.role === "admin" ? "admin" : "petugas";
          if (u.role === "admin") delete u.menus;
          else if (Array.isArray(u.menus)) u.menus = u.menus.filter((k) => MENU_DEF[k]);
          else delete u.menus;
          if (u.active == null) u.active = true;
          if (!Array.isArray(u.areas)) u.areas = [];
        });
      }
      migrateUsers();
      const staff = () => users.filter((u) => u.role !== "admin");
      const meUser = () => users.find((u) => u.id === meId && u.active !== false) || null;
      const authOn = () => false; // PIN dimatikan sementara: semua menu terbuka tanpa login
      const isAdmin = () => !authOn() || !!(meUser() && meUser().role === "admin");
      const allowedView = (v) => !authOn() || isAdmin() || (!!meUser() && menusOf(meUser()).includes(v));
      const curUser = () => users.find((u) => u.id === curU && u.role !== "admin") || null;
      const curName = () => (curUser() ? curUser().name : meUser() ? meUser().name : "");
      function applySession() {
        const m = meUser();
        if (authOn() && m && m.role !== "admin") curU = m.id;
        else if (!users.some((u) => u.id === curU && u.role !== "admin" && u.active !== false)) curU = "";
        sv(K_CU, curU);
      }
      function applyRole() {
        document.querySelectorAll(".mi[data-v]").forEach((b) => (b.hidden = !allowedView(b.dataset.v)));
        // grup menu (judul + submenu) disembunyikan jika semua isinya tersembunyi: lihat 76-menu-groups.js
        if (typeof menuSync === "function") menuSync();
        let vis = 0;
        const navSel = navPicks();
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          const h = !navSel.includes(b.dataset.v);
          b.hidden = h;
          if (!h) vis++;
        });
        $("tabs").style.gridTemplateColumns = "repeat(" + (vis + 1) + ", 1fr)";
        const m = meUser();
        $("whoAmI").textContent = authOn() && m ? m.name + " (" + (m.role === "admin" ? "Admin" : menuLabel(m)) + ")" : "";
        $("logoutBtn").hidden = !(authOn() && m);
        // sinkronkan penanda tab aktif setelah daftar tab berubah
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          const on = b.dataset.v === curViewId;
          b.classList.toggle("on", on);
          if (on) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        $("tMenu").classList.toggle("on", ![...document.querySelectorAll("#tabs [data-v]")].some((b) => !b.hidden && b.dataset.v === curViewId));
        // jika layar yang sedang terbuka tidak diizinkan, pindah ke menu pertama yang boleh
        const curV = ["so", "dc", "check", "task", "kes", "adj", "clr", "muat", "usr", "kpi", "tg", "mon", "data"].find((k) => $("v-" + k) && !$("v-" + k).hidden);
        if (curV && !allowedView(curV)) {
          const first = ["so", "dc", "task", "check", "kes", "adj", "mon", "muat", "kpi"].find(allowedView);
          if (first) go(first);
        }
        renderUserSel();
      }
      function loginUi() {
        const need = authOn() && !meUser();
        $("login").hidden = !need;
        document.body.style.overflow = need ? "hidden" : "";
        if (!need) return;
        const act = users.filter((u) => u.active !== false).sort((a, b) => a.name.localeCompare(b.name, "id"));
        $("lgUser").innerHTML = act.map((u) => `<option value="${esc(u.id)}">${esc(u.name)}${u.role === "admin" ? " (Admin)" : ""}</option>`).join("");
        lgSel();
      }
      function lgSel() {
        const u = users.find((x) => x.id === $("lgUser").value);
        $("lgPinWrap").hidden = !(u && u.pin);
        $("lgPin").value = "";
        $("lgErr").textContent = "";
        clearInvalid($("login"));
      }
      async function lgGo() {
        const u = users.find((x) => x.id === $("lgUser").value);
        if (!u) return;
        if (Date.now() < pinLock) {
          markInvalid($("lgPin"), "lgErr");
          return ($("lgErr").textContent = "Terlalu banyak salah. Tunggu beberapa detik.");
        }
        if (u.pin && (await pinHash($("lgPin").value)) !== u.pin) {
          if (++pinFails >= 5) {
            pinLock = Date.now() + 30000;
            pinFails = 0;
          }
          $("lgErr").textContent = "PIN salah.";
          markInvalid($("lgPin"), "lgErr");
          $("lgPin").select();
          return;
        }
        pinFails = 0;
        meId = u.id;
        try { sessionStorage.setItem(K_ME, meId); } catch (e) {}
        applySession();
        applyRole();
        loginUi();
        initAll();
        go("so");
        toast("Masuk sebagai " + u.name);
      }
      function logout() {
        meId = "";
        try { sessionStorage.removeItem(K_ME); } catch (e) {}
        curU = "";
        applyRole();
        loginUi();
        side(false);
      }
      $("lgUser").onchange = lgSel;
      $("lgOk").onclick = lgGo;
      $("lgPin").addEventListener("input", () => clearInvalid($("login")));
      $("lgPin").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); lgGo(); } };
      $("logoutBtn").onclick = logout;
      // satu jalur untuk dua pintu: menu User & Area (utama) dan layar masuk (darurat)
      async function resetAllPins() {
        const ok = await askType(
          "Hapus semua PIN?",
          "Semua user bisa masuk tanpa PIN sampai admin mengatur PIN lagi. Data pemeriksaan tidak terhapus.",
          "RESET",
          "Hapus semua PIN",
          3,
        );
        if (!ok) return false;
        users.forEach((u) => delete u.pin);
        sv(K_U, users);
        meId = "";
        try { sessionStorage.removeItem(K_ME); } catch (e) {}
        applyRole();
        loginUi();
        initAll();
        renderUsr();
        toast("Semua PIN dihapus. Atur PIN admin di menu User & Area.");
        return true;
      }
      $("lgReset").onclick = async () => {
        $("login").hidden = true;
        if (!(await resetAllPins())) loginUi();
      };
      $("uResetPin").onclick = async () => {
        if (!(await supAuth())) return;
        if (!users.some((u) => u.pin)) return toast("Belum ada PIN yang diatur.");
        await resetAllPins();
      };
      const inScope = (a) => !curUser() || curUser().areas.includes(a);
      const visAreas = () => areas().filter(inScope);
      const isClosed = (a) => !!closed[a];
      const owners = (a) => users.filter((u) => u.active !== false && u.role !== "admin" && u.areas.includes(a)).map((u) => u.name);
      function areaStat(a) {
        const b = DATA.filter((x) => x.area === a);
        return { total: b.length, done: b.filter((x) => counts[x.bin]).length };
      }
      function renderUserSel() {
        if (curU && !curUser()) curU = "";
        const lim = authOn() && !isAdmin();
        $("user").innerHTML =
          (lim ? "" : '<option value="">Semua petugas (admin)</option>') +
          staff()
            .filter((u) => u.active !== false && (!lim || u.id === curU))
            .map((u) => `<option value="${esc(u.id)}" ${u.id === curU ? "selected" : ""}>${esc(u.name)}</option>`)
            .join("");
        $("user").value = curU;
        $("user").disabled = lim;
      }
      function renderAreaBar(area) {
        const el = $("areaBar");
        if (area === "*") {
          el.innerHTML = "";
          return;
        }
        const s = areaStat(area),
          a = esc(area);
        if (isClosed(area))
          el.innerHTML = `<div class="note ok">Area ${a} sudah ditutup oleh ${esc(closed[area].by)}. Bin tidak bisa diubah.</div>`;
        else if (s.total && s.done === s.total)
          el.innerHTML = `<div class="note ok">Semua ${s.total} bin area ${a} sudah diperiksa.${isAdmin() ? `<button class="btn pri sm" data-close="${a}">Tutup area ${a}</button>` : " Menunggu admin menutup area."}</div>`;
        else el.innerHTML = `<div class="note info">Area ${a}: ${s.done} dari ${s.total} bin diperiksa.</div>`;
      }
      async function closeArea(a) {
        if (!(await supAuth())) return;
        const s = areaStat(a);
        if (!s.total || s.done < s.total) return toast("Area belum bisa ditutup: masih ada bin yang belum diperiksa.");
        if (!(await ask("Tutup area " + a + "?", "Bin di area ini tidak bisa diubah sampai dibuka kembali.", "Tutup area"))) return;
        closed[a] = { by: curName() || "Supervisor", at: new Date().toISOString() };
        sv(K_X, closed);
        toast("Area " + a + " ditutup");
        tgArea(a, true);
        renderBins();
        renderUsr();
      }
      async function reopenArea(a) {
        if (!(await supAuth())) return;
        if (!(await ask("Buka kembali area " + a + "?", "Bin di area ini bisa diperiksa ulang.", "Buka kembali"))) return;
        delete closed[a];
        sv(K_X, closed);
        toast("Area " + a + " dibuka kembali");
        tgArea(a, false);
        renderBins();
        renderUsr();
      }
      const saveAreaCfg = (list) => {
        areaCfg = { list, at: Date.now() };
        sv(K_AC, areaCfg);
        if (typeof renderBins === "function") renderBins();
        renderUsr();
      };
      function renderAreaCfg() {
        const base = areaBase();
        $("aCfgList").innerHTML = base.length
          ? base.map((a) => `<button type="button" class="chip" data-ad="${esc(a)}" aria-label="Hapus area ${esc(a)}">${esc(a)} ✕</button>`).join("")
          : '<div class="hint">Belum ada area. Tambahkan di bawah.</div>';
      }
      const areaClean = (v) => String(v || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12);
      $("aCfgAdd").onclick = () => {
        const a = areaClean($("aCfgIn").value);
        if (!a) return toast("Isi nama area (huruf/angka).");
        if (allAreas().includes(a)) return toast("Area " + a + " sudah ada.");
        saveAreaCfg([...areaBase(), a]);
        $("aCfgIn").value = "";
        toast("Area " + a + " ditambahkan");
      };
      $("aCfgIn").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("aCfgAdd").onclick(); } };
      $("aCfgList").onclick = async (e) => {
        const b = e.target.closest("[data-ad]");
        if (!b) return;
        const a = b.dataset.ad;
        if (DATA.some((x) => x.area === a)) return toast("Area " + a + " masih punya bin di data WMS, tidak bisa dihapus.");
        if (!(await ask("Hapus area " + a + "?", "Area dilepas dari semua petugas.", "Hapus", true))) return;
        users.forEach((u) => { if (Array.isArray(u.areas)) u.areas = u.areas.filter((x) => x !== a); });
        sv(K_U, users);
        uSel = uSel.filter((x) => x !== a);
        saveAreaCfg(areaBase().filter((x) => x !== a));
      };
      $("aCfgReset").onclick = async () => {
        if (await ask("Kembalikan daftar area awal?", "Daftar area kembali ke 18 area bawaan.", "Kembalikan")) saveAreaCfg([...AREA_DEFAULT]);
      };
      function renderUsr() {
        const A = allAreas();
        renderAreaCfg();
        const eu = uEdit && users.find((x) => x.id === uEdit),
          adminRole = $("uRole").value === "admin";
        $("uTitle").textContent = uEdit ? "Ubah user" : "Tambah user";
        $("uAdd").textContent = uEdit ? "Simpan perubahan" : "Simpan user";
        $("uCancel").hidden = !uEdit;
        $("uAreasWrap").hidden = adminRole;
        $("uMenusWrap").hidden = adminRole;
        $("uMenus").innerHTML = Object.keys(MENU_DEF).map((k) => `<button type="button" class="chip ${uMenus.includes(k) ? "on" : ""}" data-m="${k}" aria-pressed="${uMenus.includes(k)}">${MENU_DEF[k]}</button>`).join("");
        document.querySelectorAll("#uPreset [data-p]").forEach((b) => {
          const on = sameSet(uMenus, PRESETS[b.dataset.p]);
          b.classList.toggle("on", on);
          b.setAttribute("aria-pressed", String(on));
        });
        $("uPinL").textContent = adminRole ? "PIN admin (wajib, 4 sampai 8 angka)" : "PIN (opsional, 4 sampai 8 angka)";
        $("uPinH").textContent = eu && eu.pin ? "PIN sudah diatur. Kosongkan jika tidak ingin mengubah." : adminRole ? "Admin wajib punya PIN." : "Tanpa PIN, petugas masuk cukup dengan memilih nama.";
        $("uBoot").innerHTML = users.some((u) => u.role === "admin" && u.pin && u.active !== false)
          ? ""
          : '<div class="note">Belum ada admin ber-PIN, jadi semua orang masih bisa membuka semua menu. Buat admin pertama di bawah (pilih peran Admin dan isi PIN). Setelah itu semua user harus masuk.</div>';
        $("uAreas").innerHTML = A.length
          ? A.map((a) => `<button class="chip ${uSel.includes(a) ? "on" : ""}" data-a="${esc(a)}">${esc(a)}</button>`).join("")
          : '<div class="hint">Belum ada area. Impor data WMS dulu.</div>';
        $("usrList").innerHTML = users.length
          ? users
              .map((u) => {
                const pills =
                  u.role === "admin"
                    ? '<span class="m">Akses penuh ke semua menu</span>'
                    : u.areas
                        .map((a) => {
                          const s = areaStat(a);
                          return `<span class="pill ${isClosed(a) ? "green" : s.done ? "amber" : ""}">${esc(a)} ${isClosed(a) ? "ditutup" : s.done + "/" + s.total}</span>`;
                        })
                        .join(" ") || '<span class="m">Belum ada area</span>',
                  self = meUser() && meUser().id === u.id;
                return `<div class="card"><div class="r"><b class="big">${esc(u.name)}${self ? " (Anda)" : ""}</b><div><span class="pill ${u.role === "admin" ? "red" : ""}">${u.role === "admin" ? "Admin" : "Petugas"}</span> <span class="pill ${u.pin ? "green" : ""}">${u.pin ? "PIN aktif" : "Tanpa PIN"}</span>${u.active === false ? ' <span class="pill amber">Nonaktif</span>' : ""}</div></div><div>${pills}${u.role === "admin" ? "" : ' <span class="pill">Menu: ' + menuLabel(u) + "</span>"}</div><div class="acts"><button class="btn sec sm inl" data-edit="${esc(u.id)}">Ubah</button><button class="btn sec sm inl" data-act="${esc(u.id)}">${u.active === false ? "Aktifkan" : "Nonaktifkan"}</button><button class="btn dng sm inl" data-del="${esc(u.id)}">Hapus</button></div></div>`;
              })
              .join("")
          : '<div class="empty">Belum ada user. Tambahkan di bawah.</div>';
        $("aStat").innerHTML = A.map((a) => {
          const s = areaStat(a),
            c = isClosed(a),
            full = s.total && s.done === s.total,
            mand = !s.total,
            ow = owners(a);
          return `<div class="card"><div class="r"><b class="big">Area ${esc(a)}</b><span class="pill ${c ? "green" : full ? "amber" : ""}">${c ? "Ditutup" : mand ? "Belum ada data" : full ? "Siap ditutup" : "Berjalan"}</span></div><div class="m">${mand ? "Belum ada bin di data WMS. Impor Informasi Rak WMS di menu Data WMS." : s.done + " dari " + s.total + " bin diperiksa."} Petugas: ${ow.length ? esc(ow.join(", ")) : "belum ada"}</div>${c ? `<div class="m">Ditutup oleh ${esc(closed[a].by)}</div>${isAdmin() ? `<button class="btn sec sm" data-reopen="${esc(a)}">Buka kembali</button>` : ""}` : full && isAdmin() ? `<button class="btn pri sm" data-close="${esc(a)}">Tutup area ${esc(a)}</button>` : ""}</div>`;
        }).join("");
      }
      function resetUForm() {
        uEdit = null;
        uSel = [];
        uMenus = [...PRESETS.operator];
        $("uName").value = "";
        $("uRole").value = "petugas";
        $("uPin").value = "";
        $("uActive").checked = true;
        renderUsr();
      }
      $("uRole").onchange = renderUsr;
      $("user").onchange = async () => {
        const nv = $("user").value;
        if (nv === "" && curU !== "" && !(await supAuth())) {
          $("user").value = curU;
          return;
        }
        curU = nv;
        if (curU && DATA.some(isTaskPend)) lf = "task";
        sv(K_CU, curU);
        initAll();
      };
      $("uAreas").onclick = (e) => {
        const b = e.target.closest("[data-a]");
        if (!b) return;
        const a = b.dataset.a;
        uSel = uSel.includes(a) ? uSel.filter((x) => x !== a) : [...uSel, a];
        renderUsr();
      };
      $("uCancel").onclick = resetUForm;
      $("uMenus").onclick = (e) => {
        const b = e.target.closest("[data-m]");
        if (!b) return;
        const k = b.dataset.m;
        uMenus = uMenus.includes(k) ? uMenus.filter((x) => x !== k) : [...uMenus, k];
        renderUsr();
      };
      $("uPreset").onclick = (e) => {
        const b = e.target.closest("[data-p]");
        if (!b) return;
        uMenus = [...PRESETS[b.dataset.p]];
        renderUsr();
      };
      $("uAdd").onclick = async () => {
        const name = $("uName").value.trim(),
          role = $("uRole").value,
          pin = $("uPin").value.trim(),
          active = $("uActive").checked,
          old = uEdit ? users.find((x) => x.id === uEdit) : null;
        if (!(await supAuth())) return;
        if (!name) return toast("Nama wajib diisi.");
        if (users.some((u) => u.id !== uEdit && u.name.toLowerCase() === name.toLowerCase()))
          return toast("Nama sudah dipakai. Gunakan nama lain.");
        if (role === "petugas" && !uSel.length) return toast("Pilih minimal satu area untuk petugas ini.");
        if (role === "petugas" && !uMenus.length) return toast("Pilih minimal satu menu untuk petugas ini.");
        if (pin && !/^\d{4,8}$/.test(pin)) return toast("PIN harus 4 sampai 8 angka.");
        
        const wasAuth = authOn();
        // jangan sampai tidak ada admin aktif ber-PIN setelah perubahan ini
        const rest = users.filter((u) => u.id !== uEdit && u.role === "admin" && u.pin && u.active !== false).length;
        const stays = role === "admin" && active;
        if (wasAuth && !rest && !stays) return toast("Harus tersisa minimal satu admin aktif.");
        if (old && meUser() && meUser().id === old.id && (!active || role !== "admin") && wasAuth)
          return toast("Anda tidak bisa menonaktifkan atau menurunkan peran akun sendiri.");
        const rec = old || { id: "u" + Date.now().toString(36) };
        rec.name = name;
        rec.role = role;
        rec.active = active;
        rec.areas = role === "admin" ? [] : [...uSel].sort();
        if (role === "admin") delete rec.menus;
        else rec.menus = [...uMenus];
        if (pin) rec.pin = await pinHash(pin);
        if (!old) users.push(rec);
        sv(K_U, users);
        if (!wasAuth && authOn()) {
          meId = rec.id;
          try { sessionStorage.setItem(K_ME, meId); } catch (e) {}
          toast("Admin dibuat. Anda masuk sebagai " + name + ". Mulai sekarang semua user harus masuk.");
        } else toast("User tersimpan: " + name);
        resetUForm();
        applySession();
        applyRole();
        initAll();
      };
      $("usrList").onclick = async (e) => {
        const ed = e.target.closest("[data-edit]"),
          dl = e.target.closest("[data-del]"),
          ac = e.target.closest("[data-act]");
        if (!ed && !dl && !ac) return;
        if (!(await supAuth())) return;
        const id = (ed || dl || ac).dataset.edit || (dl || ac || {}).dataset?.del || (ac || {}).dataset?.act;
        const u = users.find((x) => x.id === id);
        if (!u) return;
        const adminsLeft = (excl) => users.filter((x) => x.id !== excl && x.role === "admin" && x.pin && x.active !== false).length;
        const isSelf = meUser() && meUser().id === u.id;
        if (ed) {
          uEdit = u.id;
          uSel = [...u.areas];
          uMenus = u.role === "admin" ? [...PRESETS.operator] : [...menusOf(u)];
          $("uName").value = u.name;
          $("uRole").value = u.role;
          $("uPin").value = "";
          $("uActive").checked = u.active !== false;
          renderUsr();
          $("uName").scrollIntoView({ block: "center" });
        } else if (ac) {
          const to = u.active === false;
          if (!to && authOn() && isSelf) return toast("Anda tidak bisa menonaktifkan akun sendiri.");
          if (!to && authOn() && u.role === "admin" && !adminsLeft(u.id)) return toast("Harus tersisa minimal satu admin aktif.");
          u.active = to;
          sv(K_U, users);
          toast(u.name + (to ? " diaktifkan" : " dinonaktifkan"));
          renderUsr();
          initAll();
        } else {
          if (authOn() && isSelf) return toast("Anda tidak bisa menghapus akun sendiri.");
          if (authOn() && u.role === "admin" && !adminsLeft(u.id)) return toast("Harus tersisa minimal satu admin aktif.");
          if (!(await ask("Hapus user " + u.name + "?", "Hasil pemeriksaan dan area yang sudah ditutup tidak ikut terhapus. Tugasnya menjadi tanpa petugas.", "Hapus", true))) return;
          users = users.filter((x) => x.id !== u.id);
          sv(K_U, users);
          renderUsr();
          initAll();
        }
      };
      const areaAct = (e) => {
        const c = e.target.closest("[data-close]"),
          r = e.target.closest("[data-reopen]");
        if (c) closeArea(c.dataset.close);
        if (r) reopenArea(r.dataset.reopen);
      };
      $("areaBar").onclick = $("aStat").onclick = areaAct;

