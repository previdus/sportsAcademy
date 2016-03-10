angular.module('app.mark-attendance-controller', [])
   

.controller('markAttenadanceCtrl', ['$scope','$state' ,'$stateParams', 'markAttenadanceFacade' , function($scope, $state, $stateParams, markAttenadanceFacade) {
	
  	$scope.students = [];
  	
	$scope.getStudents = function(){
			
			$scope.selectedGrpId = $stateParams.groupId;
			$scope.selectedGroupName = $stateParams.groupName;
			
			markAttenadanceFacade.getAllStudents($scope.selectedGrpId,
				function success(allStudents){
					if(allStudents.length > 0){
						for(var i = 0; i< allStudents.length; i++){
							$scope.students.push(allStudents.item(i));
							$scope.students[i].Selected = true;
							$scope.students[i].Color = "bar bar-header bar-balanced";
						}
					}
					
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	

		$scope.toggleChkBox = function(studentObj){
			if(studentObj.Selected){
				studentObj.Color = "bar bar-header bar-assertive";
				studentObj.Selected = false;
			}
			else{
				studentObj.Color = "bar bar-header bar-balanced";
				studentObj.Selected = true;
			}
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
			 	markAttenadanceFacade.addAttendance($scope.selectedGrpId ,'10/13/2014',presentList, nonPresentList, 
			 		function success(){
			 			alert('Successfully saved');
			 			$state.go('menu.syncData');
			 		}, function dbISsue(){

			 		})
           
				
		};
		
		$scope.getStudents();
}])
      


   




 