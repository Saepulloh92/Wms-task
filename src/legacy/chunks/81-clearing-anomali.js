/* Peringatan dini voucher (Clearing)
   Menangkap indikasi voucher salah item SEBELUM barang sampai penerimaan, hanya dari Laporan Voucher.
   Lapisan 1: mesin yang biasanya membuat satu item tiba-tiba mencatat item lain (pola selang-seling A-B-A atau menyimpang).
   Lapisan 2: berat bersih / kotor per Qty menyimpang dari median mesin+item yang sama (cadangan: item yang sama).
   Catatan: indikasi statistik, bukan bukti salah item. Pembuktian butuh data aktual penerimaan (item/qty/berat fisik). */
      const K_ANOM = "warehouse_so_clr_anom_v1";
      let anCfg = ld(K_ANOM, { pct: 3 }),
        anOpen = null;
      const anMed = (a) => {
        const s = a.slice().sort((x, y) => x - y),
          m = s.length >> 1;
        return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
      };
      const anLabel = (r) => String(r.n || r.k || "").replace(/\s+/g, " ").trim();
      // urutan produksi: nomor voucher berurutan mengikuti waktu produksi
      const anOrd = (a, b) => (Number(a.v) - Number(b.v) || 0) || String(a.v).localeCompare(String(b.v));
      function clrAnomaly(rows, pct = 3) {
        const cols = { mc: rows.some((r) => r.mc), nw: rows.some((r) => r.nw > 0), gw: rows.some((r) => r.gw > 0) };
        const std = rows.filter((r) => !r.afk);
        const out = { cols, machine: [], weight: [], qty: [], n: rows.length, afkir: rows.length - std.length };
        if (cols.mc) {
          const by = new Map();
          std.slice().sort(anOrd).forEach((r) => {
            if (!r.mc) return;
            if (!by.has(r.mc)) by.set(r.mc, []);
            by.get(r.mc).push(r);
          });
          by.forEach((list, mc) => {
            if (list.length < 3) return;
            const seq = list.map(anLabel), cnt = new Map();
            seq.forEach((l) => cnt.set(l, (cnt.get(l) || 0) + 1));
            const [dom, dn] = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0];
            if (dn / list.length < 0.6) return; // mesin memang ganti-ganti item: tidak ada "item biasa"
            list.forEach((r, i) => {
              if (seq[i] === dom) return;
              const alt = i > 0 && i < seq.length - 1 && seq[i - 1] === seq[i + 1] && seq[i - 1] !== seq[i];
              out.machine.push({ v: r.v, mc, item: seq[i], usual: dom, alt, q: r.q });
            });
          });
          out.machine.sort((a, b) => b.alt - a.alt || Number(a.v) - Number(b.v));
        }
        if (cols.nw || cols.gw) {
          const grp = (kf) => {
            const m = new Map();
            std.forEach((r) => {
              const k = kf(r);
              if (!k || !(r.q > 0)) return;
              if (!m.has(k)) m.set(k, []);
              m.get(k).push(r);
            });
            return m;
          };
          const byMI = grp((r) => (r.mc ? r.mc + "|" + anLabel(r) : "")),
            byI = grp((r) => anLabel(r)),
            hit = new Map();
          const test = (field, label) =>
            std.forEach((r) => {
              if (!(r[field] > 0) || !(r.q > 0)) return;
              let g = r.mc ? byMI.get(r.mc + "|" + anLabel(r)) : null,
                basis = "mesin + item";
              if (!g || g.filter((x) => x !== r && x[field] > 0).length < 4) { g = byI.get(anLabel(r)); basis = "item"; }
              const ref = (g || []).filter((x) => x !== r && x[field] > 0).map((x) => x[field] / x.q);
              if (ref.length < 4) return;
              const med = anMed(ref), dev = ((r[field] / r.q - med) / med) * 100;
              if (Math.abs(dev) < pct) return;
              const h = hit.get(r.v) || { v: r.v, mc: r.mc, item: anLabel(r), q: r.q, basis, f: [] };
              h.f.push({ label, val: r[field], exp: Math.round(med * r.q * 10) / 10, dev });
              hit.set(r.v, h);
            });
          test("nw", "bersih");
          test("gw", "kotor");
          std.forEach((r) => {
            if (r.gw > 0 && r.nw > 0 && r.gw < r.nw) {
              const h = hit.get(r.v) || { v: r.v, mc: r.mc, item: anLabel(r), q: r.q, basis: "data", f: [] };
              h.bad = "Berat kotor lebih kecil dari berat bersih";
              hit.set(r.v, h);
            }
          });
          out.weight = [...hit.values()].map((h) => ({ ...h, dev: Math.max(0, ...h.f.map((x) => Math.abs(x.dev))), hi: !!h.bad || h.f.some((x) => Math.abs(x.dev) >= pct * 2.5) })).sort((a, b) => b.dev - a.dev);
        }
        /* Lapisan 3: qty tidak biasa. Mesin+item (cadangan: item) yang punya qty standar (>= 60% voucher lain sama, minimal 4 pembanding);
           voucher yang qty-nya menyimpang >= 20% dari standar ditandai (>= 50% = tinggi). Salah item sering ikut membawa qty ikatan yang lain. */
        {
          const g = (kf) => {
            const m = new Map();
            std.forEach((r) => {
              const k = kf(r);
              if (!k || !(r.q > 0)) return;
              if (!m.has(k)) m.set(k, []);
              m.get(k).push(r);
            });
            return m;
          };
          const qMI = g((r) => (r.mc ? r.mc + "|" + anLabel(r) : "")),
            qI = g((r) => anLabel(r));
          std.forEach((r) => {
            if (!(r.q > 0)) return;
            let grp = r.mc ? qMI.get(r.mc + "|" + anLabel(r)) : null,
              basis = "mesin + item";
            if (!grp || grp.filter((x) => x !== r).length < 4) { grp = qI.get(anLabel(r)); basis = "item"; }
            const ref = (grp || []).filter((x) => x !== r).map((x) => x.q);
            if (ref.length < 4) return;
            const cnt = new Map();
            ref.forEach((q) => cnt.set(q, (cnt.get(q) || 0) + 1));
            const top = [...cnt.entries()].sort((a, b) => b[1] - a[1]);
            if (top[0][1] / ref.length < 0.6 || (top[1] && top[1][1] === top[0][1])) return; // tidak ada qty standar yang jelas
            const std_ = top[0][0],
              dev = ((r.q - std_) / std_) * 100;
            if (Math.abs(dev) < 20) return;
            out.qty.push({ v: r.v, mc: r.mc, item: anLabel(r), q: r.q, usual: std_, dev, basis, hi: Math.abs(dev) >= 50 });
          });
          out.qty.sort((a, b) => Math.abs(b.dev) - Math.abs(a.dev));
        }
        return out;
      }
      const anPct = (d) => (d > 0 ? "+" : d < 0 ? "−" : "") + Math.abs(d).toFixed(1).replace(".", ",") + "%";
      function clrAnomRender() {
        const el = $("clrAnom");
        if (!el) return;
        if (typeof clrRep === "undefined" || !clrRep || !clrRep.rows.length) { el.innerHTML = ""; return; }
        const R = clrAnomaly(clrRep.rows, anCfg.pct);
        if (!R.cols.mc && !R.cols.nw && !R.cols.gw) {
          el.innerHTML = '<details class="clr-an"><summary>Peringatan dini voucher · kolom belum terbaca</summary><p class="fine">Laporan ini belum memuat kolom <b>Mesin</b>, <b>Berat bersih</b>, atau <b>Berat kotor</b> (atau diimpor sebelum fitur ini ada). Impor ulang laporan voucher yang memuat kolom itu.</p></details>';
          return;
        }
        const nHi = R.machine.filter((x) => x.alt).length + R.weight.filter((x) => x.hi).length + R.qty.filter((x) => x.hi).length,
          total = R.machine.length + R.weight.length + R.qty.length,
          open = anOpen == null ? nHi > 0 : anOpen;
        const read = [R.cols.mc ? "Mesin" : "", R.cols.nw ? "Berat bersih" : "", R.cols.gw ? "Berat kotor" : ""].filter(Boolean).join(", ");
        const mach = R.machine.length
          ? '<div class="lh">Mesin: item tidak biasa</div>' + R.machine.map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)} · ${esc(x.mc)}</b><small>${esc(x.item)} (biasanya ${esc(x.usual)})${x.alt ? " · kembali ke item biasa di voucher berikutnya" : ""}</small></div><span class="pill2 ${x.alt ? "red" : "wip"}">${x.alt ? "Selang-seling" : "Berbeda"}</span></div>`).join("")
          : R.cols.mc ? '<p class="fine">Tidak ada mesin yang berganti item secara tidak biasa.</p>' : "";
        const wt = R.weight.length
          ? '<div class="lh">Berat tidak normal</div>' + R.weight.map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)}${x.mc ? " · " + esc(x.mc) : ""}</b><small>${esc(x.item)} · Qty ${esc(fmt(x.q))}${x.f.map((f) => ` · ${f.label} ${esc(fmt(f.val))} (wajar ±${esc(fmt(f.exp))})`).join("")}${x.bad ? " · " + esc(x.bad) : ""}</small></div><span class="pill2 ${x.hi ? "red" : "wip"}">${x.f.length ? esc(anPct(x.f.sort((a, b) => Math.abs(b.dev) - Math.abs(a.dev))[0].dev)) : "Data"}</span></div>`).join("")
          : R.cols.nw || R.cols.gw ? '<p class="fine">Tidak ada berat yang menyimpang dari pola mesin dan item.</p>' : "";
        const qt = R.qty.length
          ? '<div class="lh">Qty tidak biasa</div>' + R.qty.map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)}${x.mc ? " · " + esc(x.mc) : ""}</b><small>${esc(x.item)} · Qty ${esc(fmt(x.q))} (biasanya ${esc(fmt(x.usual))}, ${esc(anPct(x.dev))})</small></div><span class="pill2 ${x.hi ? "red" : "wip"}">${x.hi ? "Tinggi" : "Cek"}</span></div>`).join("")
          : "";
        el.innerHTML = `<details class="clr-an" id="clrAnD"${open ? " open" : ""}><summary>Peringatan dini voucher · ${total ? esc(fmt(R.machine.length)) + " item mesin, " + esc(fmt(R.weight.length)) + " berat" + (R.qty.length ? ", " + esc(fmt(R.qty.length)) + " qty" : "") : "tidak ada indikasi"}</summary>` +
          `<p class="fine">Dibaca dari laporan: ${esc(read)} · ${esc(fmt(R.n))} voucher${R.afkir ? " (" + esc(fmt(R.afkir)) + " afkir dikecualikan)" : ""}. Ini indikasi statistik, bukan bukti salah item.</p>` +
          `<label class="fine" for="clrAnPct">Ambang berat menyimpang</label><select id="clrAnPct">${[3, 5, 8].map((p) => `<option value="${p}"${anCfg.pct === p ? " selected" : ""}>${p}%</option>`).join("")}</select>` +
          mach + wt + qt + "</details>";
      }
      $("clrAnom") &&
        ($("clrAnom").addEventListener("change", (e) => {
          if (e.target.id !== "clrAnPct") return;
          anCfg = { pct: +e.target.value || 3 };
          sv(K_ANOM, anCfg);
          clrAnomRender();
        }),
        $("clrAnom").addEventListener("click", (e) => {
          const s = e.target.closest && e.target.closest("summary");
          if (s && s.parentElement.id === "clrAnD") anOpen = !s.parentElement.open;
        }));
