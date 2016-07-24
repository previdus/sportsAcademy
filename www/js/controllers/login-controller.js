angular.module('app.login-controller', [])
  
// With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});



   
.controller('loginCtrl', ['$scope','$rootScope','$state' , '$ionicModal','loginFacade', '$cordovaDatePicker', '$ionicPlatform' , function($scope, $rootScope,$state, $ionicModal, loginFacade, $cordovaDatePicker, $ionicPlatform) {
	

	$scope.loginData = {};
	$rootScope.loggedInUser = {};
	
	$scope.currentDate = new Date();
 
	$scope.datePickerCallback = function () {
		var val = '';
		
	};

	$scope.closeLogin = function(){
		alert('closed');
	}

	$scope.authenticateCredentials = function(){
			alert('press');
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

	$scope.logout = function(){
		loginFacade.logout(function(){}, function(){});
	}	


	//$scope.logout();
	
}])



 