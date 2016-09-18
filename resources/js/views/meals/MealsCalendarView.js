define([
    'jquery',
    'underscore',
    'backbone',
    'models/MealModel',
    'collections/MealsCollection',
    'text!templates/meals/MealsCalendarTemplate.html'
], function($, _, Backbone, MealModel, MealsCollection, MealsCalendarTemplate){
    var mealsCalendarView = Backbone.View.extend({

        initialize:function() {

            var self = this;

            var fetchComplete = function() {
                self.collection.generatePlanning();
                self.render();
            };

            self.collection = new MealsCollection();
            self.collection.changeSort('name');
            self.collection.fetch({success : fetchComplete});
        },

        render: function(){

            var template = _.template(MealsCalendarTemplate);

            mainView.router.load({
                content: template(),
                animatePages: true,
                pushState: true
            });

            this.setEvents();
        },

        print: function(){
            if(window.print){
                window.print();
            }
        },

        setEvents: function(){
            var self = this;
            $$('.action-print').off('click').on('click', function(){
                self.print();
            });
        }

    });
    return mealsCalendarView;
});
