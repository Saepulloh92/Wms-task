/* DC Harian + pilih item DC
   asal: index-fixd.html baris 4656-5118 */
      /* ---------- DC harian ---------- */
      const K_D = "warehouse_dc_v1";
      let dc = ld(K_D, {}),
        dcF = "todo",
        dcList = [],
        dcCur = null,
        dcDirty = false,
        dcAdjSel = "",
        dcAdjAuto = true;
      function dcItems() {
        const m = new Map();
        DATA.forEach((x) => {
          const e = m.get(x.item) || { item: x.item, kode: x.kode, sys: 0, bins: [] };
          e.sys += Number(x.onhand) || 0;
          e.bins.push({ bin: x.bin, onhand: Number(x.onhand) || 0 });
          m.set(x.item, e);
        });
        return [...m.values()].sort((a, b) => a.item.localeCompare(b.item, "id", { numeric: true }));
      }
      const dcSysOf = (e) => (dc[e.item] && dc[e.item].sys != null ? dc[e.item].sys : e.sys);
      const dcFis = (rows) => rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
      function dcSt(e) {
        const r = dc[e.item];
        if (!r) return "todo";
        if (!r.done) return "draft";
        return dcFis(r.rows) === dcSysOf(e) ? "ok" : "bad";
      }
      const dcInF = (e, f) => f === "all" || (f === "task" ? tkDcOpen(e.item) : f === "todo" ? ["todo", "draft"].includes(dcSt(e)) : dcSt(e) === f);
      function renderDc() {
        taskBadges();
        const all = dcScope(),
          q = $("dcQ").value.toLowerCase().trim().split(/\s+/).filter(Boolean),
          n = (f) => all.filter((e) => dcInF(e, f)).length,
          checked = n("ok") + n("bad");
    $("dcPickBtn").textContent = "Pilih item DC (" + all.length + ")";
        $("dcStats").innerHTML = [
          ["Item dicek", checked + "/" + all.length, ""],
          ["Belum dicek", n("todo"), n("todo") ? "var(--amber)" : "var(--green)"],
          ["Sesuai", n("ok"), "var(--green)"],
          ["Selisih", n("bad"), n("bad") ? "var(--red)" : ""],
        ]
          .map(([l, v, c]) => `<div class="stat"><small>${l}</small><strong style="${c ? "color:" + c : ""}">${v}</strong></div>`)
          .join("");
        $("dcChips").innerHTML = chipsHtml(dcF, [
          ...(all.some((e) => tasks["DC|" + e.item]) ? [["task", "Tugas", n("task")]] : []),
          ["todo", "Belum", n("todo")],
          ["bad", "Selisih", n("bad")],
          ["ok", "Sesuai", n("ok")],
          ["all", "Semua", all.length],
        ]);
        dcList = all.filter((e) => dcInF(e, dcF) && q.every((t) => (e.item + " " + e.kode).toLowerCase().includes(t)));
        $("dcList").innerHTML = dcList.length
          ? dcList
              .map((e, i) => {
                const s = dcSt(e),
                  r = dc[e.item],
                  f = r ? dcFis(r.rows) : 0,
                  pill =
                    s === "ok"
                      ? '<span class="pill green">Sesuai</span>'
                      : s === "bad"
                        ? `<span class="pill amber">Selisih ${signed(f - dcSysOf(e))}</span>`
                        : `<span class="pill">${s === "draft" ? "Draft" : "Belum"}</span>`;
                return `<button class="bin ${s === "ok" ? "done-ok" : s === "bad" ? "done-bad" : ""}" data-i="${i}"><b>${szHtml(e.item)}</b><span class="it">${esc(e.kode)} · Sistem ${fmt(dcSysOf(e))}</span><span class="q">${r ? fmt(f) : "–"}<small>Fisik</small></span><span>${pill}</span></button>`;
              })
              .join("")
          : `<div class="empty">${all.length ? (dcF === "todo" && !q.length ? "Semua item sudah dicek." : "Tidak ada item di filter ini.") : DATA.length ? "Belum ada item yang dipilih. Ketuk Pilih item DC di atas." : "Belum ada data WMS."}</div>`;
      }
      const dcRead = () =>
        [...document.querySelectorAll("#dcRows .dr")]
          .map((r) => ({ rak: r.querySelector(".dr-rak").value.trim().toUpperCase(), qty: r.querySelector(".dr-qty").value.trim() }))
          .filter((r) => r.rak || r.qty !== "");
      function dcAddRow(rak = "", qty = "", focus = "") {
        const d = document.createElement("div");
        d.className = "dr";
        d.innerHTML = `<input class="dr-rak" list="dcRakList" placeholder="Rak, mis. G-41" autocapitalize="characters" autocomplete="off" aria-label="Rak" value="${esc(rak)}"><input class="dr-qty" type="number" inputmode="numeric" min="0" step="1" placeholder="Qty" aria-label="Qty" value="${esc(qty)}"><button class="rm" aria-label="Hapus baris">×</button><div class="dr-h"></div>`;
        d.querySelector(".rm").onclick = () => {
          d.remove();
          dcDirty = true;
          dcUpd();
        };
        d.querySelector(".dr-rak").onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            d.querySelector(".dr-qty").focus();
          }
        };
        d.querySelector(".dr-qty").onkeydown = (e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          if (d.querySelector(".dr-qty").value === "") return;
          if (d.nextElementSibling) d.nextElementSibling.querySelector(".dr-rak").focus();
          else dcAddRow("", "", "rak");
        };
        $("dcRows").appendChild(d);
        if (focus) d.querySelector(focus === "qty" ? ".dr-qty" : ".dr-rak").focus();
        dcUpd();
      }
      function dcUpd() {
        const rows = dcRead(),
          fis = dcFis(rows),
          sv0 = $("dcSys").value.trim(),
          sys = sv0 === "" ? null : Number(sv0),
          d = sys == null ? null : fis - sys,
          mine = new Set(rows.map((r) => rakFmt(r.rak)));
        $("dcTot").innerHTML = `<div><small>Fisik</small><strong>${fmt(fis)}</strong></div><div><small>Sistem</small><strong>${sys == null ? "–" : fmt(sys)}</strong></div><div class="${d == null ? "" : d === 0 ? "pos" : "neg"}"><small>Selisih</small><strong>${d == null ? "–" : d === 0 ? "Sesuai" : signed(d)}</strong></div>`;
        document.querySelectorAll("#dcRows .dr").forEach((r) => {
          const rak = r.querySelector(".dr-rak").value.trim(),
            q = r.querySelector(".dr-qty").value.trim(),
            h = r.querySelector(".dr-h"),
            b = rak && dcCur.bins.find((x) => rakFmt(x.bin) === rakFmt(rak));
          h.className = "dr-h" + (rak && !b ? " warn" : "");
          h.textContent = !rak ? "" : b ? `Di WMS: ${fmt(b.onhand)}${q !== "" ? " · selisih " + signed(Number(q) - b.onhand) : ""}` : "Rak ini belum tercatat di WMS untuk item ini. Cek penulisannya.";
        });
        $("dcSug").innerHTML = dcCur.bins.length
          ? dcCur.bins.map((b) => `<button class="chip ${mine.has(rakFmt(b.bin)) ? "on" : ""}" data-r="${esc(b.bin)}">${esc(b.bin)} · ${fmt(b.onhand)}</button>`).join("")
          : '<div class="fine">Item ini belum punya rak di WMS.</div>';
        const miss = dcCur.bins.filter((b) => b.onhand > 0 && !mine.has(rakFmt(b.bin)));
        $("dcMiss").textContent = rows.length && miss.length ? "Belum diisi (stok WMS ada): " + miss.slice(0, 6).map((b) => b.bin + " (" + fmt(b.onhand) + ")").join(", ") + (miss.length > 6 ? " dan " + (miss.length - 6) + " lagi" : "") : "";
        const list = [...new Set(rows.filter((r) => r.rak).map((r) => r.rak))];
        $("dcAdjWrap").hidden = !(d && list.length);
        $("dcAdjRak").innerHTML = list.map((r) => `<option>${esc(r)}</option>`).join("");
        let pick = list[0] || "",
          best = -1;
        list.forEach((rk) => {
          const row = rows.find((x) => x.rak === rk),
            b = dcCur.bins.find((x) => rakFmt(x.bin) === rakFmt(rk)),
            gap = Math.abs((Number(row.qty) || 0) - (b ? b.onhand : 0));
          if (gap > best) {
            best = gap;
            pick = rk;
          }
        });
        $("dcAdjRak").value = !dcAdjAuto && list.includes(dcAdjSel) ? dcAdjSel : pick;
      }
      function dcOpen(e) {
        dcCur = e;
        const r = dc[e.item];
        $("dcName").textContent = e.item;
        $("dcKode").textContent = "Kode " + e.kode;
        $("dcSys").value = dcSysOf(e);
        $("dcSysHint").textContent = "Diambil dari total stok di data WMS (" + fmt(e.sys) + "). Ubah jika angka QAD berbeda.";
        $("dcRakList").innerHTML = [...new Set(DATA.map((x) => x.bin))].map((b) => `<option value="${esc(b)}">`).join("");
        $("dcRows").innerHTML = "";
        dcAdjSel = (r && r.adj) || "";
        dcAdjAuto = !dcAdjSel;
        $("dcErr").textContent = "";
        clearInvalid($("dcSheet"));
        (r && r.rows.length ? r.rows : [{ rak: "", qty: "" }]).forEach((x) => dcAddRow(x.rak, x.qty));
        dcDirty = false;
        wakeOn();
        $("dcSheet").hidden = false;
        document.body.style.overflow = "hidden";
        dcUpd();
        $("dcSheet").querySelector(".sh-body").scrollTop = 0;
      }
      function dcHide() {
        $("dcSheet").hidden = true;
        if ($("sheet").hidden) wakeOff();
        document.body.style.overflow = "";
        renderDc();
      }
      async function dcClose() {
        if (dcDirty && !(await ask("Buang catatan ini?", "Hasil hitung yang belum disimpan akan hilang.", "Buang", true))) return;
        dcHide();
      }
      async function dcSave(done) {
        const rows = dcRead(),
          sysT = $("dcSys").value.trim(),
          err = (m, el) => {
            clearInvalid($("dcSheet"));
            $("dcErr").textContent = m;
            if (el) {
              markInvalid(el, "dcErr");
              el.focus();
            }
            return false;
          },
          dr = () => [...document.querySelectorAll("#dcRows .dr")].map((r) => ({ rk: r.querySelector(".dr-rak"), q: r.querySelector(".dr-qty") }));
        if (!rows.length) return err("Belum ada rak yang dicatat.");
        if (done) {
          if (rows.some((r) => !r.rak)) {
            const x = dr().find((y) => !y.rk.value.trim() && y.q.value.trim() !== "");
            return err("Ada qty yang belum ada nama raknya.", x && x.rk);
          }
          if (rows.some((r) => r.qty === "" || !Number.isInteger(Number(r.qty)) || Number(r.qty) < 0)) {
            const x = dr().find((y) => (y.rk.value.trim() || y.q.value.trim() !== "") && (y.q.value.trim() === "" || !Number.isInteger(Number(y.q.value.trim())) || Number(y.q.value.trim()) < 0));
            return err("Isi qty setiap rak dengan angka bulat 0 atau lebih.", x && x.q);
          }
          const seen = new Set();
          for (const r of rows) {
            const k = rakFmt(r.rak);
            if (seen.has(k)) {
              const x = dr().filter((y) => rakFmt(y.rk.value) === k)[1];
              return err("Rak " + r.rak + " terisi dua kali. Gabungkan jadi satu baris.", x && x.rk);
            }
            seen.add(k);
          }
          if (sysT === "" || !(Number(sysT) >= 0)) return err("Isi stok sistem (QAD) dulu.", $("dcSys"));
        }
        const sys = sysT !== "" && Number(sysT) >= 0 && Number(sysT) !== dcCur.sys ? Number(sysT) : null,
          fis = dcFis(rows),
          d = fis - (sys != null ? sys : dcCur.sys);
        if (done && d !== 0) {
          const have = new Set(rows.map((r) => rakFmt(r.rak))),
            miss = dcCur.bins.filter((b) => b.onhand > 0 && !have.has(rakFmt(b.bin)));
          if (miss.length && !(await ask("Ada rak yang belum diisi", miss.length + " rak di WMS masih punya stok tapi belum Anda catat. Selisih " + signed(d) + " bisa muncul karena itu. Tetap simpan sebagai selesai?", "Tetap simpan"))) return false;
        }
        const prevDc = dc[dcCur.item];
        dc[dcCur.item] = {
          rows: rows.map((r) => ({ rak: r.rak, qty: r.qty === "" ? "" : Number(r.qty) })),
          sys,
          done,
          by: curName(),
          at: new Date().toISOString(),
          adj: $("dcAdjRak").value || "",
        };
        dcUndoStack.push({ item: dcCur.item, prev: prevDc, saved: dc[dcCur.item] });
        if (dcUndoStack.length > 30) dcUndoStack.shift();
        if (!sv(K_D, dc)) {
          $("dcErr").textContent = "Gagal menyimpan ke perangkat (penyimpanan penuh atau diblokir). Data BELUM aman. Unduh cadangan di menu Data WMS, lalu coba lagi.";
          return false;
        }
        if (done) {
          buzz(d === 0 ? 40 : [70, 50, 70]);
          tgDc(dcCur.item, fis, sys != null ? sys : dcCur.sys, d, $("dcAdjRak").value);
        }
        dcHide();
        metrics();
        toast(done ? (d === 0 ? "Tersimpan: sesuai" : "Tersimpan: selisih " + signed(d)) : "Draft tersimpan");
        return true;
      }
      function dcAdj() {
        const out = [];
        dcItems().forEach((e) => {
          const r = dc[e.item];
          if (!r || !r.done) return;
          const d = dcFis(r.rows) - dcSysOf(e);
          if (d) out.push({ rak: r.adj || (r.rows[0] && r.rows[0].rak) || "", kode: e.kode, nama: e.item, qty: d, ket: "DC selisih total item" });
        });
        return out;
      }
      { let _t = 0; $("dcQ").oninput = () => { clearTimeout(_t); _t = setTimeout(renderDc, 150); }; }
      $("dcChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          dcF = b.dataset.k;
          renderDc();
        }
      };
      $("dcList").onclick = (e) => {
        const b = e.target.closest("[data-i]");
        if (b) dcOpen(dcList[Number(b.dataset.i)]);
      };
      $("dcX").onclick = dcClose;
      const dcUndoStack = [];
      function dcUndoTop() {
        while (dcUndoStack.length) {
          const e = dcUndoStack[dcUndoStack.length - 1];
          if (dc[e.item] === e.saved) return e;
          dcUndoStack.pop();
        }
        return null;
      }
      function dcUpdUndo() {
        const e = dcUndoTop();
        $("dcUndoBar").hidden = !e;
        if (e) $("dcUndoTxt").textContent = "Terakhir disimpan: " + e.item;
      }
      function dcUndo() {
        const e = dcUndoTop();
        if (!e) return;
        dcUndoStack.pop();
        if (e.prev) dc[e.item] = e.prev;
        else delete dc[e.item];
        sv(K_D, dc);
        renderDc();
        metrics();
        toast("Dibatalkan: " + e.item + (e.prev ? " (kembali ke isian sebelumnya)" : " (kembali ke Belum)"));
      }
      $("dcUndoBtn").onclick = dcUndo;
      $("dcAdd").onclick = () => {
        dcDirty = true;
        dcAddRow("", "", "rak");
      };
      $("dcRows").addEventListener("input", () => {
        dcDirty = true;
        dcUpd();
      });
      $("dcSheet").addEventListener("input", () => clearInvalid($("dcSheet")));
      $("dcSys").addEventListener("input", () => {
        dcDirty = true;
        dcUpd();
      });
      $("dcAdjRak").onchange = () => {
        dcAdjSel = $("dcAdjRak").value;
        dcAdjAuto = false;
        dcDirty = true;
      };
      $("dcSug").onclick = (e) => {
        const b = e.target.closest("[data-r]");
        if (!b) return;
        dcDirty = true;
        const hit = [...document.querySelectorAll("#dcRows .dr")].find((r) => rakFmt(r.querySelector(".dr-rak").value) === rakFmt(b.dataset.r));
        if (hit) return hit.querySelector(".dr-qty").focus();
        const empty = [...document.querySelectorAll("#dcRows .dr")].find((r) => !r.querySelector(".dr-rak").value.trim() && !r.querySelector(".dr-qty").value.trim());
        if (empty) {
          empty.querySelector(".dr-rak").value = b.dataset.r;
          empty.querySelector(".dr-qty").focus();
          dcUpd();
        } else dcAddRow(b.dataset.r, "", "qty");
      };
      $("dcDraft").onclick = () => dcSave(false);
      $("dcDone").onclick = () => dcSave(true);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("dcSheet").hidden) dcClose();
      });
      $("dcCsv").onclick = () => {
        const label = { todo: "Belum dicek", draft: "Draft", ok: "Sesuai", bad: "Selisih" };
        csvOut(
          [
            ["Item", "Kode Item", "Stok Sistem", "Fisik", "Selisih", "Status", "Rak Adjust", "Petugas", "Waktu", "Detail Rak"],
            ...dcScope().map((e) => {
              const r = dc[e.item],
                s = dcSt(e),
                f = r ? dcFis(r.rows) : "";
              return [e.item, e.kode, dcSysOf(e), f, r ? f - dcSysOf(e) : "", label[s], r && s === "bad" ? r.adj || "" : "", r ? r.by || "" : "", r ? r.at : "", r ? r.rows.map((x) => x.rak + "=" + x.qty).join("; ") : ""];
            }),
          ],
          "rekap_dc.csv",
        );
        toast("Rekap DC diunduh");
      };
      async function sendAll(copyText, tgText, saved) {
        const parts = [];
        if (saved) parts.push("Tersimpan");
        let ok = false;
        try { await navigator.clipboard.writeText(copyText); ok = true; } catch (e) {
          try {
            const a = document.createElement("textarea");
            a.value = copyText;
            document.body.appendChild(a);
            a.select();
            ok = document.execCommand("copy");
            a.remove();
          } catch (_) {}
        }
        parts.push(ok ? "Tersalin" : "Gagal menyalin");
        if (tgReady()) { tgSend(tgText); parts.push("masuk antrean Telegram"); } else parts.push("Telegram belum diatur");
        toast(parts.join(" · "));
      }
      function dcText(forTg) {
        const E = (x) => (forTg ? md(x) : x),
          all = dcScope(),
          g = (s) => all.filter((e) => dcSt(e) === s),
          todo = g("todo").concat(g("draft")),
          line = (e) => {
            const f = dcFis(dc[e.item].rows),
              s = dcSysOf(e);
            const rk = dc[e.item].rows.filter((x) => String(x.rak || "").trim() || Number(x.qty)),
              adj = dc[e.item].adj ? `\n   ↳ Rak adjust: ${E(rakFmt(dc[e.item].adj))}` : "";
            return `• ${E(e.item)}: ${signed(f - s)} (fisik ${fmt(f)}, sistem ${fmt(s)})` + (rk.length ? "\n" + rk.map((x) => `   - ${E(rakFmt(x.rak)) || "(tanpa rak)"}: ${fmt(Number(x.qty) || 0)}`).join("\n") : "") + adj;
          },
          okLine = (e) => {
            const rk = dc[e.item].rows.filter((x) => String(x.rak || "").trim() || Number(x.qty));
            return `• ${E(e.item)}: ${fmt(dcFis(dc[e.item].rows))}` + (rk.length ? " (" + rk.map((x) => `${E(rakFmt(x.rak)) || "?"}=${fmt(Number(x.qty) || 0)}`).join(", ") + ")" : "");
          },
          t =
            `*DC HARIAN*\n${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\n━━━━━━━━━━━━━━━━━━━━\nDicek ${all.length - todo.length} dari ${all.length} item\nSesuai ${g("ok").length} | Selisih ${g("bad").length} | Belum ${todo.length}\n` +
            (g("bad").length ? `\n*Selisih*\n${g("bad").map(line).join("\n")}\n` : "") +
            (g("ok").length ? `\n*Sesuai (per bin)*\n${g("ok").map(okLine).join("\n")}\n` : "") +
            (todo.length ? `\n*Belum dicek*\n${todo.map((e) => "• " + e.item).join("\n")}\n` : "") +
            (curName() ? `\nDilaporkan oleh: ${curName()}` : "");
        return t;
      }
      $("dcSend").onclick = () => {
        if (!dcScope().length) return toast("Belum ada item DC.");
        sendAll(dcText(false), dcText(true), false);
      };
      $("dcCopy").onclick = () => {
        const t = dcText(tgMode);
        outText(t).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
        );
      };
      $("dcReset").onclick = async () => {
        if (!(await leadAuth())) return;
        if (await ask("Mulai DC baru?", "Hasil DC dan daftar item yang dipilih dihapus. Unduh rekap dulu jika masih perlu.", "Hapus dan mulai baru", true)) {
          dc = {};
          dcPick = {};
          sv(K_D, dc);
          sv(K_DP, dcPick);
          renderDc();
          metrics();
          toast("DC baru dimulai");
        }
      };

      /* ---------- pilih item DC ---------- */
      const K_DP = "warehouse_dc_pick_v1";
      let dcPick = ld(K_DP, {}),
        pkRows = [];
      const dcScope = () => dcItems().filter((e) => dcPick[e.item] || dc[e.item]);
      function renderPick() {
        const all = dcItems(),
          q = $("pkQ").value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        pkRows = all.filter((e) => q.every((t) => (e.item + " " + e.kode).toLowerCase().includes(t)));
        const on = all.filter((e) => dcPick[e.item] || dc[e.item]).length;
        $("pkCount").textContent = on + " dipilih dari " + all.length + " item";
        $("pkList").innerHTML = pkRows.length
          ? pkRows
              .map((e, i) => {
                const lock = !!dc[e.item],
                  sel = dcPick[e.item] || lock;
                return `<button class="pk ${sel ? "on" : ""}" data-n="${i}"><span class="ck">${sel ? "✓" : ""}</span><span><b>${esc(e.item)}</b><small>${esc(e.kode)} · Sistem ${fmt(e.sys)}${lock ? " · sudah dicek" : ""}</small></span></button>`;
              })
              .join("")
          : '<div class="empty">Item tidak ditemukan.</div>';
      }
      const pkSave = () => {
        sv(K_DP, dcPick);
        renderPick();
      };
      $("dcPickBtn").onclick = () => {
        $("pkQ").value = "";
        renderPick();
        $("dcPickSheet").hidden = false;
        document.body.style.overflow = "hidden";
      };
      function pkClose() {
        $("dcPickSheet").hidden = true;
        document.body.style.overflow = "";
        renderDc();
      }
      $("pkX").onclick = $("pkOk").onclick = pkClose;
      $("pkQ").oninput = renderPick;
      $("pkList").onclick = (e) => {
        const b = e.target.closest("[data-n]");
        if (!b) return;
        const it = pkRows[Number(b.dataset.n)];
        if (dc[it.item]) return toast("Item ini sudah dicek, tidak bisa dilepas");
        if (dcPick[it.item]) delete dcPick[it.item];
        else dcPick[it.item] = true;
        pkSave();
      };
      $("pkAll").onclick = () => {
        pkRows.forEach((e) => (dcPick[e.item] = true));
        pkSave();
      };
      $("pkNone").onclick = () => {
        pkRows.forEach((e) => {
          if (!dc[e.item]) delete dcPick[e.item];
        });
        pkSave();
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("dcPickSheet").hidden) pkClose();
      });

      $("qty").addEventListener("focus", (e) => e.target.select());
      /* ---- v4: perilaku tambahan ---- */
      document.querySelectorAll("#tabs [data-v]").forEach((b) => (b.onclick = () => nav(b.dataset.v)));
      $("tMenu").onclick = () => side(true);

