angular.module('app.mark-attendance-controller', [])
   

.controller('markAttenadanceCtrl', ['$scope','$rootScope','$state' ,'$stateParams','$ionicPopup','markAttenadanceFacade' , function($scope, $rootScope, $state, $stateParams, $ionicPopup, markAttenadanceFacade) {
	
  	$scope.students = [];
  	$scope.currentDate = new Date();
 
  	$scope.isViewStudentDetailsAllowed = function(){
  		console.log($rootScope.loggedInUserprivilege);
  		if($rootScope.loggedInUserprivilege == 3)
  			return true;
  		else{
  			console.log("You are not allowed to swipe");
  			return true;
  		}
  		
  	}

	$scope.datePickerCallback = function (val) {
		if (val) {	
			$scope.currentDate = val;
			while ($scope.students.length) { $scope.students.pop(); }
			$scope.getStudents();
		} 
	};
  	
	$scope.getStudents = function(){
			
		$scope.selectedGrpId = $stateParams.groupId;
		$scope.selectedGroupName = $stateParams.groupName;
		var cDate = $scope.currentDate.getDate();
		var cMonth = $scope.currentDate.getMonth() + 1;
		var cYear = $scope.currentDate.getFullYear();
		var selectedDate = cDate + "-" + cMonth + "-" + cYear;
		
		var absentList = [];
		
		markAttenadanceFacade.getAttendance($stateParams.groupId, selectedDate,
			function success(attendances){
				if(attendances.length > 0){
					 absentList = attendances.item(0).absent_list.split(",");				
				}

				markAttenadanceFacade.getAllStudents($scope.selectedGrpId,
				function success(allStudents){
					if(allStudents.length > 0){
						for(var i = 0; i< allStudents.length; i++){
							$scope.students.push(allStudents.item(i));

							 if(absentList.indexOf(allStudents.item(i).student_id.toString()) != -1 ){
								$scope.students[i].Selected = false;
								$scope.students[i].Color = "red";
							}else{
								$scope.students[i].Selected = true;
								$scope.students[i].Color = "green";
							}
						}
					}
				}, 
				function dbAccessIssue(){
					$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
				});
			}, 
			function dbAccessIssue(){

			});
		};	

		$scope.toggleChkBox = function(studentObj){
			if(studentObj.Selected){
				studentObj.Color = "red";
				studentObj.Selected = false;
			}
			else{
				studentObj.Color = "green";
				studentObj.Selected = true;
			}
		}

		
	    

		$scope.showStudentDetails = function(student){
			var alertPopup = $ionicPopup.alert({
       			templateUrl: '/tpl.html',
       			scope : $scope,
       			title : 'Details',
     		});
				
			$scope.name = student.name;
			$scope.doe = student.doe;
			$scope.father = '';
			$scope.mother = '';
			$scope.address = '';
			markAttenadanceFacade.fetchStudentDetails(student.student_id, 
				function(studentDetails){
					$scope.father = studentDetails.student.father;
					$scope.mother = studentDetails.student.mother;
					$scope.address = studentDetails.student.address;	
					
				}, function(){
					console.log("Internet connection issue");
				}
			)
			alertPopup.then(function(res) {
       			console.log('Thank you for not eating my delicious ice cream cone');
     		});
		}

		$scope.markAttenadance = function(){
			
			var presentList = [];
			var nonPresentList = [];

			 angular.forEach($scope.students, function (student) {
            	if(student.Selected)
            		presentList.push(student.student_id);
            	else
            		 nonPresentList.push(student.student_id);
        	});
			 	var cDate = $scope.currentDate.getDate();
				var cMonth = $scope.currentDate.getMonth() + 1;
				var cYear = $scope.currentDate.getFullYear();
				var selectedDate = cDate + "-" + cMonth + "-" + cYear;

				markAttenadanceFacade.deleteAttendance($scope.selectedGrpId,selectedDate, 
					function success(){
						markAttenadanceFacade.addAttendance($scope.selectedGrpId ,selectedDate,presentList, nonPresentList, 
			 				function success(){
			 					$state.go('menu.syncData');
			 				}, 
			 				function dbISsue(){
			 				}
			 			)
					},
					function dbIssue(){

					}
				)
			 	 		
		};
		$scope.getStudents();
}])
      


   




 