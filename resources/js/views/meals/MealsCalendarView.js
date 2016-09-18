define([
    'jquery',
    'underscore',
    'backbone',
    'utils',
    'models/MealModel',
    'collections/MealsCollection',
    'models/PlanningModel',
    'collections/PlanningsCollection',
    'text!templates/meals/MealsCalendarTemplate.html'
], function($, _, Backbone, Utils, MealModel, MealsCollection, PanningModel, PlanningsCollection, MealsCalendarTemplate){
    var mealsCalendarView = Backbone.View.extend({

        el : $(".main-page"),

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

        setEvents: function(){
            var self = this;
            $$('.action-print').off('click').on('click', function(){
                self.print();
            });

            $$('.action-refresh').off('click').on('click', function(){
                self.showRefreshModal();
            });
        }

    });
    return mealsCalendarView;
});
