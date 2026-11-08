import { useState } from "react";
import { useWms } from "../legacy/bridge.js";
import { fmt } from "../lib/format.js";
import { normSignal, needsWatch, isFilled } from "../lib/aging.js";
import { MODS, addDays, buildWeekly, tone, weekLabel, weekStart, weeklyText } from "../lib/weekly.js";

const pct = (a) => (a == null ? "–" : Math.round(a * 100) + "%");
const COLOR = { bin: "#1d4ed8", dc: "#0f766e", aging: "#c2410c", muat: "#7c3aed", clr: "#be185d" };

/** Batang 7 hari (Sen–Min). Hari ini diberi garis, hari yang belum tiba diredupkan. */
function Spark({ vals, days, color }) {
  const mx = Math.max(1, ...vals);
  return (
    <span className="rpt-spark" aria-hidden="true">
      {vals.map((v, i) => (
        <i key={i} className={(days[i].isToday ? "now " : "") + (days[i].isFuture ? "fut" : "")}>
          <b style={{ height: Math.max(v ? 12 : 3, (v / mx) * 100) + "%", background: v ? color : undefined }} />
        </i>
      ))}
    </span>
  );
}

/** Menu "Laporan Mingguan": satu layar untuk SPV monitoring (Per Bin, DC, Aging, Muat, Clearing). */
export default function WeeklyView() {
  const wms = useWms();
  const [off, setOff] = useState(0); // 0 = minggu ini, -1 = minggu lalu, dst.
  if (wms.view !== "rpt" || !wms.DATA) return <section id="v-rpt" hidden />;

  const { DATA, counts, stat, aging } = wms;
  const now = new Date();
  const start = addDays(weekStart(now), off * 7);
  const onhand = new Map(DATA.map((x) => [x.bin, Number(x.onhand) || 0]));

  const events = [];
  DATA.forEach((x) => {
    const c = counts[x.bin];
    if (c && c.savedAt) events.push({ mod: "bin", at: c.savedAt, by: c.by, ok: stat(x) === "ok", diff: Number(c.actualQty) - (Number(x.onhand) || 0) });
  });
  (wms.dcRows ? wms.dcRows() : []).forEach((r) => {
    if ((r.st === "ok" || r.st === "bad") && r.at) events.push({ mod: "dc", at: r.at, by: r.by, ok: r.st === "ok", diff: r.diff });
  });
  Object.entries(aging || {}).forEach(([bin, a]) => {
    if (!a || !a.at || a.qty === "" || a.qty == null) return;
    const sys = onhand.get(bin);
    const diff = sys == null ? 0 : Number(a.qty) - sys;
    events.push({ mod: "aging", at: a.at, by: a.by, ok: diff === 0, diff });
  });
  const agingTodo = DATA.filter((x) => isFilled(x) && needsWatch(normSignal(x.sinyal)) && !(aging || {})[x.bin]).length;

  const r = buildWeekly({
    start, today: now, events, muat: wms.muatHist || [], clr: wms.clrHist || [],
    staff: wms.staff().map((u) => u.name), agingTodo,
  });
  const M = r.mods;
  const isNow = off === 0;
  const maxP = Math.max(1, ...r.people.map((p) => p.total));

  const rows = [
    { id: "bin", main: M.bin.n, sub: "bin diperiksa", tag: pct(M.bin.acc), tn: tone(M.bin.acc), hint: "akurasi" },
    { id: "dc", main: M.dc.n, sub: "item DC selesai", tag: pct(M.dc.acc), tn: tone(M.dc.acc), hint: "sesuai" },
    { id: "aging", main: M.aging.n, sub: "rak Aging dicek", tag: pct(M.aging.acc), tn: tone(M.aging.acc), hint: "sesuai" },
    { id: "muat", main: M.muat.n + "/7", sub: fmt(M.muat.spm) + " SPM · " + fmt(M.muat.mobil) + " mobil", tag: M.muat.n + " hari", tn: M.muat.n >= 6 ? "g" : M.muat.n >= 4 ? "a" : M.muat.n ? "r" : "n", hint: "lapor" },
    { id: "clr", main: fmt(M.clr.vouchers), sub: "voucher Clearing", tag: pct(M.clr.acc), tn: tone(M.clr.acc), hint: "sesuai" },
  ];

  const copy = () => wms.outText(weeklyText(r)).then(() => wms.toast("Tersalin. Tempel di WhatsApp."), () => wms.toast("Gagal menyalin. Izinkan akses clipboard di browser."));

  return (
    <section id="v-rpt" hidden className="rpt">
      <div className="rpt-nav">
        <button className="btn sm" aria-label="Minggu sebelumnya" onClick={() => setOff(off - 1)}>‹</button>
        <div className="rpt-wk" aria-live="polite">
          <b>{weekLabel(start)}</b>
          <small>{isNow ? "Minggu ini (berjalan)" : off === -1 ? "Minggu lalu" : Math.abs(off) + " minggu lalu"}</small>
        </div>
        <button className="btn sm" aria-label="Minggu berikutnya" disabled={isNow} onClick={() => setOff(Math.min(0, off + 1))}>›</button>
      </div>
      {!isNow && <button className="chip rpt-now" onClick={() => setOff(0)}>Kembali ke minggu ini</button>}

      <div className="card rpt-sum" role="table" aria-label="Ringkasan aktivitas mingguan">
        <div className="rpt-hd" role="row">
          <span>Aktivitas</span>
          <span className="rpt-days" aria-hidden="true">{r.days.map((d) => <i key={d.key} className={d.isToday ? "now" : ""}>{d.label[0]}</i>)}</span>
          <span>vs lalu</span>
        </div>
        {rows.map((x) => {
          const m = MODS.find((q) => q.id === x.id), dl = r.delta[x.id];
          return (
            <div className="rpt-row" role="row" key={x.id} style={{ "--mc": COLOR[x.id] }}>
              <div className="rpt-nm" role="cell"><b>{m.name}</b><small>{x.sub}</small></div>
              <div className="rpt-mid" role="cell">
                <span className="rpt-big">{x.main}</span>
                <Spark vals={M[x.id].perDay} days={r.days} color={COLOR[x.id]} />
              </div>
              <div className="rpt-rt" role="cell">
                <span className={"rpt-dl " + (dl > 0 ? "up" : dl < 0 ? "dn" : "")} aria-label={dl > 0 ? "naik " + dl : dl < 0 ? "turun " + -dl : "sama"}>{dl > 0 ? "▲" + dl : dl < 0 ? "▼" + -dl : "＝"}</span>
                <span className={"rpt-tag t-" + x.tn}>{x.tag}</span>
              </div>
            </div>
          );
        })}
        <p className="rpt-foot">Batang = Sen–Min (garis = hari ini). Warna label: hijau ≥95%, kuning ≥85%, merah di bawahnya.</p>
      </div>

      <h3 className="rpt-h">Perlu perhatian</h3>
      <div className="card rpt-fl">
        {r.flags.length ? r.flags.map((f, i) => (
          <div key={i} className={"rpt-f f-" + f.lvl}><i aria-hidden="true">{f.lvl === "r" ? "!" : f.lvl === "a" ? "•" : "i"}</i><span>{f.t}</span></div>
        )) : <div className="rpt-f f-g"><i aria-hidden="true">✓</i><span>Tidak ada yang perlu ditindaklanjuti.</span></div>}
      </div>

      <h3 className="rpt-h">Aktivitas per petugas <small>{r.total} aktivitas{r.prevTotal ? " (minggu lalu " + r.prevTotal + ")" : ""}</small></h3>
      <div className="card rpt-pp">
        {r.people.length ? r.people.slice(0, 8).map((p) => (
          <div className="rpt-p" key={p.name}>
            <div className="rpt-pt"><b>{p.name}</b><span>{p.total}</span></div>
            <div className="rpt-pb" aria-hidden="true" style={{ width: Math.max(6, (p.total / maxP) * 100) + "%" }}>
              {MODS.map((m) => p[m.id] ? <i key={m.id} style={{ flex: p[m.id], background: COLOR[m.id] }} /> : null)}
            </div>
            <small>{MODS.filter((m) => p[m.id]).map((m) => m.name + " " + p[m.id]).join(" · ")}</small>
          </div>
        )) : <p className="hint">Belum ada aktivitas tercatat pada minggu ini.</p>}
      </div>

      <div className="rpt-act">
        <button className="btn pri" onClick={copy}>Salin ringkasan WhatsApp</button>
        <button className="btn" onClick={() => window.print()}>Cetak / PDF</button>
      </div>
      <p className="hint rpt-note">Data dihitung dari catatan di perangkat ini (tersinkron bila sinkron aktif). Bin/rak yang diperiksa ulang dihitung pada waktu pemeriksaan terakhir.</p>
    </section>
  );
}
