import { useWms } from "../legacy/bridge.js";
import { pc, fmt, signed, fmtDur } from "../lib/format.js";
import { kpiOf, kpiText } from "../lib/kpi.js";

// warna akurasi: >=90% hijau, >=75% kuning, di bawahnya merah; null = belum ada data
const tone = (done, ok) => (!done ? "" : ok / done >= 0.9 ? "ok" : ok / done >= 0.75 ? "warn" : "bad");

function Metrics({ items }) {
  return (
    <div className="kp-grid">
      {items.map(([l, v, t]) => (
        <div key={l} className={t ? "t-" + t : undefined}>
          <small>{l}</small>
          <strong>{v}</strong>
        </div>
      ))}
    </div>
  );
}

/** Menu "KPI Area". Pola migrasi: baca state legacy lewat useWms(), tulis lewat fungsi legacy (WMS.*). */
export default function KpiView() {
  const wms = useWms();
  // section selalu ada (kode legacy go() mengatur atribut hidden-nya); isi hanya digambar saat view aktif.
  if (wms.view !== "kpi" || !wms.DATA) return <section id="v-kpi" hidden />;

  const { DATA, counts, stat, isClosed, owners, staff } = wms;
  const A = wms.areas();
  const all = kpiOf(DATA, counts, stat);

  const tiles = [
    ["Progres", pc(all.done, all.total), `${fmt(all.done)} / ${fmt(all.total)} bin`, ""],
    ["Akurasi", pc(all.ok, all.done), `${fmt(all.ok)} dari ${fmt(all.done)} bin sesuai`, tone(all.done, all.ok)],
    ["Area ditutup", A.filter(isClosed).length + "/" + A.length, "area selesai", ""],
    ["Selisih qty", signed(all.pos) + " / " + fmt(all.neg), "lebih / kurang", ""],
  ];

  const by = {};
  staff().forEach((u) => (by[u.name] = []));
  DATA.forEach((x) => {
    const c = counts[x.bin];
    if (c) (by[c.by || "Tanpa petugas"] = by[c.by || "Tanpa petugas"] || []).push(x);
  });
  // petugas paling banyak memeriksa di atas; "Tanpa petugas" selalu terakhir
  const people = Object.entries(by)
    .map(([n, rows]) => [n, kpiOf(rows, counts, stat)])
    .sort((a, b) => (a[0] === "Tanpa petugas") - (b[0] === "Tanpa petugas") || b[1].done - a[1].done || a[0].localeCompare(b[0], "id"));

  const copy = () =>
    wms.outText(kpiText({ areas: A, data: DATA, counts, stat, isClosed })).then(
      () => wms.toast("Tersalin. Tempel di WhatsApp."),
      () => wms.toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
    );

  return (
    <section id="v-kpi" hidden>
      <h2>KPI Area</h2>
      <p className="hint">Capaian tiap area dan petugas. Akurasi = bin sesuai dibagi bin diperiksa.</p>
      <div className="kp-tiles" id="kpiStats" aria-live="polite" aria-atomic="true">
        {tiles.map(([l, v, s, t]) => (
          <div className={"kp-tile" + (t ? " t-" + t : "")} key={l}>
            <small>{l}</small>
            <strong>{v}</strong>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <h3 className="sec">Per area <span className="kp-n">{A.length}</span></h3>
      <div id="kpiAreas">
        {A.length === 0 && <div className="empty">Belum ada data area.</div>}
        {A.map((a) => {
          const k = kpiOf(DATA.filter((x) => x.area === a), counts, stat),
            closed = isClosed(a),
            full = k.total && k.done === k.total,
            ow = owners(a),
            p = k.total ? Math.round((k.done / k.total) * 100) : 0;
          return (
            <div className="kp-card" key={a}>
              <div className="kp-h">
                <div className="kp-id">
                  <b>Area {a}</b>
                  <small>Petugas: {ow.length ? ow.join(", ") : "belum ada"}</small>
                </div>
                <span className={"pill " + (closed ? "green" : full ? "amber" : "")}>{closed ? "Ditutup" : full ? "Siap ditutup" : "Berjalan"}</span>
              </div>
              <div className="kp-prog">
                <div className={"kp-bar" + (closed ? " t-ok" : "")} role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label={"Progres area " + a}>
                  <i style={{ width: p + "%" }} />
                </div>
                <b>{p}%</b>
              </div>
              <Metrics
                items={[
                  ["Diperiksa", `${k.done}/${k.total}`],
                  ["Akurasi bin", pc(k.ok, k.done), tone(k.done, k.ok)],
                  ["Perlu review", k.bad, k.bad ? "warn" : ""],
                  ["Selisih qty", signed(k.pos) + " / " + fmt(k.neg)],
                  ["Durasi", fmtDur(k.span)],
                  ["Bin per jam", k.speed],
                ]}
              />
            </div>
          );
        })}
      </div>

      <h3 className="sec">Per petugas <span className="kp-n">{people.length}</span></h3>
      <div id="kpiUsers">
        {people.length === 0 && <div className="empty">Belum ada petugas.</div>}
        {people.map(([n, k]) => {
          const t = tone(k.done, k.ok),
            acc = k.done ? Math.round((k.ok / k.done) * 100) : 0;
          return (
            <div className={"kp-card" + (k.done ? "" : " idle")} key={n}>
              <div className="kp-h">
                <span className="kp-av" aria-hidden="true">{(n.trim()[0] || "?").toUpperCase()}</span>
                <div className="kp-id">
                  <b>{n}</b>
                  <small>{k.done ? `${fmt(k.done)} bin diperiksa` : "Belum ada bin diperiksa"}</small>
                </div>
                <span className={"kp-acc" + (t ? " t-" + t : "")}>{pc(k.ok, k.done)}</span>
              </div>
              {k.done > 0 && (
                <>
                  <div className={"kp-bar" + (t ? " t-" + t : "")} role="progressbar" aria-valuenow={acc} aria-valuemin={0} aria-valuemax={100} aria-label={"Akurasi " + n}>
                    <i style={{ width: acc + "%" }} />
                  </div>
                  <Metrics
                    items={[
                      ["Sesuai", fmt(k.ok), "ok"],
                      ["Perlu review", k.bad, k.bad ? "warn" : ""],
                      ["Bin per jam", k.speed],
                      ["Selisih qty", signed(k.pos) + " / " + fmt(k.neg)],
                      ["Durasi", fmtDur(k.span)],
                    ]}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="kp-actions">
        <button className="btn pri" id="kpiCopy" onClick={copy}>
          Salin untuk WhatsApp
        </button>
        <button className="btn sec" data-tg="kpiCopy">
          Kirim ke Telegram
        </button>
      </div>
    </section>
  );
}
