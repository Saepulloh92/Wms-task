import { useEffect } from "react";
import Raw from "./components/Raw.jsx";
import KpiView from "./views/KpiView.jsx";
import AgingView from "./views/AgingView.jsx";
import { bootLegacy } from "./legacy/loader.js";

import header from "./markup/header.html?raw";
import side from "./markup/side.html?raw";
import tabs from "./markup/tabs.html?raw";
// Menu yang MASIH legacy (markup lama + chunk di src/legacy/chunks). Saat satu menu selesai dimigrasi:
// buat src/views/XxxView.jsx, pindahkan ke daftar REACT_VIEWS, hapus file markup & chunk-nya. Lihat docs/MIGRATION.md.
import so from "./markup/views/so.html?raw";
import dc from "./markup/views/dc.html?raw";
import check from "./markup/views/check.html?raw";
import adj from "./markup/views/adj.html?raw";
import task from "./markup/views/task.html?raw";
import kes from "./markup/views/kes.html?raw";
import muat from "./markup/views/muat.html?raw";
import usr from "./markup/views/usr.html?raw";
import clr from "./markup/views/clr.html?raw";
import tg from "./markup/views/tg.html?raw";
import mon from "./markup/views/mon.html?raw";
import data from "./markup/views/data.html?raw";
import sheet from "./markup/dialogs/sheet.html?raw";
import dcPickSheet from "./markup/dialogs/dcPickSheet.html?raw";
import dcSheet from "./markup/dialogs/dcSheet.html?raw";
import navSet from "./markup/dialogs/navSet.html?raw";
import login from "./markup/dialogs/login.html?raw";
import padSheet from "./markup/dialogs/padSheet.html?raw";

// Urutan elemen = urutan di halaman asli (CSS bergantung padanya). Menu pertama (so) tampil, lainnya hidden.
const LEGACY_VIEWS = [["so", so], ["dc", dc], ["check", check], ["adj", adj], ["task", task], ["kes", kes], ["muat", muat], ["usr", usr], ["clr", clr]];
const LEGACY_VIEWS_AFTER_REACT = [["tg", tg], ["mon", mon], ["data", data]];

export default function App() {
  useEffect(() => bootLegacy(), []);
  const legacy = ([id, html]) => <Raw as="section" key={id} id={"v-" + id} hidden={id !== "so"} html={html} />;
  return (
    <>
      <a href="#main" className="skip">Lewati ke konten utama</a>
      <div className="app">
        <Raw as="header" html={header} />
        <div className="content">
          <main id="main" tabIndex={-1}>
            <div className="guard" id="guard" aria-live="polite" />
            {LEGACY_VIEWS.map(legacy)}
            <KpiView />
            <AgingView />
            {LEGACY_VIEWS_AFTER_REACT.map(legacy)}
          </main>
        </div>
        <div className="scrim" id="scrim" />
        <Raw as="aside" className="side" id="side" aria-label="Menu" html={side} />
        <Raw as="nav" className="tabs" id="tabs" aria-label="Navigasi utama" html={tabs} />
      </div>
      <Raw className="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Periksa bin" hidden html={sheet} />
      <Raw className="sheet" id="dcPickSheet" role="dialog" aria-modal="true" aria-label="Pilih item DC" hidden html={dcPickSheet} />
      <Raw className="sheet" id="dcSheet" role="dialog" aria-modal="true" aria-label="Hitung item DC" hidden html={dcSheet} />
      <div id="dlg" className="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgT" hidden />
      <Raw className="dlg" id="navSet" style={{ zIndex: 95 }} hidden html={navSet} />
      <Raw className="dlg" id="login" style={{ zIndex: 100 }} hidden html={login} />
      <Raw className="sheet" id="padSheet" role="dialog" aria-modal="true" aria-label="Cari bin" hidden html={padSheet} />
      <div id="toast" className="off" role="status" aria-live="polite" aria-atomic="true" />
    </>
  );
}
