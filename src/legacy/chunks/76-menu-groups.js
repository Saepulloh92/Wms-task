/* Menu samping bertingkat: judul grup bisa dibuka/ditutup, submenu rapi (satu grup terbuka sekaligus) */
      (function () {
        const box = document.querySelector("#side .sd-m");
        if (!box) return;
        let n = 0;
        const build = (h, items, stat) => {
          const id = "mgs" + ++n, grp = document.createElement("div"), sub = document.createElement("div"), inn = document.createElement("div");
          grp.className = "mg-grp";
          if (stat) grp.dataset.stat = "1";
          sub.className = "mg-sub";
          sub.id = id;
          inn.className = "mg-in";
          h.parentNode.insertBefore(grp, h);
          grp.append(h, sub);
          sub.append(inn);
          items.forEach((i) => inn.append(i));
          h.classList.add("mg");
          h.removeAttribute("role");
          h.removeAttribute("aria-level");
          h.setAttribute("aria-controls", id);
          if (stat) { h.tabIndex = 0; h.setAttribute("role", "button"); h.setAttribute("aria-expanded", "false"); grp.dataset.open = "0"; }
          const tgl = () => {
            if (grp.dataset.single) return;
            const open = grp.dataset.open !== "1";
            box.querySelectorAll(".mg-grp:not([data-single=\"1\"])").forEach((g) => { g.dataset.open = "0"; const x = g.querySelector(".mg"); if (x) x.setAttribute("aria-expanded", "false"); });
            grp.dataset.open = open ? "1" : "0";
            h.setAttribute("aria-expanded", open ? "true" : "false");
          };
          h.onclick = tgl;
          h.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tgl(); } };
        };
        [...box.querySelectorAll(".mg")].forEach((h) => {
          const items = [];
          for (let e = h.nextElementSibling; e && e.classList.contains("mi"); e = e.nextElementSibling) items.push(e);
          if (items.length) build(h, items, false);
        });
        /* Tampilan lapangan (ukuran teks, outdoor, bunyi) = grup yang sama, tertutup bawaan */
        const dh = document.getElementById("dspH");
        if (dh) {
          const items = [];
          for (let e = dh.nextElementSibling; e; e = e.nextElementSibling) items.push(e);
          build(dh, items, true);
        }
        window.menuSync = function () {
          const grps = [...box.querySelectorAll(".mg-grp")];
          let act = null;
          grps.forEach((g) => {
            if (g.dataset.stat) return;
            const vis = [...g.querySelectorAll(".mi")].filter((b) => !b.hidden && b.style.display !== "none");
            g.hidden = !vis.length;
            const single = vis.length <= 1, h = g.querySelector(".mg");
            g.dataset.single = single ? "1" : "";
            h.tabIndex = single ? -1 : 0;
            h.setAttribute("role", single ? "heading" : "button");
            if (single) { h.removeAttribute("aria-expanded"); g.dataset.open = "1"; }
            if (g.querySelector(".mi.on")) act = g;
          });
          if (act) {
            grps.forEach((g) => { if (!g.dataset.single) { const o = g === act; g.dataset.open = o ? "1" : "0"; g.querySelector(".mg").setAttribute("aria-expanded", o ? "true" : "false"); } });
          }
        };
        const bg = document.getElementById("burger");
        if (bg) bg.addEventListener("click", () => window.menuSync());
        window.menuSync();
      })();
