define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/todo/views");
    var ListController = require("demo/todo/list_controller");

    var UrlController = MVC.UrlController.Extend({
        list: function() {
            var listController = new ListController();
            listController.showView();
        }
    });

    return UrlController;
});