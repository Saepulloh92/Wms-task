/* Dialog atur navigasi bawah
   asal: index-fixd.html baris 5119-5163 */
      /* ---- v17: dialog atur navigasi bawah ---- */
      let navDraft = [];
      function navRender() {
        const allowed = NAV_ORDER.filter(allowedView);
        $("navChips").innerHTML = allowed.map((v) => `<button type="button" class="chip ${navDraft.includes(v) ? "on" : ""}" data-n="${v}" aria-pressed="${navDraft.includes(v)}">${esc(NAV_NAME[v])}</button>`).join("");
        $("navH").textContent = `Pilih sampai ${NAV_MAX} menu. Terpilih ${navDraft.length} dari ${NAV_MAX}. Tombol Menu selalu ada. Pengaturan ini hanya berlaku di perangkat ini.`;
      }
      function navOpen() {
        side(false);
        navDraft = navPicks();
        navRender();
        $("navSet").hidden = false;
      }
      const navClose = () => ($("navSet").hidden = true);
      $("navBtn").onclick = navOpen;
      $("navCancel").onclick = navClose;
      $("navChips").onclick = (e) => {
        const b = e.target.closest("[data-n]");
        if (!b) return;
        const v = b.dataset.n;
        if (navDraft.includes(v)) navDraft = navDraft.filter((x) => x !== v);
        else if (navDraft.length >= NAV_MAX) return toast("Maksimal " + NAV_MAX + " menu. Lepas satu dulu.");
        else navDraft = [...navDraft, v];
        navRender();
      };
      $("navSave").onclick = () => {
        if (!navDraft.length) return toast("Pilih minimal satu menu.");
        navCfg = NAV_ORDER.filter((v) => navDraft.includes(v));
        sv(K_NAV, navCfg);
        navClose();
        applyRole();
        toast("Navigasi bawah tersimpan");
      };
      $("navReset").onclick = () => {
        navCfg = null;
        sv(K_NAV, null);
        navDraft = navPicks();
        navRender();
        applyRole();
        navClose();
        toast("Navigasi bawah dikembalikan ke standar");
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("navSet").hidden) navClose();
      });
