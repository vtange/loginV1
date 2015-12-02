(function() {
    //start of function
  var app = angular.module('VoteApp', ['ngResource']);

app.factory('memory', function($http){
  var storage = {};
 storage.datadata = [];
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
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
    $scope.ProcessLoginDetails = function(){
        if ($scope.registerMode == "Login"){
//login
        }
        else{
//create user
        }
    };
}]);//end of controller
  //end of function
})();
