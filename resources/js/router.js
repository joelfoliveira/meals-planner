define([
    'jquery',
    'underscore',
    'backbone',
    'views/meals/MealsListView',
    'views/meals/MealsFormView',
    'views/meals/MealsCalendarView'
], function($, _, Backbone, MealsListView, MealsFormView, MealsCalendarView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'meals-form(/:id)': 'showMealsForm',
            'meals-calendar': 'showMealsCalendar',
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;
        app_router.on('route:showMealsForm', function(id){
            var mealsFormView = new MealsFormView();
            mealsFormView.render();
        });

        app_router.on('route:showMealsCalendar', function(){
            var mealsCalendarView = new MealsCalendarView();
            mealsCalendarView.render();
        });

        app_router.on('route:defaultAction', function () {
            var mealsListView = new MealsListView();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
