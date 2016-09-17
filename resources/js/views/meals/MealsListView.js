define([
    'jquery',
    'underscore',
    'backbone',
    'models/MealModel',
    'collections/MealsCollection',
    'text!templates/meals/MealsListTemplate.html'
], function($, _, Backbone, MealModel, MealsCollection, MealsListTemplate){
    var mealsListView = Backbone.View.extend({

        initialize:function() {

            var self = this;

            var fetchComplete = function() {
                self.render();
            };

            self.collection = new MealsCollection();
            self.collection.fetch({success : fetchComplete});
        },

        render: function(){

            var template = _.template(MealsListTemplate);

            mainView.router.load({
                content: template({meals: this.collection.models}),
                animatePages: true,
                pushState: true
            });
        }
    });
    return mealsListView;

});
