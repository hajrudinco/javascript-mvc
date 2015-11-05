requirejs.config({
    baseUrl: "./mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "utility": "utility/utility"
    },

    shim : {

    }
});


require([
    "mvc",
    "utility",
    "jquery"
], function(MVC){
    window.MVC = MVC;
});