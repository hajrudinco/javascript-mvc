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
            this.setViewActions();
        },
        showView: function() {
            app.setActiveView(this.layout);
            this.layout.display();
        },
        createChildControllers: function() {
            this.newController = new NewController(this);
        },
        showChildViews: function() {
            this.listView.display();
            this.newController.showView();
        },
        setViewActions: function() {
            var self = this;

            self.layout.onShow.attach(function() {
                self.showChildViews();
            });
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