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
            var editMode = this.model ? true : false;

            mainView.router.load({
                content: template({title: title, mealName: mealName, editMode: editMode}),
                animatePages: true,
                pushState: true
            });

            this.setEvents();
        },

        createMeal: function(){
            this.model = new MealModel({name: $$('#meal-name').val()});
            if(this.model.isValid()){
                this.model.save(null, {success: function(){
                    mainRouter.navigate('/', true);
                }});
            }else{
                appUi.alert('Please fill the meal details correctly.', '');
            }
        },

        updateMeal: function(){
            this.model.set('name', $$('#meal-name').val());
            if(this.model.isValid()){
                this.model.save(null, {success: function(){
                    mainRouter.navigate('/', true);
                }});
            }else{
                appUi.alert('Please fill the meal details correctly.', '');
            }
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

            $$('.action-save').off('click').on('click', function(){
                if(self.model){
                    self.updateMeal();
                }else{
                    self.createMeal();
                }
            });
        },

        showDeleteMealModal: function(){
            var self = this;
            appUi.confirm('Are you sure you want to delete this meal?', 'Delete Meal', function(){
                self.deleteMeal();
            });
        }
    });
    return mealsFormView;
});
