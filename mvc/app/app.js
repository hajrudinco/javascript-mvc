define(function(require) {

    var History = window.History;
    var _ = require("underscore");

    var App = function(data) {
        var self = this;

        History.Adapter.bind(window, 'statechange', self.onStateChange);
    };

    _.extend(App.prototype, {
        onStateChange: function() {
            var state = History.getState();
            console.log(state);
        },
        goToState: function(url, data, title) {
            History.pushState(data || null, title || null, url);
        },
        getState: function() {
            return History.getState();
        }
    });

    return App;
});