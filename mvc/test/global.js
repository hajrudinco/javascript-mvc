define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var MVC = require("mvc");
    var Test = {};

    QUnit.module( "Global tests" );
    QUnit.test( "First test", function( assert ) {
        assert.ok( 1 == "1", "1 = 1" );
    });

    QUnit.test( "Test extend", function( assert ) {
        var a = new MVC.Model();
        var ApiModel = MVC.Model.Extend({
            api: "test/"
        });
        var b = new ApiModel({
            sampleData: "True"
        });
        assert.ok( a.api == "", "Api empty" );
        assert.ok( b.api == "test/", "Api not empty and correct" );
        assert.ok( b.field("sampleData") == "True", "Field retrieve" );
    });

    QUnit.test( "Test event", function( assert ) {
        var a = new MVC.Model();
        a.testEvent = new MVC.Utility.Event();
        a.field("test", 5);

        assert.ok( a.field("test") == "5", "a Api field" );

        var b = "";

        a.testEvent.attach(function(sender, args) {
            b = args.newValue;
        });

        assert.ok( b == "", "b empty" );
        a.testEvent.notify({ newValue: 10 });
        assert.ok( b == "10", "b 10" );
    });

});
