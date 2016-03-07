angular.module('app.mark-attendance-controller', [])
   

.controller('markAttenadanceCtrl', ['$scope','$state' ,'$stateParams', 'markAttenadanceFacade' , function($scope, $state, $stateParams, markAttenadanceFacade) {
	
  	$scope.students = [];
  	
	$scope.getStudents = function(){
			
			var selectedGrpId = $stateParams.groupId;
			$scope.selectedGroupName = $stateParams.groupName;
			
			alert('getting students for group ' + selectedGrpId);
			markAttenadanceFacade.getAllStudents(selectedGrpId,
				function success(allStudents){
					alert(allStudents.length);
					if(allStudents.length > 0){
						for(var i = 0; i< allStudents.length; i++){
							$scope.students.push(allStudents.item(i));
						}
					}
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	
		//$state.go('menu.yourGroups.markAttenadance');
		$scope.getStudents();
}])
      


   




 