define([
    'underscore',
    'backbone',
    'localForageSync',
], function(_, Backbone, LocalForageSync) {

    var PlanningModel = Backbone.Model.extend({

        sync: function(method, model, options){
            LocalForageSync.sync(planningStore, method, model, options);
        },
    });

    return PlanningModel;
});
