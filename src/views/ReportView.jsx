import { useState } from "react";
import { useWms } from "../legacy/bridge.js";
import { fmt } from "../lib/format.js";
import { normSignal, needsWatch, isFilled, actualOf } from "../lib/aging.js";
import { binStatus, MODS, PERIODS, buildReport, dayKey, muatTone, pct, periodStart, reportCsv, reportText, shiftPeriod, tone } from "../lib/report.js";

const COLOR = { kes: "#b91c1c", bin: "#1d4ed8", dc: "#0f766e", aging: "#c2410c", muat: "#7c3aed", clr: "#be185d" };
const K_P = "warehouse_so_rptp_v1";
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const when = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : d.getDate() + " " + BULAN[d.getMonth()] + " " + String(d.getHours()).padStart(2, "0") + "." + String(d.getMinutes()).padStart(2, "0"); };
const sgn = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n));

/** Batang per ember waktu (hari/bulan). Hari/bulan berjalan diberi garis, yang belum tiba diredupkan. */
function Spark({ vals, bk, color }) {
  const mx = Math.max(1, ...vals);
  return (
    <span className={"rpt-spark" + (bk.length > 12 ? " dense" : "")} style={{ gridTemplateColumns: "repeat(" + bk.length + ",1fr)" }} aria-hidden="true">
      {vals.map((v, i) => (
        <i key={i} className={(bk[i].isToday ? "now " : "") + (bk[i].isFuture ? "fut" : "")}>
          <b style={{ height: Math.max(v ? 14 : 3, (v / mx) * 100) + "%", background: v ? color : undefined }} />
        </i>
      ))}
    </span>
  );
}

