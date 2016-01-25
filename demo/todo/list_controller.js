define(function(require) {

    var MVC = require("mvc");
    var Views = require("demo/todo/views");
    var NewController = require("demo/todo/new_controller");
    var app = require("demoApp");

    var ListController = MVC.Controller.Extend({
        init: function() {
            this.layout = new Views.Layout();
            this.data = new MVC.List([
                {
                    name: "Task 1",
                    done: false
                },
                {
                    name: "Task 2",
                    done: false
                }
            ]);
            this.listView = new Views.List(this, this.data);
            this.createChildControllers();
            this.setChildren();
        },
        showView: function() {
            app.setActiveView(this.layout);
            this.layout.display(true);
        },
        createChildControllers: function() {
            this.newController = new NewController(this);
        },
        setChildren: function() {
            this.layout.addChild(this.listView);
            this.layout.addChild(this.newController.getView());
        },
        addNewTask: function(taskName) {
            this.data.addElement({
                name: taskName
            });
        },
        removeTask: function(index) {
            this.data.removeElementAt(index);
        },
        taskDone: function(index) {
            this.data.getElementAt(index).done = true;
            this.data.listChanged.notify();
        }
    });

    return ListController;
});