
var sitePath = '/meals-planner/www';
var cacheName = "meals-planner-dev20160910-14";

var resourcesToCache = [
    sitePath+'/',
    sitePath+'/resources/frameworks/bootstrap/css/bootstrap.min.css',
    sitePath+'/resources/frameworks/underscore-min.js',
    sitePath+'/resources/frameworks/backbone-min.js',
    sitePath+'/resources/frameworks/jquery-3.1.0.min.js',
    sitePath+'/resources/frameworks/tether/js/tether.min.js',
    sitePath+'/resources/frameworks/bootstrap/js/bootstrap.min.js',
    sitePath+'/resources/frameworks/localforage.min.js',
    sitePath+'/resources/js/app.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(resourcesToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [];

    event.waitUntil(caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            if (cacheWhitelist.indexOf(key) === -1) {
                return caches.delete(key);
            }
        }));
    }));
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});