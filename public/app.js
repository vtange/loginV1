(function() {
    //start of function
  var app = angular.module('VoteApp', ['ngResource']);

app.factory('memory', function($http){
  var storage = {};
 storage.datadata = [];
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', '$resource', 'memory', function($scope, $resource, memory){

    var UserModel = $resource('/api/Users');
       //init
    $scope.list = [];
    $scope.LoginDetails = {};

    //PRELOAD LIST FROM DATABASE
    UserModel.query(function (results){
        $scope.list = results;
    });

    $scope.storage = memory; // load service
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
        var newUser = new UserModel;                 //generate resource OBJECT
        newUser.username = $scope.LoginDetails.username;       //insert text into resource OBJECT
        newUser.password = $scope.LoginDetails.password;       //insert text into resource OBJECT
        newUser.$save(function (result) {        //cannot do (err, result) -> this will make result return a function, see #1
            $scope.list.push(result);
            console.log($scope.list)
            console.log(newUser)
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
