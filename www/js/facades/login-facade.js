angular.module('app.login-facade', [])


.service('loginFacade', ['loginApiService','userDatabaseService', '$rootScope', function(loginApiService, userDatabaseService, $rootScope){

	

	this.login = function(username, password, successClbk, incorrectCredentialsClbk, internetIssueMainClbk, dbAccessIssue){
			alert('facade');
			loginApiService.authenticateCredentials(username, password, 
				function success(userData){
					$rootScope.loggedInUser.id = userData.user_id;
					$rootScope.loggedInUser.name = userData.name;
					$rootScope.loggedInUser.apiKey = userData.apiKey;
					$rootScope.loggedInUserprivilege   = userData.privilege;
					
					userDatabaseService.updateLoggedInUserDetails(userData.user_id, userData.name, userData.privilege, userData.apiKey,function success(){
						userDatabaseService.updateUserDetails(userData.user_id, userData.name, userData.privilege, userData.apiKey, username, password, successClbk, 
						function datebaseIssueClbk(){
							successClbk();
						});
					},dbAccessIssue);
					
				}, 
				incorrectCredentialsClbk, 
				function internetIssueClbk(){
					userDatabaseService.validateCredentials(username, password, 
						function successClbkDb(userData){
							$rootScope.loggedInUser.id = userData.id;
							$rootScope.loggedInUser.name = userData.name;
							$rootScope.loggedInUser.apiKey = userData.api_key;
							$rootScope.loggedInUserprivilege   = userData.privilege;
							userDatabaseService.updateLoggedInUserDetails(userData.id,userData.name, userData.privilege, userData.api_key,successClbk,dbAccessIssue);
						}, 
						function icorrectCredentialsClbk(){
							internetIssueMainClbk();
						}, 
						dbAccessIssue);
				}
			)}

		this.logout = function(successclbk, dbAccessIssueClbk){
				
					$rootScope.loggedInUser.id = "" ;
					$rootScope.loggedInUser.name = "";
					$rootScope.loggedInUser.apiKey = "";
					userDatabaseService.deleteLoggedInUserDetails(successclbk, dbAccessIssueClbk);
		}	
	}])











