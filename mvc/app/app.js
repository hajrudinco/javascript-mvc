define(function(require) {

    require("history");
    var History = window.History;
    var _ = require("underscore");

    var App = function(data) {
        var self = this;

        History.Adapter.bind(window, 'statechange', self.onStateChange);
    };

    _.extend(App.prototype, {
        rootElement: undefined,
        rootSelector: undefined,

        activeView: undefined,

        controllers: {},

        start: function() {
            var self = this;
            var state = self.getState();

            self.rootElement = $(self.rootSelector).eq(0);

            self.onStateChange();
        },
        onStateChange: function() {
            var self = this;
            var state = History.getState();
            var hash = state.hash;
            var parts = hash.split("/");
            parts = _.compact(parts);

            console.log(parts);

            // parts[0] - controller
            // parts[1] - controller action
            // parts[2+] - action arguments
            var controller = self.controllers[parts[0]];
            var action = parts[1];

            controller[action].apply(controller, _.rest(parts));
        },
        setActiveView: function(newView) {
            var self = this;

            newView.element = self.rootElement;

            if(self.activeView) {
                self.activeView.destroy();
            }
            self.activeView = newView;
        },
        goToState: function(url, data, title) {
            History.pushState(data || null, title || null, url);
        },
        getState: function() {
            return History.getState();
        },
        addController: function(controller) {
            var self = this;
            self.controllers[controller.controllerId] = controller;
        }
    });

    return App;
});