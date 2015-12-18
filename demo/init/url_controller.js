define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var ViewControllers = require("demo/init/controller");
    var app = require("demoApp");

    var UrlController = MVC.UrlController.Extend({
        test: function() {
            var controller = new ViewControllers.InitController();
            var view = new Views.InitView(controller, { "test": "testing" });

            app.setActiveView(view);
            view.display();
        },
        index: function() {
            var controller = new ViewControllers.IndexController();
            var view = new Views.IndexView(controller, { "a": "AAAA", "b": "BBBB"  });
            controller.setViewActions();

            app.setActiveView(view);
            view.display();
        }
    });

    return UrlController;
});