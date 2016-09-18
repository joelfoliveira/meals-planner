define([
    'underscore',
    'backbone',
    'localForageSync',
    'models/MealModel',
    'models/PlanningModel'
], function(_, Backbone, LocalForageSync, MealModel, PlanningModel){
    var PlanningsCollection = Backbone.Collection.extend({

        model: MealModel,

        initialize: function(){
            this.changeSort('name');
        },

        generatePlanning: function(meals, days){
            days = days || 7;

            if(meals == null || meals.length == 0){
                return null;
            }


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

    return PlanningsCollection;
});