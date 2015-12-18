define(function(require) {

    var MVC = require("mvc");
    var initHtml = require("text!demo/init/templates/init.html");
    var indexHtml = require("text!demo/init/templates/index.html");

    var Views = {};

    Views.InitView = MVC.View.Extend({
        template: initHtml,
        events: [
            {
                "selector": ".init",
                "event": "click",
                "handler": "onInitClick"
            }
        ],

        init: function() {
            this.beforeDestroy.attach(function() {
                alert("before destroy");
            });
            this.onDestroy.attach(function() {
                alert("on destroy");
            });
        },

        onInitClick: function(e) {
            this.controller.goToIndexView();
        }
    });

    Views.IndexView = MVC.View.Extend({
        template: indexHtml,

        events: [
            {
                "selector": "form",
                "event": "submit",
                "handler": "onFormSubmit"
            },
            {
                "selector": "button",
                "event": "click",
                "handler": "onButtonClick"
            }
        ],

        onFormSubmit: function(e) {
            e.preventDefault();

            var self = this;
            var value = $(self.element).find(".js-name").val();

            self.controller.formSubmitted(value);
        },

        onButtonClick: function() {
            this.controller.goBack();
        },

        writeToOtherArea: function(html) {
            var self = this;

            $(self.element).find(".right").html(html);
        }
    });

    return Views;
});