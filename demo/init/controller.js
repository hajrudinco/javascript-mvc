define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var app = require("demoApp");

    var Controllers = {};

    Controllers.IndexController = MVC.Controller.Extend({
        setViewActions: function() {
            this.view.beforeShow.attach(function() {
                alert("View before show")
            });
            this.view.onShow.attach(function() {
                alert("View shown")
            });
        },
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