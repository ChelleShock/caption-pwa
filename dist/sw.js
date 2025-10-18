// sw.js — safer for Next/Vercel/SPAs
const VERSION = 'v3-2025-10-17';
const STATIC_CACHE = `static-${VERSION}`;

// Only cache versioned/static assets, NOT HTML
const ASSET_ALLOWLIST = [
  /^\/_next\/static\//,   // Next.js hashed chunks
  /^\/assets\//,          // your own hashed assets (adjust if needed)
];

// Take over immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Clean old caches + control existing pages
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== STATIC_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Optional: let the page ask this SW to activate now
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Network-first for navigations (HTML) — do NOT cache the document
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Handle navigations (HTML)
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirstHTML(req));
    return;
  }

  // Handle static assets with SWR
  const url = new URL(req.url);
  if (ASSET_ALLOWLIST.some((re) => re.test(url.pathname))) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Otherwise: pass through
  // (You could add small SWR here for fonts/images, but avoid caching API calls)
});

async function networkFirstHTML(req) {
  try {
    const res = await fetch(req, { cache: 'no-store' }); // always fresh
    // Don’t cache HTML—just return it
    return res;
  } catch (err) {
    // If offline, try a previously cached doc (we don’t keep one by design)
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match('/offline.html'); // optional if you add one
    return cached || new Response('You are offline.', { status: 503, headers: { 'Content-Type': 'text/plain' }});
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then((res) => {
    // Only cache successful, same-origin, immutable-ish assets
    if (res && res.ok && res.type !== 'opaque') cache.put(req, res.clone());
    return res;
  }).catch(() => undefined);
  return cached || networkPromise || fetch(req); // last resort network
}
