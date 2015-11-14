define(function(require) {

    var Model = function(data, collection) {
        var self = this;
        data = data || {};
        self.data = data;
        self.collection = collection;
    };

    _.extend(Model.prototype, {
        api: "",
        identifier: "id",
        get: function() {
            throw("TODO");
        },
        put: function() {
            throw("TODO");
        },
        post: function() {
            throw("TODO");
        },
        delete: function() {
            throw("TODO");
        },
        field: function(name, value) {
            var self = this;
            if(value) {
                self.data[name] = value;
            }
            return self.data[name];
        }
    });

});