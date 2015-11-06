requirejs.config({
    baseUrl: "./mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "underscore": "lib/underscore/underscore"
    },

    shim : {

    }
});


require([
    "mvc",
    "jquery"
], function(MVC){
    window.MVC = MVC;
});