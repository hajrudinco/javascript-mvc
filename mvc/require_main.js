requirejs.config({
    baseUrl: "./mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore",
        "history": "lib/history.js/scripts/bundled-uncompressed/html5/jquery.history"
    },

    shim : {
        "history": {
            "deps" : ["jquery"]
        },
    }
});


require([
    "mvc",
    "jquery",
    "history"
], function(MVC){
    window.MVC = MVC;
});