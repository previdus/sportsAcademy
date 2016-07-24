angular.module('app.mark-attendance-controller', [])
   

.controller('markAttenadanceCtrl', ['$scope','$rootScope','$state' ,'$stateParams','$ionicPopup','markAttenadanceFacade', function($scope, $rootScope, $state, $stateParams, $ionicPopup, markAttenadanceFacade) {
	
  	$scope.students = [];
  	$scope.currentDate = new Date();

  	$scope.onezoneDatepicker = {
	    date: $scope.currentDate, // MANDATORY                     
	    // mondayFirst: false,                
	    // months: months,                    
	    // daysOfTheWeek: daysOfTheWeek,     
	    // startDate: startDate,             
	    endDate: $scope.currentDate,                   
	    // disablePastDays: false,
	    // disableSwipe: false,
	    // disableWeekend: false,
	    // disableDates: disableDates,
	    // disableDaysOfWeek: disableDaysOfWeek,
	    // showDatepicker: false,
	    // showTodayButton: true,
	    // calendarMode: true,
	    hideCancelButton: true,
	    // hideSetButton: false,
	    // highlights: highlights,
	    callback: function(value){
		    $scope.currentDate = value;
	    }
	};

 
  	$scope.isViewStudentDetailsAllowed = function(){
  		if($rootScope.loggedInUserprivilege == 1)
  			return true;
  		else{
  			console.log('false');
  			return false;
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
		
		markAttenadanceFacade.getAbsentList($stateParams.groupId, selectedDate,
			function success(attendances){
				console.log(attendances);
				absentList = attendances;				

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
					$scope.category = studentDetails.student.category;	
					$scope.address = studentDetails.student.address;
					$scope.school = studentDetails.student.school;	
					$scope.father_mob = studentDetails.student.father_mob;
					$scope.mother_mob = studentDetails.student.mother_mob;
					$scope.payments = studentDetails.student.payments;
					
				}, function(){
					
				}
			)
			alertPopup.then(function(res) {
       			
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
				alert(selectedDate);

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
      


   




 