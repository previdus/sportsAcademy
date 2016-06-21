angular.module('app.list-groups-controller', [])
   
.controller('markAttenadanceCtrl', function($scope) {

})

.controller('yourGroupsCtrl', ['$scope','$state' , 'markAttenadanceFacade' , function($scope, $state, markAttenadanceFacade) {
	
  	$scope.centers = [];
  	$scope.groups = [];
  
	$scope.getGroups = function(){

			markAttenadanceFacade.getAllGroups( 
				function success(allGroups){
					var old_center_name = '';
					var count = 0;
					console.log(allGroups);
					if(allGroups.length > 0){

						for(var i = 0; i< allGroups.length; i++){
							if(count != 0 && old_center_name != allGroups.item(i).center_name){
								$scope.centers.push(center);
							}
							if(old_center_name != allGroups.item(i).center_name){
								var center = {name: allGroups.item(i).center_name, groups : []};
							}
							center.groups.push({group_id:allGroups.item(i).group_id, name: allGroups.item(i).name});
							count++;

							old_center_name = allGroups.item(i).center_name;
						}
						$scope.centers.push(center);
					}
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};	
		
		$scope.getGroups();
}])
      


   




 