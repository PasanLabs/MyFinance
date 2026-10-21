const CACHE_NAME = 'paofin-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './favicon.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // คืนค่า Cache หากมี หรือให้โหลดใหม่จากเน็ต
        return response || fetch(event.request);
      })
  );
});