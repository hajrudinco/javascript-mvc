define(function(require) {

    require("jquery");
    require("underscore");
    require("history");
    require("text");

    var MVC = {};

    MVC.Utility = require('utility/utility');

    MVC.App = require('app/app');
    MVC.Model = require('model/model');
    MVC.List = require('model/list');
    MVC.View = require('view/view');
    MVC.Controller = require('controller/controller');
    MVC.UrlController = require('controller/url_controller');

    MVC.App.Extend =
        MVC.Model.Extend =
        MVC.List.Extend =
        MVC.View.Extend =
        MVC.Controller.Extend =
        MVC.UrlController.Extend = MVC.Utility.Extend.doExtend;

    return MVC;
});

