import { useState, useMemo } from "react";
import { useWms } from "../legacy/bridge.js";
import { fmt } from "../lib/format.js";
import { SIGNALS, CLASSES, NO_CLASS, SIGNAL_COLOR, DEFAULT_PIC, normSignal, buildAging, checklist, agingText } from "../lib/aging.js";

const K_AREA = "warehouse_so_aging_area_v1"; // pilihan area: preferensi per perangkat, tidak disinkron
const EMPTY = {};
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const short = (s) => s.replace("Hijau ", "H").replace("Kuning ", "K").replace("Merah", "M");

/** Menu "Aging Stock": pengganti kertas monitoring aging per area. Data aktual disimpan di perangkat (localStorage). */
export default function AgingView() {
  const wms = useWms();
  const [area, setArea] = useState(() => load(K_AREA, ""));
  const [mode, setMode] = useState("watch");
  const [flt, setFlt] = useState("all");
  // data cek fisik, kelas pipa, dan nama petugas dimiliki legacy (ikut sinkron Sheets + cadangan)
  const act = wms.aging || EMPTY, clsRec = wms.agingCls || EMPTY, cfg = wms.agingCfg || EMPTY;
  const cls = useMemo(() => Object.fromEntries(Object.entries(clsRec).map(([k, v]) => [k, v && v.c])), [clsRec]);
  const pic = { ...DEFAULT_PIC, ...(cfg.pic || {}) };
  const active = wms.view === "agi" && !!wms.DATA;
  const A = active ? wms.areas() : [];
  const cur = A.includes(area) ? area : "";
  const rows = useMemo(() => (active ? wms.DATA.filter((x) => !cur || x.area === cur) : []), [active, wms.DATA, cur]); // eslint-disable-line react-hooks/exhaustive-deps
  const agg = useMemo(() => buildAging(rows, cls), [rows, cls]);
  const list = useMemo(() => checklist(rows, mode), [rows, mode]);
  if (!active) return <section id="v-agi" hidden />;

  const done = list.filter((x) => act[x.bin]).length;
  const shown = list.filter((x) => (flt === "todo" ? !act[x.bin] : flt === "done" ? !!act[x.bin] : true));
  const pickArea = (v) => { setArea(v); save(K_AREA, v); };
  const iso = () => new Date().toISOString();
  const setClass = (kode, c) => wms.setAgingCls({ ...clsRec, [kode]: { c, at: iso() } });
  const setPicOf = (c, v) => wms.setAgingCfg({ ...cfg, pic: { ...pic, [c]: v } });
  const saveAct = (bin, v) => { wms.setAging({ ...act, [bin]: { ...v, by: wms.curName?.() || "", at: iso() } }); wms.toast("Cek rak " + bin + " tersimpan"); };
  const clearAct = (bin) => { const n = { ...act }; delete n[bin]; wms.setAging(n); };

  const copy = () =>
    wms.outText(agingText({ area: cur, agg, pic, done, total: list.length, date: new Date().toLocaleDateString("id-ID") })).then(
      () => wms.toast("Tersalin. Tempel di WhatsApp."),
      () => wms.toast("Gagal menyalin. Izinkan akses clipboard di browser."),
    );
  const csv = () => {
    const q = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    const head = ["Area", "Rak", "Sinyal", "Aging", "Nama Item", "Kelas Pipa", "Stok Sistem", "Actual Tumpak", "Actual Pipa", "Actual Qty"];
    const body = list.map((x) => { const a = act[x.bin] || {}; return [x.area, x.bin, normSignal(x.sinyal), x.aging, x.item, cls[x.kode] || "", x.onhand, a.tumpak, a.pipa, a.qty].map(q).join(","); });
    const url = URL.createObjectURL(new Blob(["\ufeff" + [head.map(q).join(","), ...body].join("\r\n")], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `aging-stock-${cur || "semua"}-${new Date().toISOString().slice(0, 10)}.csv` });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const maxSig = Math.max(1, ...SIGNALS.map((s) => agg.bySignal[s]));
  const classRows = [...CLASSES, ...(agg.kuning[NO_CLASS] || SIGNALS.some((s) => agg.byClass[NO_CLASS][s]) ? [NO_CLASS] : [])];

  return (
    <section id="v-agi" hidden>
      <h2>Monitoring Aging Stock</h2>
      <p className="hint">Sinyal aging per rak dari data WMS. Isi hasil cek fisik langsung di sini, tanpa kertas.</p>

      <div className="agi-bar">
        <label htmlFor="agiArea">Area</label>
        <select id="agiArea" value={cur} onChange={(e) => pickArea(e.target.value)}>
          <option value="">Semua area</option>
          {A.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {agg.filled === 0 ? (
        <div className="empty">Belum ada rak berisi di {cur ? "area " + cur : "data WMS"}. Impor data di menu Data WMS.</div>
      ) : (
        <>
          <div className="stats" aria-live="polite">
            <div className="stat"><small>Total rak isi</small><strong>{fmt(agg.filled)}</strong></div>
            <div className="stat"><small>Total Kuning</small><strong style={{ color: "var(--amber)" }}>{fmt(agg.kuningTotal)}</strong></div>
            <div className="stat"><small>Merah</small><strong style={{ color: agg.bySignal.Merah ? "#d32f2f" : undefined }}>{fmt(agg.bySignal.Merah)}</strong></div>
            <div className="stat"><small>Sudah dicek</small><strong>{done}/{list.length}</strong></div>
          </div>

          <div className="card">
            <h3 className="agi-h">Total sinyal aging</h3>
            {SIGNALS.map((s) => (
              <div className="agi-row" key={s}>
                <span className="agi-lb">{s}</span>
                <span className="agi-tr"><i style={{ width: (agg.bySignal[s] / maxSig) * 100 + "%", background: SIGNAL_COLOR[s] }} /></span>
                <b>{fmt(agg.bySignal[s])}</b>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="agi-h">Aging dalam kelas pipa</h3>
            <div className="agi-scroll">
              <table className="agi-tb">
                <thead>
                  <tr><th>Kelas</th>{SIGNALS.map((s) => <th key={s} title={s}><i style={{ background: SIGNAL_COLOR[s] }} />{short(s)}</th>)}</tr>
                </thead>
                <tbody>
                  {classRows.map((c) => (
                    <tr key={c}>
                      <th>{c === NO_CLASS ? "Belum" : c}</th>
                      {SIGNALS.map((s) => <td key={s} className={agg.byClass[c][s] ? "" : "z"}>{agg.byClass[c][s]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {agg.kuning[NO_CLASS] > 0 && <p className="hint">Ada rak Kuning tanpa kelas. Atur kelas pipa di daftar cek di bawah.</p>}
          </div>

          <div className="card">
            <h3 className="agi-h">Total Kuning per kelas</h3>
            {classRows.map((c) => (
              <div className="agi-pic" key={c}>
                <span className="agi-cl">{c === NO_CLASS ? "?" : c}</span>
                {c === NO_CLASS ? <span className="agi-pn">Belum diatur</span> : <input aria-label={"Penanggung jawab kelas " + c} value={pic[c] || ""} placeholder="Nama petugas" onChange={(e) => setPicOf(c, e.target.value)} />}
                <b>{fmt(agg.kuning[c])}</b>
              </div>
            ))}
            <div className="agi-pic tot"><span className="agi-cl" /><span className="agi-pn">Total</span><b>{fmt(agg.kuningTotal)}</b></div>
          </div>

          <div className="row-act">
            <button className="btn pri" onClick={copy}>Salin ringkasan</button>
            <button className="btn sec inl" onClick={csv}>CSV</button>
          </div>

          <h3 className="agi-h agi-list-h">Daftar cek rak <span className="agi-cnt">{done}/{list.length} dicek</span></h3>
          <div className="agi-prog" role="progressbar" aria-label="Kemajuan cek rak" aria-valuemin={0} aria-valuemax={list.length} aria-valuenow={done}><i style={{ width: (list.length ? (done / list.length) * 100 : 0) + "%" }} /></div>
          <p className="agi-fl">Tampilkan rak</p>
          <div className="chips agi-chips" role="group" aria-label="Rak yang ditampilkan">
            {[["watch", "Kuning & Merah"], ["all", "Semua rak isi"]].map(([v, l]) => <button key={v} className={"chip" + (mode === v ? " on" : "")} aria-pressed={mode === v} onClick={() => setMode(v)}>{l}</button>)}
          </div>
          <p className="agi-fl">Status cek</p>
          <div className="chips agi-chips agi-chips3" role="group" aria-label="Status cek rak">
            {[["all", "Semua", list.length], ["todo", "Belum", list.length - done], ["done", "Sudah", done]].map(([v, l, n]) => <button key={v} className={"chip" + (flt === v ? " on" : "")} aria-pressed={flt === v} onClick={() => setFlt(v)}>{l} <b>{n}</b></button>)}
          </div>
          {shown.length === 0 && <div className="empty">Tidak ada rak pada filter ini.</div>}
          {shown.slice(0, 200).map((x) => (
            <RakCard key={x.bin} x={x} a={act[x.bin]} kelas={cls[x.kode] || ""} onClass={setClass} onSave={saveAct} onClear={clearAct} />
          ))}
          {shown.length > 200 && <p className="hint">Menampilkan 200 rak teratas dari {shown.length}. Pilih area untuk mempersempit.</p>}
        </>
      )}
    </section>
  );
}

function RakCard({ x, a, kelas, onClass, onSave, onClear }) {
  const [f, setF] = useState({ tumpak: a?.tumpak || "", pipa: a?.pipa || "", qty: a?.qty ?? "" });
  const sig = normSignal(x.sinyal);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <details className={"card agi-rak" + (a ? " done" : "")}>
      <summary>
        <span className="agi-sg" style={{ background: SIGNAL_COLOR[sig] || "#ccc", color: sig === "Kuning 3" || sig === "Hijau 2" || sig === "Merah" ? "#fff" : "#222" }}>{sig || "?"}</span>
        <span className="agi-bn"><b>{x.bin}</b><span className="agi-it">{x.item}</span><small>{x.aging} hari · stok {fmt(x.onhand)}</small></span>
        <span className={"agi-ck" + (a ? " on" : "")} aria-label={a ? "Sudah dicek" : "Belum dicek"}>{a ? "✓" : ""}</span>
      </summary>
      <div className="agi-form">
        <label>Kelas pipa (berlaku untuk item ini)
          <select value={kelas} onChange={(e) => onClass(x.kode, e.target.value)}>
            <option value="">Belum diatur</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <div className="row2">
          <label>Actual tumpak<input value={f.tumpak} onChange={set("tumpak")} placeholder="AK140" autoCapitalize="characters" /></label>
          <label>Actual pipa<input value={f.pipa} onChange={set("pipa")} placeholder="AW 3" /></label>
        </div>
        <label>Actual qty<input inputMode="numeric" value={f.qty} onChange={(e) => setF({ ...f, qty: e.target.value.replace(/[^\d]/g, "") })} placeholder="0" /></label>
        <div className="row-act">
          <button className="btn pri" disabled={!(f.tumpak || f.pipa || f.qty !== "")} onClick={() => onSave(x.bin, f)}>Simpan cek</button>
          {a && <button className="btn sec inl" onClick={() => { onClear(x.bin); setF({ tumpak: "", pipa: "", qty: "" }); }}>Hapus</button>}
        </div>
      </div>
    </details>
  );
}
