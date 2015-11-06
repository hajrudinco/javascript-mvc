define(function(require) {

    var _ = require('underscore');

    var Extend = {};

    /**
     * Extend utility - extends object and initializes inheritance chain
     * @param  {object} properties  properties to override
     * @param  {object} staticProps [description]
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
        $.extend(child.prototype, properties);

        /**
         * Set parent reference
         */
        child.baseObject = parent.prototype;

        return child;
    };

    return Extend;
});