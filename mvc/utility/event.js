define(function(require) {

    var _ = require("underscore");

    function Event(sender) {
        this._sender = sender;
        this._listeners = [];
    };

    _.extend(Event.prototype, {
        attach: function (listener) {
            this._listeners.push(listener);
        },
        notify: function (args) {
            var index;

            for (index = 0; index < this._listeners.length; index++) {
                this._listeners[index](this._sender, args);
            }
        },
        detach: function(listener) {
           var index;

            for (index = 0; index < this._listeners.length; index++) {
                if(this._listeners[index] == listener) {
                    break;
                }
            }

            this._listeners.splice(index, 1);
        },
        removeListeners: function() {
            this._listeners.length = 0;
        }
    });

    return Event;
});