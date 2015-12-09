(function() {
    //start of function
  var app = angular.module('VoteApp', ['ngResource']);

app.factory('UserService', function($resource){
    return $resource('/Users');//CAN BE ANY URL -> GET POST PUT changes to Users HERE
});//end of service

app.controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService){
    $scope.UserService = UserService; // load service
       //init
    $scope.list = [];
    $scope.LoginDetails = {};
    $scope.activeUser = null;
    $scope.show_login = function () {
        if ($scope.activeUser) {
            return { "transform": "translateX(300%)" };
        }
        else{
        return { "transform": "translateX(0%)" };
        }
    };
    $scope.show_user = function () {
        if ($scope.activeUser) {
            return { "transform": "translateX(0%)" };
        }
        else{
        return { "transform": "translateX(-200%)" };
        }
    };
    //LOAD LIST FROM DATABASE
    var ListUsers = function(){
        $scope.list = UserService.query();
        console.log($scope.list);
    }
    
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
        if($scope.LoginDetails.username.length > 5 && $scope.LoginDetails.password.length > 5){
			UserService.query({username:$scope.LoginDetails.username},function(response){
				if(response[0]){
					console.log("Sorry name is taken")
				}
				else{
					var newUser = new UserService;                 //generate resource OBJECT
					newUser.username = $scope.LoginDetails.username;       //insert text into resource OBJECT
					newUser.password = $scope.LoginDetails.password;       //insert text into resource OBJECT
					newUser.$save(function (result) {        //cannot do (err, result) -> this will make result return a function, see #1
						$scope.list.push(result);
						ListUsers();
					});
					$scope.LoginDetails = {};
				}
			});
		}
		else {
			//send not enough chars message
			console.log("Username/Pass both need 5+ chars.")
		}
    };
    $scope.ProcessLoginDetails = function(){
        if ($scope.registerMode == "Login"){
//login            
            var loginUser = function(response_arr){
                if(response_arr[0]){
                    $scope.activeUser=response_arr[0];
                    console.log("Logged in as " + $scope.activeUser.username);
                    $scope.LoginDetails = {};
                    //apply cookie login later with a post chained after this check
                }
                else{
                    //send try again message
                    console.log("Oops not in records, Try again.")
                }
            }
            UserService.query({username:$scope.LoginDetails.username,password:$scope.LoginDetails.password},function(response){
                console.log(response[0])
                loginUser(response)
                //do function check if response contain object. active user becomes object.
            });
        }
        else{
//create user
            $scope.addUser();
        }
    };
    $scope.userLogout = function(){
        $scope.activeUser = null;
    };
}]);//end of controller
  //end of function
})();
