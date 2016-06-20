angular.module('app.login-api', [])

.provider('loginApiService', [function(){

	var relativeUrl = "";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.config = function(url){
		relativeUrl = url;
	};

	this.$get = ['$log','$http', '$rootScope',function($log, $http, $rootScope){
		var ologinService = {};
		
		ologinService.authenticateCredentials = function(username, password, successClbk, incorrectCredentialsClbk, internetIssueClbk){
			var data ="username=" + username + "&password=" +password;
            var loginUrl = $rootScope.apiUrl + relativeUrl;
			$http.post(loginUrl, data, config)
            .success(function (data, status, headers, config) {
            	
            	if(data.success)
            		successClbk(data);
            	else		
               		incorrectCredentialsClbk(data.message);
               	
               })
            .error(function (data, status, header, config) {
                internetIssueClbk(status);
            });
		};
		return ologinService;
	}];

}])

.config(["loginApiServiceProvider", function(loginApiServiceProvider){
	loginApiServiceProvider.config("login-exec.php");
}])



