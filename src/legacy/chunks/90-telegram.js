/* Telegram
   asal: index-fixd.html baris 5919-6167 */
      /* ---------- Telegram ---------- */
      const K_TG = "warehouse_so_tg_v1",
        K_TQ = "warehouse_so_tgq_v1";
      const tgSaved = ld(K_TG, {});
      let tg = {
        token: tgSaved.token || "",
        chat: tgSaved.chat || "",
        thread: tgSaved.thread || "",
        on: Object.assign({ prob: true, all: false, area: true, dc: true }, tgSaved.on || {}),
      };
      let tgQ = ld(K_TQ, []),
        tgBusy = false,
        tgErr = "",
        tgT = 0,
        tgLastToast = 0,
        tgMode = false;
      const tgReady = () => !!(tg.token && tg.chat);
      const tgSaveQ = () => sv(K_TQ, tgQ);
      const md = (x) => String(x ?? "").replace(/([_*`\[])/g, "\\$1");
      function outText(t) {
        // dipakai semua tombol "Salin": saat mode Telegram aktif, teks dikirim, bukan disalin
        if (tgMode) {
          tgSend(t);
          toast("Masuk antrean Telegram");
          return new Promise(() => {});
        }
        return navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject();
      }
      function tgRun(src) {
        if (src === "mcopy" && !mRecs.length) return toast("Belum ada file laporan muat.");
        if (!tgReady()) {
          toast("Atur token bot dan Chat ID dulu.");
          go("tg");
          return;
        }
        if (src === "adj") {
          const r = adjustRows().rows;
          if (!r.length) return toast("Belum ada selisih untuk dikirim.");
          const L = r.map((x) => `• ${rakFmt(x.rak)} · ${x.nama}: ${signed(x.qty)} (${x.ket})`);
          tgSend(`*SELISIH SIAP ADJUST*\n${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\n${r.length} baris${curName() ? " · " + md(curName()) : ""}\n━━━━━━━━━━━━━━━━━━━━\n${L.map((l) => md(l).replace(/\\_/g, "_")).join("\n")}`);
          return toast("Masuk antrean Telegram");
        }
        tgMode = true;
        try {
          $(src).click();
        } finally {
          tgMode = false;
        }
      }
      document.querySelectorAll("[data-tg]").forEach((b) => (b.onclick = () => tgRun(b.dataset.tg)));
      function tgChunks(t) {
        const out = [];
        let cur = "";
        String(t).split("\n").forEach((l) => {
          while (l.length > 3800) {
            if (cur) { out.push(cur); cur = ""; }
            out.push(l.slice(0, 3800));
            l = l.slice(3800);
          }
          if ((cur + "\n" + l).length > 3800) { out.push(cur); cur = l; }
          else cur = cur ? cur + "\n" + l : l;
        });
        if (cur) out.push(cur);
        return out;
      }
      function tgSend(text) {
        if (!tgReady()) return;
        if (isDemoData()) text = "🧪 DATA CONTOH (bukan data asli)\n" + text;
        tgChunks(text).forEach((c) => tgQ.push({ text: c, at: Date.now() }));
        if (tgQ.length > 200) tgQ.splice(0, tgQ.length - 200);
        tgSaveQ();
        tgFlush();
      }
      async function tgApi(method, body) {
        const r = await fetch(`https://api.telegram.org/bot${tg.token}/${method}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let j = {};
        try { j = await r.json(); } catch (e) {}
        return { ok: !!j.ok, status: r.status, j };
      }
      async function tgPost(text) {
        const body = { chat_id: tg.chat, text, disable_web_page_preview: true, parse_mode: "Markdown" };
        if (tg.thread) body.message_thread_id = Number(tg.thread);
        let res = await tgApi("sendMessage", body);
        if (!res.ok && res.status === 400 && /parse entities/i.test(res.j.description || "")) {
          delete body.parse_mode; // format gagal terbaca: kirim polos daripada hilang
          res = await tgApi("sendMessage", body);
        }
        return res;
      }
      function tgNote(m) {
        tgErr = m;
        if (Date.now() - tgLastToast > 60000) {
          tgLastToast = Date.now();
          toast("Telegram: " + m);
        }
      }
      async function tgFlush() {
        if (tgBusy || !tgQ.length || !tgReady()) return tgUi();
        tgBusy = true;
        clearTimeout(tgT);
        while (tgQ.length) {
          let res;
          try {
            res = await tgPost(tgQ[0].text);
          } catch (e) {
            tgNote(tgQ.length + " pesan menunggu, tidak ada koneksi.");
            tgT = setTimeout(tgFlush, 30000);
            break;
          }
          if (res.ok) {
            tgQ.shift();
            tgErr = "";
            tgSaveQ();
          } else if (res.status === 429) {
            const w = ((res.j.parameters && res.j.parameters.retry_after) || 5) + 1;
            tgNote("Terlalu banyak pesan, mencoba lagi " + w + " detik.");
            tgT = setTimeout(tgFlush, w * 1000);
            break;
          } else if (res.status >= 500) {
            tgNote("Server Telegram bermasalah, akan dicoba lagi.");
            tgT = setTimeout(tgFlush, 30000);
            break;
          } else {
            tgQ.shift(); // ditolak (token/chat salah dsb): buang agar antrean tidak macet
            tgSaveQ();
            tgNote("Ditolak Telegram: " + (res.j.description || "HTTP " + res.status));
          }
        }
        tgBusy = false;
        tgUi();
      }
      window.addEventListener("online", tgFlush);
      /* pesan otomatis */
      const tgTime = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      function tgBin(x, c) {
        if (!tgReady() || !c) return;
        const bad = isProb(c);
        if (!(bad ? tg.on.prob || tg.on.all : tg.on.all)) return;
        const d = c.actualQty - x.onhand;
        tgSend(
          `${bad ? "⚠️ *Bin perlu review*" : "✅ *Bin sesuai*"}\n*${md(x.bin)}* · Area ${md(x.area)}\n${md(x.item)}\nWMS ${fmt(x.onhand)} · Fisik ${fmt(c.actualQty)}${d ? " (" + signed(d) + ")" : ""}` +
            (c.itemMatch === false ? `\nItem beda, ditemukan: ${md(c.actualItem)}` : "") +
            (c.note ? `\nCatatan: ${md(c.note)}` : "") +
            `\n${c.by ? md(c.by) + " · " : ""}${tgTime()}`,
        );
      }
      function tgArea(a, shut) {
        if (!tgReady() || !tg.on.area) return;
        const k = kpiOf(DATA.filter((x) => x.area === a));
        tgSend(
          `${shut ? "🔒 *Area " + md(a) + " ditutup*" : "🔓 *Area " + md(a) + " dibuka kembali*"}\n${k.done}/${k.total} bin diperiksa · akurasi ${pc(k.ok, k.done)}\n${curName() ? md(curName()) + " · " : ""}${tgTime()}`,
        );
      }
      function tgDc(item, fis, sys, d, adj, ke) {
        if (!tgReady() || !tg.on.dc) return;
        tgSend(
          `${d ? "⚠️ *DC selisih*" : "✅ *DC sesuai*"}${ke > 1 ? " (DC ulang ke-" + ke + ")" : ""}\n${md(item)}\nSistem ${fmt(sys)} · Fisik ${fmt(fis)}${d ? " (" + signed(d) + ")" : ""}${d && adj ? "\nAdjust di rak " + md(adj) : ""}\n${curName() ? md(curName()) + " · " : ""}${tgTime()}`,
        );
      }
      /* layar pengaturan */
      function tgUi() {
        if ($("v-tg").hidden) return;
        const ae = document.activeElement;
        if (!ae || !["tgToken", "tgChat", "tgThread"].includes(ae.id)) {
          $("tgToken").value = tg.token;
          $("tgChat").value = tg.chat;
          $("tgThread").value = tg.thread;
        }
        $("swProb").checked = tg.on.prob;
        $("swAll").checked = tg.on.all;
        $("swArea").checked = tg.on.area;
        $("swDc").checked = tg.on.dc;
        $("tgStat").textContent = !tgReady()
          ? "Belum terhubung. Isi token dan Chat ID."
          : tgQ.length
            ? tgQ.length + " pesan menunggu terkirim." + (tgErr ? " " + tgErr : "")
            : "Terhubung. Tidak ada antrean." + (tgErr ? " " + tgErr : "");
        $("tgRetry").disabled = $("tgClear").disabled = !tgQ.length;
      }
      function tgRead() {
        tg.token = $("tgToken").value.trim();
        tg.chat = $("tgChat").value.trim();
        tg.thread = $("tgThread").value.replace(/\D/g, "");
        tg.on = { prob: $("swProb").checked, all: $("swAll").checked, area: $("swArea").checked, dc: $("swDc").checked };
      }
      const tgRes = (m, ok) => {
        $("tgRes").className = "note " + (ok ? "ok" : "info");
        $("tgRes").textContent = m;
      };
      $("tgShow").onclick = () => {
        const t = $("tgToken");
        t.type = t.type === "password" ? "text" : "password";
        $("tgShow").textContent = t.type === "password" ? "Tampilkan token" : "Sembunyikan token";
      };
      $("tgSave").onclick = () => {
        tgRead();
        if (tg.token && !/^\d+:[\w-]{20,}$/.test(tg.token)) return tgRes("Format token tidak dikenali. Salin ulang dari @BotFather.", false);
        if (!sv(K_TG, tg)) return tgRes("Gagal menyimpan ke perangkat (penyimpanan penuh).", false);
        tgRes(tgReady() ? "Tersimpan. Coba kirim pesan tes." : "Tersimpan. Token dan Chat ID belum lengkap.", true);
        tgFlush();
        tgUi();
      };
      $("tgTest").onclick = async () => {
        tgRead();
        if (!tgReady()) return tgRes("Isi token dan Chat ID dulu.", false);
        tgRes("Mengirim…", true);
        try {
          const r = await tgPost("✅ *Tes Stock Control*\nPengaturan Telegram berhasil. " + tgTime());
          if (r.ok) {
            sv(K_TG, tg);
            tgRes("Terkirim. Pengaturan disimpan.", true);
          } else tgRes("Gagal: " + (r.j.description || "HTTP " + r.status), false);
        } catch (e) {
          tgRes("Tidak bisa terhubung ke Telegram. Cek koneksi internet.", false);
        }
      };
      $("tgFind").onclick = async () => {
        tgRead();
        if (!tg.token) return tgRes("Isi token bot dulu.", false);
        tgRes("Mencari…", true);
        try {
          const r = await tgApi("getUpdates", { timeout: 0, allowed_updates: ["message", "channel_post", "my_chat_member"] });
          if (!r.ok) return tgRes("Gagal: " + (r.j.description || "HTTP " + r.status), false);
          const u = [...(r.j.result || [])].reverse().map((x) => (x.message || x.channel_post || x.my_chat_member || {}).chat).find((c) => c && c.id);
          if (!u) return tgRes("Belum ada pesan masuk. Kirim pesan apa saja ke bot (atau tambahkan bot ke grup dan kirim pesan), lalu coba lagi.", false);
          $("tgChat").value = String(u.id);
          tgRes("Ditemukan: " + (u.title || [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || u.id) + " (" + u.id + "). Ketuk Simpan pengaturan.", true);
        } catch (e) {
          tgRes("Tidak bisa terhubung ke Telegram. Cek koneksi internet.", false);
        }
      };
      $("tgRetry").onclick = () => {
        tgErr = "";
        tgFlush();
      };
      $("tgClear").onclick = async () => {
        if (await ask("Kosongkan antrean?", tgQ.length + " pesan yang belum terkirim akan dibuang.", "Kosongkan", true)) {
          tgQ = [];
          tgErr = "";
          tgSaveQ();
          tgUi();
        }
      };
      setTimeout(tgFlush, 1500); // kirim sisa antrean dari sesi sebelumnya

