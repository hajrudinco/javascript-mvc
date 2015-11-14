define(function(require) {

    var QUnit = require("lib/qunit/qunit/qunit");
    var MVC = require("mvc");

    QUnit.module( "List test" );
    QUnit.test( "Test list init", function( assert ) {
        var a = new MVC.List([1, 2, 3, 4, 5]);
        assert.ok( a.getElements().length == "5", "list length" );
    });

    QUnit.test( "Test list add remove", function( assert ) {
        var a = new MVC.List([1, 2, 3, 4, 5]);
        assert.ok( a.getElements().length == "5", "list length before add" );

        var b = "";
        a.elementAdded.attach(function(model, args) {
            b = args.element;
        });

        a.addElement(8);

        assert.ok( a.getElements().length == "6", "list length after add" );
        assert.ok( b == "8", "new value 8 notified" );
    });
});
