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

    var initialize = function(delay){

        mainRouter = new AppRouter;
        mainRouter.on('route:showMealsForm', function(id){
            var mealsFormView = new MealsFormView(id);
        });

        mainRouter.on('route:showMealsCalendar', function(){
            var mealsCalendarView = new MealsCalendarView();
        });

        mainRouter.on('route:defaultAction', function () {
            var mealsListView = new MealsListView();
        });



        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
