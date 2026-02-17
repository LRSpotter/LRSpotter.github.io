const CACHE_NAME = 'lrspotter-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// 安裝 Service Worker 並快取基本檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 攔截請求（確保離線時也能開啟基本框架）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});