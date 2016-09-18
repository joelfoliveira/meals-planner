
// Global Variables
var appUi;
var $$;
var mainView;
var mainRouter;
var mealsStore;

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
    'localForage'
], function($, _, Backbone, Router, AppSettings, LocalForage){

    var initialize = function(){

        setupGlobalVariables();

        if(AppSettings.serviceWorkerActive){
            registerServiceWorker();
        }else{
            unRegisterServiceWorker();
        }

        Router.initialize();
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

    return {
        initialize: initialize
    };
});
