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
        }
    });

    return MealsCollection;
});