define(function(require) {

    var MVC = require("mvc");
    var indexHtml = require("text!demo/todo/templates/index.html");
    var listHtml = require("text!demo/todo/templates/list.html");
    var newHtml = require("text!demo/todo/templates/new.html");

    var Views = {};

    Views.Layout = MVC.View.Extend({
        template: indexHtml
    });

    Views.List = MVC.View.Extend({
        template: listHtml,

        containerSelector: ".js-list",
        elementTag: "table",
        elementClass: "table",

        events: [
            {
                "selector": ".js-remove-task",
                "event": "click",
                "handler": "onTaskRemove"
            },
            {
                "selector": ".js-done-task",
                "event": "click",
                "handler": "onTaskDone"
            }
        ],

        dataEvents: [
            {
                "name": "listChanged",
                "handler": "dataChanged"
            }
        ],

        dataChanged: function() {
            this.render();
        },

        getIndex: function(e) {
            e.preventDefault();

            var btn = $(e.currentTarget);
            var index = btn.data("index");

            return index;
        },

        onTaskRemove: function(e) {
            this.controller.removeTask(this.getIndex(e));
        },

        onTaskDone: function(e) {
            this.controller.taskDone(this.getIndex(e));
        }
    });

    Views.New = MVC.View.Extend({
        template: newHtml,
        containerSelector: ".js-new",

        events: [
            {
                "selector": "form",
                "event": "submit",
                "handler": "onFormSubmit"
            }
        ],

        getName: function() {
            return $(this.element).find("input[name='name']");
        },

        onFormSubmit: function(e) {
            e.preventDefault();

            var taskName = this.getName().val();
            if(taskName.length > 0)
                this.controller.addNewTask(taskName);
        },

        resetForm: function() {
            $(this.element).find("form")[0].reset();
        }
    });

    return Views;
});