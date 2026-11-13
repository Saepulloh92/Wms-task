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
  const [sel, setSel] = useState(null); // catatan yang detailnya sedang dibuka (jendela)
  const [openA, setOpenA] = useState(""); // area yang dibuka
  const [openP, setOpenP] = useState(""); // petugas yang dibuka
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
  const rowsOf = (kv) => kv.filter(([, v]) => v !== "" && v != null && v !== "–");
  const dq = (e) => ({ t: e.diff === 0 ? "Sesuai" : "Qty " + sgn(e.diff), c: e.diff === 0 ? "ok" : e.diff > 0 ? "pos" : "neg" });
  /** Satu catatan -> baris daftar (k judul, b label, c warna, s ringkas) + d rincian lengkap untuk jendela detail. */
  const mkItem = (id, e) => {
    if (id === "bin") { const q = stOf(e); return { k: e.key, b: q.qtyOk ? "Qty sesuai" : "Qty " + sgn(e.diff), c: q.qtyOk ? "ok" : e.diff > 0 ? "pos" : "neg", s: e.item + (e.itemAct ? " → ditemukan: " + e.itemAct : "") + " · " + fmt(e.sys) + " → " + fmt(e.fis) + (e.by ? " · " + e.by : "") + " · " + when(e.at), d: rowsOf([["Bin", e.key], ["Area", e.area], ["Item sistem", e.item], ["Stok sistem", fmt(e.sys)], ["Qty fisik", fmt(e.fis)], ["Selisih qty", e.diff === 0 ? "Sesuai" : sgn(e.diff)], ["Kesesuaian item", q.itemOk ? "Sama" : "Tidak sama"], ["Item ditemukan", e.itemAct], ["Petugas", e.by], ["Waktu", when(e.at)]]) }; }
    if (id === "kes") return { k: e.key, b: "Item beda", c: "neg", s: e.item + (e.itemAct ? " → ditemukan: " + e.itemAct : "") + (e.by ? " · " + e.by : "") + " · " + when(e.at), d: mkItem("bin", e).d };
    if (id === "dc") { const q = dq(e); return { k: e.key, b: q.t, c: q.c, s: "sistem " + fmt(e.sys) + " → fisik " + fmt(e.fis) + (e.by ? " · " + e.by : "") + " · " + when(e.at), d: rowsOf([["Item DC", e.key], ["Stok sistem", fmt(e.sys)], ["Qty fisik", fmt(e.fis)], ["Selisih", e.diff === 0 ? "Sesuai" : sgn(e.diff)], ["Petugas", e.by], ["Waktu", when(e.at)]]) }; }
    if (id === "aging") return { k: e.key, b: e.ok ? "Sesuai" : e.why || "Selisih", c: e.ok ? "ok" : "neg", s: e.item + " · tumpak " + (e.tumpakSys || "–") + (e.tumpak && e.tumpak !== e.tumpakSys ? " → " + e.tumpak : "") + " · qty " + fmt(e.sys) + " → " + (e.fis == null ? "–" : fmt(e.fis)) + (e.by ? " · " + e.by : "") + " · " + when(e.at), d: rowsOf([["Rak", e.key], ["Area", e.area], ["Item", e.item], ["Tumpak sistem", e.tumpakSys], ["Tumpak fisik", e.tumpak], ["Qty sistem", fmt(e.sys)], ["Qty fisik", e.fis == null ? "" : fmt(e.fis)], ["Hasil", e.ok ? "Sesuai" : e.why || "Selisih"], ["Petugas", e.by], ["Waktu", when(e.at)]]) };
    if (id === "muat") return { k: tgl(e.tgl), b: fmt(e.dp || 0) + " SPM", c: "ok", s: fmt(e.total || 0) + " mobil" + (e.cpS ? " · SPM copy " + fmt(e.cpS) : "") + (e.by ? " · " + e.by : ""), d: rowsOf([["Tanggal", tgl(e.tgl)], ["SPM", fmt(e.dp || 0)], ["Mobil", fmt(e.total || 0)], ["SPM copy rekomendasi", e.cpS ? fmt(e.cpS) : ""], ["Petugas", e.by]]) };
    if (id === "clr") return { k: tgl(e.tgl), b: fmt(e.n || 0) + " voucher", c: Number(e.bad) ? "neg" : "ok", s: "sesuai " + fmt(e.ok || 0) + " · belum sesuai " + fmt(e.bad || 0) + (e.by ? " · " + e.by : ""), d: rowsOf([["Tanggal", tgl(e.tgl)], ["Voucher", fmt(e.n || 0)], ["Sesuai", fmt(e.ok || 0)], ["Belum sesuai", fmt(e.bad || 0)], ["Petugas", e.by]]) };
    return null;
  };
  /** Rincian satu modul: daftar catatan pada periode ini (ikut filter area/petugas). */
  const detailOf = (id) => {
    if (id === "bin") return [...r.bins].sort((a, b) => (stOf(a).qtyOk === stOf(b).qtyOk ? 0 : stOf(a).qtyOk ? 1 : -1)).map((e) => mkItem("bin", e));
    if (id === "kes") return r.bins.filter((e) => !stOf(e).itemOk).map((e) => mkItem("kes", e));
    if (["dc", "aging", "muat", "clr"].includes(id)) return r.lists[id].map((e) => mkItem(id, e));
    return [];
  };
  const byOf = (e) => e.by || "Tanpa petugas";
  /** Semua catatan satu petugas pada periode ini (diberi nama modul di label). */
  const personItems = (name) => [].concat(
    r.bins.filter((e) => byOf(e) === name).map((e) => ({ ...mkItem("bin", e), m: "Bin" })),
    r.lists.dc.filter((e) => byOf(e) === name).map((e) => ({ ...mkItem("dc", e), m: "DC" })),
    r.lists.aging.filter((e) => byOf(e) === name).map((e) => ({ ...mkItem("aging", e), m: "Aging" })),
    r.lists.muat.filter((h) => byOf(h) === name).map((h) => ({ ...mkItem("muat", h), m: "Muat" })),
    r.lists.clr.filter((h) => byOf(h) === name).map((h) => ({ ...mkItem("clr", h), m: "Clearing" })),
  );
  /** Satu baris catatan yang bisa diketuk -> jendela detail. */
  const rb = (e, i, pre) => (
    <div className="rpt-b click" key={pre + e.k + i} role="button" tabIndex={0} onClick={() => setSel(e)}
      onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(e); } }}>
      <div className="rpt-bt"><b>{e.m ? e.m + " · " : ""}{e.k}</b><span className={"rpt-df " + e.c}>{e.b}</span></div>
      <small>{e.s}</small>
    </div>
  );
  const kbd = (fn) => (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); } };
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
                  {items.length ? items.slice(0, dlim).map((e, i) => rb(e, i, "s")) : <p className="hint">Belum ada catatan pada periode ini.</p>}
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
                  {items.length ? items.slice(0, rlim).map((e, i) => rb(e, i, "r")) : <p className="hint">Belum ada catatan pada periode ini.</p>}
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
        {r.areas.length ? r.areas.map((a) => {
          const isOpen = openA === a.area, its = isOpen ? r.bins.filter((e) => e.area === a.area).map((e) => mkItem("bin", e)) : [];
          return (
            <div className={"rpt-ag" + (isOpen ? " open" : "")} key={a.area}>
              <div className="rpt-art click" role="button" tabIndex={0} aria-expanded={isOpen} onClick={() => setOpenA(isOpen ? "" : a.area)} onKeyDown={kbd(() => setOpenA(isOpen ? "" : a.area))}>
                <b>{a.area}</b>
                <span>{fmt(a.n)}<small> / {fmt(a.total)}</small></span>
                <span className={a.qtyBad ? "bad" : ""}>{fmt(a.qtyBad || 0)}</span>
                <span className={a.itemBad ? "bad" : ""}>{fmt(a.itemBad || 0)}</span>
                <span className={"rpt-tag t-" + tone(a.n ? (a.n - (a.qtyBad || 0)) / a.n : null)}>{a.n ? pct((a.n - (a.qtyBad || 0)) / a.n) : "–"}</span>
              </div>
              {isOpen && <div className="rpt-dtl">{its.length ? its.slice(0, 30).map((e, i) => rb(e, i, "a")) : <p className="hint">Belum ada bin diperiksa di area ini.</p>}{its.length > 30 && <p className="hint">Menampilkan 30 dari {its.length}. Gunakan filter Area di atas untuk daftar lengkap.</p>}</div>}
            </div>
          );
        }        ) : <p className="hint">Tidak ada data area.</p>}
      </div>

      {r.topBad.length > 0 && <>
        <h3 className="rpt-h">Selisih terbesar</h3>
        <div className="card rpt-tb">
          {r.topBad.map((e, i) => { const it = mkItem("bin", e); return rb({ ...it, b: sgn(e.diff), c: e.diff > 0 ? "pos" : "neg" }, i, "t"); })}
        </div>
      </>}

      {r.agingBad.length > 0 && <>
        <h3 className="rpt-h">Rak Aging selisih <small>{r.mods.aging.bad} rak</small></h3>
        <div className="card rpt-tb">
          {r.agingBad.map((e, i) => rb(mkItem("aging", e), i, "g"))}
        </div>
      </>}

      <h3 className="rpt-h">Daftar bin diperiksa</h3>
      <div className="chips rpt-bf" role="group" aria-label="Filter daftar bin">
        {[["bad", "Selisih qty"], ["item", "Item beda"], ["ok", "Sesuai"], ["all", "Semua"]].map(([k, l]) => <button key={k} className={"chip" + (bf === k ? " on" : "")} aria-pressed={bf === k} onClick={() => { setBf(k); setLim(10); }}>{l} <b>{cnt[k]}</b></button>)}
      </div>
      <div className="card rpt-tb">
        {list.length ? list.slice(0, lim).map((e, i) => { const it = mkItem("bin", e); return rb({ ...it, b: it.b + (!stOf(e).itemOk ? " · Item beda" : "") }, i, "l"); }        ) : <p className="hint">Tidak ada bin pada filter ini.</p>}
        {list.length > lim && <button className="btn" onClick={() => setLim(lim + 20)}>Tampilkan lebih ({list.length - lim} lagi)</button>}
      </div>

      <h3 className="rpt-h">Aktivitas per petugas <small>{fmt(r.total)} aktivitas{r.prevTotal ? " (sebelumnya " + fmt(r.prevTotal) + ")" : ""}</small></h3>
      <div className="card rpt-pp">
        {r.people.length ? r.people.slice(0, 10).map((p) => {
          const isOpen = openP === p.name, its = isOpen ? personItems(p.name) : [];
          return (
            <div className={"rpt-pg" + (isOpen ? " open" : "")} key={p.name}>
              <div className="rpt-p click" role="button" tabIndex={0} aria-expanded={isOpen} onClick={() => setOpenP(isOpen ? "" : p.name)} onKeyDown={kbd(() => setOpenP(isOpen ? "" : p.name))}>
                <div className="rpt-pt"><b>{p.name}</b><span>{p.total}</span></div>
                <div className="rpt-pb" aria-hidden="true" style={{ width: Math.max(6, (p.total / maxP) * 100) + "%" }}>
                  {MODS.map((m) => p[m.id] ? <i key={m.id} style={{ flex: p[m.id], background: COLOR[m.id] }} /> : null)}
                </div>
                <small>{MODS.filter((m) => p[m.id]).map((m) => m.name + " " + p[m.id]).join(" · ")}</small>
              </div>
              {isOpen && <div className="rpt-dtl">{its.length ? its.slice(0, 30).map((e, i) => rb(e, i, "p")) : <p className="hint">Tidak ada catatan.</p>}{its.length > 30 && <p className="hint">Menampilkan 30 dari {its.length}.</p>}</div>}
            </div>
          );
        }        ) : <p className="hint">Belum ada aktivitas pada periode ini.</p>}
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
      {sel && (
        <div className="rpt-ov" onClick={() => setSel(null)} onKeyDown={(ev) => { if (ev.key === "Escape") setSel(null); }}>
          <div className="rpt-md card" role="dialog" aria-modal="true" aria-label={"Detail " + sel.k} onClick={(ev) => ev.stopPropagation()}>
            <div className="rpt-bt"><b>{sel.m ? sel.m + " · " : ""}{sel.k}</b><span className={"rpt-df " + sel.c}>{sel.b}</span></div>
            <dl>{(sel.d || []).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <button className="btn pri" autoFocus onClick={() => setSel(null)}>Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}
