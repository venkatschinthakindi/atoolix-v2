/* AtoolVerse Service Worker */

const CACHE_VERSION = "f5b68505d9f9da35";
const CACHE_NAME = `AtoolVerse-${CACHE_VERSION}`;

const APP_SHELL = [
  "/",
  "/offline",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/maskable-512.png",
];

/* ----------------------------------------
 * Install
 * ---------------------------------------- */

self.addEventListener("install", (event) => {
  //console.log("[SW] Installing", CACHE_VERSION);

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.allSettled(
        APP_SHELL.map((url) => cache.add(url))
      );
    })()
  );
});

/* ----------------------------------------
 * Skip Waiting
 * ---------------------------------------- */

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    //console.log("[SW] Skip waiting");

    self.skipWaiting();
  }
});

/* ----------------------------------------
 * Activate
 * ---------------------------------------- */

self.addEventListener("activate", (event) => {
  //console.log("[SW] Activated", CACHE_VERSION);

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

/* ----------------------------------------
 * Fetch
 * ---------------------------------------- */

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

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

/* ----------------------------------------
 * Network First (Pages)
 * ---------------------------------------- */

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
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

/* ----------------------------------------
 * Cache First (Assets)
 * ---------------------------------------- */

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