define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/meals/MealsFormTemplate.html'
], function($, _, Backbone, mealsFormTemplate){
    var mealsFormView = Backbone.View.extend({
        render: function(){
            mainView.router.load({
                content: mealsFormTemplate,
                animatePages: true,
                pushState: true
            });
        }
    });
    return mealsFormView;
});
