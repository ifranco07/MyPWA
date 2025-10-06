//Estructura basica de un Service Worker

const {cache} = require



// 1. Nombre del cache y archivos a cachear
const CACHE_NAME = 'mi-cache-v1',
  urlsToCache = [
    "index.html",
    "Offline.html"
  ];

// 2. Install -> se ejecuta al instalar el sw
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// 3. Activate -> se ejecuta al activar (Limpia cachés viejas)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key =>key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});