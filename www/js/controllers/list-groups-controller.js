angular.module('app.list-groups-controller', [])
   
.controller('markAttenadanceCtrl', function($scope) {

})

.controller('yourGroupsCtrl', ['$scope','$state' , 'markAttenadanceFacade' , function($scope, $state, markAttenadanceFacade) {
	
  	$scope.groups = [];
  
	$scope.getGroups = function(){

			markAttenadanceFacade.getAllGroups( 
				function success(allGroups){
					if(allGroups.length > 0){
						for(var i = 0; i< allGroups.length; i++){
							$scope.groups.push(allGroups.item(i));
						}
					}
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	
		
		$scope.getGroups();
}])
      


   




 