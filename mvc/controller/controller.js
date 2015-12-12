define(function(require) {

    var _ = require("underscore");

    var Controller = function(view) {
        var self = this;

        self.view = view;
    };

    _.extend(Controller.prototype, {
    });

    return Controller;
});