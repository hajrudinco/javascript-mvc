define(function(require) {

    var _ = require("underscore");

    var UrlController = function(controllerId) {
        var self = this;
        self.controllerId = controllerId;
    };

    _.extend(UrlController.prototype, {
        /**
         * Used for url controller identification
         */
        controllerId: undefined
    });

    return UrlController;
});