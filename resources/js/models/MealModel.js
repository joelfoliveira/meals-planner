define([
    'underscore',
    'backbone',
    'localForageSync',
], function(_, Backbone, LocalForageSync) {

    var MealModel = Backbone.Model.extend({

        sync: function(method, model, options){
            LocalForageSync.sync(mealsStore, method, model, options);
        },

        isValid: function(){

            var modelData = this.attributes || {};

            if(!modelData.name || typeof(modelData.name) === 'undefined' || modelData.name.length == 0){
                return false;
            }

            return true;
        }
    });

    return MealModel;
});
