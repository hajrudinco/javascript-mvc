define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Utility = require("utility/utility");

    var Model = function(data) {
        var self = this;
        self.data = data || {};

        self.fieldChanged = new Utility.Event(self);
    };

    _.extend(Model.prototype, {
        api: "",
        identifier: "id",
        get: function() {
            var self = this;
            var getFn = $.Deferred();

            if (self.api) {
                $.get(self.api + "/" + self.data[self.identifier]).
                    done(function(data) {
                        getFn.resolve(data);
                    }).
                    fail(function(response) {
                        console.log(response);
                        getFn.reject(response);
                    });
            }
            else {
                getFn.resolve(self);
            }

            return getFn.promise();
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