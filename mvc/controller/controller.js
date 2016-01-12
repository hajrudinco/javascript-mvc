define(function(require) {

    var _ = require("underscore");

    var Controller = function(view) {
        var self = this;

        self.view = view;
        self.init.apply(self, arguments);
    };

    _.extend(Controller.prototype, {
        init: function() {
            // empty function for initialization
        }
    });

    return Controller;
});