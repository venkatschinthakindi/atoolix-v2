/* atoolix Service Worker */

const CACHE_VERSION = "054507f693f83c74";
const CACHE_NAME = `atoolix-${CACHE_VERSION}`;
const APP_SHELL = [
  "/offline",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/maskable-512.png",
  "/logo.png",
  "/logo_white.png",
  "/screenshots/desktop-home.png",
  "/screenshots/mobile-home.png",
    "/toolimages/background-remover.png",
  "/toolimages/calculator.png",
  "/toolimages/compress-image-to-100kb.png",
  "/toolimages/compress-image-to-20kb.png",
  "/toolimages/compress-image-to-50kb.png",
  "/toolimages/compress-image.png",
  "/toolimages/compress-jpg.png",
  "/toolimages/compress-pdf.png",
  "/toolimages/compress-png.png",
  "/toolimages/compress-webp.png",
  "/toolimages/converter.png",
  "/toolimages/emi-calculator.png",
  "/toolimages/fd-calculator.png",
  "/toolimages/file-analyzer.png",
  "/toolimages/image-to-pdf.png",
  "/toolimages/jpg-to-pdf.png",
  "/toolimages/jpg-to-png.png",
  "/toolimages/jpg-to-webp.png",
  "/toolimages/meeting-time-finder.png",
  "/toolimages/merge-pdf.png",
  "/toolimages/passport-photo-resizer.png",
  "/toolimages/png-to-jpeg.png",
  "/toolimages/png-to-jpg.png",
  "/toolimages/png-to-pdf.png",
  "/toolimages/png-to-webp.png",
  "/toolimages/qr-code-generator.png",
  "/toolimages/resize-signature-for-upload.png",
  "/toolimages/retirement-calculator.png",
  "/toolimages/roi-calculator.png",
  "/toolimages/split-pdf.png",
  "/toolimages/svg-to-jpg.png",
  "/toolimages/svg-to-png.png",
  "/toolimages/timezone-converter.png",
  "/toolimages/webp-to-jpeg.png",
  "/toolimages/webp-to-jpg.png",
  "/toolimages/webp-to-pdf.png",
  "/toolimages/webp-to-png.png"
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
  "/qrcode",
  "/qr-code",
  "/contact",
  "/privacy",
  "/privacysecurity",
  "/terms",
  "/disclaimer",
  "/documentation",
  "/manifest.webmanifest",
  "/robots.ts",
  "/robots.txt",
  "/sitemap.ts",
  "/sitemap.xml",

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

      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })()
  );
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
  const isSameOrigin = url.origin === self.location.origin;

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  if (url.pathname.startsWith("/api") || url.pathname === "/") {
    return;
  }
  
  // Tool pages: always network, never read from or write to cache.
  // Matches "/tools" exactly (the tools index) and everything under
  // "/tools/..." (every individual tool page, present and future).
  const isNoCachePath = NO_CACHE_PREFIXES.some(
    (prefix) => url.pathname?.toLowerCase() === prefix || url.pathname?.toLowerCase().startsWith(`${prefix}`)
  );

  if (isNoCachePath) {
    event.respondWith(networkOnly(request));
    return;
  }

  // Full page loads: hard refresh, typed URL, external link, hard nav.
  if (request.mode === "navigate") {
    event.respondWith(
  networkFirst(request, event.preloadResponse)
);
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
    event.respondWith(
      networkFirst(request, event.preloadResponse)
    );
    return;
  }

  // Content-hashed, genuinely immutable static assets — safe to cache-first.
  const isImmutableStatic = url.pathname.startsWith("/_next/static/");

  if (isImmutableStatic) {
    if (!isSameOrigin) {
      event.respondWith(fetch(request));
      return;
    }

    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else same-origin GET (images, fonts, misc assets).
  if (!isSameOrigin) {
    event.respondWith(fetch(request));
    return;
  }

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

async function networkFirst(request, preloadResponsePromise) {
  try {
    const preload = await preloadResponsePromise;

    if (preload) {
      return preload;
    }

    return await fetch(request);
  } catch {
    if (request.mode === "navigate") {
      return (await caches.match("/offline")) || Response.error();
    }

    return Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    const cacheControl = response.headers.get("Cache-Control") || "";

    if (
        response.ok &&
        response.status === 200 &&
        (response.type === "basic" || response.type === "cors") &&
        !cacheControl.includes("no-store")
    ) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return Response.error();
  }
}