angular.module('app.controllers', [])
  
.controller('yourGroupsCtrl', function($scope) {

})
   
.controller('markAttenadanceCtrl', function($scope) {

})
      
.controller('syncDataCtrl', function($scope) {

})

   
.controller('loginCtrl', ['$scope','$state' , 'loginService' , function($scope, $state, loginService) {
	$scope.uname="coach1";
	$scope.pwd="sample";
	$scope.errorDetail = "";
	$scope.authenticateCredentials = function(){
			alert($scope.uname);
			loginService.authenticateCredentials($scope.uname, $scope.pwd, function(result){
				if(result.success){
					$state.go('menu.markAttenadance'); 
				} else {
					$scope.errorDetail = result.message;
				}
			}, function(result){
				$scope.errorDetail = result + "hj";
			});
				
		};	
}])
 