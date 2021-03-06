define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/todo/views");

    var NewController = MVC.Controller.Extend({
        init: function(listController) {
            this.view = new Views.New(this);
            this.listController = listController;
        },
        getView: function() {
            return this.view;
        },
        addNewTask: function(taskName) {
            this.listController.addNewTask(taskName);
            this.view.resetForm();
        }
    });

    return NewController;
});