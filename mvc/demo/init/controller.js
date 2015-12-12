define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var app = require("demoApp");

    var Controller = MVC.Controller.Extend({
        leftClicked: function() {
            app.goToState("/init/index");
        }
    });

    return Controller;
});