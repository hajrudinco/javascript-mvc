requirejs.config({
    baseUrl: "/mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore",
        "history": "lib/history.js/scripts/bundled-uncompressed/html5/jquery.history",
        "text": "lib/requirejs-text/text",

        // demo app config
        "demoApp": "demo/app"
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
    "demo/init/url_controller"
], function (
    MVC,
    app,
    InitUrlController) {

    app.addController(new InitUrlController("init"));

    // start demo app after controller initialization
    app.start();
});