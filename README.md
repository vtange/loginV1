# loginV1
very basic, very insecure login system
```

CLIENTSIDE (similar to a MongoDB route)

app.factory('UserService', function($resource){
    return $resource('/Users');//CAN BE ANY URL -> GET POST PUT changes to Users HERE
});//end of service
...
    var ListUsers = function(){
        $scope.list = UserService.query();
        console.log($scope.list);
    }
    $scope.addUser = function(){
        if($scope.LoginDetails.username.length > 5 && $scope.LoginDetails.password.length > 5){
       			UserService.query({username:$scope.LoginDetails.username},function(response){
       				if(response[0]){
       					console.log("Sorry name is taken")
       				}
       				else{
       					var newUser = new UserService;                 //generate resource OBJECT
       					newUser.username = $scope.LoginDetails.username;       //insert text into resource OBJECT
       					newUser.password = $scope.LoginDetails.password;       //insert text into resource OBJECT
       					newUser.$save(function (result) {
       						$scope.list.push(result);
       						ListUsers();
       					});

SERVERSIDE

var Users = require('./userCtrl.js');
app.get('/Users', Users.list);//from $resource service
app.post('/Users', Users.create);//from $resource service
...
userCtrl.js
var UserModel = require('../server/models/user');

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

```
 - A.K.A Why you should not use http GET to log in.
