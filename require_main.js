requirejs.config({
    baseUrl: ".",
    paths: {
        "jquery": "/mvc/lib/jquery/dist/jquery",
        "underscore": "/mvc/lib/underscore/underscore",
        "history": "/mvc/lib/history.js/scripts/bundled-uncompressed/html5/jquery.history",
        "text": "/mvc/lib/requirejs-text/text",

        "mvc": "/mvc/build/mvc",

        // demo app
        "demoApp": "/demo/app",
        "demo": "/demo",

        shim : {
            "mvc": {
                "deps": ["jquery", "underscore", "history", "text"]
            },
            "history": {
                "deps" : ["jquery"]
            }
        }
    }
});


require([
    "mvc",
    "demoApp",
    "demo/init/url_controller",
    "demo/todo/url_controller"
], function (
    MVC,
    app,
    InitUrlController,
    ToDoUrlController) {

    app.addController(new InitUrlController("init"));
    app.addController(new ToDoUrlController("todo"));

    // start demo app after controller initialization
    app.start();
});