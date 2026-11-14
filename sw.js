// Service worker Stock Control: aplikasi tetap terbuka saat sinyal gudang hilang.
// - Halaman (index.html): jaringan dulu (maks 3 dtk) agar versi baru cepat tayang, lalu salinan tersimpan.
// - Aset ber-hash (assets/, vendor/, ikon): salinan tersimpan dulu (nama file berubah tiap versi).
// - Permintaan ke domain lain (sinkron Apps Script, Google Sheets, Telegram) tidak disentuh.
const CACHE = "stockctl-v1";
const NET_WAIT = 3000;

self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

const put = (req, res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)).catch(() => {}); } return res; };

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      new Promise((resolve) => {
        let done = false;
        const fallback = () => caches.match(req, { ignoreSearch: true }).then((m) => m || caches.match("./")).then((m) => m || Response.error());
        const t = setTimeout(() => { if (!done) fallback().then((m) => { if (!done && m && m.type !== "error") { done = true; resolve(m); } }); }, NET_WAIT);
        fetch(req).then((r) => { if (done) return; done = true; clearTimeout(t); resolve(put(req, r)); }).catch(() => { clearTimeout(t); if (!done) { done = true; fallback().then(resolve); } });
      }),
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((r) => put(req, r)).catch(() => hit || Response.error())),
  );
});
