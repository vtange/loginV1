//get Mongoose object
var UserModel = require('../server/models/user');

//give Mongoose object (mongoose.model"User") abilities
module.exports.list = function (req,res){
    UserModel.find(req.query, function (err,results) {
        //req.query for query()
        //req.params for :blahs
        //no such thing as req.body for GET requests
        res.json(results);
    });
};

module.exports.create = function (req,res){
    var User = new UserModel(req.body);
    User.save(function (err,result) {
        res.json(result);
    });
};
