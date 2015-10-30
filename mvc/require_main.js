requirejs.config({
    baseUrl: "./mvc",
    paths: {
        "jquery": "libs/jquery/dist/jquery"
    },

    shim : {

    }
});


require([
    "main"
], function(MVC){
    window.MVC = MVC;
});