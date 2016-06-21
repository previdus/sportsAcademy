angular.module('app.sync-data-controller', [])
  

.controller('syncDataCtrl', ['$scope','$state' , 'syncDataFacade' , function($scope, $state, syncDataFacade) {
	
	$scope.loader_show = false;
	$scope.upload_attendance_show = false;

	$scope.pullGrpAndStudentData = function(){
			$scope.loader_show = true;
						
			syncDataFacade.pull( 
				function success(){
				alert('Successfully Pulled data!');
				$scope.loader_show = false;
			}, function failure(message){
				$scope.errorDetail = message;$scope.loader_show = false;
			}, function internetIssue(status){
				$scope.errorDetail = status + "Error connecting! Please check your internet connection";$scope.loader_show = false;
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";$scope.loader_show = false;
			});
		};	

		$scope.uploadAttendance = function(){
			$scope.loader_show = true;
			syncDataFacade.push($scope,
				function internetIssue(){
					alert('Please check your internet connection');
					$scope.loader_show = false;
				}, 
				function dbAccessIssue(){
					alert('Database issue');
					$scope.loader_show = false;
				});
		}

		$scope.getNoOfAttendanceToBePushed = function(){
		syncDataFacade.getNoOfAttendanceToBePushed(function success(noOfAttendanceToBeSaved){
				$scope.noOfAttendanceToBeSavedToServer = noOfAttendanceToBeSaved;
				if(noOfAttendanceToBeSaved > 0) $scope.upload_attendance_show = true;
		})
	}

	$scope.getNoOfAttendanceToBePushed();
}])
      


   




 