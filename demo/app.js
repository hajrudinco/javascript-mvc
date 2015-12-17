define(function(require) {

    var MVC = require("mvc");
    var _ = require("underscore");

    var Demo = MVC.App.Extend({
        rootSelector: "#app-body"
    });

    var app = new Demo();

    return app;
});