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
             <p class="fine">${done} dari ${all.length} selesai${pend.length ? " · bin " + nk("bin") + " · aging " + nk("AG") + " · DC " + nk("DC") : ""}</p></div>${admin ? '<button class="btn sec sm tsk-new" id="tskJump" type="button">Buat tugas otomatis</button>' : ""}`
          : admin ? '<button class="btn pri tsk-new" id="tskJump" type="button">Buat tugas otomatis</button>' : "";
        const flt = { todo: pend, all, done: all.filter((x) => x.done), bin: all.filter((x) => x.kind === "bin"), AG: all.filter((x) => x.kind === "AG"), DC: all.filter((x) => x.kind === "DC") };
        if (!all.length) tskF = "todo";
        $("tskChips").innerHTML = all.length
          ? chipsHtml(tskF, [["todo", "Belum", pend.length], ["bin", "Bin", flt.bin.length], ["AG", "Aging", flt.AG.length], ["DC", "DC", flt.DC.length], ["done", "Selesai", flt.done.length], ["all", "Semua", all.length]])
          : "";
        const list = flt[tskF] || pend, uname = (id) => (users.find((u) => u.id === id) || {}).name || "Belum ada petugas";
        $("tskList").innerHTML = !all.length
          ? `<div class="empty">${admin ? "Belum ada tugas. Buat di bagian Kelola tugas di bawah." : "Belum ada tugas untuk Anda. Tugas dari admin akan muncul di sini."}</div>`
          : list.length
          ? list.map((x) => {
              const sg = x.kind === "AG" ? ((/merah/i.test(x.sub) && "merah") || (/kuning/i.test(x.sub) && "kuning") || "") : "";
              return `<div class="card tsk k-${x.kind}${x.done ? " done" : ""}" data-key="${esc(x.key)}" role="button" tabindex="0" aria-label="${x.done ? "Lihat" : "Kerjakan"} ${TSK_KIND[x.kind]} ${esc(x.title)}">
              <div class="tk-top"><span class="tk-kind">${TSK_KIND[x.kind]}</span><b class="tk-title">${esc(x.title)}</b><span class="tk-st ${x.done ? "ok" : "wait"}">${x.done ? "Selesai" : "Menunggu"}</span></div>
              <div class="tk-sub">${esc(x.sub)}</div>
              <div class="tk-meta"><span>${esc(x.by || "Admin")} · ${tskRel(x.at)}${admin ? " · " + esc(uname(x.u)) : ""}</span>${sg ? `<i class="tk-sig ${sg}">${sg}</i>` : ""}<span class="tk-go" data-tsk="go">${x.done ? "Lihat" : "Kerjakan"} ›</span></div>
              ${admin ? `<details class="tk-more"><summary>Kelola</summary><div class="tk-mgr"><select class="sm" data-tsk="re" aria-label="Ganti petugas">${staff().map((u) => `<option value="${esc(u.id)}"${u.id === x.u ? " selected" : ""}>${esc(u.name)}</option>`).join("")}</select><button class="btn dng sm" data-tsk="del" type="button">Hapus</button></div></details>` : ""}</div>`;
            }).join("")
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
      $("tskSum").onclick = (e) => {
        if (!e.target.closest("#tskJump")) return;
        $("dgKind").value = "bin"; $("dgArea").value = ""; $("dgUser").value = "auto"; $("dgShow").value = "";
        renderDg();
        if ($("dgGo").disabled) { toast($("dgInfo").textContent); return $("tskAdminH").scrollIntoView({ behavior: "smooth", block: "start" }); }
        $("dgGo").click();
      };
      $("tskList").onkeydown = (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".card.tsk")) { e.preventDefault(); e.target.click(); } };
      $("tskList").onclick = async (e) => {
        const b = e.target.closest("[data-tsk]"), card = e.target.closest("[data-key]");
        if (!card || e.target.closest(".tk-more")  && !b) return;
        if (e.target.closest("select, summary")) return;
        const it = tskItems("").find((x) => x.key === card.dataset.key);
        if (!it) return;
        if (!b || b.dataset.tsk === "go") return tskOpen(it);
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
