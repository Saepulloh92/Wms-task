/* Laporan Muat
   asal: index-fixd.html baris 3793-4145 */
      /* ---------- laporan muat ---------- */
            const K_MUATS = "warehouse_so_muat_sum_v1";
      /* v22: laporan muat tersimpan otomatis + riwayat per tanggal */
      const K_MUATD = "warehouse_so_muat_data_v1", K_MUATH = "warehouse_so_muat_hist_v1";
      let muatHist = ld(K_MUATH, []), muT = 0;
      if (!Array.isArray(muatHist)) muatHist = [];
      const muSoon = () => {
        clearTimeout(muT);
        muT = setTimeout(muPersist, 600);
      };
      function muPersist() {
        if (!mRecs.length) return;
        const o = { name: $("mfn").textContent, tgl: $("mtgl").value, total: $("mtotal").value, tdk: $("mtdk").value, recs: mRecs.map((r) => [r.spm, r.nop ? 1 : 0, r.tgl, r.pic, r.cp ? 1 : 0]) };
        if (!sv(K_MUATD, o)) toast("Penyimpanan penuh: laporan muat tidak tersimpan permanen.");
      }
      function muRestore() {
        const o = ld(K_MUATD, null);
        if (!o || !Array.isArray(o.recs) || !o.recs.length) return;
        mRecs = o.recs.map((a) => ({ spm: String(a[0]), nop: !!a[1], tgl: a[2] || "", pic: a[3] || "(tanpa PIC)", cp: !!a[4] }));
        mDates = {};
        mRecs.forEach((x) => { if (x.tgl) mDates[x.tgl] = (mDates[x.tgl] || 0) + 1; });
        if (o.tgl) $("mtgl").value = o.tgl;
        $("mtotal").value = o.total || "";
        $("mtdk").value = o.tdk || "";
        $("mfn").textContent = o.name && o.name !== "belum ada file" ? o.name : "laporan tersimpan";
      }
      const muTgl = (t) => new Date(t + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const muNorm = (t) => String(t || "").replace(/_Update:.*_/, "").trim();
      let muAT = 0;
      function muAuto() {
        if (!mRecs.length) return;
        const tgl = $("mtgl").value || mISO(new Date()), text = $("mout").textContent, i = muatHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && muNorm(muatHist[i].text) === muNorm(text) && muatHist[i].rows) return;
        const m = ld(K_MUATS, null) || {};
        const ent = { tgl, at: new Date().toISOString(), by: curName(), dp: m.dp || 0, ni: m.ni || 0, total: m.total || 0, tdkN: m.tdkN || 0, masuk: m.masuk || 0, cpS: m.cpS || 0, ci: m.ci || 0, rows: muRows(), text };
        if (i >= 0) muatHist[i] = ent; else muatHist.push(ent);
        muatHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        muatHist = muatHist.slice(0, 60);
        sv(K_MUATH, muatHist);
        renderMuHist();
      }
      function renderMuHist() {
        const el = $("muHist");
        if (!el) return;
        el.innerHTML = muatHist.length
          ? histRows(muatHist, "mu", (h, i) =>
              histRow(
                esc(muTgl(h.tgl)),
                `${fmt(h.dp)} SPM · ${fmt(h.ni)} item · ${fmt(h.total)} mobil`,
                `<div class="m">Disimpan ${esc(new Date(h.at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))}${h.by ? " oleh " + esc(h.by) : ""}</div><pre class="rep">${esc(h.text)}</pre><div class="acts"><button class="btn sec sm inl" data-mc="${i}" type="button">Salin</button><button class="btn dng sm inl" data-md="${i}" type="button">Hapus</button></div>`,
              ),
            )
          : '<div class="empty">Belum ada laporan yang disimpan.</div>';
      }
      async function muSaveHist() {
        if (!mRecs.length) return toast("Belum ada laporan untuk disimpan."), false;
        const tgl = $("mtgl").value || mISO(new Date()),
          m = ld(K_MUATS, null) || {},
          i = muatHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && muNorm(muatHist[i].text) !== muNorm($("mout").textContent) && !(await ask("Ganti laporan tanggal ini?", "Sudah ada laporan tersimpan untuk " + muTgl(tgl) + ". Yang lama diganti dengan yang sekarang.", "Ganti"))) return false;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), dp: m.dp || 0, ni: m.ni || 0, total: m.total || 0, tdkN: m.tdkN || 0, masuk: m.masuk || 0, cpS: m.cpS || 0, ci: m.ci || 0, rows: muRows(), text: $("mout").textContent };
        if (i >= 0) muatHist[i] = ent;
        else muatHist.push(ent);
        muatHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        muatHist = muatHist.slice(0, 60);
        if (!sv(K_MUATH, muatHist)) return toast("Gagal menyimpan: penyimpanan penuh."), false;
        buzz(40);
        renderMuHist();
        return true;
      }
      let mRecs = [],
        mDates = {};
      const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        BLN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      const pad = (n, l = 2) => String(n).padStart(l, "0");
      const mpct = (a, b) => (b ? (a / b) * 100 : 0).toFixed(1).replace(".", ",") + "%";
      function mISO(v) {
        if (v instanceof Date && !isNaN(v))
          return v.getFullYear() + "-" + pad(v.getMonth() + 1) + "-" + pad(v.getDate());
        if (typeof v === "number") {
          const d = new Date(Math.round((v - 25569) * 864e5));
          return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
        }
        const s = String(v).trim(),
          m = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/);
        if (m) return m[3] + "-" + pad(m[2]) + "-" + pad(m[1]);
        const n = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        return n ? n[0] : "";
      }
      const mNum = (v) => {
        if (v === "" || v == null) return null;
        const n = typeof v === "number" ? v : Number(String(v).replace(/\./g, "").replace(",", "."));
        return isNaN(n) ? null : n;
      };
      const mTm = (v) => {
        if (v === "" || v == null) return "";
        if (v instanceof Date && !isNaN(v)) { const d = new Date(v.getTime() + 30000); return d.getHours() + ":" + pad(d.getMinutes()); }
        if (typeof v === "number" && v >= 0 && v < 1) { const m = Math.round(v * 1440); return Math.floor(m / 60) + ":" + pad(m % 60); }
        const m = String(v).match(/(\d{1,2}):(\d{2})/);
        return m ? Number(m[1]) + ":" + m[2] : String(v).trim();
      };
      // satu baris per SPM, untuk sheet 04.Proses Muat di Google Sheets
      function muRows() {
        const m = new Map();
        mRecs.forEach((r) => {
          let s = m.get(r.spm);
          if (!s) m.set(r.spm, (s = { spm: r.spm, np: "", pic: r.pic, n: 0, cp: 0, ship: "", qs: null, qm: null, mu: "", se: "", ck: "" }));
          s.n++;
          if (r.cp) s.cp++;
          if (!s.np && r.npl) s.np = r.npl;
          if (!s.ship && r.ship) s.ship = r.ship;
          if (!s.mu && r.mu) s.mu = r.mu;
          if (!s.se && r.se) s.se = r.se;
          if (!s.ck && r.ck) s.ck = r.ck;
          if (r.qs != null) s.qs = (s.qs || 0) + r.qs;
          if (r.qm != null) s.qm = (s.qm || 0) + r.qm;
        });
        return [...m.values()].map((s) => [s.spm, s.np, s.pic, s.n, s.cp, s.ship, s.qs, s.qm, s.mu, s.se, s.ck]);
      }
      function mParse(rows) {
        const h = rows.findIndex((r) => r.some((c) => String(c).trim().toLowerCase() === "no spm"));
        if (h < 0) throw new Error('Kolom "No SPM" tidak ditemukan.');
        const H = rows[h].map((c) => String(c).trim().toLowerCase()),
          ix = (n) => H.indexOf(n);
        const c = {
          spm: ix("no spm"),
          nop: ix("nopol"),
          tgl: ix("tgl muat"),
          pic: ix("pic muat"),
          rem: ix("remark muat"),
          ship: ix("ship to"),
          qs: ix("qty spm"),
          qm: ix("qty muat"),
          mu: ix("mulai muat"),
          se: ix("selesai muat"),
          ck: ix("pic check"),
        };
        if (c.pic < 0 || c.rem < 0) throw new Error("Kolom PIC Muat dan Remark Muat dibutuhkan.");
        const o = rows
          .slice(h + 1)
          .filter((r) => String(r[c.spm]).trim())
          .map((r) => ({
            spm: String(r[c.spm]).trim(),
            nop: c.nop >= 0 && String(r[c.nop]).trim() !== "",
            tgl: c.tgl >= 0 ? mISO(r[c.tgl]) : "",
            pic: String(r[c.pic]).trim() || "(tanpa PIC)",
            cp: /copy/i.test(String(r[c.rem])),
            npl: c.nop >= 0 ? String(r[c.nop]).trim() : "",
            ship: c.ship >= 0 ? String(r[c.ship]).trim() : "",
            qs: c.qs >= 0 ? mNum(r[c.qs]) : null,
            qm: c.qm >= 0 ? mNum(r[c.qm]) : null,
            mu: c.mu >= 0 ? mTm(r[c.mu]) : "",
            se: c.se >= 0 ? mTm(r[c.se]) : "",
            ck: c.ck >= 0 ? String(r[c.ck]).trim() : "",
          }));
        if (!o.length) throw new Error("Tidak ada baris data.");
        return o;
      }
      function mSet(rows) {
        mRecs = mParse(rows);
        mDates = {};
        mRecs.forEach((x) => {
          if (x.tgl) mDates[x.tgl] = (mDates[x.tgl] || 0) + 1;
        });
        const top = Object.entries(mDates).sort((a, b) => b[1] - a[1])[0];
        if (top) $("mtgl").value = top[0];
        mBuild();
      }
      function mBuild() {
        muSoon();
        const has = mRecs.length > 0,
          tb = document.querySelector('[data-tg="mcopy"]');
        $("mcopy").disabled = !has;
        $("muSave").disabled = !has;
        if (tb) tb.disabled = !has;
        if (!has) {
          $("mout").textContent = "Belum ada laporan. Pilih file laporan muat (Excel) di atas.";
          $("mkpi").innerHTML = "";
          $("mnotes").innerHTML = ld(K_MUATS, null)
            ? '<div class="note">Ringkasan laporan terakhir masih ada, tapi detail hilang karena halaman dimuat ulang. Upload ulang file laporan muat untuk melihat rincian per PIC.</div>'
            : "";
          return;
        }
        const spm = {};
        mRecs.forEach((r) => {
          const s = spm[r.spm] || (spm[r.spm] = { n: 0, cp: 0, nop: false });
          s.n++;
          if (r.cp) s.cp++;
          if (r.nop) s.nop = true;
        });
        const S = Object.values(spm),
          dp = S.length,
          tv = $("mtotal").value.trim(),
          total = tv !== "" ? Math.max(Number(tv) || 0, dp) : dp,
          tdkN = total - dp,
          masuk = S.filter((s) => s.nop).length;
        const all = $("mdefcp").value === "all",
          cpS = S.filter((s) => (all ? s.cp === s.n : s.cp > 0)).length,
          ni = mRecs.length,
          ci = mRecs.filter((r) => r.cp).length;
        const pic = {};
        mRecs.forEach((r) => {
          const p = pic[r.pic] || (pic[r.pic] = { spm: new Set(), ok: 0, cp: 0 });
          p.spm.add(r.spm);
          r.cp ? p.cp++ : p.ok++;
        });
        const P = Object.entries(pic)
          .map(([n, p]) => ({ n, spm: p.spm.size, ok: p.ok, cp: p.cp }))
          .sort((a, b) => b.spm - a.spm || b.ok - a.ok || a.n.localeCompare(b.n));
        const w = (l, v) => l.padEnd(27 - String(v).length) + v;
        const iso = $("mtgl").value,
          d = iso ? new Date(iso + "T00:00:00") : new Date(),
          tg = `${HARI[d.getDay()]}, ${d.getDate()} ${BLN[d.getMonth()]} ${d.getFullYear()}`;
        const n = new Date(),
          upd = `${pad(n.getDate())}-${pad(n.getMonth() + 1)}-${n.getFullYear()} ${pad(n.getHours())}:${pad(n.getMinutes())}`;
        {
          const isoD = $("mtgl").value || mISO(new Date()), sig = dp + "|" + ni + "|" + isoD + "|" + total, prevS = ld(K_MUATS, null);
          sv(K_MUATS, { sig, at: prevS && prevS.sig === sig ? prevS.at : Date.now(), tgl: isoD, dp, ni, total, tdkN, masuk, cpS, ci });
        }
        const tdk = $("mtdk")
          .value.split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        const D =
          tdkN > 0
            ? tdk.length
              ? tdk.map((x) => "• " + x).join("\n")
              : `${tdkN} mobil belum diproses (isi daftar di Pengaturan)`
            : "Semua mobil diproses WMS ✅";
        const B = "```";
        $("mout").textContent = `*LAPORAN HARIAN KONTROL MUAT WMS*
${$("mgudang").value}
Tanggal : ${tg}
━━━━━━━━━━━━━━━━━━━━
*A. PROSES WMS* (1 SPM = 1 mobil)
${B}
${w("Total mobil / SPM", total)}
${w("Diproses WMS", dp)}
${w("Tidak diproses WMS", tdkN)}
${w("Mobil masuk", masuk)}
${w("Masuk blm diproses", 0)}
---------------------------
${w("% Diproses WMS", mpct(dp, total))}
${w("% Tidak diproses", mpct(tdkN, total))}
${B}

*B. HASIL MUAT DI WMS*
${B}
SPM full OK           : ${dp - cpS}
SPM copy rekomendasi  : ${cpS}
% SPM copy rekom.     : ${mpct(cpS, dp)}
% SPM input aktual    : ${mpct(dp - cpS, dp)}
Item OK               : ${ni - ci}
Item copy rekomendasi : ${ci} (${mpct(ci, ni)})
${B}

*C. PER PIC MUAT*
${B}
PIC         SPM   OK  COPY
                     REKOM
--------------------------
${P.map((p) => p.n.slice(0, 10).padEnd(10) + String(p.spm).padStart(5) + String(p.ok).padStart(5) + String(p.cp).padStart(6)).join("\n")}
--------------------------
${"TOTAL".padEnd(10) + String(dp).padStart(5) + String(ni - ci).padStart(5) + String(ci).padStart(6)}
${B}
_OK & Copy Rekomendasi = jumlah item_

*D. TIDAK DIPROSES WMS (${tdkN} mobil)*
${D}
━━━━━━━━━━━━━━━━━━━━
Dilaporkan oleh: ${$("mpelapor").value}
_Update: ${upd}_`;
        $("mkpi").innerHTML = [
          ["SPM", dp, ""],
          ["Item muat", ni, ""],
          ["SPM copy rekom.", cpS + " (" + mpct(cpS, dp) + ")", cpS ? "var(--amber)" : ""],
          ["Item copy rekom.", ci + " (" + mpct(ci, ni) + ")", ci ? "var(--amber)" : ""],
        ]
          .map(
            ([l, v, c]) =>
              `<div class="stat"><small>${l}</small><strong style="${c ? "color:" + c : ""}">${v}</strong></div>`,
          )
          .join("");
        const nd = Object.keys(mDates).length,
          nt = [];
        if (nd > 1) nt.push(`File berisi ${nd} tanggal muat. Tanggal laporan memakai yang paling banyak.`);
        const top = P.slice().sort((a, b) => b.cp - a.cp)[0];
        if (top && ci && top.cp / ci >= 0.5)
          nt.push(`${top.n} menyumbang ${top.cp} dari ${ci} item copy rekomendasi.`);
        $("mnotes").innerHTML = nt.map((x) => `<div class="note">${esc(x)}</div>`).join("");
        clearTimeout(muAT);
        muAT = setTimeout(muAuto, 1200);
      }
      $("mcopy").onclick = () => {
        const t = $("mout").textContent;
        const fb = () => {
          const r = document.createRange();
          r.selectNodeContents($("mout"));
          const s = getSelection();
          s.removeAllRanges();
          s.addRange(r);
          toast("Teks dipilih. Salin manual.");
        };
        outText(t).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          fb,
        );
      };
      $("mf").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          try {
            if (!window.XLSX) throw new Error("Butuh internet untuk membaca Excel.");
            const wb = XLSX.read(rd.result, { type: "array", cellDates: true });
            mSet(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" }));
            $("mfn").textContent = f.name;
            $("mtotal").value = "";
            $("mtdk").value = "";
            toast("Laporan dibuat");
          } catch (x) {
            toast(x.message || "File tidak bisa dibaca");
          }
        };
        rd.readAsArrayBuffer(f);
      };
      ["mgudang", "mtgl", "mpelapor", "mtotal", "mdefcp", "mtdk"].forEach((i) => ($(i).oninput = mBuild));
      applyCfg();
      muRestore();
      renderMuHist();
      $("muSave").onclick = async () => {
        if (!mRecs.length) return toast("Belum ada file laporan muat.");
        if ((await muSaveHist()) !== true) return;
        const t = $("mout").textContent;
        await sendAll(t, t, true);
      };
      $("muHist").onclick = async (e) => {
        if (histMore(e, "mu", renderMuHist)) return;
        const c = e.target.closest("[data-mc]"), d = e.target.closest("[data-md]");
        if (c) {
          const h = muatHist[Number(c.dataset.mc)];
          if (!h) return;
          try { await navigator.clipboard.writeText(h.text); toast("Tersalin. Tempel di WhatsApp."); } catch (x) { toast("Gagal menyalin. Buka Lihat teks laporan lalu salin manual."); }
        } else if (d) {
          const h = muatHist[Number(d.dataset.md)];
          if (!h || !(await ask("Hapus laporan " + h.tgl + "?", "Laporan tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          muatHist.splice(Number(d.dataset.md), 1);
          sv(K_MUATH, muatHist);
          renderMuHist();
        }
      };
      mBuild();

      $("aTgl").value = new Date().toISOString().slice(0, 10);
