angular.module('app.login-controller', [])
  


   
.controller('loginCtrl', ['$scope','$state' , 'loginFacade' , function($scope, $state, loginFacade) {
	
	$scope.authenticateCredentials = function(){
			loginFacade.login(this.uname, this.pwd, 
				function success(){
					$state.go('menu.yourGroups'); 
			}, function inCorrectCredentials(message){
				$scope.errorDetail = message;
			}, function internetIssue(){
				$scope.errorDetail =  "Error connecting! Please check your internet connection";
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	
}])



 