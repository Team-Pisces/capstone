let CACHE_NAME = 'cashed-cache-v1'

const urlsToCache = ['/', '/index.html']

self.addEventListener('install', function(event) {
  //perform install
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response
      }
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        let responseToCache = response.clone()

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
