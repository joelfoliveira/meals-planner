define(function(){

    return {
        sync: function(store, method, model, options){
            if(store == null || typeof(store) == 'undefined'){
                return;
            }

            options.success = options.success || function(){};

            var validModel = function(model){
                if(model == null || typeof(model) == 'undefined'){
                    return false;
                }

                if(model.id == null || typeof(model.id) == 'undefined' || model.id.length === 0){
                    return false;
                }

                if(model.attributes == null || typeof(model.attributes) == 'undefined'){
                    return false;
                }

                if(model.attributes.success && typeof(model.attributes.success) != 'undefined'){
                    delete model.attributes.success;
                }

                return true;
            };

            var getById = function(model, options){
                if(validModel(model)){
                    store.getItem(model.id.toString(), function(err, value){
                        options.success(value);
                    });
                }
            };

            var getAll = function(options){
                var items = [];
                store.iterate(function(value) {
                    items.push(value);
                }, function() {
                    options.success(items);
                });
            };

            var create = function(model, options){
                getNextKey(function(key){
                    model.set("id", key);
                    update(model, options);
                });
            };

            var update = function(model, options){
                if(validModel(model)){
                    store.setItem(model.attributes.id.toString(), model.attributes, function(err, value){
                        options.success(value);
                    });
                }
            };

            var deleteItem = function(model, options){
                if(validModel(model)){
                    store.removeItem(model.attributes.id.toString(), function(){
                        options.success();
                    });
                }
            };

            var getNextKey = function(callback){
                store.keys(function(err, keys) {
                    var max = 1;
                    for(var i in keys){
                        var key = parseInt(keys[i])
                        if(Number.isInteger(key) && key > max){
                            max = key
                        }
                    }
                    callback(++max);
                });
            };

            switch (method) {
                case "read":
                    model.id != undefined ? getById(model, options) : getAll(options);
                    break;
                case "create":
                    create(model, options);
                    break;
                case "update":
                    update(model, options);
                    break;
                case "delete":
                    deleteItem(model, options);
                    break;
            }
        }
    };
});