define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");

    var Controller = function(controllerId) {
        var self = this;
        self.controllerId = controllerId;
        self.init();
    };

    _.extend(Controller.prototype, {
        controllerId: undefined,
        init: function() {
            // empty function for initialization of other resources
        }
    });

    return Controller;
});