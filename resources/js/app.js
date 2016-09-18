
// Global Variables
var appUi;
var $$;
var mainView;
var mainRouter;
var mealsStore;
var planningStore;
var userSettingsStore;

require.config({
    paths: {
        jquery: '../frameworks/jquery-3.1.0.min',
        underscore: '../frameworks/underscore-min',
        backbone: '../frameworks/backbone-min',
        localForageSync: "../frameworks/backbone.localForageSync",
        localForage: '../frameworks/localforage.min',
        text: '../frameworks/text',
        templates: '../templates'
    }
});

require([
    'app',
], function(App){
    App.initialize();
});

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'appSettings',
    'seeders/Seeder',
    'localForage'
], function($, _, Backbone, Router, AppSettings, Seeder, LocalForage){

    var initialize = function(){

        setupGlobalVariables();

        if(AppSettings.serviceWorkerActive){
            registerServiceWorker();
        }else{
            unRegisterServiceWorker();
        }

        setupGlobalErrorHandling();

        databaseSeeding(function(seeding){
            var delay = seeding ? 500 : 0;
            setTimeout(function(){
                Router.initialize(delay);
            }, delay);
        });
    };

    var setupGlobalVariables = function(){
        appUi = new Framework7({
            router: false
        });

        $$ = Dom7;

        mainView = appUi.addView('.view-main');

        mealsStore = LocalForage.createInstance({
            name: AppSettings.mealsStoreName
        });

        planningStore = LocalForage.createInstance({
            name: AppSettings.planningStoreName
        });

        userSettingsStore = LocalForage.createInstance({
            name: AppSettings.userSettingsStoreName
        });
    };

    var registerServiceWorker = function(){
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register(AppSettings.appRelativePath+'/sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }
    };

    var unRegisterServiceWorker = function(){
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(var i in registrations) {
                    registrations[i].unregister()
                }
            });
        }
    };

    var setupGlobalErrorHandling = function(){
        // Track basic JavaScript errors
        window.addEventListener('error', function(e) {
            if(typeof(_gaq) != 'undefined' && _gaq){
                _gaq.push(['_trackEvent', 'JavaScript Error', e.message, e.filename + ':  ' + e.lineno, true]);
            }
        });

        // Track AJAX errors (jQuery API)
        $(document).ajaxError(function(e, request, settings) {
            if(typeof(_gaq) != 'undefined' && _gaq){
                _gaq.push(['_trackEvent', 'Ajax error', settings.url, e.result, true]);
            }
        });
    };

    var databaseSeeding = function(callback){

        callback = callback || function(){};

        userSettingsStore.getItem('firstRun', function(err, value)
        {
            var seeding = false;

            if(value !== false)
            {
                if(AppSettings.databaseSeedingActive)
                {
                    seeding = true;
                    Seeder.seedMeals();
                }

                userSettingsStore.setItem('firstRun', false);
            }

            callback(seeding);
        });
    };

    return {
        initialize: initialize
    };
});
