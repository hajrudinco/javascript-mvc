define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var MVC = require("mvc");

    QUnit.module( "Model test" );
    QUnit.test( "Test model event", function( assert ) {
        // arrange
        var a = new MVC.Model();
        var b = "";
        assert.ok( b == "", "b empty" );
        a.fieldChanged.attach(function(model, args) {
            b = args.newValue;
        });

        // act
        a.field("test", 5);

        // assert
        assert.ok( b == "5", "b 5" );
    });

    QUnit.test( "Test deffered event", function( assert ) {
        var a = new MVC.Model();

        a.field("test", 5);

        assert.ok( a.field("test") == "5", "a test field = 5" );

        $.when(a.get()).then(function(model) {
            model.field("test", 10);
        });

        assert.ok( a.field("test") == "10", "a test field 10" );
    });
});
