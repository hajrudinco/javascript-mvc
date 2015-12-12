define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/init/views");
    var ViewController = require("demo/init/controller");
    var app = require("demoApp");

    var UrlController = MVC.UrlController.Extend({
        test: function() {
            var view = new Views.InitView(self, { "test": "testing" });
            var view2 = new Views.IndexView(new ViewController(), { "a": "AAAA", "b": "BBBB"  });

            app.setActiveView(view);

            view.addChild(view2);
            view.display();
        },
        index: function() {
            var view = new Views.IndexView(new ViewController(), { "a": "AAAA", "b": "BBBB"  });
            app.setActiveView(view);

            view.display();
        }
    });

    return UrlController;
});