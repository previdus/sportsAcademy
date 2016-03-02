angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('logService', [function(){

}])


.provider('loginService', [function(){

	var loginUrl = "";
	this.config = function(url){
		apiBaseUrl = url;
		loginUrl = url+ 'login-exec.php';
	};
	this.$get = ['$log','$http',function($log, $http){
		var ologinService = {};
		ologinService.authenticateCredentials = function(username, password, successClbk, failureClbk){
			var data ="username=" + username + "&password=" +password;
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
			$http.post(loginUrl, data, config)
            .success(function (data, status, headers, config) {
                successClbk(data);
            })
            .error(function (data, status, header, config) {
                failureClbk(status);
            });
		};
		return ologinService;
	}];

}])

.config(["loginServiceProvider", function(loginServiceProvider){
	loginServiceProvider.config("http://websites.avyay.co.in/sms-demo/api/");
}]);




