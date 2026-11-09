import { useState, useMemo, useRef } from "react";
import { useWms } from "../legacy/bridge.js";
import { fmt } from "../lib/format.js";
import { SIGNALS, CLASSES, NO_CLASS, SIGNAL_COLOR, DEFAULT_PIC, normSignal, buildAging, checklist, groupByClass, buildPool, suggest, agingText, actualOf } from "../lib/aging.js";

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
  const [red, setRed] = useState(false); // hanya rak Merah
  // data cek fisik, kelas pipa, dan nama petugas dimiliki legacy (ikut sinkron Sheets + cadangan)
  const act = wms.aging || EMPTY, clsRec = wms.agingCls || EMPTY, cfg = wms.agingCfg || EMPTY;
  const cls = useMemo(() => Object.fromEntries(Object.entries(clsRec).map(([k, v]) => [k, v && v.c])), [clsRec]);
  const pic = { ...DEFAULT_PIC, ...(cfg.pic || {}) };
  const active = wms.view === "agi" && !!wms.DATA;
  const tk = wms.tasks || EMPTY, me = wms.curU || "";
  const taskBins = new Set(Object.keys(tk).filter((k) => k.startsWith("AG|") && (!me || tk[k].u === me)).map((k) => k.slice(3)));
  // dari halaman Tugas: buka langsung daftar tugas aging (semua area)
  if (active && wms.agiFocus) { wms.agiFocus = false; setTimeout(() => { setArea(""); setFlt("task"); }, 0); }
  const A = active ? wms.areas() : [];
  const cur = A.includes(area) ? area : "";
  const rows = useMemo(() => (active ? wms.DATA.filter((x) => !cur || x.area === cur) : []), [active, wms.DATA, cur]); // eslint-disable-line react-hooks/exhaustive-deps
  const agg = useMemo(() => buildAging(rows, cls), [rows, cls]);
  // pilihan No. tumpak dan Item: dari data WMS + riwayat cek (nilai yang pernah diisi petugas)
  const pools = useMemo(() => {
    const D = active ? wms.DATA : [], areaOf = Object.fromEntries(D.map((x) => [x.bin, x.area]));
    const hist = Object.entries(act).map(([bin, r]) => ({ bin, r, area: areaOf[bin] }));
    return {
      tumpak: buildPool([...D.map((x) => ({ v: x.tumpak, area: x.area })), ...hist.map((h) => ({ v: h.r && h.r.tumpak, area: h.area }))]),
      item: buildPool([...D.map((x) => ({ v: x.item, area: x.area })), ...hist.map((h) => ({ v: h.r && h.r.pipa, area: h.area }))]),
    };
  }, [active, wms.DATA, act]); // eslint-disable-line react-hooks/exhaustive-deps
  const list = useMemo(() => checklist(rows, flt === "task" ? "all" : mode, "prioritas", cls), [rows, mode, cls, flt]); // kelas A dulu, lalu B, C
  if (!active) return <section id="v-agi" hidden />;

  const done = list.filter((x) => act[x.bin]).length;
  const doneAt = (bin) => !!act[bin] && String(act[bin].at || "") >= String(tk["AG|" + bin]?.at || "");
  const taskOpen = checklist(rows, "all").filter((x) => taskBins.has(x.bin) && !doneAt(x.bin)).length;
  const isRed = (x) => normSignal(x.sinyal) === "Merah";
  const merahTodo = list.filter((x) => isRed(x) && !act[x.bin]).length;
  const shown = list.filter((x) => (flt === "task" ? taskBins.has(x.bin) : flt === "todo" ? !act[x.bin] : flt === "done" ? !!act[x.bin] : true) && (!red || isRed(x)));
  // dalam tiap kelas: yang belum dicek di atas, yang sudah dicek turun ke bawah (urutan prioritas tetap)
  const groups = groupByClass(shown.slice(0, 200), cls).map((g) => ({ ...g, items: [...g.items.filter((x) => !act[x.bin]), ...g.items.filter((x) => act[x.bin])] }));
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
    const head = ["Area", "Rak", "Sinyal", "Aging", "Nama Item", "Kelas Pipa", "Tumpak Sistem", "Stok Sistem", "Actual Tumpak", "Actual Pipa", "Actual Qty", "Selisih", "Status"];
    const body = list.map((x) => { const t = actualOf(x, act[x.bin]); return [x.area, x.bin, normSignal(x.sinyal), x.aging, x.item, cls[x.kode] || "", x.tumpak || "", x.onhand, t ? t.tumpak : "", t ? t.item : "", t && t.qty != null ? t.qty : "", t && t.qty != null ? t.diff : "", t ? (t.ok ? "Sesuai" : "Selisih: " + t.reasons.join(", ")) : "Belum dicek"].map(q).join(","); });
    const url = URL.createObjectURL(new Blob(["\ufeff" + [head.map(q).join(","), ...body].join("\r\n")], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `aging-stock-${cur || "semua"}-${new Date().toISOString().slice(0, 10)}.csv` });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const maxSig = Math.max(1, ...SIGNALS.map((s) => agg.bySignal[s]));
  const classRows = [...CLASSES, ...(agg.kuning[NO_CLASS] || SIGNALS.some((s) => agg.byClass[NO_CLASS][s]) ? [NO_CLASS] : [])];

  return (
    <section id="v-agi" hidden>
      <h2>Monitoring Aging Stock</h2>
      <p className="hint">Cek rak Merah dan Kuning, mulai dari kelas A. Cukup tap "Semua sama" atau perbarui no. tumpak, item, dan qty.</p>

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
          <div className="stats agi-stats" aria-live="polite">
            <div className="stat"><small>Kuning</small><strong style={{ color: "var(--amber)" }}>{fmt(agg.kuningTotal)}</strong></div>
            <div className="stat"><small>Merah</small><strong style={{ color: agg.bySignal.Merah ? "#d32f2f" : undefined }}>{fmt(agg.bySignal.Merah)}</strong></div>
            <div className="stat"><small>Dicek</small><strong>{done}/{list.length}</strong></div>
          </div>

          {merahTodo > 0 && (
            <button type="button" className={"agi-alert" + (red ? " on" : "")} aria-pressed={red} onClick={() => setRed(!red)}>
              <b>{merahTodo} rak MERAH</b> belum dicek <span>{red ? "Tampilkan semua" : "Lihat saja yang merah"}</span>
            </button>
          )}
          <h3 className="agi-h agi-list-h">Prioritas cek <span className="agi-cnt">{done}/{list.length} dicek</span></h3>
          <div className="agi-prog" role="progressbar" aria-label="Kemajuan cek rak" aria-valuemin={0} aria-valuemax={list.length} aria-valuenow={done}><i style={{ width: (list.length ? (done / list.length) * 100 : 0) + "%" }} /></div>
          <details className="agi-filter">
            <summary>Filter: {mode === "watch" ? "Kuning & Merah" : "Semua rak isi"} · {flt === "todo" ? "Belum dicek" : flt === "done" ? "Sudah dicek" : "Semua status"}</summary>
          <p className="agi-fl">Tampilkan rak</p>
          <div className="chips agi-chips" role="group" aria-label="Rak yang ditampilkan">
            {[["watch", "Kuning & Merah"], ["all", "Semua rak isi"]].map(([v, l]) => <button key={v} className={"chip" + (mode === v ? " on" : "")} aria-pressed={mode === v} onClick={() => setMode(v)}>{l}</button>)}
          </div>
          <p className="agi-fl">Status cek</p>
          <div className="chips agi-chips agi-chips3" role="group" aria-label="Status cek rak">
            {[...(taskBins.size ? [["task", me ? "Tugas saya" : "Tugas", taskOpen]] : []), ["all", "Semua", list.length], ["todo", "Belum", list.length - done], ["done", "Sudah", done]].map(([v, l, n]) => <button key={v} className={"chip" + (flt === v ? " on" : "")} aria-pressed={flt === v} onClick={() => setFlt(v)}>{l} <b>{n}</b></button>)}
          </div>
          </details>
          {shown.length === 0 && <div className="empty">Tidak ada rak pada filter ini.</div>}
          {groups.map((g) => (
            <div key={g.c} className="agi-grp">
              <div className={"agi-gh agi-k" + (g.c === NO_CLASS ? "x" : g.c)}>
                <b>{g.c === NO_CLASS ? "Kelas belum diatur" : "Kelas " + g.c}{g.c !== NO_CLASS && pic[g.c] ? " · " + pic[g.c] : ""}</b>
                <span>{g.items.length} rak{g.merah ? " · " + g.merah + " merah" : ""}</span>
              </div>
              {g.items.map((x) => (
                <RakCard key={x.bin} x={x} a={act[x.bin]} tugas={taskBins.has(x.bin)} blind={!!me && !!wms.blindFor && wms.blindFor(x.bin)} pools={pools} kelas={cls[x.kode] || ""} onClass={setClass} onSave={saveAct} onClear={clearAct} />
              ))}
            </div>
          ))}
          {shown.length > 200 && <p className="hint">Menampilkan 200 rak teratas dari {shown.length}. Pilih area untuk mempersempit.</p>}

          <div className="row-act">
            <button className="btn pri" onClick={copy}>Salin ringkasan</button>
            <button className="btn sec inl" onClick={csv}>CSV</button>
          </div>

          <details className="agi-sumd">
            <summary>Ringkasan, grafik &amp; petugas per kelas</summary>
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

          </details>
        </>
      )}
    </section>
  );
}

