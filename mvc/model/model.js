define(function(require) {

    var _ = require("underscore");
    var Utility = require("utility/utility");

    var Model = function(data, collection) {
        var self = this;
        data = data || {};
        self.data = data;
        self.collection = collection;

        self.fieldChanged = new Utility.Event(self);
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
                self.fieldChanged.notify({
                    name: name,
                    newValue: value
                });
            }
            return self.data[name];
        }
    });

    return Model;
});