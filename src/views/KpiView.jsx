import { useWms } from "../legacy/bridge.js";
import { pc, fmt, signed, fmtDur } from "../lib/format.js";
import { kpiOf, kpiText } from "../lib/kpi.js";

/** Menu "KPI Area". Pola migrasi: baca state legacy lewat useWms(), tulis lewat fungsi legacy (WMS.*). */
export default function KpiView() {
  const wms = useWms();
  // section selalu ada (kode legacy go() mengatur atribut hidden-nya); isi hanya digambar saat view aktif.
  if (wms.view !== "kpi" || !wms.DATA) return <section id="v-kpi" hidden />;

  const { DATA, counts, stat, isClosed, owners, staff } = wms;
  const A = wms.areas();
  const all = kpiOf(DATA, counts, stat);

  const tiles = [
    ["Progres", pc(all.done, all.total), ""],
    ["Akurasi", pc(all.ok, all.done), all.done && all.ok / all.done < 0.9 ? "var(--amber)" : "var(--green)"],
    ["Area ditutup", A.filter(isClosed).length + "/" + A.length, ""],
    ["Selisih qty", signed(all.pos) + " / " + fmt(all.neg), ""],
  ];

  const by = {};
  staff().forEach((u) => (by[u.name] = []));
  DATA.forEach((x) => {
    const c = counts[x.bin];
    if (c) (by[c.by || "Tanpa petugas"] = by[c.by || "Tanpa petugas"] || []).push(x);
  });

  const copy = () =>
    wms.outText(kpiText({ areas: A, data: DATA, counts, stat, isClosed })).then(
      () => wms.toast("Tersalin. Tempel di WhatsApp."),
      () => wms.toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
    );

  return (
    <section id="v-kpi" hidden>
      <h2>KPI Area</h2>
      <p className="hint">Capaian tiap area dan petugas. Akurasi = bin sesuai dibagi bin diperiksa.</p>
      <div className="stats" id="kpiStats" aria-live="polite" aria-atomic="true">
        {tiles.map(([l, v, c]) => (
          <div className="stat" key={l}>
            <small>{l}</small>
            <strong style={c ? { color: c } : undefined}>{v}</strong>
          </div>
        ))}
      </div>
      <div id="kpiAreas">
        {A.length === 0 && <div className="empty">Belum ada data area.</div>}
        {A.map((a) => {
          const k = kpiOf(DATA.filter((x) => x.area === a), counts, stat),
            closed = isClosed(a),
            full = k.total && k.done === k.total,
            ow = owners(a),
            p = k.total ? Math.round((k.done / k.total) * 100) : 0;
          return (
            <div className="card" key={a}>
              <div className="r">
                <b className="big">Area {a}</b>
                <span className={"pill " + (closed ? "green" : full ? "amber" : "")}>{closed ? "Ditutup" : full ? "Siap ditutup" : "Berjalan"}</span>
              </div>
              <div className="m">Petugas: {ow.length ? ow.join(", ") : "belum ada"}</div>
              <div className={"kb " + (closed ? "ok" : "")}>
                <i style={{ width: p + "%" }} />
              </div>
              <div className="kv">
                {[
                  ["Diperiksa", `${k.done}/${k.total} (${p}%)`],
                  ["Akurasi bin", pc(k.ok, k.done)],
                  ["Perlu review", k.bad],
                  ["Selisih qty", signed(k.pos) + " / " + fmt(k.neg)],
                  ["Durasi", fmtDur(k.span)],
                  ["Bin per jam", k.speed],
                ].map(([l, v]) => (
                  <div key={l}>
                    <small>{l}</small>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="sec">Per petugas</h3>
      <div id="kpiUsers">
        {Object.entries(by).map(([n, rows]) => {
          const k = kpiOf(rows, counts, stat);
          return (
            <div className="card" key={n}>
              <div className="r">
                <b className="big">{n}</b>
                <span className="m">{k.done} bin diperiksa</span>
              </div>
              <div className="kv">
                <div>
                  <small>Akurasi bin</small>
                  <strong>{pc(k.ok, k.done)}</strong>
                </div>
                <div>
                  <small>Perlu review</small>
                  <strong>{k.bad}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn pri mt-lg" id="kpiCopy" onClick={copy}>
        Salin KPI untuk WhatsApp
      </button>{" "}
      <button className="btn sec mt" data-tg="kpiCopy">
        Kirim KPI ke Telegram
      </button>
    </section>
  );
}
