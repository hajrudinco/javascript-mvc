define(function(require) {

    var MVC = {};

    MVC.Utility = require('utility/utility');

    MVC.App = require('app/app');
    MVC.Model = require('model/model');
    MVC.List = require('model/list');

    MVC.App.Extend =
        MVC.Model.Extend =
        MVC.List.Extend = MVC.Utility.Extend.doExtend;

    return MVC;
});

