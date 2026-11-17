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
      // analisis statistik dihitung ulang hanya bila baris laporan atau ambang berubah (berat pada ribuan voucher)
      let anMemo = null;
      function clrAnomaly(rows, pct) {
        if (anMemo && anMemo.rows === rows && anMemo.n === rows.length && anMemo.pct === pct) return anMemo.out;
        const out = clrAnomalyRaw(rows, pct);
        anMemo = { rows, n: rows.length, pct, out };
        return out;
      }
      function clrAnomalyRaw(rows, pct = 3) {
        const cols = { q: rows.some((r) => r.q > 0), mc: rows.some((r) => r.mc), nw: rows.some((r) => r.nw > 0), gw: rows.some((r) => r.gw > 0) };
        const std = rows.filter((r) => !r.afk);
        const out = { cols, machine: [], weight: [], qty: [], lori: [], n: rows.length, afkir: rows.length - std.length };
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
        /* Lapisan 3: qty tidak biasa, dihitung dengan statistik baku (bukan ambang buatan):
           skor-z termodifikasi (Iglewicz & Hoaglin) = 0,6745 x (x - median) / MAD; |z| >= 3,5 = pencilan. MAD sama dengan 0 (nilai pembanding nyaris seragam)
           memakai pengganti (x - median) / (1,2533 x rata-rata simpangan mutlak); bila semua pembanding persis sama, nilai berbeda = pencilan (z tak hingga).
           Pembanding minimal 4 (tanpa voucher/lori yang dinilai). "Tinggi" = |z| >= 2 x ambang (7). Dua tingkat: (a) qty per voucher terhadap mesin+item (cadangan: item),
           (b) total qty per lori terhadap lori lain untuk item yang sama. */
        {
          const Z_CUT = 3.5, MIN_REF = 4;
          const anMedOf = (a) => anMed(a);
          // { med, z } : z = Infinity bila pembanding seragam dan x berbeda
          const rz = (ref, x) => {
            const med = anMedOf(ref), mad = anMedOf(ref.map((v) => Math.abs(v - med)));
            if (mad > 0) return { med, z: (0.6745 * (x - med)) / mad };
            const mean = ref.reduce((s, v) => s + v, 0) / ref.length, md = ref.reduce((s, v) => s + Math.abs(v - mean), 0) / ref.length;
            if (md > 0) return { med, z: (x - med) / (1.2533 * md) };
            return { med, z: x === med ? 0 : x > med ? Infinity : -Infinity };
          };
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
          // (a) per voucher
          std.forEach((r) => {
            if (!(r.q > 0)) return;
            let grp = r.mc ? qMI.get(r.mc + "|" + anLabel(r)) : null,
              basis = "mesin + item";
            if (!grp || grp.filter((x) => x !== r).length < MIN_REF) { grp = qI.get(anLabel(r)); basis = "item"; }
            const ref = (grp || []).filter((x) => x !== r).map((x) => x.q);
            if (ref.length < MIN_REF) return;
            const { med, z } = rz(ref, r.q);
            if (Math.abs(z) < Z_CUT) return;
            out.qty.push({ v: r.v, mc: r.mc, item: anLabel(r), q: r.q, usual: med, dev: ((r.q - med) / med) * 100, z, n: ref.length, basis, hi: Math.abs(z) >= Z_CUT * 2 });
          });
          out.qty.sort((a, b) => Math.abs(b.z) - Math.abs(a.z) || Math.abs(b.dev) - Math.abs(a.dev));
          // (b) total qty per lori dan item
          out.lori = [];
          if (std.some((r) => r.lr)) {
            const lm = new Map();
            std.forEach((r) => {
              const lr = String(r.lr || "").trim().toUpperCase();
              if (!lr || !(r.q > 0)) return;
              const k = anLabel(r) + "\u0001" + lr;
              if (!lm.has(k)) lm.set(k, { lr, item: anLabel(r), q: 0, n: 0 });
              const o = lm.get(k);
              o.q += r.q; o.n++;
            });
            const byItem = new Map();
            lm.forEach((o) => { if (!byItem.has(o.item)) byItem.set(o.item, []); byItem.get(o.item).push(o); });
            byItem.forEach((list) => {
              list.forEach((o) => {
                const ref = list.filter((x) => x !== o).map((x) => x.q);
                if (ref.length < MIN_REF) return;
                const { med, z } = rz(ref, o.q);
                if (Math.abs(z) < Z_CUT) return;
                out.lori.push({ lr: o.lr, item: o.item, q: o.q, usual: med, dev: ((o.q - med) / med) * 100, z, nv: o.n, nref: ref.length, hi: Math.abs(z) >= Z_CUT * 2 });
              });
            });
            out.lori.sort((a, b) => Math.abs(b.z) - Math.abs(a.z));
          }
        }
        return out;
      }
      /* Pembuktian akurasi: tiap voucher yang ditandai dicocokkan dengan hasil counting (bila sudah dimuat) dan bisa diberi putusan petugas
   (salah item / normal). Putusan disimpan di HP ini dan dipakai menghitung seberapa sering tanda peringatan terbukti. */
      const K_ANFB = "warehouse_so_clr_anfb_v1";
      let anFb = ld(K_ANFB, {});
      if (!anFb || typeof anFb !== "object" || Array.isArray(anFb)) anFb = {};
      // format lama (teks "salah"/"normal") -> { v, at, by } agar bisa disinkronkan per voucher (yang terbaru menang)
      Object.keys(anFb).forEach((k) => { if (typeof anFb[k] === "string") anFb[k] = { v: anFb[k], at: "2026-01-01T00:00:00.000Z", by: "" }; });
      const anV = (k) => (anFb[k] && anFb[k].v) || "";
      let anSt = new Map();
      const anKey = (v) => (typeof clrKey === "function" ? clrKey(v) : String(v));
      const anStLabel = { ok: ["Counting cocok", "ok"], qty: ["Counting selisih", "red"], nq: ["Qty kosong", "wip"], belum: ["Belum dihitung", "wip"], dup: ["Dobel hitung", "red"] };
      function anX(v) {
        const k = anKey(v), st = anSt.get(k), f = anV(k), l = st && anStLabel[st], by = f && anFb[k].by ? " oleh " + esc(anFb[k].by) : "";
        const bt = (val, lb) => `<button class="btn ${f === val ? "pri" : "sec"} sm" type="button" aria-pressed="${f === val}" data-anfb="${esc(k)}|${val}">${lb}</button>`;
        return `<div class="an-x">${l ? `<span class="pill2 ${l[1]}">${l[0]}</span> ` : ""}` + bt("salah", "Salah item") + " " + bt("normal", "Normal") + (f ? `<span class="fine">Putusan${by}</span>` : "") + "</div>";
      }
      /* hitung akurasi peringatan: ditandai, sudah diputuskan petugas (salah/normal), dan kecocokan dengan counting */
      function anStats(R, st) {
        const fl = new Set([...R.machine, ...R.weight, ...R.qty].map((x) => anKey(x.v)));
        const o = { flag: fl.size, salah: 0, normal: 0, chk: 0, pct: 0, cmN: 0, cm: 0 };
        fl.forEach((k) => {
          if (anV(k) === "salah") o.salah++; else if (anV(k) === "normal") o.normal++;
          const s0 = st && st.get(k);
          if (s0 && s0 !== "belum") { o.cmN++; if (s0 === "qty" || s0 === "dup") o.cm++; }
        });
        o.chk = o.salah + o.normal;
        o.pct = o.chk ? Math.round((o.salah / o.chk) * 100) : 0;
        return o;
      }
      // dipakai kartu Clearing di Monitoring (data laporan + putusan yang tersinkron)
      let anSumMemo = null, anVer = 0; // anVer naik tiap putusan berubah
      function anSummary() {
        if (typeof clrRep === "undefined" || !clrRep || !clrRep.rows || !clrRep.rows.length) return null;
        const key = [clrRep.rows, clrRep.rows.length, typeof clrCnt !== "undefined" && clrCnt ? clrCnt.rows : null, typeof clrCnt !== "undefined" && clrCnt ? clrCnt.rows.length : 0, anCfg.pct, anFb, anVer];
        if (anSumMemo && anSumMemo.key.every((v, i) => v === key[i])) return anSumMemo.val;
        const val = anSummaryRaw();
        anSumMemo = { key, val };
        return val;
      }
      function anSummaryRaw() {
        if (typeof clrRep === "undefined" || !clrRep || !clrRep.rows || !clrRep.rows.length) return null;
        const R = clrAnomaly(clrRep.rows, anCfg.pct);
        if (!R.cols.mc && !R.cols.nw && !R.cols.gw && !R.cols.q) return null;
        const st = new Map();
        try { if (typeof clrBuild === "function" && clrCnt) clrBuild().forEach((x) => st.set(anKey(x.v), x.st)); } catch (e) {}
        const o = anStats(R, st);
        o.plan = anPlan(R).filter((x) => !anV(x.k));
        o.planAll = o.plan.length + [...new Set([...R.machine, ...R.weight, ...R.qty].map((x) => anKey(x.v)))].filter((k) => anV(k)).length;
        o.lori = R.lori;
        return o;
      }
      function anSetVerdict(k, val) {
        anFb[k] = { v: val, at: new Date().toISOString(), by: typeof curName === "function" ? curName() : "" };
        anVer++;
        sv(K_ANFB, anFb);
      }
      /* Daftar kerja: satu baris per voucher (gabungan semua sinyal), urut dari yang paling perlu dicek dulu
         (jumlah sinyal berbeda, lalu bobot: tinggi 3 / biasa 1), lengkap dengan alasan singkat, mesin dan lori. */
      function anPlan(R) {
        const info = new Map();
        (clrRep && clrRep.rows ? clrRep.rows : []).forEach((r) => { const k = anKey(r.v); if (!info.has(k)) info.set(k, r); });
        const m = new Map();
        const add = (v, w, why, layer) => {
          const k = anKey(v), r = info.get(k) || {};
          if (!m.has(k)) m.set(k, { k, v, mc: r.mc || "", lr: r.lr || "", item: anLabel(r) || "", w: 0, layers: new Set(), why: [] });
          const o = m.get(k);
          o.w += w; o.layers.add(layer); o.why.push(why);
        };
        R.machine.forEach((x) => add(x.v, x.alt ? 3 : 1, "Mesin " + x.mc + " biasanya " + x.usual + (x.alt ? ", ini selang-seling" : ""), "mesin"));
        R.weight.forEach((x) => add(x.v, x.hi ? 3 : 1, x.bad ? x.bad : "Berat " + x.f.map((f) => f.label + " " + anPct(f.dev)).join(", "), "berat"));
        R.qty.forEach((x) => add(x.v, x.hi ? 3 : 1, "Qty " + fmt(x.q) + " (median " + fmt(x.usual) + ")", "qty"));
        return [...m.values()].sort((a, b) => b.layers.size - a.layers.size || b.w - a.w || Number(a.v) - Number(b.v) || String(a.v).localeCompare(String(b.v)));
      }
      function anAcc(R) {
        const o = anStats(R, anSt);
        const a = o.chk ? `Dari ${fmt(o.chk)} voucher yang sudah diperiksa, <b>${fmt(o.salah)}</b> terbukti salah item (${o.pct}%).` : "Belum ada putusan petugas: tekan <b>Salah item</b> atau <b>Normal</b> pada voucher yang sudah dicek fisik.";
        const b = o.cmN ? ` Dari ${fmt(o.cmN)} voucher bertanda yang sudah dihitung counting, ${fmt(o.cm)} juga selisih qty.` : "";
        return `<p class="fine an-acc" role="status">Akurasi: ${a}${b}</p>`;
      }
      const AN_CAP = 15; // baris per bagian yang digambar (ribuan baris = layar berat di HP); sisanya diberi keterangan jumlah
      const anCap = (a) => a.slice(0, AN_CAP);
      const anMore = (a) => (a.length > AN_CAP ? `<p class="fine">+${fmt(a.length - AN_CAP)} lainnya (urut dari yang paling menyimpang). Cek lewat daftar kerja di Monitoring.</p>` : "");
      const anZ = (z) => (!isFinite(z) ? "pembanding seragam, nilai ini berbeda" : "z " + (z > 0 ? "+" : "−") + Math.abs(z).toFixed(1).replace(".", ","));
      const anPct = (d) => (d > 0 ? "+" : d < 0 ? "−" : "") + Math.abs(d).toFixed(1).replace(".", ",") + "%";
      function clrAnomRender() {
        const el = $("clrAnom");
        if (!el) return;
        if (typeof clrRep === "undefined" || !clrRep || !clrRep.rows.length) { el.innerHTML = ""; return; }
        const R = clrAnomaly(clrRep.rows, anCfg.pct);
        anSt = new Map();
        try { if (typeof clrBuild === "function" && clrCnt) clrBuild().forEach((x) => anSt.set(anKey(x.v), x.st)); } catch (e) {}
        if (!R.cols.mc && !R.cols.nw && !R.cols.gw) {
          el.innerHTML = '<details class="clr-an"><summary>Peringatan dini voucher · kolom belum terbaca</summary><p class="fine">Laporan ini belum memuat kolom <b>Mesin</b>, <b>Berat bersih</b>, atau <b>Berat kotor</b> (atau diimpor sebelum fitur ini ada). Impor ulang laporan voucher yang memuat kolom itu.</p></details>';
          return;
        }
        const nHi = R.machine.filter((x) => x.alt).length + R.weight.filter((x) => x.hi).length + R.qty.filter((x) => x.hi).length + R.lori.filter((x) => x.hi).length,
          total = R.machine.length + R.weight.length + R.qty.length + R.lori.length,
          open = anOpen == null ? nHi > 0 : anOpen;
        const read = [R.cols.mc ? "Mesin" : "", R.cols.nw ? "Berat bersih" : "", R.cols.gw ? "Berat kotor" : ""].filter(Boolean).join(", ");
        const mach = R.machine.length
          ? '<div class="lh">Mesin: item tidak biasa</div>' + anCap(R.machine).map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)} · ${esc(x.mc)}</b><small>${esc(x.item)} (biasanya ${esc(x.usual)})${x.alt ? " · kembali ke item biasa di voucher berikutnya" : ""}</small>${anX(x.v)}</div><span class="pill2 ${x.alt ? "red" : "wip"}">${x.alt ? "Selang-seling" : "Berbeda"}</span></div>`).join("") + anMore(R.machine)
          : R.cols.mc ? '<p class="fine">Tidak ada mesin yang berganti item secara tidak biasa.</p>' : "";
        const wt = R.weight.length
          ? '<div class="lh">Berat tidak normal</div>' + anCap(R.weight).map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)}${x.mc ? " · " + esc(x.mc) : ""}</b><small>${esc(x.item)} · Qty ${esc(fmt(x.q))}${x.f.map((f) => ` · ${f.label} ${esc(fmt(f.val))} (wajar ±${esc(fmt(f.exp))})`).join("") + anMore(R.weight)}${x.bad ? " · " + esc(x.bad) : ""}</small>${anX(x.v)}</div><span class="pill2 ${x.hi ? "red" : "wip"}">${x.f.length ? esc(anPct(x.f.sort((a, b) => Math.abs(b.dev) - Math.abs(a.dev))[0].dev)) : "Data"}</span></div>`).join("")
          : R.cols.nw || R.cols.gw ? '<p class="fine">Tidak ada berat yang menyimpang dari pola mesin dan item.</p>' : "";
        const qt = R.qty.length
          ? '<div class="lh">Qty tidak biasa</div>' + anCap(R.qty).map((x) => `<div class="lrow"><div class="lt"><b>${esc(x.v)}${x.mc ? " · " + esc(x.mc) : ""}</b><small>${esc(x.item)} · Qty ${esc(fmt(x.q))} (median ${esc(fmt(x.usual))}, ${esc(anPct(x.dev))}, ${esc(anZ(x.z))} dari ${esc(fmt(x.n))} pembanding)</small>${anX(x.v)}</div><span class="pill2 ${x.hi ? "red" : "wip"}">${x.hi ? "Tinggi" : "Cek"}</span></div>`).join("") + anMore(R.qty)
          : "";
        const lo = R.lori.length
          ? '<div class="lh">Qty per lori tidak biasa</div>' + anCap(R.lori).map((x) => `<div class="lrow"><div class="lt"><b>Lori ${esc(x.lr)}</b><small>${esc(x.item)} · total Qty ${esc(fmt(x.q))} dari ${esc(fmt(x.nv))} voucher (median lori lain ${esc(fmt(x.usual))}, ${esc(anPct(x.dev))}, ${esc(anZ(x.z))} dari ${esc(fmt(x.nref))} lori)</small></div><span class="pill2 ${x.hi ? "red" : "wip"}">${x.hi ? "Tinggi" : "Cek"}</span></div>`).join("") + anMore(R.lori)
          : "";
        el.innerHTML = `<details class="clr-an" id="clrAnD"${open ? " open" : ""}><summary>Peringatan dini voucher · ${total ? esc(fmt(R.machine.length)) + " item mesin, " + esc(fmt(R.weight.length)) + " berat" + (R.qty.length ? ", " + esc(fmt(R.qty.length)) + " qty" : "") + (R.lori.length ? ", " + esc(fmt(R.lori.length)) + " lori" : "") : "tidak ada indikasi"}</summary>` +
          `<p class="fine">Dibaca dari laporan: ${esc(read)} · ${esc(fmt(R.n))} voucher${R.afkir ? " (" + esc(fmt(R.afkir)) + " afkir dikecualikan)" : ""}. Ini indikasi statistik (skor-z robust, ambang 3,5), bukan bukti salah item.</p>` +
          `<label class="fine" for="clrAnPct">Ambang berat menyimpang</label><select id="clrAnPct">${[3, 5, 8].map((p) => `<option value="${p}"${anCfg.pct === p ? " selected" : ""}>${p}%</option>`).join("")}</select>` +
          anAcc(R) + mach + wt + qt + lo + "</details>";
      }
      $("clrAnom") &&
        ($("clrAnom").addEventListener("change", (e) => {
          if (e.target.id !== "clrAnPct") return;
          anCfg = { pct: +e.target.value || 3 };
          sv(K_ANOM, anCfg);
          clrAnomRender();
        }),
        $("clrAnom").addEventListener("click", (e) => {
          const fb = e.target.closest && e.target.closest("[data-anfb]");
          if (fb) {
            const [k, val] = fb.dataset.anfb.split("|");
            anSetVerdict(k, val);
            anOpen = true;
            clrAnomRender();
            return;
          }
          const s = e.target.closest && e.target.closest("summary");
          if (s && s.parentElement.id === "clrAnD") anOpen = !s.parentElement.open;
        }));
