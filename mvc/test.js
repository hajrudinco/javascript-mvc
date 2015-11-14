define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var MVC = require("mvc");
    var Test = {};

    require("test/global");
    require("test/model");
    require("test/list");

    Test.runTests = function() {
        QUnit.start();
    };

    return Test;
});
