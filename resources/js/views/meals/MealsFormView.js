define([
    'jquery',
    'underscore',
    'backbone',
    'models/MealModel',
    'text!templates/meals/MealsFormTemplate.html'
], function($, _, Backbone, MealModel, MealsFormTemplate){
    var mealsFormView = Backbone.View.extend({

        initialize:function(id) {

            var self = this;
            if(id)
            {
                var model = new MealModel({id: id});
                model.fetch({success: function(model){
                    self.model = model;
                    self.render();
                }});
            }
            else
            {
                self.model = null;
                self.render();
            }

        },

        render: function(){

            var template = _.template(MealsFormTemplate);

            var title = this.model ? 'Edit Meal' : 'New Meal';
            var mealName = this.model ? this.model.get('name') : '';
            var showDelete = this.model ? true : false;

            mainView.router.load({
                content: template({title: title, mealName: mealName, showDelete: showDelete}),
                animatePages: true,
                pushState: true
            });

            this.setEvents();
        },

        deleteMeal: function(){
            this.model.destroy({success: function(){
                mainRouter.navigate('/', true);
            }});
        },

        setEvents: function(){
            var self = this;
            $$('.action-delete').off('click').on('click', function(){
                self.showDeleteMealModal();
            });
        },

        showDeleteMealModal: function(){
            var self = this;
            appUi.alert('Are you sure you want to delete this meal?', 'Delete Meal', function(){
                self.deleteMeal();
            });
        }
    });
    return mealsFormView;
});
