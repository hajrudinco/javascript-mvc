requirejs.config({
    baseUrl: "/mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore",
        "history": "lib/history.js/scripts/bundled-uncompressed/html5/jquery.history",
        "text": "lib/requirejs-text/text",

        // demo app config
        "demoApp": "demo/app",
        "initController": "demo/init/controller"
    },

    shim : {
        "history": {
            "deps" : ["jquery"]
        },
    }
});


require([
    "mvc",
    "demoApp",
    "initController"
], function (
    MVC,
    app,
    InitController)
    {
        app.addController(new InitController("init"));

        // start demo app after controller initialization
        app.start();
});