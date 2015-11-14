define(function(require) {

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