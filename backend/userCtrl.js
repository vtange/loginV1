//get Mongoose object
var UserModel = require('../models/user');

//give Mongoose object (mongoose.model"User") abilities
module.exports.list = function (req,res){
    UserModel.find({}, function (err,results) {
        res.json(results);
    });
};

module.exports.create = function (req,res){
    var User = new UserModel(req.body);
    User.save(function (err,result) {
        res.json(result);
    });
};
