define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");

    var Utility = require("utility/utility");
    var Event = Utility.Event;

    var View = function() {
        var self = this;

        self._events = [];

        self.onShow = new Event();
        self.beforeShow = new Event();

        self.afterHide = new Event();
    };

    _.extend(View.prototype, {
        parent: undefined,
        children: [],

        data: {},

        containerSelector: "body",

        template: "",
        events: {},

        render: function() {
            var self = this;
            var template = _.template(self.template);
            var html = template(self.data);

            $(self.containerSelector).html(html);
        },
        init: function() {
            // empty function for initialization of other resources
        },
        display: function() {
            var self = this;
            self.render(self.data);
        }
    });

    return View;
});