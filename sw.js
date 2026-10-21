const CACHE_NAME = 'paofin-cache-v2'; // อัปเดตเวอร์ชันเป็น v2
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  // บังคับให้ Service worker ใหม่ทำงานทันทีโดยไม่ต้องรอ
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ล้างแคชเวอร์ชันเก่าทิ้งเมื่อเปิดใช้งาน
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // ดึงข้อมูลจากอินเทอร์เน็ตก่อน ถ้าเน็ตหลุดถึงจะดึงจากแคช (Network-first)
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
