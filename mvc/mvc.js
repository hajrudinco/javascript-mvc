define(function(require) {

    var MVC = {};

    MVC.Utility = require('utility/utility');
    MVC.Model = require('model/model');
    MVC.List = require('model/list');

    MVC.Model.Extend =
        MVC.List.Extend = MVC.Utility.Extend.doExtend;

    return MVC;
});

