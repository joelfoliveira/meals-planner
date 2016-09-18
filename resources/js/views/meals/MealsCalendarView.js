define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/meals/MealsCalendarTemplate.html'
], function($, _, Backbone, MealsCalendarTemplate){
    var mealsCalendarView = Backbone.View.extend({

        initialize:function() {

            var self = this;

            self.render();
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
