angular.module('app.login-api', [])

.provider('loginApiService', [function(){

	var loginUrl = "";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.config = function(url){
		apiBaseUrl = url;
		loginUrl = url+ 'login-exec.php';
	};

	this.$get = ['$log','$http',function($log, $http){
		var ologinService = {};
		
		ologinService.authenticateCredentials = function(username, password, successClbk, incorrectCredentialsClbk, internetIssueClbk){
			var data ="username=" + username + "&password=" +password;
            
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
	loginApiServiceProvider.config("http://websites.avyay.co.in/sms-demo/api/");
}])