/** Menu "Laporan": ringkasan SPV per minggu / bulan / tahun, termasuk rincian per bin dan per area. */
export default function ReportView() {
  const wms = useWms();
  const [period, setPeriod] = useState(() => { try { const v = localStorage.getItem(K_P); return ["week", "month", "year"].includes(v) ? v : "week"; } catch (e) { return "week"; } });
  const [off, setOff] = useState(0); // 0 = periode berjalan, -1 = sebelumnya, dst.
  const [area, setArea] = useState("");
  const [by, setBy] = useState("");
  const [bf, setBf] = useState("bad"); // daftar bin: bad (selisih qty) | item (item beda) | ok | all
  const [lim, setLim] = useState(10);
  const [open, setOpen] = useState(""); // modul yang rinciannya dibuka (ketuk barisnya)
  const [dlim, setDlim] = useState(15);
  const [openR, setOpenR] = useState(""); // kartu "Rincian per modul" yang dibuka
  const [rlim, setRlim] = useState(15);
  if (wms.view !== "rpt" || !wms.DATA) return <section id="v-rpt" hidden />;

  const { DATA, counts, stat, aging } = wms;
  const now = new Date();
  let start = periodStart(period, now);
  for (let i = 0; i < -off; i++) start = shiftPeriod(period, start, -1);
  const isNow = off === 0;
  const rowOf = new Map(DATA.map((x) => [x.bin, x]));

  const events = [];
  DATA.forEach((x) => {
    const c = counts[x.bin];
    if (c && c.savedAt) {
      const sys = Number(c.systemQty ?? x.onhand) || 0; // stok sistem saat dicek (sama dengan yang dipakai menu Periksa Bin)
      events.push({ mod: "bin", at: c.savedAt, by: c.by, ok: stat(x) === "ok", itemOk: c.itemMatch === true, qtyOk: Number(c.actualQty) === sys, diff: Number(c.actualQty) - sys, key: x.bin, area: x.area, item: x.item, sys, fis: Number(c.actualQty), itemAct: c.itemMatch === false ? c.actualItem || "" : "" });
    }
  });
  (wms.dcRows ? wms.dcRows() : []).forEach((x) => {
    if ((x.st === "ok" || x.st === "bad") && x.at) events.push({ mod: "dc", at: x.at, by: x.by, ok: x.st === "ok", diff: x.diff, key: x.item, item: x.item, sys: x.sys, fis: x.fis });
  });
  Object.entries(aging || {}).forEach(([bin, a]) => {
    const x = rowOf.get(bin);
    if (!a || !a.at || !x) return;
    const t = actualOf(x, a); // aturan tunggal "aktual": sama dengan menu Aging, CSV, dan Sheets
    events.push({ mod: "aging", at: a.at, by: a.by, ok: t.ok, diff: t.diff, key: bin, area: x.area, item: x.item, sys: t.sys, fis: t.qty, tumpakSys: x.tumpak || "", tumpak: t.tumpak, itemAct: t.item, why: t.reasons.join(", ") });
  });

  const inArea = (x) => !area || x.area === area;
  const agingTodo = DATA.filter((x) => inArea(x) && isFilled(x) && needsWatch(normSignal(x.sinyal)) && !(aging || {})[x.bin]).length;
  const binTodo = DATA.filter((x) => inArea(x) && !counts[x.bin]).length;
  const areaTotals = {};
  DATA.forEach((x) => { areaTotals[x.area] = (areaTotals[x.area] || 0) + 1; });
  const staffNames = [...new Set([...wms.staff().map((u) => u.name), ...events.map((e) => e.by).filter(Boolean)])].sort();

  const r = buildReport({
    period, start, today: now, events, muat: wms.muatHist || [], clr: wms.clrHist || [],
    staff: wms.staff().map((u) => u.name), agingTodo, binTodo, areaTotals, filters: { area, by },
  });
  const M = r.mods, maxP = Math.max(1, ...r.people.map((p) => p.total));
  const nm = { week: "minggu", month: "bulan", year: "tahun" }[period];
  const sub = isNow ? "Berjalan · hari ke-" + r.elapsedDays + " dari " + r.totalDays : off === -1 ? nm[0].toUpperCase() + nm.slice(1) + " lalu" : Math.abs(off) + " " + nm + " lalu";

  const rows = [
    { id: "bin", name: "Stok per Bin", main: M.bin.n, sub: "bin diperiksa · selisih qty " + fmt(M.bin.qtyBad), tag: pct(M.bin.accQty), tn: tone(M.bin.accQty) },
    { id: "kes", name: "Kesesuaian Rak", main: M.bin.itemBad, sub: "item tidak sama dari " + fmt(M.bin.n) + " rak", tag: pct(M.bin.accItem), tn: tone(M.bin.accItem), perB: M.bin.perItemBad, inv: true },
    { id: "dc", main: M.dc.n, sub: "item DC selesai", tag: pct(M.dc.acc), tn: tone(M.dc.acc) },
    { id: "aging", main: M.aging.n, sub: "rak Aging dicek", tag: pct(M.aging.acc), tn: tone(M.aging.acc) },
    { id: "muat", main: M.muat.days, sub: fmt(M.muat.spm) + " SPM · " + fmt(M.muat.mobil) + " mobil", tag: M.muat.days + "/" + r.elapsedDays + " hr", tn: muatTone(M.muat.days, r.elapsedDays) },
    { id: "clr", main: fmt(M.clr.vouchers), sub: "voucher Clearing", tag: pct(M.clr.acc), tn: tone(M.clr.acc) },
  ];
  const det = [
    ["bin", [["Diperiksa", fmt(M.bin.n) + " / " + fmt(DATA.filter(inArea).length)], ["Qty sesuai", fmt(M.bin.qtyOk)], ["Selisih qty", fmt(M.bin.qtyBad)], ["Qty lebih / kurang", sgn(M.bin.pos) + " / " + sgn(M.bin.neg)]], "Stok per Bin"],
    ["kes", [["Diperiksa", fmt(M.bin.n)], ["Item sama", fmt(M.bin.itemOk)], ["Item tidak sama", fmt(M.bin.itemBad)], ["Sesuai penuh", fmt(M.bin.ok) + " (" + pct(M.bin.acc) + ")"]], "Kesesuaian Rak"],
    ["dc", [["Item selesai", fmt(M.dc.n)], ["Sesuai", fmt(M.dc.ok)], ["Selisih", fmt(M.dc.bad)], ["Qty lebih / kurang", sgn(M.dc.pos) + " / " + sgn(M.dc.neg)]]],
    ["aging", [["Rak dicek", fmt(M.aging.n)], ["Sesuai", fmt(M.aging.ok)], ["Selisih", fmt(M.aging.bad)], ["Kuning/Merah belum dicek", fmt(agingTodo)]]],
    ["muat", [["Hari lapor", M.muat.days + " / " + r.elapsedDays], ["SPM", fmt(M.muat.spm)], ["Mobil", fmt(M.muat.mobil)], ["SPM copy rekom.", fmt(M.muat.cp)]]],
    ["clr", [["Hari clearing", fmt(M.clr.days)], ["Voucher", fmt(M.clr.vouchers)], ["Sesuai", fmt(M.clr.ok)], ["Belum sesuai", fmt(M.clr.bad)]]],
  ];

  const stOf = (e) => binStatus(e);
  const list = r.bins.filter((e) => bf === "all" || (bf === "bad" ? !stOf(e).qtyOk : bf === "item" ? !stOf(e).itemOk : e.ok));
  const cnt = { bad: r.bins.filter((e) => !stOf(e).qtyOk).length, item: r.bins.filter((e) => !stOf(e).itemOk).length, ok: r.bins.filter((e) => e.ok).length, all: r.bins.length };

  const tgl = (k) => { const d = new Date(String(k).slice(0, 10) + "T00:00:00"); return isNaN(d) ? String(k || "") : d.getDate() + " " + BULAN[d.getMonth()] + " " + d.getFullYear(); };
  /** Rincian satu modul: daftar catatan pada periode ini (ikut filter area/petugas). */
  const detailOf = (id) => {
    const bs = (e) => stOf(e);
    const dq = (e) => ({ t: e.diff === 0 ? "Sesuai" : "Qty " + sgn(e.diff), c: e.diff === 0 ? "ok" : e.diff > 0 ? "pos" : "neg" });
    if (id === "bin") return [...r.bins].sort((a, b) => (bs(a).qtyOk === bs(b).qtyOk ? 0 : bs(a).qtyOk ? 1 : -1)).map((e) => ({ k: e.key, b: bs(e).qtyOk ? "Qty sesuai" : "Qty " + sgn(e.diff), c: bs(e).qtyOk ? "ok" : e.diff > 0 ? "pos" : "neg", s: e.item + " · " + fmt(e.sys) + " → " + fmt(e.fis) + (e.by ? " · " + e.by : "") + " · " + when(e.at) }));
    if (id === "kes") return r.bins.filter((e) => !bs(e).itemOk).map((e) => ({ k: e.key, b: "Item beda", c: "neg", s: e.item + (e.itemAct ? " → ditemukan: " + e.itemAct : "") + (e.by ? " · " + e.by : "") + " · " + when(e.at) }));
    if (id === "dc") return r.lists.dc.map((e) => ({ k: e.key, ...(() => { const q = dq(e); return { b: q.t, c: q.c }; })(), s: "sistem " + fmt(e.sys) + " → fisik " + fmt(e.fis) + (e.by ? " · " + e.by : "") + " · " + when(e.at) }));
    if (id === "aging") return r.lists.aging.map((e) => ({ k: e.key, b: e.ok ? "Sesuai" : e.why || "Selisih", c: e.ok ? "ok" : "neg", s: e.item + " · tumpak " + (e.tumpakSys || "–") + (e.tumpak && e.tumpak !== e.tumpakSys ? " → " + e.tumpak : "") + " · qty " + fmt(e.sys) + " → " + (e.fis == null ? "–" : fmt(e.fis)) + (e.by ? " · " + e.by : "") + " · " + when(e.at) }));
    if (id === "muat") return r.lists.muat.map((h) => ({ k: tgl(h.tgl), b: fmt(h.dp || 0) + " SPM", c: "ok", s: fmt(h.total || 0) + " mobil" + (h.cpS ? " · SPM copy " + fmt(h.cpS) : "") + (h.by ? " · " + h.by : "") }));
    if (id === "clr") return r.lists.clr.map((h) => ({ k: tgl(h.tgl), b: fmt(h.n || 0) + " voucher", c: Number(h.bad) ? "neg" : "ok", s: "sesuai " + fmt(h.ok || 0) + " · belum sesuai " + fmt(h.bad || 0) + (h.by ? " · " + h.by : "") }));
    return [];
  };
  const toggle = (id) => { setOpen(open === id ? "" : id); setDlim(15); };
  const toggleR = (id) => { setOpenR(openR === id ? "" : id); setRlim(15); };

  const pick = (p) => { setPeriod(p); setOff(0); setLim(10); try { localStorage.setItem(K_P, p); } catch (e) {} };
  const copy = () => wms.outText(reportText(r, { area, by })).then(() => wms.toast("Tersalin. Tempel di WhatsApp."), () => wms.toast("Gagal menyalin. Izinkan akses clipboard di browser."));
  const csv = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([reportCsv(r, events.filter((e) => (!by || (e.by || "Tanpa petugas") === by) && (!area || e.area == null || e.area === area)))], { type: "text/csv;charset=utf-8" }));
    a.download = "laporan-" + period + "-" + dayKey(r.start) + ".csv";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  };
  const hdr = (b, i) => (period === "month" ? (i === 0 || ((i + 1) % 10 === 0 && i < r.buckets.length - 2) ? b.label : "") : b.label);

  return (
    <section id="v-rpt" hidden className="rpt">
      <div className="chips rpt-per" role="group" aria-label="Periode laporan">
        {PERIODS.map((p) => <button key={p.id} className={"chip" + (period === p.id ? " on" : "")} aria-pressed={period === p.id} onClick={() => pick(p.id)}>{p.name}</button>)}
      </div>
      <div className="rpt-nav">
        <button className="btn sm" aria-label={"Sebelumnya"} onClick={() => { setOff(off - 1); setLim(10); }}>‹</button>
        <div className="rpt-wk" aria-live="polite"><b>{r.label}</b><small>{sub}</small></div>
        <button className="btn sm" aria-label="Berikutnya" disabled={isNow} onClick={() => { setOff(Math.min(0, off + 1)); setLim(10); }}>›</button>
      </div>
      {!isNow && <button className="chip rpt-now" onClick={() => { setOff(0); setLim(10); }}>Kembali ke {nm} ini</button>}
      <div className="rpt-flt">
        <label>Area<select value={area} onChange={(e) => { setArea(e.target.value); setLim(10); }}><option value="">Semua area</option>{wms.areas().map((a) => <option key={a} value={a}>{a}</option>)}</select></label>
        <label>Petugas<select value={by} onChange={(e) => { setBy(e.target.value); setLim(10); }}><option value="">Semua petugas</option>{staffNames.map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
      </div>
      {area && <p className="rpt-fn">Filter area berlaku untuk Per Bin dan Aging. DC, Muat, dan Clearing tidak dibagi per area.</p>}

      <div className="card rpt-sum" role="table" aria-label="Ringkasan aktivitas">
        <div className="rpt-hd" role="row">
          <span>Aktivitas</span>
          <span><span className={"rpt-days" + (r.buckets.length > 7 ? " dense" : "")} style={{ gridTemplateColumns: "repeat(" + r.buckets.length + ",1fr)" }} aria-hidden="true">{r.buckets.map((b, i) => <i key={b.key} className={b.isToday ? "now" : ""}>{hdr(b, i)}</i>)}</span></span>
          <span>vs lalu</span>
        </div>
        {rows.map((x) => {
          const m = x.name ? { name: x.name } : MODS.find((q) => q.id === x.id), dl = r.delta[x.id];
          const isOpen = open === x.id, items = isOpen ? detailOf(x.id) : [];
          return (
            <div className={"rpt-grp" + (isOpen ? " open" : "")} key={x.id}>
              <div className="rpt-row" role="row" style={{ "--mc": COLOR[x.id] }} tabIndex={0} aria-expanded={isOpen} aria-controls={"rptd-" + x.id}
                onClick={() => toggle(x.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(x.id); } }}>
                <div className="rpt-nm" role="cell"><b>{m.name}</b><small>{x.sub}</small></div>
                <div className="rpt-mid" role="cell"><span className="rpt-big">{x.main}</span><Spark vals={x.perB || M[x.id].perB} bk={r.buckets} color={COLOR[x.id]} /></div>
                <div className="rpt-rt" role="cell">
                  <span className={"rpt-dl " + (x.inv ? "inv " : "") + (dl > 0 ? "up" : dl < 0 ? "dn" : "")} aria-label={dl > 0 ? "naik " + dl : dl < 0 ? "turun " + -dl : "sama"}>{dl > 0 ? "▲" + fmt(dl) : dl < 0 ? "▼" + fmt(-dl) : "＝"}</span>
                  <span className={"rpt-tag t-" + x.tn}>{x.tag}</span>
                </div>
              </div>
              {isOpen && (
                <div className="rpt-dtl" id={"rptd-" + x.id} style={{ "--mc": COLOR[x.id] }}>
                  {items.length ? items.slice(0, dlim).map((e, i) => (
                    <div className="rpt-b" key={e.k + i}>
                      <div className="rpt-bt"><b>{e.k}</b><span className={"rpt-df " + e.c}>{e.b}</span></div>
                      <small>{e.s}</small>
                    </div>
                  )) : <p className="hint">Belum ada catatan pada periode ini.</p>}
                  {items.length > dlim && <button className="btn sm" onClick={() => setDlim(dlim + 20)}>Tampilkan lebih ({items.length - dlim} lagi)</button>}
                </div>
              )}
            </div>
          );
        })}
        <p className="rpt-foot">Ketuk baris untuk melihat rincian. {period === "week" ? "Batang = Sen–Min" : period === "month" ? "Batang = tiap tanggal" : "Batang = Jan–Des"}, garis = {period === "year" ? "bulan" : "hari"} ini. “vs lalu” dibanding {r.prevLabel}{isNow ? " pada titik waktu yang sama" : ""}. Label: hijau ≥95%, kuning ≥85%, merah di bawahnya.</p>
      </div>

      <h3 className="rpt-h">Perlu perhatian</h3>
      <div className="card rpt-fl">
        {r.flags.length ? r.flags.map((f, i) => (
          <div key={i} className={"rpt-f f-" + f.lvl}><i aria-hidden="true">{f.lvl === "r" ? "!" : f.lvl === "a" ? "•" : "i"}</i><span>{f.t}</span></div>
        )) : <div className="rpt-f f-g"><i aria-hidden="true">✓</i><span>Tidak ada yang perlu ditindaklanjuti.</span></div>}
      </div>

      <h3 className="rpt-h">Rincian per modul</h3>
      <div className="rpt-dt">
        {det.map(([id, kv, title]) => {
          const isOpen = openR === id, items = isOpen ? detailOf(id) : [];
          return (
            <div className={"card rpt-dc" + (isOpen ? " open" : "")} key={id} style={{ "--mc": COLOR[id] }}>
              <div className="rpt-dh" role="button" tabIndex={0} aria-expanded={isOpen} aria-controls={"rptr-" + id}
                onClick={() => toggleR(id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleR(id); } }}>
                <b>{title || MODS.find((m) => m.id === id).name}</b>
                <dl>{kv.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </div>
              {isOpen && (
                <div className="rpt-dtl" id={"rptr-" + id}>
                  {items.length ? items.slice(0, rlim).map((e, i) => (
                    <div className="rpt-b" key={e.k + i}>
                      <div className="rpt-bt"><b>{e.k}</b><span className={"rpt-df " + e.c}>{e.b}</span></div>
                      <small>{e.s}</small>
                    </div>
                  )) : <p className="hint">Belum ada catatan pada periode ini.</p>}
                  {items.length > rlim && <button className="btn sm" onClick={() => setRlim(rlim + 20)}>Tampilkan lebih ({items.length - rlim} lagi)</button>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3 className="rpt-h">Per Bin: stok &amp; kesesuaian rak <small>{fmt(M.bin.n)} diperiksa · qty {pct(M.bin.accQty)} · item {pct(M.bin.accItem)}</small></h3>
      <div className="card rpt-ar">
        <div className="rpt-art rpt-arh"><span>Area</span><span>Periksa</span><span>Selisih qty</span><span>Item beda</span><span>Qty OK</span></div>
        {r.areas.length ? r.areas.map((a) => (
          <div className="rpt-art" key={a.area}>
            <b>{a.area}</b>
            <span>{fmt(a.n)}<small> / {fmt(a.total)}</small></span>
            <span className={a.qtyBad ? "bad" : ""}>{fmt(a.qtyBad || 0)}</span>
            <span className={a.itemBad ? "bad" : ""}>{fmt(a.itemBad || 0)}</span>
            <span className={"rpt-tag t-" + tone(a.n ? (a.n - (a.qtyBad || 0)) / a.n : null)}>{a.n ? pct((a.n - (a.qtyBad || 0)) / a.n) : "–"}</span>
          </div>
        )) : <p className="hint">Tidak ada data area.</p>}
      </div>

      {r.topBad.length > 0 && <>
        <h3 className="rpt-h">Selisih terbesar</h3>
        <div className="card rpt-tb">
          {r.topBad.map((e, i) => (
            <div className="rpt-b" key={e.key + i}>
              <div className="rpt-bt"><b>{e.key}</b><span className={"rpt-df " + (e.diff > 0 ? "pos" : "neg")}>{sgn(e.diff)}</span></div>
              <small>{e.item} · sistem {fmt(e.sys)} → fisik {fmt(e.fis)}{e.by ? " · " + e.by : ""} · {when(e.at)}</small>
            </div>
          ))}
        </div>
      </>}

      {r.agingBad.length > 0 && <>
        <h3 className="rpt-h">Rak Aging selisih <small>{r.mods.aging.bad} rak</small></h3>
        <div className="card rpt-tb">
          {r.agingBad.map((e, i) => (
            <div className="rpt-b" key={e.key + i}>
              <div className="rpt-bt"><b>{e.key}</b><span className="rpt-df neg">{e.why || "Selisih"}</span></div>
              <small>{e.item} · tumpak {e.tumpakSys || "–"}{e.tumpak && e.tumpak !== e.tumpakSys ? " → " + e.tumpak : ""} · qty {fmt(e.sys)} → {e.fis == null ? "–" : fmt(e.fis)}{e.by ? " · " + e.by : ""} · {when(e.at)}</small>
            </div>
          ))}
        </div>
      </>}

      <h3 className="rpt-h">Daftar bin diperiksa</h3>
      <div className="chips rpt-bf" role="group" aria-label="Filter daftar bin">
        {[["bad", "Selisih qty"], ["item", "Item beda"], ["ok", "Sesuai"], ["all", "Semua"]].map(([k, l]) => <button key={k} className={"chip" + (bf === k ? " on" : "")} aria-pressed={bf === k} onClick={() => { setBf(k); setLim(10); }}>{l} <b>{cnt[k]}</b></button>)}
      </div>
      <div className="card rpt-tb">
        {list.length ? list.slice(0, lim).map((e, i) => (
          <div className="rpt-b" key={e.key + i}>
            <div className="rpt-bt"><b>{e.key}</b><span className="rpt-pl">{!stOf(e).itemOk && <span className="rpt-df neg">Item beda</span>}<span className={"rpt-df " + (stOf(e).qtyOk ? "ok" : e.diff > 0 ? "pos" : "neg")}>{stOf(e).qtyOk ? "Qty sesuai" : "Qty " + sgn(e.diff)}</span></span></div>
            <small>{e.item}{e.itemAct ? " → ditemukan: " + e.itemAct : ""} · {fmt(e.sys)} → {fmt(e.fis)}{e.by ? " · " + e.by : ""} · {when(e.at)}</small>
          </div>
        )) : <p className="hint">Tidak ada bin pada filter ini.</p>}
        {list.length > lim && <button className="btn" onClick={() => setLim(lim + 20)}>Tampilkan lebih ({list.length - lim} lagi)</button>}
      </div>

      <h3 className="rpt-h">Aktivitas per petugas <small>{fmt(r.total)} aktivitas{r.prevTotal ? " (sebelumnya " + fmt(r.prevTotal) + ")" : ""}</small></h3>
      <div className="card rpt-pp">
        {r.people.length ? r.people.slice(0, 10).map((p) => (
          <div className="rpt-p" key={p.name}>
            <div className="rpt-pt"><b>{p.name}</b><span>{p.total}</span></div>
            <div className="rpt-pb" aria-hidden="true" style={{ width: Math.max(6, (p.total / maxP) * 100) + "%" }}>
              {MODS.map((m) => p[m.id] ? <i key={m.id} style={{ flex: p[m.id], background: COLOR[m.id] }} /> : null)}
            </div>
            <small>{MODS.filter((m) => p[m.id]).map((m) => m.name + " " + p[m.id]).join(" · ")}</small>
          </div>
        )) : <p className="hint">Belum ada aktivitas pada periode ini.</p>}
      </div>

      <div className="rpt-act">
        <button className="btn pri" onClick={copy}>Salin ringkasan WhatsApp</button>
        <button className="btn" onClick={csv}>Unduh CSV (Excel)</button>
        <button className="btn" onClick={() => window.print()}>Cetak / PDF</button>
      </div>
      <p className="hint rpt-note">
        Dihitung dari catatan di perangkat ini (tersinkron bila sinkron aktif). Bin/rak yang diperiksa ulang dihitung pada waktu pemeriksaan terakhir.
        {r.coverage.muatCut && " Riwayat Muat tersedia sejak " + r.coverage.muatSince + "."}
        {r.coverage.clrCut && " Riwayat Clearing tersedia sejak " + r.coverage.clrSince + "."}
        {" "}Riwayat Muat dan Clearing hanya menyimpan 60 hari terakhir, jadi laporan tahunan untuk dua modul itu terbatas pada rentang tersebut.
      </p>
    </section>
  );
}
