define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/meals/MealsListTemplate.html'
], function($, _, Backbone, mealsListTemplate){
    var mealsListView = Backbone.View.extend({
        render: function(){
            mainView.router.load({
                content: mealsListTemplate,
                animatePages: true,
                pushState: true
            });
        }
    });
    return mealsListView;

});
