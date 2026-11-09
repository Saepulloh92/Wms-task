/* Cek Kesesuaian
   asal: index-fixd.html baris 3570-3792 */
      /* ---------- cek kesesuaian ---------- */
      let dest = ld("warehouse_so_dest_v1", {});
      const KN = {
        "Salah rak": "Barang di rak yang salah",
        "Master salah": "Rak diisi item yang salah (stok 0)",
        "Stok minus": "Stok minus",
        "Free stock salah": "Stok bebas tidak cocok",
        "Booking > onhand": "Booking melebihi stok",
        "Stok kecil": "Stok tinggal sedikit",
        "Bin kosong": "Rak kosong",
      };
      function kesIssues() {
        const fa = $("kfa").value.trim().toUpperCase(),
          fb = $("kfb").value.trim().toUpperCase(),
          low = Number($("klow").value) || 0,
          out = [];
        DATA.forEach((s) => {
          const suf = s.bin.trim().slice(-1).toUpperCase(),
            fam = suf === "A" ? fa : suf === "B" ? fb : "",
            P = (lv, t, m) => out.push({ s, lv, t, m });
          if (fam && !s.item.toUpperCase().includes(fam)) {
            s.onhand > 0
              ? P("bad", "Salah rak", "Rak berakhiran " + suf + " khusus " + fam + ". Isinya " + s.item + ".")
              : P(
                  "warn",
                  "Master salah",
                  "Rak berakhiran " + suf + " khusus " + fam + ", terpasang " + s.item + ".",
                );
          }
          if (s.onhand < 0) P("bad", "Stok minus", "Stok tercatat " + s.onhand + ".");
          const calc = s.onhand - (s.bookingSusun || 0) - (s.bookingMuat || 0);
          if (calc !== s.freeStock)
            P("bad", "Free stock salah", "Seharusnya " + calc + ", tercatat " + s.freeStock + ".");
          if ((s.bookingSusun || 0) + (s.bookingMuat || 0) > s.onhand)
            P("bad", "Booking > onhand", "Booking melebihi stok " + s.onhand + ".");
          if (s.onhand > 0 && s.onhand <= low)
            P("warn", "Stok kecil", "Sisa " + s.onhand + ". Cek langsung di rak.");
          if (s.onhand === 0) P("info", "Bin kosong", "Belum ada stok.");
        });
        const seen = {};
        DATA.forEach((s) => (seen[s.bin] = (seen[s.bin] || 0) + 1));
        Object.entries(seen).forEach(([b, c]) => {
          if (c > 1)
            out.push({
              s: { bin: b, item: "", onhand: 0 },
              lv: "bad",
              t: "Rak ganda",
              m: c + " baris untuk rak yang sama.",
            });
        });
        return out;
      }
      function kesAdj() {
        const rows = [];
        kesIssues()
          .filter((i) => i.t === "Salah rak" && !counts[i.s.bin])
          .forEach((i) => {
            const s = i.s;
            rows.push({
              rak: s.bin,
              kode: s.kode,
              nama: s.item,
              qty: -s.onhand,
              ket: "Salah rak, keluarkan dari " + rakFmt(s.bin),
            });
            const d = (dest[s.bin] || "").trim();
            if (d)
              rows.push({
                rak: d,
                kode: s.kode,
                nama: s.item,
                qty: s.onhand,
                ket: "Pindah dari " + rakFmt(s.bin),
              });
          });
        return rows;
      }
      function kCard(i) {
        const s = i.s,
          t = i.lv === "bad" ? "red" : i.lv === "warn" ? "amber" : "";
        let h = `<div class="card"><div class="r"><b class="big">${esc(s.bin)}</b><span class="pill ${t}">${KN[i.t] || i.t}</span></div>`;
        if (s.item)
          h += `<div class="m">${esc(s.item)}</div><div class="m">${esc(s.kode || "")} · stok ${fmt(s.onhand)}</div>`;
        h += `<div class="m">${esc(i.m)}</div>`;
        if (i.t === "Salah rak") {
          const sk = !!counts[s.bin];
          h += sk
            ? '<div class="m">Sudah diperiksa di SO, adjust memakai hasil SO.</div>'
            : `<div class="r"><span class="m">Adjust</span><b class="big neg">-${fmt(s.onhand)}</b></div><label>Dipindah ke rak mana? (boleh dikosongkan)</label><input class="kd" aria-label="Dipindah ke rak mana" data-b="${esc(s.bin)}" value="${esc(dest[s.bin] || "")}" placeholder="contoh: A1-05A" autocapitalize="characters">`;
        }
        return h + "</div>";
      }
      const binCmp = (a, b) => String(a).localeCompare(String(b), "id", { numeric: true });
      let kF = "all";
      const K_KESH = "warehouse_so_kes_hist_v1";
      let kesHist = ld(K_KESH, []), kesT = 0;
      if (!Array.isArray(kesHist)) kesHist = [];
      const kesTgl = (t) => new Date(t + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      function renderKesHist() {
        const el = $("kHist");
        if (!el) return;
        el.innerHTML = kesHist.length
          ? kesHist.map((h, i) => `<div class="card"><div class="r"><b class="big">${esc(kesTgl(h.tgl))}</b><span class="pill green">Tersimpan</span></div><div class="m">${fmt(h.n)} rak · perlu adjust ${fmt(h.a)} · perlu dicek ${fmt(h.b)} · kosong ${fmt(h.c)}</div><div class="m">${esc(new Date(h.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))}${h.by ? " oleh " + esc(h.by) : ""}</div><details><summary>Lihat teks laporan</summary><div><pre class="rep">${esc(h.text)}</pre></div></details><div class="acts"><button class="btn sec sm inl" data-kc="${i}" type="button">Salin</button><button class="btn dng sm inl" data-kd="${i}" type="button">Hapus</button></div></div>`).join("")
          : '<div class="empty">Belum ada laporan tersimpan.</div>';
      }
      // per area: [total rak, rak sesuai]; "sesuai" = definisi yang sama dengan kartu "Sesuai" di menu Cek Kesesuaian
      function kesAreas(I) {
        const bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)), ar = {};
        DATA.forEach((s) => {
          const a = String(s.area || "?"), o = ar[a] || (ar[a] = [0, 0]);
          o[0]++;
          if (!bad.has(s.bin)) o[1]++;
        });
        return ar;
      }
      function kesAuto() {
        if (!DATA.length) return;
        const { I, A, B, C } = kesGroups(), text = kText(false), tgl = new Date().toISOString().slice(0, 10), i = kesHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && kesHist[i].text === text && kesHist[i].ar) return;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), n: DATA.length, a: A.length, b: B.length, c: C.length, ar: kesAreas(I), text };
        if (i >= 0) kesHist[i] = ent; else kesHist.push(ent);
        kesHist.sort((x, y) => y.tgl.localeCompare(x.tgl));
        kesHist = kesHist.slice(0, 60);
        sv(K_KESH, kesHist);
        renderKesHist();
      }
      $("kHist").onclick = async (e) => {
        const c = e.target.closest("[data-kc]"), d = e.target.closest("[data-kd]");
        if (c) {
          const h = kesHist[Number(c.dataset.kc)];
          if (!h) return;
          try { await navigator.clipboard.writeText(h.text); toast("Tersalin. Tempel di WhatsApp."); } catch (x) { toast("Gagal menyalin. Buka Lihat teks laporan lalu salin manual."); }
        } else if (d) {
          const h = kesHist[Number(d.dataset.kd)];
          if (!h || !(await ask("Hapus laporan " + h.tgl + "?", "Laporan tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          kesHist.splice(Number(d.dataset.kd), 1);
          sv(K_KESH, kesHist);
          renderKesHist();
        }
      };
      const KS_LBL = { bad: "Perlu adjust / salah", warn: "Perlu dicek", info: "Rak kosong" };
      function kesGroups() {
        const I = kesIssues().sort((x, y) => binCmp(x.s.bin, y.s.bin) || binCmp(x.t, y.t));
        const A = I.filter((i) => i.t === "Salah rak"),
          B = I.filter((i) => i.lv !== "info" && i.t !== "Salah rak" && !A.some((a) => a.s.bin === i.s.bin)),
          C = I.filter((i) => i.lv === "info");
        return { I, A, B, C };
      }
      function kTable(rows) {
        return `<div class="mtw"><table class="mtb kt"><thead><tr><th>Bin</th><th>Stok</th><th>Masalah</th><th>Item / keterangan</th></tr></thead><tbody>${rows
          .map((i) => `<tr><td class="id">${esc(i.s.bin)}</td><td>${fmt(i.s.onhand)}</td><td class="tx"><span class="pill ${i.lv === "bad" ? "red" : i.lv === "warn" ? "amber" : ""}">${esc(KN[i.t] || i.t)}</span></td><td class="tx">${i.s.item ? szHtml(i.s.item) + "<br>" : ""}<span class="fine">${esc(i.m)}</span></td></tr>`)
          .join("")}</tbody></table></div>`;
      }
      function renderKes() {
        const { I, A, B, C } = kesGroups();
        const bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)).size,
          ok = Math.max(0, DATA.length - bad);
        $("kVerdict").innerHTML = !DATA.length
          ? '<div class="empty">Belum ada data WMS.</div>'
          : `<div class="stats"><div class="stat"><small>Rak dicek</small><strong>${fmt(DATA.length)}</strong></div><div class="stat"><small>Sesuai</small><strong style="color:var(--green)">${fmt(ok)}</strong></div><div class="stat"><small>Perlu adjust</small><strong style="color:${A.length ? "var(--red)" : "inherit"}">${A.length}</strong></div><div class="stat"><small>Perlu dicek</small><strong style="color:${B.length ? "var(--amber)" : "inherit"}">${B.length}</strong></div></div>` +
            (!A.length && !B.length ? `<div class="note ok">Semua rak sesuai. ${C.length ? C.length + " rak kosong (info)." : ""}</div>` : "");
        $("kChips").innerHTML = DATA.length ? chipsHtml(kF, [["all", "Semua", A.length + B.length + C.length], ["adj", "Perlu adjust", A.length], ["cek", "Perlu dicek", B.length], ["kosong", "Kosong", C.length]]) : "";
        const show = (k) => kF === "all" || kF === k;
        let l = "";
        if (A.length && show("adj")) {
          l += `<h3 class="sec" style="color:var(--red)">Perlu adjust (${A.length})</h3>` + kTable(A);
          const open = A.filter((i) => !counts[i.s.bin]);
          if (open.length)
            l += '<h3 class="sec">Rak tujuan (boleh dikosongkan)</h3>' + open.map((i) => `<div class="card"><div class="r"><b class="id">${esc(i.s.bin)}</b><span class="m">adjust <b class="neg">-${fmt(i.s.onhand)}</b></span></div><input class="kd" aria-label="Dipindah ke rak mana untuk ${esc(i.s.bin)}" data-b="${esc(i.s.bin)}" value="${esc(dest[i.s.bin] || "")}" placeholder="contoh: A1-05A" autocapitalize="characters"></div>`).join("");
          else l += '<p class="fine">Semua bin salah rak sudah diperiksa di SO, adjust memakai hasil SO.</p>';
        }
        if (B.length && show("cek")) l += `<h3 class="sec" style="color:var(--amber)">Perlu dicek di lapangan (${B.length})</h3>` + kTable(B);
        if (C.length && show("kosong")) l += `<h3 class="sec">Rak kosong (${C.length})</h3><p class="fine">${C.map((i) => esc(i.s.bin)).join(" · ")}</p>`;
        if (DATA.length && !l) l = '<div class="empty">Tidak ada temuan di filter ini.</div>';
        $("kList").innerHTML = l;
        $("kCopy").disabled = !DATA.length;
        renderKesHist();
        clearTimeout(kesT);
        kesT = setTimeout(kesAuto, 1200);
        document.querySelectorAll(".kd").forEach(
          (e) =>
            (e.onchange = () => {
              dest[e.dataset.b] = e.value.trim();
              sv("warehouse_so_dest_v1", dest);
              metrics();
              toast("Rak tujuan disimpan");
            }),
        );
      }
      function kText(forTg) {
        const E = (x) => (forTg ? md(x) : String(x ?? "")),
          { I, A, B, C } = kesGroups(),
          bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)).size,
          F = "```",
          row = (i) => String(i.s.bin).slice(0, 9).padEnd(9) + String(fmt(i.s.onhand)).padStart(7) + "  " + (KN[i.t] || i.t),
          blk = (t, arr) => (arr.length ? `\n*${t} (${arr.length})*\n${F}\nBIN          STOK  MASALAH\n${arr.map(row).join("\n")}\n${F}\n` + arr.map((i) => (i.s.item ? `• ${E(i.s.bin)}: ${E(i.s.item)}` : "")).filter(Boolean).join("\n") + "\n" : "");
        return `*LAPORAN KESESUAIAN RAK*\n${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\n━━━━━━━━━━━━━━━━━━━━\nRak dicek ${DATA.length} | Sesuai ${Math.max(0, DATA.length - bad)}\nPerlu adjust ${A.length} | Perlu dicek ${B.length} | Kosong ${C.length}\n` +
          (A.length || B.length ? blk("PERLU ADJUST", A) + blk("PERLU DICEK DI LAPANGAN", B) : "\nSemua rak sesuai ✅\n") +
          (C.length ? `\n*Rak kosong:* ${C.map((i) => i.s.bin).join(", ")}\n` : "") +
          (curName() ? `\nDilaporkan oleh: ${E(curName())}` : "");
      }
      $("kChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) { kF = b.dataset.k; renderKes(); }
      };
      $("kCopy").onclick = () => {
        if (!DATA.length) return toast("Belum ada data WMS.");
        outText(kText(tgMode)).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser."),
        );
      };
      $("kCsv").onclick = () => {
        const { I } = kesGroups();
        csvOut([["Bin", "Area", "Kode", "Item", "Stok", "Masalah", "Keterangan", "Rak Tujuan"], ...I.map((i) => [i.s.bin, i.s.area || "", i.s.kode || "", i.s.item || "", i.s.onhand, KN[i.t] || i.t, i.m, dest[i.s.bin] || ""])], "laporan_kesesuaian_" + new Date().toISOString().slice(0, 10) + ".csv");
      };
      ["kfa", "kfb", "klow"].forEach(
        (i) =>
          ($(i).oninput = () => {
            renderKes();
            metrics();
          }),
      );
