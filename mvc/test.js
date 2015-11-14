define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var Test = {};

    QUnit.test( "First test", function( assert ) {
        assert.ok( 1 == "1", "Passed!" );
    });

    Test.runTests = function() {
        QUnit.start();
    };

    return Test;
});
