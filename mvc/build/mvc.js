define('utility/extend',['require','underscore'],function(require) {

    var _ = require('underscore');

    var Extend = {};

    /**
     * Extend utility - extends object and initializes inheritance chain
     * @param  {object} properties  properties to override
     * @return extended object
     */
    Extend.doExtend = function(properties) {
        properties = properties || {};
        var parent = this;
        var child;

        if (_.has(properties, 'constructor')) {
            /**
             * Constructor overriden
             */
            child = properties.constructor;
        }
        else {
            /**
             * Use parent's constructor
             */
            child = function() {
                return parent.apply(this, arguments);
            };
        }

        /**
         * Inherit from parent without call to it's constructor
         * Use child constructor with parent prototype
         */
        function Temp() {
            this.constructor = child;
        };
        Temp.prototype = parent.prototype;
        child.prototype = new Temp;

        /**
         * Override (inherit) properties
         */
        _.extend(child.prototype, properties);

        /**
         * Set parent reference
         */
        child.baseObject = parent.prototype;

        return child;
    };

    return Extend;
});
define('utility/event',['require','underscore'],function(require) {

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
define('utility/utility',['require','utility/extend','utility/event'],function(require) {

    var Utility = {};

    Utility.Extend = require("utility/extend");
    Utility.Event = require("utility/event");

    return Utility;
});
define('app/app',['require','history','underscore'],function(require) {

    require("history");
    var History = window.History;
    var _ = require("underscore");

    var App = function(data) {
        var self = this;

        History.Adapter.bind(window, 'statechange', function() {
            self.onStateChange();
        });
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
        onStateChange: function(scope) {
            var self = this;
            var state = History.getState();
            var hash = state.hash;
            var parts = hash.split("/");
            parts = _.compact(parts);

            // parts[0] - controller
            // parts[1] - controller action
            // parts[2+] - action arguments
            var controller = self.controllers[parts[0]];
            var action = parts[1];

            controller[action].apply(controller, _.rest(parts));
        },
        setActiveView: function(newView) {
            var self = this;

            newView.parentElement = self.rootElement;

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
define('model/model',['require','jquery','underscore','utility/utility'],function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Utility = require("utility/utility");

    var Model = function(data) {
        var self = this;
        self.data = data || {};

        self.fieldChanged = new Utility.Event(self);
    };

    _.extend(Model.prototype, {
        api: "",
        identifier: "id",
        get: function() {
            var self = this;
            var getFn = $.Deferred();

            if (self.api) {
                $.get(self.api + "/" + self.data[self.identifier]).
                    done(function(data) {
                        getFn.resolve(data);
                    }).
                    fail(function(response) {
                        console.log(response);
                        getFn.reject(response);
                    });
            }
            else {
                getFn.resolve(self);
            }

            return getFn.promise();
        },
        put: function() {
            throw("TODO");
        },
        post: function() {
            throw("TODO");
        },
        delete: function() {
            throw("TODO");
        },
        field: function(name, value) {
            var self = this;
            if(value) {
                self.data[name] = value;
                self.fieldChanged.notify({
                    name: name,
                    newValue: value
                });
            }
            return self.data[name];
        }
    });

    return Model;
});
define('model/list',['require','underscore','utility/utility'],function(require) {

    var _ = require("underscore");
    var Utility = require("utility/utility");

    var Event = Utility.Event;

    function List(elements) {
        var self = this;
        elements = elements || [];
        self._elements = elements;

        self.elementAdded = new Event(self);
        self.elementRemoved = new Event(self);
        self.listChanged = new Event(self);

        self.init.apply(self, arguments);
    }

    List.prototype = {
        model: undefined,

        init: function() {
            // empty function
        },

        /**
         * Loads elements from api only if model is defined
         * @return {promise} deffered function
         */
        loadElements: function() {
            throw("TODO");
        },

        /**
         * Returns copy of elements
         */
        getElements: function() {
            return [].concat(this._elements);
        },

        /**
         * Returns element at desired index
         */
        getElementAt: function(index) {
            return this._elements[index];
        },

        /**
         * Return first element that matches filter
         * @param  {object} filter
         */
        getElement: function(filter) {
            var self = this;
            var match = _.matcher(filter);
            _.each(self._elements, function(element) {
                if(match(element)) {
                    return element;
                }
            });
        },

        addElement : function (element) {
            var self = this;

            self._elements.push(element);
            self.elementAdded.notify({ element: element });
            self.listChanged.notify({ addedElement: element });
        },

        removeElementAt: function (index) {
            var element;

            element = this._elements[index];
            this._elements.splice(index, 1);
            this.elementRemoved.notify({ element: element });
            this.listChanged.notify({ removedElement: element });
        }
    };

    return List;

});
define('view/view',['require','jquery','underscore','utility/utility'],function(require) {

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
define('controller/controller',['require','underscore'],function(require) {

    var _ = require("underscore");

    var Controller = function(view) {
        var self = this;

        self.view = view;
        self.init.apply(self, arguments);
    };

    _.extend(Controller.prototype, {
        init: function() {
            // empty function for initialization
        }
    });

    return Controller;
});
define('controller/url_controller',['require','underscore'],function(require) {

    var _ = require("underscore");

    var UrlController = function(controllerId) {
        var self = this;
        self.controllerId = controllerId;
    };

    _.extend(UrlController.prototype, {
        /**
         * Used for url controller identification
         */
        controllerId: undefined
    });

    return UrlController;
});
define('mvc',['require','jquery','underscore','history','text','utility/utility','app/app','model/model','model/list','view/view','controller/controller','controller/url_controller'],function(require) {

    require("jquery");
    require("underscore");
    require("history");
    require("text");

    var MVC = {};

    MVC.Utility = require('utility/utility');

    MVC.App = require('app/app');
    MVC.Model = require('model/model');
    MVC.List = require('model/list');
    MVC.View = require('view/view');
    MVC.Controller = require('controller/controller');
    MVC.UrlController = require('controller/url_controller');

    MVC.App.Extend =
        MVC.Model.Extend =
        MVC.List.Extend =
        MVC.View.Extend =
        MVC.Controller.Extend =
        MVC.UrlController.Extend = MVC.Utility.Extend.doExtend;

    return MVC;
});


requirejs.config({
    baseUrl: "/mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore",
        "history": "lib/history.js/scripts/bundled-uncompressed/html5/jquery.history",
        "text": "lib/requirejs-text/text"
    },

    shim : {
        "history": {
            "deps" : ["jquery"]
        },
    }
});


require([
    "mvc"
], function (MVC) {
    window.MVC = MVC;
});
define("require_main", function(){});

