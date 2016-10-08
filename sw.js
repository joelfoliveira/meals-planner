
// Service Worker configuration
var sitePath = '/meals-planner/www';
var cacheName = "meals-planner-v0.29";

//// Setup Google Analytics offline support
importScripts(sitePath+'/resources/frameworks/offline-google-analytics-import.js');
goog.offlineGoogleAnalytics.initialize();

//// Resource for the app to work offline
var resourcesToCache = [
    sitePath+'/',
    sitePath+'/manifest.json',
    sitePath+'/resources/css/app.css',
    sitePath+'/resources/frameworks/font-awesome/css/font-awesome.min.css',
    sitePath+'/resources/frameworks/font-awesome/fonts/fontawesome-webfont.woff2',
    sitePath+'/resources/frameworks/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3',
    sitePath+'/resources/frameworks/framework7/css/framework7.material.min.css',
    sitePath+'/resources/frameworks/framework7/css/framework7.material.colors.min.css',
    sitePath+'/resources/frameworks/framework7/js/framework7.min.js',
    sitePath+'/resources/frameworks/backbone.localForageSync.js',
    sitePath+'/resources/frameworks/backbone-min.js',
    sitePath+'/resources/frameworks/jquery-3.1.0.min.js',
    sitePath+'/resources/frameworks/localforage.min.js',
    sitePath+'/resources/frameworks/offline-google-analytics-import.js',
    sitePath+'/resources/frameworks/require.js',
    sitePath+'/resources/frameworks/text.js',
    sitePath+'/resources/frameworks/underscore-min.js',
    sitePath+'/resources/js/collections/MealsCollection.js',
    sitePath+'/resources/js/collections/PlanningsCollection.js',
    sitePath+'/resources/js/models/MealModel.js',
    sitePath+'/resources/js/models/PlanningModel.js',
    sitePath+'/resources/js/seeders/Seeder.js',
    sitePath+'/resources/js/views/meals/MealsCalendarView.js',
    sitePath+'/resources/js/views/meals/MealsFormView.js',
    sitePath+'/resources/js/views/meals/MealsListView.js',
    sitePath+'/resources/js/app.js',
    sitePath+'/resources/js/AppSettings.js',
    sitePath+'/resources/js/Router.js',
    sitePath+'/resources/js/Utils.js',
    sitePath+'/resources/templates/meals/MealsCalendarTemplate.html',
    sitePath+'/resources/templates/meals/MealsFormTemplate.html',
    sitePath+'/resources/templates/meals/MealsListTemplate.html',
    sitePath+'/resources/templates/meals/ReplaceMealPopup.html'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(resourcesToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [cacheName, 'offline-google-analytics'];
    event.waitUntil(caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            if (cacheWhitelist.indexOf(key) === -1){
                console.log("deleting cache with key: "+key);
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
