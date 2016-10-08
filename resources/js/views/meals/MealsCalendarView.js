define([
    'jquery',
    'underscore',
    'backbone',
    'Utils',
    'models/MealModel',
    'collections/MealsCollection',
    'models/PlanningModel',
    'collections/PlanningsCollection',
    'text!templates/meals/MealsCalendarTemplate.html',
    'text!templates/meals/ReplaceMealPopup.html'
], function($, _, Backbone, Utils, MealModel, MealsCollection, PanningModel, PlanningsCollection, MealsCalendarTemplate, ReplaceMealPopup){
    var mealsCalendarView = Backbone.View.extend({

        el : $(".main-page"),
        mealIndexToReplace: 0,
        mealsList: null,

        initialize:function() {

            var self = this;

            self.generatePlanning(false, true);
        },

        render: function(refreshRoute){

            var template = _.template(MealsCalendarTemplate);
            var content = template({planning: this.model, Utils: Utils});

            if(refreshRoute)
            {
                mainView.router.load({
                    content: content,
                    animatePages: true,
                    pushState: true
                });
            }
            else
            {
                this.$el.html(content);
            }

            this.setEvents();
        },

        generatePlanning: function(generateNewPlanning, refreshRoute){

            var self = this;
            var meals = null;

            var fetchComplete = function() {
                self.model = plannings.generatePlanning(meals.models);
                self.model.save();
                self.render(refreshRoute);
            };

            var plannings = new PlanningsCollection();
            plannings.fetch({id: "planning", success: function(planningsArray){
                if(!generateNewPlanning && planningsArray.length > 0 && planningsArray.models.length){
                    self.model = planningsArray.models[0];
                    self.render(refreshRoute);
                }else{
                    meals = new MealsCollection();
                    meals.changeSort('name');
                    meals.fetch({success : fetchComplete});
                }
            }});
        },

        replaceMealAtIndex: function(index, newMeal)
        {
            var self = this;

            console.log(1);
            console.log(self.model);
            if(typeof this.model == 'undefined' ||
                typeof this.model.attributes == 'undefined' ||
                typeof this.model.attributes.dailyMeals == 'undefined' ||
                this.model.attributes.dailyMeals.length == 0)
            {
                return;
            }

            self.model.attributes.dailyMeals[index].meal = newMeal.attributes;
            self.model.save();
            self.render(false);

            self.closeReplaceMealModel();
        },

        print: function(){
            if(window.print){
                window.print();
            }
        },

        refresh: function(){
            this.generatePlanning(true, false);
        },

        showRefreshModal: function(){
            var self = this;
            appUi.confirm('This will replace your current plan. Are you sure?', 'Generate new plan', function(){
                self.refresh();
            });
        },

        showReplaceMealModel: function(){

            var self = this;

            var fetchComplete = function(mealsCollection) {
                self.mealsList = mealsCollection.models;
                var template = _.template(ReplaceMealPopup);
                var popupHtml = template({meals: self.mealsList});
                appUi.popup(popupHtml);
                self.setEvents();
            };

            self.collection = new MealsCollection();
            self.collection.changeSort('name');
            self.collection.fetch({success : fetchComplete});
        },

        closeReplaceMealModel: function(){
            appUi.closeModal();
        },

        setEvents: function(){
            var self = this;
            $$('.action-print').off('click').on('click', function(){
                self.print();
            });

            $$('.action-refresh').off('click').on('click', function(){
                self.showRefreshModal();
            });

            $$('.action-popup-replace-meal').off('click').on('click', function(){
                var dayIndex = $$(this).data("day-index");
                self.mealIndexToReplace = dayIndex;
                self.showReplaceMealModel();
            });

            $$('.action-replace-meal').off('click').on('click', function(){
                var mealId = $$(this).data("meal-id");
                var plannings = new PlanningsCollection();
                var meal = plannings.getMealById(mealId, self.mealsList);
                self.replaceMealAtIndex(self.mealIndexToReplace, meal);
            });
        }

    });
    return mealsCalendarView;
});
