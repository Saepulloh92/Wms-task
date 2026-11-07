/* Daftar bin + lembar periksa
   asal: index-fixd.html baris 2623-2738 */
      /* ---------- daftar bin ---------- */
      const areas = () => [...new Set(DATA.map((x) => x.area))].sort();
      /* Daftar area dinamis (diatur admin di menu User & Area, ikut tersinkron). Awalnya sesuai papan area gudang.
         Dipakai untuk pemeriksaan per bin dan cek kesesuaian; bin-nya datang dari kolom Area di Informasi Rak WMS. */
      const AREA_DEFAULT = ["MC", "L", "D1", "D2", "C2", "C1", "B2", "B1", "A2", "E", "F", "M", "A1", "G", "O", "P", "N", "H"];
      const K_AC = "warehouse_so_areacfg_v1";
      let areaCfg = ld(K_AC, null);
      const areaBase = () => (areaCfg && Array.isArray(areaCfg.list) ? areaCfg.list : AREA_DEFAULT);
      const allAreas = () => [...new Set([...areaBase(), ...DATA.map((x) => x.area)])];
      function chipsHtml(cur, opts) {
        return opts
          .map(
            ([k, l, n]) => `<button class="chip ${cur === k ? "on" : ""}" data-k="${k}" aria-pressed="${cur === k}">${l} ${n}</button>`,
          )
          .join("");
      }
      const BIN_MAX = 120; // batas bin yang digambar sekaligus, supaya HP low-end tidak macet
      function renderBins() {
        const area = $("area").value,
          q = $("search").value.toLowerCase().trim();
        const base = DATA.filter(
          (x) =>
            (inScope(x.area) || (curU && tasks[x.bin] && tasks[x.bin].u === curU)) &&
            (area === "*" || x.area === area) &&
            (!q || [x.bin, x.kode, x.item].join(" ").toLowerCase().includes(q)),
        );
        const n = (s) => base.filter((x) => stat(x) === s).length;
        renderAreaBar(area);
        renderTaskBar();
        taskBadges();
        if (lf === "task" && !base.some(isTaskPend)) lf = "all";
        $("chips").innerHTML = chipsHtml(lf, [
          ["all", "Semua", base.length],
          ...(base.some(isTaskPend) ? [["task", "Tugas", base.filter(isTaskPend).length]] : []),
          ["todo", "Belum", n("todo")],
          ["bad", "Perlu review", n("bad")],
          ["ok", "Sesuai", n("ok")],
        ]);
        list = base.filter((x) => lf === "all" || (lf === "task" ? isTaskPend(x) : stat(x) === lf));
        {
          const todo = (x) => (isTaskPend(x) || !counts[x.bin]) && !isClosed(x.area),
            nxt = list.find((x) => isTaskPend(x) && !isClosed(x.area)) || list.find(todo),
            nb = $("nextBin");
          nb.hidden = !list.length;
          nb.disabled = !nxt;
          nb.dataset.b = nxt ? nxt.bin : "";
          nb.textContent = nxt ? `Lanjut: ${nxt.bin} · ${fmt(list.filter(todo).length)} belum` : "Semua bin di daftar ini sudah diperiksa";
        }
        $("binList").innerHTML = list.length
          ? list
              .slice(0, BIN_MAX)
              .map((x) => {
                const s = stat(x),
                  c = counts[x.bin];
                const pill =
                  s === "todo" && isTaskPend(x)
                    ? '<span class="pill amber">Tugas</span>'
                    : s === "todo"
                    ? '<span class="pill">Belum</span>'
                    : s === "ok"
                      ? '<span class="pill green">Sesuai</span>'
                      : `<span class="pill amber">${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>`;
                return `<button class="bin ${s === "ok" ? "done-ok" : s === "bad" ? "done-bad" : ""}" data-b="${esc(x.bin)}"><b>${esc(x.bin)}</b><span class="it">${szHtml(x.item)}</span><span class="q">${cfg.blind && !counts[x.bin] ? "–" : fmt(x.onhand)}<small>qty WMS</small></span><span>${pill}</span></button>`;
              })
              .join("") +
            (list.length > BIN_MAX ? `<p class="fine bin-more">Menampilkan ${fmt(BIN_MAX)} dari ${fmt(list.length)} bin. Pakai filter atau pencarian untuk mempersempit.</p>` : "")
          : `<div class="empty">${base.length ? "Tidak ada bin di filter ini." : curUser() && !visAreas().length ? "Petugas ini belum punya area. Atur di menu User &amp; Area." : "Bin tidak ditemukan."}</div>`;
      }
      function metrics() {
        const done = DATA.filter((x) => counts[x.bin]).length,
          prob = DATA.filter((x) => stat(x) === "bad").length,
          p = DATA.length ? Math.round((done / DATA.length) * 100) : 0;
        $("pTxt").textContent = `${done} dari ${DATA.length} bin diperiksa`;
        $("pPct").textContent = p + "%";
        $("pBar").style.width = p + "%";
        $("pBarW").setAttribute("aria-valuenow", String(p));
        $("pBarW").setAttribute("aria-valuetext", `${done} dari ${DATA.length} bin diperiksa (${p}%)`);
        if (!$("v-so").hidden || !$("v-check").hidden)
          $("hSub").textContent = prob ? prob + " bin perlu review" : "Stock Opname per bin";
        $("sBar").style.width = p + "%";
        $("sTxt").textContent = done + " dari " + DATA.length + " bin (" + p + "%)";
        $("dRev").hidden = !prob;
        $("dRev").textContent = prob;
        const kc = kesIssues().filter((i) => i.lv === "bad").length;
        $("dKes").hidden = !kc;
        $("dKes").textContent = kc;
        const a = adjustRows();
        $("dAdj").hidden = !a.rows.length;
        $("dAdj").textContent = a.rows.length;
        $("tRev").hidden = !prob;
        $("tRev").textContent = prob;
        $("tAdj").hidden = !a.rows.length;
        $("tAdj").textContent = a.rows.length;
        taskBadges();
        updUndo();
        dcUpdUndo();
      }
      /* ---------- lembar periksa ---------- */
      function addLine(item = "", qty = "") {
        const d = document.createElement("div");
        d.className = "al";
        const names = [...new Set(DATA.map((x) => x.item))].sort();
        d.innerHTML = `<div><label>Nama barang</label><select class="li" aria-label="Nama barang"><option value="">Pilih barang</option>${names.map((n) => `<option ${n === item ? "selected" : ""}>${esc(n)}</option>`).join("")}</select></div><div class="r"><div><label>Qty fisik barang ini</label><input class="lq" aria-label="Qty fisik barang ini" type="number" inputmode="numeric" enterkeyhint="next" autocomplete="off" min="0" step="1" value="${esc(qty)}" placeholder="0"></div><button class="rm" aria-label="Hapus">×</button></div>`;
        d.querySelector(".rm").onclick = () => {
          d.remove();
          prev();
        };
        d.querySelectorAll("select,input").forEach((e) => (e.oninput = prev));
        $("lines").appendChild(d);
      }
      const lines = () =>
        [...document.querySelectorAll("#lines .al")]
          .map((r) => ({ item: r.querySelector(".li").value, qty: r.querySelector(".lq").value }))
          .filter((x) => x.item || x.qty !== "");
      function navTarget(dir) {
        const k = sel ? navList.indexOf(sel.bin) : -1;
        if (k < 0) return null;
        for (let j = k + dir; j >= 0 && j < navList.length; j += dir) {
          const x = DATA.find((d) => d.bin === navList[j]);
          if (x && !isClosed(x.area)) return x.bin;
        }
        return null;
      }
