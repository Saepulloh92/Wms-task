/* Pengingat bin belum diperiksa (patch IIFE). Sekali sehari pada jam pilihan, selama aplikasi terbuka. */
      (function () {
        const K = "warehouse_so_remind_v1";
        let d = ld(K, {});
        if (!d || typeof d !== "object" || Array.isArray(d)) d = {};
        const on = $("rmOn"), at = $("rmAt"), info = $("rmInfo");
        if (!on || !at) return;
        const today = () => { const n = new Date(); return n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0"); };
        const left = () => DATA.filter((x) => inScope(x.area) && !isClosed(x.area) && !counts[x.bin]).length;
        function ui() {
          on.checked = !!d.on;
          at.value = d.at || "15:00";
          info.textContent = !d.on ? "" : "Sekarang ada " + left() + " bin belum diperiksa" + (curUser() ? " di area Anda." : ".");
        }
        function save() { sv(K, d); ui(); }
        on.onchange = async () => {
          d.on = on.checked; d.at = at.value || "15:00";
          if (d.on && "Notification" in window && Notification.permission === "default") { try { await Notification.requestPermission(); } catch (e) {} }
          d.last = ""; save();
          toast(d.on ? "Pengingat aktif jam " + d.at : "Pengingat dimatikan");
        };
        at.onchange = () => { d.at = at.value || "15:00"; d.last = ""; save(); };
        function check() {
          if (!d.on || document.querySelector(".sheet:not([hidden])")) return;
          const n = new Date(), hm = String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0");
          if (d.last === today() || hm < (d.at || "15:00")) return;
          const k = left();
          d.last = today(); sv(K, d);
          if (!k) return;
          const t = "Masih " + k + " bin belum diperiksa hari ini";
          toast(t);
          try { buzz([60, 40, 60]); } catch (e) {}
          try {
            if ("Notification" in window && Notification.permission === "granted") {
              navigator.serviceWorker && navigator.serviceWorker.ready
                ? navigator.serviceWorker.ready.then((r) => r.showNotification("Stock Control", { body: t, icon: "icon-192.png", tag: "remind" }))
                : new Notification("Stock Control", { body: t, icon: "icon-192.png", tag: "remind" });
            }
          } catch (e) {}
        }
        ui();
        setInterval(check, 30000);
        document.addEventListener("visibilitychange", () => { if (!document.hidden) { check(); ui(); } });
        window.__rmCheck = check; // untuk tes
      })();
