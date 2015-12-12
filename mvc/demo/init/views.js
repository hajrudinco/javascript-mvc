define(function(require) {

    var MVC = require("mvc");
    var initHtml = require("text!demo/init/templates/init.html")
    var indexHtml = require("text!demo/init/templates/index.html")

    var Views = {};

    Views.InitView = MVC.View.Extend({
        template: initHtml
    });

    Views.IndexView = MVC.View.Extend({
        template: indexHtml,
        containerSelector: ".left"
    });

    return Views;
});