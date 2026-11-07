/* Tandai selesai per voucher (Clearing) (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7361-7394 */
      /* ---- v22: tandai selesai per voucher (Clearing) ---- */
      (function () {
        function askNote(title, msg) {
          return new Promise((res) => {
            const d = $("dlg");
            d.innerHTML = `<div><h3 id="dlgT">${esc(title)}</h3><p>${esc(msg)}</p><label for="dNote" style="margin:0">Catatan (opsional)</label><input id="dNote" maxlength="200" autocomplete="off" enterkeyhint="done" placeholder="Contoh: sudah dikoreksi di QAD" /><button class="btn pri" id="dOk">Simpan</button><button class="btn sec" id="dNo">Batal</button></div>`;
            d.hidden = false;
            const f = (v) => { d.hidden = true; res(v); };
            $("dOk").onclick = () => f($("dNote").value.trim());
            $("dNo").onclick = () => f(null);
            $("dNote").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("dOk").click(); } };
            $("dNote").focus();
          });
        }
        $("clrList").onclick = async (e) => {
          const cd = e.target.closest("[data-cd]"), cu = e.target.closest("[data-cu]");
          if (cd) {
            const note = await askNote("Tandai voucher selesai?", "Voucher ini sudah dicek dan ditindaklanjuti.");
            if (note === null) return;
            clrDone[cd.dataset.cd] = { at: new Date().toISOString(), by: curName(), note };
            if (!sv(K_CLRD, clrDone)) return toast("Gagal menyimpan: penyimpanan penuh.");
            buzz(40);
            renderClr();
            toast("Voucher ditandai selesai");
          } else if (cu) {
            if (!(await ask("Buka lagi voucher ini?", "Tanda selesai dan catatannya dihapus.", "Buka lagi", true))) return;
            delete clrDone[cu.dataset.cu];
            sv(K_CLRD, clrDone);
            renderClr();
          }
        };
      })();
