define([
    'underscore',
    'backbone',
    'localForageSync',
    'models/MealModel'
], function(_, Backbone, LocalForageSync, MealModel){
    var MealsCollection = Backbone.Collection.extend({

        model: MealModel,

        initialize: function(){

        },

        sync: function(method, model, options){
            LocalForageSync.sync(mealsStore, method, model, options);
        },

        comparator: function (property) {
            return selectedStrategy.apply(myModel.get(property));
        },

        strategies: {
            name: function (meal) { return meal.get("name"); },
        },

        changeSort: function (sortProperty) {
            this.comparator = this.strategies[sortProperty];
        },

    });

    return MealsCollection;
});