// Ceron Academic Service Worker — PWA Offline & Install Support
const CACHE_NAME = 'ceron-academic-v6';

// Immediately self-destruct if running on localhost / dev server
const isLocalhost =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1' ||
  self.location.port === '5173' ||
  self.location.hostname.startsWith('192.168.');

if (isLocalhost) {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      self.registration.unregister().then(() => {
        return caches.keys().then((keys) => {
          return Promise.all(keys.map((k) => caches.delete(k)));
        });
      })
    );
  });
  // In development, do not register fetch or static asset caching to avoid dual-React bundle conflicts
} else {
  const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/favicon.svg',
  ];

  // Install Event
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
    );
    self.skipWaiting();
  });

  // Activate Event
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    self.clients.claim();
  });

  // Fetch Event — Stale While Revalidate / Cache First for Assets, Network First for Navigation
  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET, external APIs, and local dev requests
    if (
      event.request.method !== 'GET' ||
      url.origin !== self.location.origin
    ) {
      return;
    }

    // Navigation requests: Network first with cache fallback
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request).catch(() => {
          return caches.match('/index.html') || caches.match('/');
        })
      );
      return;
    }

    // Static assets: Cache first, fallback to network
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  });
}
