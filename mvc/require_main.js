requirejs.config({
    baseUrl: "/mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore",
        "history": "lib/history.js/scripts/bundled-uncompressed/html5/jquery.history",
        "text": "lib/requirejs-text/text"
    },

    shim : {
        "history": {
            "deps" : ["jquery"]
        },
    }
});


require([
    "mvc"
], function (MVC) {
    window.MVC = MVC;
});