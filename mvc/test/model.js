define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var MVC = require("mvc");

    QUnit.module( "Model test" );
    QUnit.test( "Test model event", function( assert ) {
        var a = new MVC.Model();
        var b = "";

        assert.ok( b == "", "b empty" );

        a.fieldChanged.attach(function(model, args) {
            b = args.newValue;
        });

        a.field("test", 5);
        assert.ok( b == "5", "b 5" );
    });
});
