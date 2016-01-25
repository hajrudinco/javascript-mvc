define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");

    var Utility = require("utility/utility");
    var Event = Utility.Event;

    var View = function(controller, data) {
        var self = this;

        self.beforeShow = new Event();
        self.onShow = new Event();

        self.beforeDestroy = new Event();
        self.onDestroy = new Event();

        self.controller = controller;
        self.data = data;

        self.children = {};

        self.init.apply(self, arguments);
    };

    _.extend(View.prototype, {
        parentView: undefined,
        parentElement: undefined,

        elementTag: "div",
        elementClass: "",

        element: null, // jQuery element
        containerSelector: undefined,

        template: "",
        events: [
            // {
            //     "selector": "jQuery selector",
            //     "event": "event",
            //     "handler": "handler name"
            // }
        ],

        dataEvents: [
            // {
            //     "name": "event Name",
            //     "handler": "handler name"
            // }
        ],

        render: function() {
            var self = this;
            var template = _.template(self.template);
            var html = template({"data": self.data});

            self.element.html(html);
        },
        init: function() {
            // empty function for initialization of other resources
        },
        destroy: function() {
            var self = this;

            self.beforeDestroy.notify();

            _.each(self.children, function(child) {
                child.destroy();
            });

            self.beforeShow.removeListeners();
            self.onShow.removeListeners();
            self.beforeDestroy.removeListeners();

            self.removeDataEvents();

            /**
             * Remove element and all events
             * binded to it
             */
            self.element.remove();

            self.onDestroy.notify();
            self.onDestroy.removeListeners();
        },
        getParentElement: function() {
            var self = this;
            var parentView = self.parentView;

            /**
             * If parent element is set, just return it
             */
            if(self.parentElement) {
                return self.parentElement;
            }

            /**
             * Return parentView.element
             */
            if(parentView && parentView.element) {
                return parentView.element;
            }

            /**
             * If nothing is defined, body is used as parent selector
             */
            return $("body");
        },
        setElement: function() {
            var self = this;
            var parentElement = self.getParentElement();

            var element = parentElement.find(self.containerSelector);
            if(element.length === 0) {
                element = parentElement;
            }

            /**
             * Create wrapping element
             */
            element.html("<" + self.elementTag + "></" + self.elementTag + ">");
            element = element.find(self.elementTag).eq(0);
            element.addClass(self.elementClass);

            self.element = element;
        },
        display: function(displayChildren) {
            var self = this;
            displayChildren = displayChildren || false;

            self.beforeShow.notify();

            self.setElement();

            self.render(self.data);
            self.initEvents();

            self.initDataEvents();

            if(displayChildren) {
                _.each(self.children, function(child) {
                    child.display();
                });
            }

            self.onShow.notify();
        },
        initEvents: function() {
            var self = this;
            var element = self.element;

            _.each(self.events, function(event) {
                element.on(event.event, event.selector, function(e) {
                    self[event.handler](e);
                });
            });
        },
        initDataEvents: function() {
            var self = this;

            _.each(self.dataEvents, function(dataEvent) {
                self.data[dataEvent.name].attach(function() {
                    self[dataEvent.handler].apply(self, arguments);
                });
            });
        },
        removeDataEvents: function() {
            var self = this;

            _.each(self.dataEvents, function(dataEvent) {
                self.data[dataEvent.name].detach(self[dataEvent.handler]);
            });
        },
        setParent: function(parent) {
            var self = this;

            self.parent = parent;
        },
        addChild: function(child) {
            var self = this;

            child.setParent(self);
            if(self.children[child.containerSelector]) {
                self.children[child.containerSelector].destroy();
            }
            self.children[child.containerSelector] = child;
        }
    });

    return View;
});