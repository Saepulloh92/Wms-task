/* Tugas Aging (per rak) dan DC (per item) + delegasi admin.
   Disimpan di objek `tasks` dengan kunci berawalan "AG|<rak>" dan "DC|<item>", jadi ikut sinkron seperti tugas bin.
   Selesai otomatis: Aging = cek rak tersimpan setelah tugas dibuat; DC = item DC selesai dicek setelah tugas dibuat. */
      const tkIso = (v) => String(v || "");
      const tkAgDone = (bin) => { const t = tasks["AG|" + bin], a = aging[bin]; return !!(t && a && tkIso(a.at) >= tkIso(t.at)); };
      const tkDcDone = (item) => { const t = tasks["DC|" + item], r = dc[item]; return !!(t && r && r.done && tkIso(r.at) >= tkIso(t.at)); };
      const tkAgOpen = (bin) => { const t = tasks["AG|" + bin]; return !!t && !tkAgDone(bin) && (!curU || t.u === curU); };
      const tkDcOpen = (item) => { const t = tasks["DC|" + item]; return !!t && !tkDcDone(item) && (!curU || t.u === curU); };
      const tkOf = (kind) => Object.keys(tasks).filter((k) => k.startsWith(kind + "|")).map((k) => ({ id: k.slice(kind.length + 1), t: tasks[k] }));
      const tkKindStat = (kind, uid) => {
        const L = tkOf(kind).filter((e) => !uid || e.t.u === uid), done = L.filter((e) => (kind === "AG" ? tkAgDone(e.id) : tkDcDone(e.id))).length;
        return { total: L.length, done, pend: L.length - done };
      };
      const tkPendOther = () => tkOf("AG").filter((e) => tkAgOpen(e.id)).length + tkOf("DC").filter((e) => tkDcOpen(e.id)).length;

      /* ---- delegasi admin ---- */
      const dgState = () => ({ kind: $("dgKind").value, area: $("dgArea").value, sig: $("dgSig").value, user: $("dgUser").value, scope: $("dgScope").value, show: $("dgShow").value });
      const dgBusy = (key) => { const t = tasks[key]; if (!t) return false; if (key.startsWith("AG|")) return !tkAgDone(key.slice(3)); if (key.startsWith("DC|")) return !tkDcDone(key.slice(3)); return isTaskPend({ bin: key }); };
      let dgSkip = 0;
      function dgPlan() {
        const g = dgState(), rr = {}, out = [];
        dgSkip = 0;
        const pickU = (area) => (g.user === "auto" ? tkPick(area, rr) : g.user);
        if (g.kind === "bin") {
          DATA.forEach((x) => { if ((!g.area || x.area === g.area) && !counts[x.bin] && !isClosed(x.area)) out.push({ key: x.bin, u: pickU(x.area), show: g.show === "" ? undefined : g.show === "tampil" }); });
        } else if (g.kind === "AG") {
          const rows = DATA.filter((x) => !g.area || x.area === g.area);
          const L = WMSLib.agingChecklist(rows, g.sig === "all" ? "all" : "watch").filter((x) => g.sig !== "merah" || WMSLib.normSignal(x.sinyal) === "Merah");
          L.forEach((x) => { if (g.scope === "all" || !aging[x.bin]) out.push({ key: "AG|" + x.bin, u: pickU(x.area) }); });
        } else {
          dcItems().filter((e) => dcPick[e.item]).forEach((e) => {
            const r = dc[e.item];
            if (g.scope === "all" || !r || !r.done) { const b = DATA.find((x) => x.item === e.item); out.push({ key: "DC|" + e.item, u: pickU(b ? b.area : "") }); }
          });
        }
        const fresh = out.filter((p) => !dgBusy(p.key));
        dgSkip = out.length - fresh.length;
        return fresh;
      }
      function renderDg() {
        if (!$("tkDlg")) return;
        const admin = !curUser();
        $("tkDlg").hidden = !admin;
        if (!admin) return;
        const g = dgState();
        $("dgAreaW").hidden = g.kind === "DC";
        $("dgSigW").hidden = g.kind !== "AG";
        $("dgScopeW").hidden = g.kind === "bin";
        $("dgShowW").hidden = g.kind !== "bin";
        const plan = dgPlan(), no = plan.filter((p) => !p.u).length;
        $("dgInfo").innerHTML = g.kind === "DC" && !Object.keys(dcPick).length
          ? "Belum ada item DC terpilih. Pilih dulu lewat DC Harian, tombol Pilih item DC."
          : plan.length
          ? `<b>${fmt(plan.length)}</b> tugas baru akan dibuat${dgSkip ? `, <b>${fmt(dgSkip)}</b> yang masih berjalan dilewati` : ""}${no ? `, <b>${fmt(no)}</b> belum punya petugas (nanti dibagikan sesuai area lewat tombol Bagikan)` : ""}.`
          : dgSkip ? `Semua sudah punya tugas berjalan (${fmt(dgSkip)}). Tidak ada yang perlu ditambah.` : "Tidak ada yang perlu ditugaskan dengan pilihan ini.";
        $("dgGo").disabled = !plan.length;
      }
      function dgFill() {
        const ca = $("dgArea").value;
        $("dgArea").innerHTML = '<option value="">Semua area</option>' + allAreas().map((a) => `<option value="${esc(a)}">${esc(a)}</option>`).join("");
        $("dgArea").value = [...$("dgArea").options].some((o) => o.value === ca) ? ca : "";
        const cur = $("dgUser").value || "auto";
        $("dgUser").innerHTML = '<option value="auto">Otomatis (pemilik area)</option>' + staff().filter((u) => u.active !== false).map((u) => `<option value="${esc(u.id)}">${esc(u.name)}</option>`).join("");
        $("dgUser").value = [...$("dgUser").options].some((o) => o.value === cur) ? cur : "auto";
      }
      ["dgKind", "dgArea", "dgSig", "dgUser", "dgScope", "dgShow"].forEach((i) => ($(i).onchange = renderDg));
      $("dgGo").onclick = async () => {
        if (!(await leadAuth())) return;
        const plan = dgPlan();
        if (!plan.length) return;
        const per = {};
        plan.forEach((p) => { const u = users.find((z) => z.id === p.u); const nm = u ? u.name : "(belum ada petugas)"; per[nm] = (per[nm] || 0) + 1; });
        const lbl = { bin: "tugas bin", AG: "tugas aging", DC: "tugas DC" }[$("dgKind").value];
        if (!(await ask("Buat " + plan.length + " " + lbl + "?", Object.entries(per).map(([n, c]) => n + ": " + c).join(", ") + ". Tugas yang masih berjalan tidak diubah.", "Buat tugas"))) return;
        const at = nowIso();
        plan.forEach((p) => {
          const rec = { u: p.u || "", by: curName() || "Admin", at };
          if (p.show !== undefined) rec.show = p.show;
          tasks[p.key] = rec;
        });
        sv(K_T, tasks);
        taskBadges(); renderTask(); renderBins(); metrics();
        if (typeof WMS !== "undefined" && WMS.emit) WMS.emit();
        toast(plan.length + " " + lbl + " dibuat");
      };

      /* ---- ringkasan Aging & DC per petugas (halaman Tugas) ---- */
      function renderTkKinds() {
        const el = $("tkKinds");
        if (!el) return;
        dgFill();
        renderDg();
        const me = curUser(), list = me ? users.filter((u) => u.id === me.id) : staff();
        const rows = list.map((u) => ({ u, ag: tkKindStat("AG", u.id), dcs: tkKindStat("DC", u.id) })).filter((r) => r.ag.total || r.dcs.total);
        const bar = (s) => `<div class="bar"><i style="width:${s.total ? Math.round((s.done / s.total) * 100) : 0}%"></i></div>`;
        el.innerHTML = rows.length
          ? rows.map((r) => `<div class="card"><div class="r"><b class="big">${esc(r.u.name)}</b></div>
              ${r.ag.total ? `<div class="r"><span>Aging per rak</span><span class="pill ${r.ag.pend ? "" : "green"}">${r.ag.done}/${r.ag.total}</span></div>${bar(r.ag)}` : ""}
              ${r.dcs.total ? `<div class="r"><span>DC per item</span><span class="pill ${r.dcs.pend ? "" : "green"}">${r.dcs.done}/${r.dcs.total}</span></div>${bar(r.dcs)}` : ""}</div>`).join("") +
            (me ? `<div class="row-act">${tkKindStat("AG", me.id).pend ? '<button class="btn pri" data-tkk="AG">Kerjakan Aging</button>' : ""}${tkKindStat("DC", me.id).pend ? '<button class="btn pri" data-tkk="DC">Kerjakan DC</button>' : ""}</div>` : "")
          : '<div class="empty">Belum ada tugas aging atau DC.</div>';
      }
      $("tkKinds").onclick = (e) => {
        const b = e.target.closest("[data-tkk]");
        if (!b) return;
        if (b.dataset.tkk === "DC") { dcF = "task"; go("dc"); }
        else { WMS.agiFocus = true; go("agi"); }
      };
