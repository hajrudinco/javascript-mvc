requirejs.config({
    baseUrl: "./mvc",
    paths: {
        "jquery": "lib/jquery/dist/jquery"
    },

    shim : {

    }
});


require([
    "main",
    "jquery"
], function(MVC){
    window.MVC = MVC;
});