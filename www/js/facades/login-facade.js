angular.module('app.login-facade', [])


.service('loginFacade', ['loginApiService','userDatabaseService', function(loginApiService, userDatabaseService){

	this.login = function(username, password, successClbk, incorrectCredentialsClbk, internetIssueClbk, dbAccessIssue){
			loginApiService.authenticateCredentials(username, password, 
				function success(userData){
					loggedInUser.id = userData.user_id;
					loggedInUser.name = userData.name;
					loggedInUser.apiKey = userData.apiKey;
					userDatabaseService.updateUserDetails(userData.user_id, userData.name, userData.apiKey, username, password, successClbk, 
						function datebaseIssueClbk(){
							successClbk();
						});
				}, 
				incorrectCredentialsClbk, 
				function internetIssueClbk(){
					userDatabaseService.validateCredentials(username, password, 
						function successClbkDb(userObj){
							loggedInUser.id = userObj.id;
							loggedInUser.name = userObj.name;
							loggedInUser.apiKey = userObj.api_key;
							successClbk();
						}, 
						function icorrectCredentialsClbk(){
							internetIssueClbk();
						}, 
						dbAccessIssue);
				}
			)}
	}])











