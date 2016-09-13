define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/meals/MealsCalendarTemplate.html'
], function($, _, Backbone, mealsCalendarTemplate){
    var mealsCalendarView = Backbone.View.extend({
        render: function(){
            mainView.router.load({
                content: mealsCalendarTemplate,
                animatePages: true,
                pushState: true
            });
        }
    });
    return mealsCalendarView;
});
