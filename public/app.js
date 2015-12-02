(function() {
    //start of function
  var app = angular.module('VoteApp', []);

app.factory('memory', function($http){
  var storage = {};
 storage.datadata = [];
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.storage = memory; // load service
    $scope.registerMode = false;
    
}]);//end of controller
  //end of function
})();
