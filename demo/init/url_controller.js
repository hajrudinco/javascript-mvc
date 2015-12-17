define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var ViewControllers = require("demo/init/controller");
    var app = require("demoApp");

    var UrlController = MVC.UrlController.Extend({
        test: function() {
            var view = new Views.InitView(new ViewControllers.InitController(), { "test": "testing" });
            app.setActiveView(view);

            view.display();
        },
        index: function() {
            var view = new Views.IndexView(new ViewControllers.IndexController(), { "a": "AAAA", "b": "BBBB"  });
            app.setActiveView(view);

            view.display();
        }
    });

    return UrlController;
});