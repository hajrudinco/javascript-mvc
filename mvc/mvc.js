define(function(require) {

    var MVC = {};

    MVC.Utility = require('utility/utility');
    MVC.Model = require('model/model');

    MVC.Model.Extend = MVC.Utility.Extend.doExtend;

    return MVC;
});

