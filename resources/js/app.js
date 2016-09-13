/*if('serviceWorker' in navigator) {
 navigator.serviceWorker
 .register('/meals-planner/www/sw.js')
 .then(function() { console.log("Service Worker Registered"); });
 }*/

// Initialize your app
var myApp = new Framework7({
    router: false
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main');

require.config({
    paths: {
        jquery: '../frameworks/jquery-3.1.0.min',
        underscore: '../frameworks/underscore-min',
        backbone: '../frameworks/backbone-min',
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
], function($, _, Backbone, Router){
    var initialize = function(){
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