const lvl = (c) => (c ? "agi-kb agi-k" + c : "agi-kb agi-kx");
/** Setelah simpan: tutup kartu ini dan buka rak berikutnya yang belum dicek (tanpa mencari lagi). */
function advance(d) {
  const all = [...document.querySelectorAll("#v-agi .agi-rak")];
  const nx = all.slice(all.indexOf(d) + 1).find((el) => !el.classList.contains("done"));
  if (d) d.open = false;
  if (nx) { nx.open = true; setTimeout(() => nx.scrollIntoView({ block: "start", behavior: "smooth" }), 60); }
}

function RakCard({ x, a, pools, kelas, onClass, onSave, onClear, tugas, blind }) {
  const [f, setF] = useState({ tumpak: a?.sesuai ? "" : a?.tumpak || "", pipa: a?.sesuai ? "" : a?.pipa || "", qty: a?.qty ?? "" });
  const sig = normSignal(x.sinyal);
  const fr = useRef(null);
  const canSave = !!(f.tumpak || f.pipa || f.qty !== "");
  const inputs = () => [...(fr.current ? fr.current.querySelectorAll("input") : [])];
  // Enter = ke kolom berikutnya; di kolom terakhir = simpan. Fokus otomatis dibawa ke tengah layar (di atas keyboard).
  const onKey = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const els = inputs(), n = els[els.indexOf(e.currentTarget) + 1];
    if (n) n.focus();
    else if (canSave && fr.current) fr.current.querySelector(".agi-savebtn").click();
  };
  const onFocus = (e) => { const t = e.target; setTimeout(() => t.scrollIntoView({ block: "center", behavior: "smooth" }), 280); };
  const pick = (key, v) => { setF({ ...f, [key]: v }); const els = inputs(), n = els[key === "tumpak" ? 1 : 2]; if (n) requestAnimationFrame(() => n.focus()); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const sT = suggest(pools.tumpak, f.tumpak, { pin: x.tumpak, area: x.area }), sI = suggest(pools.item, f.pipa, { pin: x.item, area: x.area });
  const opts = (label, list, key) => list.length > 0 && <div className="agi-opts" role="group" aria-label={label}>{list.map((v) => <button type="button" key={v} className="agi-opt" onClick={() => pick(key, v)}>{v}</button>)}</div>;
  const save = (e, v) => { const d = e.currentTarget.closest("details"); try { navigator.vibrate && navigator.vibrate(18); } catch (_) { /* getar tidak didukung */ } onSave(x.bin, v); advance(d); };
  return (
    <details className={"card agi-rak" + (a ? " done" : "") + (sig === "Merah" ? " red" : "")}>
      <summary>
        <span className="agi-sg" style={{ background: SIGNAL_COLOR[sig] || "#ccc", color: sig === "Kuning 3" || sig === "Hijau 2" || sig === "Merah" ? "#fff" : "#222" }}>{sig || "?"}</span>
        <span className="agi-bn"><b>{x.bin}<i className={lvl(kelas)}>{kelas || "?"}</i></b><span className="agi-it">{x.item}</span><small>{tugas ? "TUGAS · " : ""}Tumpak <strong>{x.tumpak || "–"}</strong> · {x.aging} hari{blind ? "" : " · stok " + fmt(x.onhand)}{a ? " · cek " + fmt(a.qty ?? 0) + (a.sesuai ? " (sesuai)" : "") : ""}</small></span>
        <span className={"agi-ck" + (a ? " on" : "")} aria-label={a ? "Sudah dicek" : "Belum dicek"}>{a ? "✓" : ""}</span>
      </summary>
      <div className="agi-form" ref={fr}>
        <div className="agi-sys">Data sistem: tumpak <b>{x.tumpak || "–"}</b> · item <b>{x.item}</b>{blind ? null : <> · qty <b>{fmt(x.onhand)}</b></>}</div>
        {!blind && <button type="button" className="btn pri agi-all" onClick={(e) => save(e, { tumpak: "Sesuai", pipa: "Sesuai", qty: String(x.onhand), sesuai: true })}>✓ Semua sama dengan sistem</button>}
        <p className="agi-or">Kalau ada yang beda, isi di sini:</p>
        <label>No. tumpak aktual<input value={f.tumpak} onChange={set("tumpak")} onKeyDown={onKey} onFocus={onFocus} placeholder={x.tumpak || "AK140"} autoCapitalize="characters" autoComplete="off" autoCorrect="off" spellCheck={false} enterKeyHint="next" /></label>
        {opts("Pilihan tumpak", sT, "tumpak")}
        <label>Item aktual<input value={f.pipa} onChange={set("pipa")} onKeyDown={onKey} onFocus={onFocus} placeholder="Ketik atau pilih item" autoComplete="off" autoCorrect="off" spellCheck={false} enterKeyHint="next" /></label>
        {opts("Pilihan item", sI, "pipa")}
        <label>Qty aktual<input inputMode="numeric" enterKeyHint="done" autoComplete="off" onKeyDown={onKey} onFocus={onFocus} value={f.qty} onChange={(e) => setF({ ...f, qty: e.target.value.replace(/[^\d]/g, "") })} placeholder={blind ? "0" : String(x.onhand)} /></label>
        <div className="row-act">
          <button className="btn pri agi-savebtn" disabled={!canSave} onClick={(e) => save(e, { tumpak: f.tumpak, pipa: f.pipa, qty: f.qty })}>Simpan cek</button>
          {a && <button className="btn sec inl" onClick={() => { onClear(x.bin); setF({ tumpak: "", pipa: "", qty: "" }); }}>Hapus</button>}
        </div>
        <details className="agi-kls">
          <summary>Kelas pipa: {kelas || "belum diatur"} (ubah)</summary>
          <select value={kelas} onChange={(e) => onClass(x.kode, e.target.value)} aria-label="Kelas pipa untuk item ini">
            <option value="">Belum diatur</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </details>
      </div>
    </details>
  );
}
