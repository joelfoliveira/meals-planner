define([
    'underscore',
    'backbone',
    'Utils',
    'localForageSync',
    'models/MealModel',
    'models/PlanningModel'
], function(_, Backbone, Utils, LocalForageSync, MealModel, PlanningModel){
    var PlanningsCollection = Backbone.Collection.extend({

        model: PlanningModel,

        initialize: function(){
            this.changeSort('name');
        },

        generatePlanning: function(meals, days){
            days = days || 7;

            if(meals == null || meals.length == 0){
                return null;
            }

            Utils.shuffleArray(meals);
            meals = meals.splice(0, days);

            var date = new Date();
            date.setDate(date.getDate() + 1);
            var dailyMeals = [];

            for(var i in meals)
            {
                dailyMeals.push({
                    date: new Date(date),
                    meal: meals[i].attributes
                });

                date.setDate(date.getDate() + 1);
            }

            var planning = new PlanningModel();
            planning.set("id", "planning");
            planning.set("dailyMeals", dailyMeals);
            return planning;
        },

        sync: function(method, model, options){
            LocalForageSync.sync(planningStore, method, model, options);
        },

        comparator: function (property) {
            return selectedStrategy.apply(myModel.get(property));
        },

        strategies: {
            name: function (planning) { return planning.get("name"); },
        },

        changeSort: function (sortProperty) {
            this.comparator = this.strategies[sortProperty];
        }
    });

    return PlanningsCollection;
});