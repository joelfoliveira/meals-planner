define([
    'underscore',
    'backbone',
    'localForageSync',
], function(_, Backbone, LocalForageSync) {

    var MealModel = Backbone.Model.extend({

        sync: function(method, model, options){
            LocalForageSync.sync(mealsStore, method, model, options);
        }

    });

    return MealModel;
});
