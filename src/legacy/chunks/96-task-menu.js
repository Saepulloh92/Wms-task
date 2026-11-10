/* Menu Task: daftar tugas dari admin (bin, aging per rak, DC per item) untuk dikerjakan petugas.
   Admin/SPV melihat semua tugas atau tugas satu petugas, bisa ganti petugas dan hapus per tugas. */
      let tskF = "todo", tskU = "";
      const TSK_KIND = { bin: "Periksa bin", AG: "Aging rak", DC: "DC item" };
      const tskRel = (iso) => {
        const t = Date.parse(iso);
        if (!t) return "";
        const m = Math.max(0, Math.round((Date.now() - t) / 60000));
        return m < 1 ? "baru saja" : m < 60 ? m + " menit lalu" : m < 1440 ? Math.round(m / 60) + " jam lalu" : Math.round(m / 1440) + " hari lalu";
      };
      function tskItems(uid) {
        const out = [], dcl = typeof dcItems === "function" ? dcItems() : [];
        Object.keys(tasks).forEach((key) => {
          const t = tasks[key];
          if (!t || (uid && t.u !== uid)) return;
          let kind = "bin", id = key;
          if (key.startsWith("AG|")) { kind = "AG"; id = key.slice(3); }
          else if (key.startsWith("DC|")) { kind = "DC"; id = key.slice(3); }
          const it = { key, kind, id, u: t.u, by: t.by, at: t.at };
          if (kind === "bin") {
            const x = DATA.find((d) => d.bin === id);
            if (!x) return;
            it.done = !isTaskPend({ bin: id });
            it.title = id;
            it.sub = (x.item || "") + " · Area " + x.area;
            it.prio = 2;
          } else if (kind === "AG") {
            const x = DATA.find((d) => d.bin === id);
            if (!x) return;
            it.done = tkAgDone(id);
            it.title = id;
            it.sub = (x.item || "") + " · " + (x.aging != null ? x.aging + " hari" : "") + (x.sinyal ? " · " + x.sinyal : "");
            it.prio = /merah/i.test(x.sinyal || "") ? 0 : /kuning/i.test(x.sinyal || "") ? 1 : 2;
          } else {
            const e = dcl.find((d) => d.item === id);
            it.done = tkDcDone(id);
            it.title = id;
            it.sub = e ? "Kode " + e.kode : "";
            it.prio = 2;
          }
          out.push(it);
        });
        return out.sort((a, b) => a.done - b.done || a.prio - b.prio || String(a.at).localeCompare(String(b.at)));
      }
      function renderTsk() {
        if (!$("tskList")) return;
        const me = curUser(), admin = !me;
        $("tskWhoW").hidden = !admin;
        $("tskAdminH").hidden = !admin && !!me && false;
        if (admin) {
          const cur = tskU;
          $("tskUser").innerHTML = '<option value="">Semua petugas</option>' + staff().map((u) => `<option value="${esc(u.id)}">${esc(u.name)}</option>`).join("");
          $("tskUser").value = [...$("tskUser").options].some((o) => o.value === cur) ? cur : "";
          tskU = $("tskUser").value;
        }
        const all = tskItems(me ? me.id : tskU), pend = all.filter((x) => !x.done), done = all.length - pend.length;
        const pct = all.length ? Math.round((done / all.length) * 100) : 0;
        const nk = (k) => pend.filter((x) => x.kind === k).length;
        $("tskSum").innerHTML = all.length
          ? `<div class="tsk-ring ${pend.length ? "" : "ok"}" style="--p:${pct}"><b>${pct}%</b></div>
             <div><h3>${pend.length ? fmt(pend.length) + " tugas menunggu" : "Semua tugas selesai"}</h3>
             <p class="fine">${done} dari ${all.length} selesai${pend.length ? " · bin " + nk("bin") + " · aging " + nk("AG") + " · DC " + nk("DC") : ""}</p></div>`
          : "";
        const flt = { todo: pend, all, done: all.filter((x) => x.done), bin: all.filter((x) => x.kind === "bin"), AG: all.filter((x) => x.kind === "AG"), DC: all.filter((x) => x.kind === "DC") };
        if (!all.length) tskF = "todo";
        $("tskChips").innerHTML = all.length
          ? chipsHtml(tskF, [["todo", "Belum", pend.length], ["bin", "Bin", flt.bin.length], ["AG", "Aging", flt.AG.length], ["DC", "DC", flt.DC.length], ["done", "Selesai", flt.done.length], ["all", "Semua", all.length]])
          : "";
        const list = flt[tskF] || pend, uname = (id) => (users.find((u) => u.id === id) || {}).name || "?";
        $("tskList").innerHTML = !all.length
          ? `<div class="empty">${admin ? "Belum ada tugas. Buat di bagian Kelola tugas di bawah." : "Belum ada tugas untuk Anda. Tugas dari admin akan muncul di sini."}</div>`
          : list.length
          ? list.map((x) => `<div class="card tsk k-${x.kind}${x.done ? " done" : ""}" data-key="${esc(x.key)}">
              <div class="r"><span class="pill kd">${TSK_KIND[x.kind]}</span><span class="pill ${x.done ? "green" : "amber"}">${x.done ? "Selesai" : "Menunggu"}</span></div>
              <b class="big">${esc(x.title)}</b>
              <div class="m">${esc(x.sub)}</div>
              <div class="m fine">Dari ${esc(x.by || "Admin")} · ${tskRel(x.at)}${admin ? " · untuk " + esc(uname(x.u)) : ""}</div>
              <div class="tsk-act"><button class="btn ${x.done ? "sec" : "pri"}" data-tsk="go" type="button">${x.done ? "Lihat" : "Kerjakan"}</button>
              ${admin ? `<select class="sm" data-tsk="re" aria-label="Ganti petugas">${staff().map((u) => `<option value="${esc(u.id)}"${u.id === x.u ? " selected" : ""}>${esc(u.name)}</option>`).join("")}</select><button class="btn dng sm" data-tsk="del" type="button">Hapus</button>` : ""}</div></div>`).join("")
          : `<div class="empty">Tidak ada tugas di filter ini.</div>`;
      }
      function tskOpen(it) {
        if (it.kind === "bin") { go("so"); open(it.id); }
        else if (it.kind === "AG") { WMS.agiFocus = true; WMS.agiTarget = it.id; go("agi"); }
        else {
          dcF = "task";
          go("dc");
          const e = dcItems().find((d) => d.item === it.id);
          if (e) dcOpen(e);
        }
      }
      $("tskChips").onclick = (e) => { const b = e.target.closest("[data-k]"); if (b) { tskF = b.dataset.k; renderTsk(); } };
      $("tskUser").onchange = () => { tskU = $("tskUser").value; renderTsk(); };
      $("tskList").onclick = async (e) => {
        const b = e.target.closest("[data-tsk]"), card = e.target.closest("[data-key]");
        if (!b || !card || b.tagName === "SELECT") return;
        const it = tskItems("").find((x) => x.key === card.dataset.key);
        if (!it) return;
        if (b.dataset.tsk === "go") return tskOpen(it);
        if (b.dataset.tsk === "del") {
          if (!(await leadAuth())) return;
          if (!(await ask("Hapus tugas ini?", TSK_KIND[it.kind] + " " + it.title + ". Hasil pemeriksaan tidak ikut terhapus.", "Hapus", true))) return;
          delete tasks[it.key];
          sv(K_T, tasks);
          taskBadges(); renderTask(); renderBins(); WMS.emit();
          toast("Tugas dihapus");
        }
      };
      $("tskList").onchange = async (e) => {
        const sel = e.target.closest('[data-tsk="re"]'), card = e.target.closest("[data-key]");
        if (!sel || !card) return;
        const t = tasks[card.dataset.key];
        if (!t) return;
        if (!(await leadAuth())) return renderTsk();
        tasks[card.dataset.key] = { ...t, u: sel.value };
        sv(K_T, tasks);
        taskBadges(); renderTask(); WMS.emit();
        toast("Tugas dipindahkan ke " + ((users.find((u) => u.id === sel.value) || {}).name || "petugas"));
      };
