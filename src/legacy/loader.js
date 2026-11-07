// Menjalankan kode legacy (chunk) persis seperti satu <script> klasik di halaman asli:
// semua chunk bernomor digabung berurutan (berbagi scope global), patch-* dijalankan satu per satu sesudahnya.
const core = import.meta.glob("./chunks/[0-9]*.js", { query: "?raw", import: "default", eager: true });
const patches = import.meta.glob("./chunks/patch-*.js", { query: "?raw", import: "default", eager: true });

const inject = (code, name) => {
  const el = document.createElement("script");
  el.dataset.chunk = name;
  el.text = code;
  document.body.appendChild(el);
};
const sorted = (o) => Object.keys(o).sort().map((k) => [k, o[k]]);

export function bootLegacy() {
  if (window.__legacyBooted) return;
  window.__legacyBooted = true;
  inject(sorted(core).map(([k, v]) => `\n/* ===== ${k} ===== */\n${v}`).join("\n"), "core");
  sorted(patches).forEach(([k, v]) => inject(v, k));
  window.WMS.emit();
}
