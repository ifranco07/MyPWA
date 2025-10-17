//Estructura basica de un Service Worker

const {cache} = require



// 1. Nombre del cache y archivos a cachear
const CACHE_NAME = 'mi-cache-v1',
  urlsToCache = [
    "index.html",
    "offline.html",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png"
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

// 4. FETCH -> intercepta peticiones de la app
// Intercepta cada petición de la PWA
// Buscar primero en caché
// Si no está, busca en Internet
// En caso de falla, muestro la página offline.html
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match("offline.html"));
        })
    );
});

// 5. PUSH -> notificaciones en segundo plano
// Manejo de notificaciones push (opcional)
self.addEventListener("push", event => {
    const data = event.data ? event.data.text() : "Notificación sin texto";
    event.waitUntil(
        self.registration.showNotification("Mi PWA", {
            body: data
        })
    );
});