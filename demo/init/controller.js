define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var app = require("demoApp");

    var Controllers = {};

    Controllers.IndexController = MVC.Controller.Extend({
        formSubmitted: function(value) {
            this.view.writeToOtherArea("Dobrodošli: " + value);
        },
        goBack: function() {
            app.goToState("/init/test");
        }
    });

    Controllers.InitController = MVC.Controller.Extend({
        goToIndexView: function() {
            app.goToState("/init/index");
        }
    });

    return Controllers;
});