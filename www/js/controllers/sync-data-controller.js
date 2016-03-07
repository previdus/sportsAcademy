angular.module('app.sync-data-controller', [])
  

.controller('syncDataCtrl', ['$scope','$state' , 'syncDataFacade' , function($scope, $state, syncDataFacade) {
	
	$scope.pullGrpAndStudentData = function(){
			alert('cdd');
			alert(loggedInUser.apiKey);
			syncDataFacade.pull( 
				function success(){
					$state.go('menu.yourGroups'); 
			}, function failure(message){
				$scope.errorDetail = message;
			}, function internetIssue(status){
				$scope.errorDetail = status + "Error connecting! Please check your internet connection";
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	
}])
      


   




 