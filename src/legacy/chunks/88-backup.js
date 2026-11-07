/* Cadangan & peringatan penyimpanan
   asal: index-fixd.html baris 5747-5918 */
      /* ---------- cadangan & peringatan penyimpanan ---------- */
      const ST_CAP = 5000000; // perkiraan batas localStorage (karakter)
      let stC = { t: 0, ok: true, used: 0 };
      function stCheck(force) {
        const now = Date.now();
        if (!force && now - stC.t < 60000) return stC;
        let used = 0, ok = true;
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            used += k.length + (localStorage.getItem(k) || "").length;
          }
        } catch (e) {}
        try {
          // uji ruang kosong nyata: tulis 150 ribu karakter lalu hapus
          localStorage.setItem("__probe__", "x".repeat(150000));
        } catch (e) {
          ok = false;
        } finally {
          try { localStorage.removeItem("__probe__"); } catch (_) {}
        }
        return (stC = { t: now, ok, used });
      }
      const mb = (n) => (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 });
      const dtF = (iso) => (iso ? new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
      let gdSnooze = 0;
      function guardUi(force) {
        const s = stCheck(force),
          pct = Math.min(100, Math.round((s.used / ST_CAP) * 100)),
          full = !s.ok || pct >= 80,
          h = [];
        const bkBtn = '<button class="p ximp" data-g="bk">Unduh cadangan sekarang</button>';
        if (failed.size)
          h.push(`<div class="gd err" role="alert"><b>Perubahan belum tersimpan di perangkat</b>Penyimpanan penuh atau diblokir browser. Hasil terbaru hanya ada di layar dan akan hilang jika halaman ditutup.<div class="ga">${bkBtn}</div></div>`);
        else if (full)
          h.push(`<div class="gd warn"><b>Penyimpanan hampir penuh${s.ok ? " (" + pct + "%)" : ""}</b>Sisa ruang di perangkat ini tinggal sedikit. Unduh cadangan, lalu hapus hasil lama atau data yang tidak dipakai.<div class="ga">${bkBtn}</div></div>`);
        else if (bk.n >= 20 && bk.n >= gdSnooze)
          h.push(`<div class="gd info"><b>${bk.n} perubahan belum dicadangkan</b>${bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : "Belum pernah dicadangkan."} Cadangan melindungi data jika browser dibersihkan atau HP bermasalah.<div class="ga">${bkBtn.replace("Unduh cadangan sekarang", "Cadangkan")}<button class="s" data-g="later">Nanti</button></div></div>`);
        if (isDemoData())
          h.push(`<div class="gd warn"><b>Ini DATA CONTOH, bukan data gudang Anda</b>Hasil periksa, rekap, dan pesan Telegram dari data ini tidak berlaku. Impor data WMS asli dulu.<div class="ga"><button class="p" data-g="imp">Impor data WMS</button></div></div>`);
        if (corrupt.length)
          h.push(`<div class="gd warn"><b>Sebagian data tersimpan tidak terbaca</b>Dilewati: ${corrupt.map(esc).join(", ")}. Salinan mentahnya disimpan di perangkat dengan akhiran __rusak.</div>`);
        $("guard").innerHTML = h.join("");
        // panel di menu Data WMS
        $("bkInfo").textContent = (bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : "Belum pernah dicadangkan.") + (bk.n ? ` ${bk.n} perubahan sejak itu.` : "");
        $("bkMeter").className = "meter" + (!s.ok || pct >= 95 ? " full" : pct >= 80 ? " hi" : "");
        $("bkMeter").firstElementChild.style.width = Math.max(2, pct) + "%";
        $("bkSt").textContent = `Penyimpanan terpakai ± ${mb(s.used)} MB dari ± ${mb(ST_CAP)} MB (perkiraan).` + (s.ok ? "" : " Ruang kosong hampir habis.");
      }
      $("guard").onclick = (e) => {
        const b = e.target.closest("[data-g]");
        if (!b) return;
        if (b.dataset.g === "bk") doBackup();
        else if (b.dataset.g === "imp") nav("data");
        else {
          gdSnooze = bk.n + 20;
          guardUi();
        }
      };
      const BK_KEYS = () => ({
        [K_M]: DATA, [K_C]: counts, [K_F]: codeFix, [K_U]: users, [K_X]: closed,
        [K_CU]: curU, [K_D]: dc, [K_DP]: dcPick, warehouse_so_dest_v1: dest, [K_MON]: mon, [K_T]: tasks, [K_CFG]: cfg, [K_CLRD]: clrDone, [K_CLRH]: clrHist, [K_MUATH]: muatHist, [K_KESH]: kesHist,
      });
      function doBackup() {
        const at = new Date().toISOString(),
          d = new Date(),
          p2 = (n) => String(n).padStart(2, "0"),
          name = `cadangan_stock_control_${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}_${p2(d.getHours())}${p2(d.getMinutes())}.json`,
          blob = new Blob([JSON.stringify({ app: "stock-control-wms", ver: 5, at, data: BK_KEYS() })], { type: "application/json" }),
          u = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = u;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(u), 2000);
        bk = { at, n: 0 };
        saveBk();
        gdSnooze = 0;
        guardUi();
        toast("Cadangan diunduh: " + name);
      }
      $("bkNow").onclick = doBackup;
      const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
      function bkCheck(p) {
        if (!isObj(p) || p.app !== "stock-control-wms" || !isObj(p.data)) return "File ini bukan cadangan Stock Control.";
        const d = p.data;
        if (!Array.isArray(d[K_M]) || !d[K_M].length || d[K_M].some((x) => !isObj(x) || !x.bin || !x.item || !x.area))
          return "Cadangan rusak: data WMS tidak lengkap.";
        if (d[K_C] != null && !isObj(d[K_C])) return "Cadangan rusak: hasil pemeriksaan tidak valid.";
        if (d[K_U] != null && !Array.isArray(d[K_U])) return "Cadangan rusak: daftar petugas tidak valid.";
        for (const k of [K_F, K_X, K_D, K_DP, K_CFG, "warehouse_so_dest_v1"]) if (d[k] != null && !isObj(d[k])) return "Cadangan rusak: salah satu bagian data tidak valid.";
        return "";
      }
      function applyRestore(d, at) {
        const next = {
          [K_M]: d[K_M], [K_C]: d[K_C] || {}, [K_F]: d[K_F] || {}, [K_U]: d[K_U] || [], [K_X]: d[K_X] || {},
          [K_CU]: typeof d[K_CU] === "string" ? d[K_CU] : "", [K_D]: d[K_D] || {}, [K_DP]: d[K_DP] || {}, warehouse_so_dest_v1: d.warehouse_so_dest_v1 || {},
        };
        if (isObj(d[K_MON])) next[K_MON] = d[K_MON];
        next[K_T] = isObj(d[K_T]) ? d[K_T] : {};
        if (isObj(d[K_CLRD])) next[K_CLRD] = d[K_CLRD];
        if (Array.isArray(d[K_MUATH])) next[K_MUATH] = d[K_MUATH];
        if (Array.isArray(d[K_CLRH])) next[K_CLRH] = d[K_CLRH];
        if (Array.isArray(d[K_KESH])) next[K_KESH] = d[K_KESH];
        if (isObj(d[K_CFG])) next[K_CFG] = d[K_CFG]; // cadangan lama tanpa pengaturan: pengaturan sekarang dipertahankan
        const old = Object.keys(next).map((k) => {
          try { return [k, localStorage.getItem(k)]; } catch (e) { return [k, null]; }
        });
        try {
          Object.entries(next).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
        } catch (e) {
          // gagal di tengah jalan: kembalikan data lama
          old.forEach(([k, v]) => {
            try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (_) {}
          });
          return toast("Gagal memulihkan: penyimpanan penuh. Data lama tetap dipertahankan.");
        }
        DATA = next[K_M]; counts = next[K_C]; codeFix = next[K_F]; users = next[K_U]; closed = next[K_X];
        tasks = next[K_T] || {}; curU = next[K_CU]; migrateUsers(); dc = next[K_D]; dcPick = next[K_DP]; dest = next.warehouse_so_dest_v1;
        if (next[K_CLRD]) clrDone = next[K_CLRD];
        if (next[K_MUATH]) { muatHist = next[K_MUATH]; renderMuHist(); }
        if (next[K_CLRH]) { clrHist = next[K_CLRH]; renderClrHist(); }
        if (next[K_KESH]) { kesHist = next[K_KESH]; renderKesHist(); }
        if (next[K_MON]) mon = { ...mon, ...next[K_MON] };
        if (next[K_CFG]) {
          cfg = next[K_CFG];
          delete cfg.pin;
          applyCfg();
          cfgUi();
        }
        applySession();
        applyRole();
        undoStack.length = 0;
        dcUndoStack.length = 0;
        failed.clear();
        bk = { at: at || new Date().toISOString(), n: 0 };
        saveBk();
        if (window.__syncRestore) window.__syncRestore();
        initAll();
        go("so");
        guardUi(true);
        toast("Data dipulihkan dari cadangan");
      }
      $("bkRestore").onclick = () => {
        const f = $("bkFile").files[0];
        if (!f) return toast("Pilih file cadangan (.json) terlebih dahulu.");
        const r = new FileReader();
        r.onload = async () => {
          let p;
          try {
            p = JSON.parse(String(r.result).replace(/^﻿/, ""));
          } catch (e) {
            return toast("File ini bukan cadangan yang valid.");
          }
          const bad = bkCheck(p);
          if (bad) return toast(bad);
          const d = p.data;
          const msg = `Cadangan ${dtF(p.at) || "tanpa tanggal"}: ${d[K_M].length} bin WMS, ${Object.keys(d[K_C] || {}).length} bin sudah diperiksa, ${Object.keys(d[K_D] || {}).length} item DC. Semua data di perangkat ini akan diganti. Unduh cadangan data saat ini dulu jika masih perlu.`;
          if (await ask("Pulihkan dari cadangan?", msg, "Pulihkan", true)) applyRestore(d, p.at);
        };
        r.readAsText(f);
      };
      window.addEventListener("beforeunload", (e) => {
        if (failed.size) {
          e.preventDefault();
          e.returnValue = "";
        }
      });
      try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}

