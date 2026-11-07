/* Bip + pita status jaringan (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7182-7241 */
      /* ---- v19: bip + pita status jaringan ---- */
      (function () {
        const K = "warehouse_so_disp_v1";
        const snd = () => { try { const d = JSON.parse(localStorage.getItem(K) || "{}"); return d.snd !== false; } catch (e) { return true; } };
        let ac = null;
        window.__beep = (pat) => {
          if (!snd()) return;
          ac = ac || new (window.AudioContext || window.webkitAudioContext)();
          if (ac.state === "suspended") ac.resume();
          const now = ac.currentTime;
          const seq = Array.isArray(pat) ? [[330, 0, 0.2], [220, 0.26, 0.32]] : pat === 60 ? [[1400, 0, 0.09]] : [[988, 0, 0.16]];
          seq.forEach(([f, t, du]) => {
            const o = ac.createOscillator(), g = ac.createGain();
            o.type = f < 400 ? "square" : "sine";
            o.frequency.value = f;
            g.gain.setValueAtTime(0.0001, now + t);
            g.gain.exponentialRampToValueAtTime(0.5, now + t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, now + t + du);
            o.connect(g);
            g.connect(ac.destination);
            o.start(now + t);
            o.stop(now + t + du + 0.02);
          });
        };
        const sw = $("swSnd");
        sw.checked = snd();
        sw.onchange = () => {
          let d = {};
          try { d = JSON.parse(localStorage.getItem(K) || "{}") || {}; } catch (e) {}
          d.snd = sw.checked;
          sv(K, d);
          if (d.snd) window.__beep(40);
          toast(d.snd ? "Bunyi bip aktif" : "Bunyi bip mati");
        };
        const hdr = document.querySelector("header"), nb = $("netB");
        const rb = document.createElement("div");
        rb.id = "netRibbon";
        rb.className = "ribbon";
        rb.setAttribute("role", "status");
        rb.hidden = true;
        hdr.appendChild(rb);
        function upd() {
          const t = nb.textContent.trim();
          if (!navigator.onLine) {
            rb.className = "ribbon off";
            rb.textContent = "OFFLINE: data aman di HP, dikirim otomatis saat sinyal kembali.";
            rb.hidden = false;
          } else if (!nb.hidden && /gagal/i.test(t)) {
            rb.className = "ribbon bad";
            rb.textContent = "SINKRON GAGAL: data tetap aman di HP. " + (nb.title || "");
            rb.hidden = false;
          } else rb.hidden = true;
        }
        new MutationObserver(upd).observe(nb, { childList: true, characterData: true, subtree: true, attributes: true });
        window.addEventListener("online", upd);
        window.addEventListener("offline", upd);
        upd();
      })();
