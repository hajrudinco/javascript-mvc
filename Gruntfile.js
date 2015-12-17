module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./mvc",
                    //name: "lib/almond/almond",
                    include: "require_main",
                    mainConfigFile: "mvc/require_main.js",
                    out: "./mvc/build/mvc.js",
                    wrapShim: true,
                    findNestedDependencies: true,
                    optimize: "none",
                    exclude: ["jquery", "history", "underscore", "text"]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('build', ['requirejs:compile']);
};