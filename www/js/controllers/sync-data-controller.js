angular.module('app.sync-data-controller', [])
  

.controller('syncDataCtrl', ['$scope','$state' , 'syncDataFacade' , function($scope, $state, syncDataFacade) {
	
	$scope.pullGrpAndStudentData = function(){
			
			syncDataFacade.pull( 
				function success(){
				 alert('Successfully Pulled data');
					 
			}, function failure(message){
				$scope.errorDetail = message;
			}, function internetIssue(status){
				$scope.errorDetail = status + "Error connecting! Please check your internet connection";
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	

		$scope.getNoOfAttendanceToBePushed = function(){
		syncDataFacade.getNoOfAttendanceToBePushed(function success(noOfAttendanceToBeSaved){
				$scope.noOfAttendanceToBeSavedToServer = noOfAttendanceToBeSaved;	
		})
	}

	$scope.getNoOfAttendanceToBePushed();
}])
      


   




 