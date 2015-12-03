(function() {
    //start of function
  var app = angular.module('VoteApp', ['ngResource']);

app.factory('UserService', function($resource){
    return $resource('/api/Users',{user: "@user"});
});//end of service

app.controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService){

    var UserModel = $resource('/api/Users');
       //init
    $scope.list = [];
    $scope.LoginDetails = {};
    //LOAD LIST FROM DATABASE
    var ListUsers = function(){
        $scope.list = UserService.query();
    }
    $scope.UserService = UserService; // load service
    $scope.registerMode = "Login";
    $scope.toggleRegisterTxt = "New? Register Here!";
    $scope.toggleRegister = function(){
        if ($scope.registerMode == "Login"){
            $scope.registerMode = "Register";
            $scope.toggleRegisterTxt = "Back to Login";
        }
        else{
            $scope.registerMode = "Login";
            $scope.toggleRegisterTxt = "New? Register Here!";
        }
    };
    $scope.addUser = function(){
        var newUser = new UserService;                 //generate resource OBJECT
        newUser.username = $scope.LoginDetails.username;       //insert text into resource OBJECT
        newUser.password = $scope.LoginDetails.password;       //insert text into resource OBJECT
        newUser.$save(function (result) {        //cannot do (err, result) -> this will make result return a function, see #1
            $scope.list.push(result);
            ListUsers();
        });
        $scope.LoginDetails = {};
    }
    $scope.ProcessLoginDetails = function(){
        if ($scope.registerMode == "Login"){
//login
        }
        else{
//create user
            $scope.addUser();
        }
    };
}]);//end of controller
  //end of function
})();
