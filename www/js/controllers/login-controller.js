angular.module('app.login-controller', [])
  
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   
.controller('loginCtrl', ['$scope','$state' , '$ionicModal','loginFacade' , function($scope, $state, $ionicModal, loginFacade) {
	
	$scope.loginData = {};
	$scope.authenticateCredentials = function(){
			
			loginFacade.login($scope.loginData.username, $scope.loginData.password, 
				function success(){
					$state.go('menu.yourGroups'); 
			}, function inCorrectCredentials(message){
				$scope.errorDetail = message;
			}, function internetIssue(){
				$scope.errorDetail =  "Error connecting! Please check your internet connection";
			}, function dbAccessIssue(){
				$scope.errorDetail =  "Error connecting database! Please contact the vendor!";
			});
				
		};


	$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };		
}])



 