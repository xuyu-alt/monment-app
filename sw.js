const CACHE_NAME = 'moments-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 安装Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有响应，则返回缓存
        if (response) {
          return response;
        }
        // 否则从网络获取
        return fetch(event.request);
      }
    )
  );
});

// 更新Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 