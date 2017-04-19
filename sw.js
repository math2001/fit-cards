"use strict";

const CACHE_NAME = 'fit-cards-math2001'
const URLS_TO_CACHE = [
    '/',
    '/decks.json',
    '/app.js',
    '/style.css',
    '/index.html',
    '/imgs/club.svg',
    '/imgs/diamond.svg',
    '/imgs/favicon.png',
    '/imgs/heart.svg',
    '/imgs/mirror.svg',
    '/imgs/spade.svg'
]

self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE)
        })
    )

})

self.addEventListener('fetch', e => {

    let request = e.request

    if (request.method !== 'GET') {
        return
    }
    
    e.respondWith(fetch(request).then(response => {
        caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response)
        })
        return response.clone()
    }).catch(error => {
        return caches.open(CACHE_NAME).then(cache => {
            return cache.match(request).then(response => {
                return response
            })
        })
    }))

})
