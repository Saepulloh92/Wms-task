/* Tugas Bin
   asal: index-fixd.html baris 6605-6811 */
      /* ---------- tugas bin ---------- */
      function taskBadges() {
        const n = DATA.filter(isTaskPend).length + (typeof tkPendOther === "function" ? tkPendOther() : 0);
        ["dTask", "tTask"].forEach((i) => {
          $(i).hidden = !n;
          $(i).textContent = n;
        });
      }
      function renderTaskBar() {
        const el = $("taskBar"),
          mine = tkMine();
        if (!mine.length) {
          el.innerHTML = "";
          return;
        }
        const pend = mine.filter(isTaskPend).length;
        el.innerHTML = pend
          ? `<div class="note info">Tugas ${curU ? "Anda" : "semua petugas"}: ${mine.length - pend} dari ${mine.length} selesai.${lf === "task" ? "" : '<button class="btn pri sm" data-tk="go">Kerjakan tugas</button>'}</div>`
          : `<div class="note ok">Semua ${mine.length} tugas selesai.</div>`;
      }
      $("taskBar").onclick = (e) => {
        if (e.target.closest("[data-tk=go]")) {
          lf = "task";
          renderBins();
        }
      };
      const tkOwned = (t) => users.some((u) => u.id === t.u);
      function tkPick(area, rr) {
        const o = users.filter((u) => u.active !== false && isStaff(u) && u.areas.includes(area));
        if (!o.length) return "";
        const i = (rr[area] = rr[area] || 0);
        rr[area]++;
        return o[i % o.length].id;
      }
      function renderTask() {
        const me = curUser(),
          mine = tkMine(),
          pend = mine.filter(isTaskPend).length,
          un = me ? [] : Object.keys(tasks).filter((k) => !tkOwned(tasks[k]));
        $("tkStats").innerHTML = [
          ["Total tugas", mine.length, ""],
          ["Selesai", mine.length - pend, "var(--green)"],
          ["Belum", pend, pend ? "var(--amber)" : ""],
          ["Tanpa petugas", me ? "–" : un.length, un.length ? "var(--red)" : ""],
        ]
          .map(([l, v, c]) => `<div class="stat"><small>${l}</small><strong style="${c ? "color:" + c : ""}">${v}</strong></div>`)
          .join("");
        $("tkWho").textContent = me ? "Upload daftar bin saya (" + me.name + ")" : "Upload tugas (admin atau SPV)";
        $("tkLbl").textContent = me ? "Pilih file daftar bin saya" : "Pilih file tugas untuk petugas";
        $("tkHelp").textContent = me
          ? "Kolom wajib: Bin (atau Rak). Semua bin di file menjadi tugas Anda, hanya untuk area yang Anda pegang."
          : 'Kolom wajib: Bin (atau Rak). Kolom Petugas opsional: diisi nama petugas yang sudah terdaftar. Jika kosong, bin dibagi ke petugas pemilik area bin itu. Bin yang sudah pernah diperiksa menjadi tugas hitung ulang.';
        $("tkGo").hidden = !pend || !me;
        const list = me ? users.filter((u) => u.id === me.id) : staff();
        $("tkUsers").innerHTML = list.length
          ? list
              .map((u) => {
                const t = DATA.filter((x) => tasks[x.bin] && tasks[x.bin].u === u.id),
                  d = t.filter((x) => !isTaskPend({ bin: x.bin })).length,
                  pc2 = t.length ? Math.round((d / t.length) * 100) : 0;
                return `<div class="card"><div class="r"><b class="big">${esc(u.name)}</b><span class="pill ${t.length && d === t.length ? "green" : ""}">${t.length ? d + "/" + t.length : "Tidak ada tugas"}</span></div><div class="kb ${t.length && d === t.length ? "ok" : ""}"><i style="width:${pc2}%"></i></div></div>`;
              })
              .join("")
          : '<div class="empty">Belum ada petugas. Tambahkan di menu User &amp; Area.</div>';
        $("tkUn").innerHTML = un.length
          ? `<div class="note">${un.length} tugas belum punya petugas (area belum ada pemiliknya).<button class="btn pri sm" data-tk="auto">Bagikan sesuai area</button></div>`
          : "";
        if (!Object.keys(tasks).length) $("tkRes").innerHTML = '<div class="empty">Belum ada tugas. Pilih file daftar bin di atas (kolom Bin atau Rak). Belum punya file? Unduh contoh file dulu.</div>';
        else if ($("tkRes").querySelector(".empty")) $("tkRes").innerHTML = "";
        $("tkClear").textContent = me ? "Hapus tugas saya" : "Hapus semua tugas";
        $("tkClear").disabled = !mine.length && !(typeof tkPendOther === "function" && Object.keys(tasks).length);
        if (typeof renderTkKinds === "function") renderTkKinds();
        if (typeof renderTsk === "function") renderTsk();
      }
      async function tkIngest(rows) {
        const hi = rows.findIndex((r) => r.some((c) => ["bin", "rak"].includes(nrm(c))));
        if (hi < 0) return toast('Kolom "Bin" atau "Rak" tidak ditemukan di file.');
        const H = rows[hi].map(nrm),
          bi = H.findIndex((h) => h === "bin" || h === "rak"),
          ui = H.findIndex((h) => ["petugas", "user", "pic", "nama"].includes(h)),
          byBin = new Map();
        DATA.forEach((x) => {
          byBin.set(String(x.bin).trim().toUpperCase(), x);
          byBin.set(rakFmt(x.bin), x);
        });
        const me = curUser(),
          add = [],
          nf = [],
          cl = [],
          out = [],
          dup = new Set(),
          unk = new Set(),
          seen = new Set(),
          rr = {};
        rows.slice(hi + 1).forEach((r) => {
          const raw = String(r[bi] ?? "").trim();
          if (!raw) return;
          const x = byBin.get(raw.toUpperCase()) || byBin.get(rakFmt(raw));
          if (!x) return nf.push(raw);
          if (seen.has(x.bin)) return dup.add(x.bin);
          seen.add(x.bin);
          if (isClosed(x.area)) return cl.push(x.bin);
          let uid = "";
          if (me) {
            if (!me.areas.includes(x.area)) return out.push(x.bin);
            uid = me.id;
          } else {
            const nm = ui >= 0 ? String(r[ui] ?? "").trim() : "";
            if (nm) {
              const u = staff().find((z) => z.active !== false && z.name.toLowerCase() === nm.toLowerCase());
              if (!u) return unk.add(nm);
              uid = u.id;
            } else uid = tkPick(x.area, rr);
          }
          add.push({ bin: x.bin, u: uid });
        });
        const cut = (a) => a.slice(0, 6).join(", ") + (a.length > 6 ? " dan " + (a.length - 6) + " lagi" : "");
        const warn = [
          nf.length && `${nf.length} bin tidak ada di data WMS: ${cut(nf)}`,
          unk.size && `Nama petugas tidak dikenal: ${cut([...unk])}. Daftarkan dulu di Petugas & Area.`,
          cl.length && `${cl.length} bin di area yang sudah ditutup dilewati: ${cut(cl)}`,
          out.length && `${out.length} bin di luar area Anda dilewati: ${cut(out)}`,
          dup.size && `${dup.size} bin ganda di file, dipakai satu kali`,
        ].filter(Boolean);
        $("tkRes").innerHTML = warn.length ? `<div class="note">${warn.map(esc).join("<br>")}</div>` : "";
        if (!add.length) return toast("Tidak ada tugas yang bisa ditambahkan.");
        const noOwner = add.filter((a) => !a.u).length,
          per = {};
        add.forEach((a) => {
          const u = users.find((z) => z.id === a.u);
          per[u ? u.name : "(belum ada petugas)"] = (per[u ? u.name : "(belum ada petugas)"] || 0) + 1;
        });
        const ov = add.filter((a) => tasks[a.bin]).length;
        const msg = Object.entries(per).map(([n, c]) => n + ": " + c + " bin").join(", ") + "." + (ov ? " " + ov + " bin sudah punya tugas dan akan diperbarui." : "") + (noOwner ? " " + noOwner + " bin belum ada pemilik area." : "");
        if (!(await ask("Tambah " + add.length + " tugas?", msg, "Tambah tugas"))) return;
        const at = nowIso();
        add.forEach((a) => (tasks[a.bin] = { u: a.u, by: curName() || "Admin", at }));
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast(add.length + " tugas ditambahkan");
      }
      $("tkFile").onchange = async () => {
        const f = $("tkFile").files[0];
        if (!f) return;
        if (!curU && !(await leadAuth())) {
          $("tkFile").value = "";
          return;
        }
        const rd = new FileReader(),
          x = /\.xlsx?$/i.test(f.name);
        rd.onload = async () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV lalu upload.");
              const wb = XLSX.read(rd.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" });
            } else rows = parseCSV(String(rd.result).replace(/^﻿/, ""));
            await tkIngest(rows);
          } catch (e) {
            toast("Gagal membaca file: " + e.message);
          }
          $("tkFile").value = "";
        };
        x ? rd.readAsArrayBuffer(f) : rd.readAsText(f);
      };
      $("tkTpl").onclick = () => {
        const nm = users[0] ? users[0].name : "Nama petugas";
        csvOut([["Bin", "Petugas"], ...DATA.slice(0, 3).map((x, i) => [x.bin, i < 2 ? nm : ""])], "contoh_tugas_bin.csv");
      };
      $("tkGo").onclick = () => {
        lf = "task";
        go("so");
        renderBins();
      };
      $("tkUn").onclick = async (e) => {
        if (!e.target.closest("[data-tk=auto]")) return;
        if (!(await leadAuth())) return;
        const rr = {};
        let n = 0;
        Object.keys(tasks).forEach((k) => {
          const t = tasks[k];
          if (!t || tkOwned(t)) return;
          const id = k.replace(/^(AG|DC)\|/, ""), x = DATA.find((d) => (k.startsWith("DC|") ? d.item === id : d.bin === id));
          const u = x ? tkPick(x.area, rr) : "";
          if (u) {
            t.u = u;
            n++;
          }
        });
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast(n ? n + " tugas dibagikan" : "Belum ada petugas yang memegang area itu");
      };
      $("tkClear").onclick = async () => {
        const me = curUser();
        if (!me && !(await leadAuth())) return;
        const mine = tkMine(), oth = Object.keys(tasks).filter((k) => /^(AG|DC)\|/.test(k) && (!me || tasks[k].u === me.id));
        if (!mine.length && !oth.length) return;
        if (!(await ask(me ? "Hapus tugas saya?" : "Hapus semua tugas?", mine.length + oth.length + " tugas dihapus (bin, aging, DC). Hasil pemeriksaan tidak ikut terhapus.", "Hapus", true))) return;
        mine.forEach((x) => delete tasks[x.bin]);
        oth.forEach((k) => delete tasks[k]);
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast("Tugas dihapus");
      };
