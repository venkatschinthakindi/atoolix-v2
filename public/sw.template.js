/* atoolix Service Worker */

const CACHE_VERSION = "__BUILD_VERSION__";
const CACHE_NAME = `atoolix-${CACHE_VERSION}`;

const APP_SHELL = [
  "/",
  "/offline",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/maskable-512.png",
];

// Paths under these prefixes are never cached — page shell, RSC payloads,
// and data requests always go straight to the network. Tool pages render
// state from URL search params and local component state; caching their
// shell/RSC responses causes stale/inconsistent behavior across visits.
const NO_CACHE_PREFIXES = [
  "/tools",
  "/about",
  "/calculator",
  "/datetime",
  "/finance",
  "/image",
  "/pdf",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/documentation"
];

// ---------------------------------------------------------------------------
// INSTALL
// ---------------------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)));
    })()
  );
});

// ---------------------------------------------------------------------------
// MESSAGE (manual skip-waiting trigger from the client)
// ---------------------------------------------------------------------------
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ---------------------------------------------------------------------------
// ACTIVATE
// ---------------------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

navigator.serviceWorker.addEventListener("controllerchange", () => {
  window.location.reload();
});
// ---------------------------------------------------------------------------
// FETCH
// ---------------------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  if (request.headers.has("range")) {
    return;
  }

  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  if (url.pathname.startsWith("/api")) {
    return;
  }

  // Tool pages: always network, never read from or write to cache.
  // Matches "/tools" exactly (the tools index) and everything under
  // "/tools/..." (every individual tool page, present and future).
  const isNoCachePath = NO_CACHE_PREFIXES.some(
    (prefix) => url.pathname?.toLowerCase() === prefix || url.pathname?.toLowerCase().startsWith(`${prefix}/`)
  );

  if (isNoCachePath) {
    event.respondWith(networkOnly(request));
    return;
  }

  // Full page loads: hard refresh, typed URL, external link, hard nav.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Next.js App Router client-side navigation / prefetch payloads.
  // These hit the *same* URL across builds (unlike hashed static chunks),
  // so they must NEVER be served cache-first or they'll go stale forever.
  const isRscRequest =
    request.headers.get("RSC") === "1" ||
    request.headers.get("Next-Router-Prefetch") === "1" ||
    request.headers.get("Next-Router-State-Tree") !== null ||
    url.searchParams.has("_rsc");

  // Legacy Pages Router / route-handler JSON data requests.
  const isNextDataRequest = url.pathname.startsWith("/_next/data/");

  if (isRscRequest || isNextDataRequest) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Content-hashed, genuinely immutable static assets — safe to cache-first.
  const isImmutableStatic = url.pathname.startsWith("/_next/static/");

  if (isImmutableStatic) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else same-origin GET (images, fonts, misc assets).
  event.respondWith(cacheFirst(request));
});

// ---------------------------------------------------------------------------
// STRATEGIES
// ---------------------------------------------------------------------------

// Pure passthrough — no cache read, no cache write. If the network fails,
// this simply fails (browser shows its normal offline error), rather than
// silently serving a stale cached version of a stateful tool page.
async function networkOnly(request) {
  return fetch(request);
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok &&
      response.status === 200 &&
      response.type === "basic") {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    return caches.match("/offline");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return Response.error();
  }
}