define(function(){

    return {
        sync: function(store, method, model, options){

            if(store == null || typeof(store) == 'undefined'){
                return;
            }

            options.success = options.success || function(){};

            var validId = function(id){
                return (!id || id.length === 0);
            };

            var validModel = function(model){
                if(model == null || typeof(model) == 'undefined'){
                    return false;
                }

                if(model.id == null || typeof(model.id) == 'undefined'){
                    return false;
                }

                if(model.attributes == null || typeof(model.attributes) == 'undefined'){
                    return false;
                }

                return true;
            };

            var getById = function(id, options){
                if(validId(id)){
                    store.getItem(id.toString(), function(err, value){
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
                update(model, options);
            };

            var update = function(model, options){
                if(validModel(model)){
                    store.setItem(model.id.toString(), model.attributes, function(err, value){
                        options.success(value);
                    });
                }
            };

            var deleteItem = function(model, options){
                if(validModel(model)){
                    store.removeItem(model.id.toString(), function(){
                        options.success();
                    });
                }
            };

            switch (method) {
                case "read":
                    model.id != undefined ? getById(model.id, options) : getAll(options);
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