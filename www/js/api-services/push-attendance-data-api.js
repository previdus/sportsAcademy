angular.module('app.push-data-api', [])

.provider('pushDataApiService', [function(){

	var pushUrl = "";
	var relativeUrl="";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.config = function(url){
		relativeUrl = url;
	};

	this.$get = ['$log','$http','$rootScope',function($log, $http, $rootScope){
		var oPushService = {};
			pushUrl = $rootScope.apiUrl + relativeUrl;
			oPushService.pushAttendanceData = function(apiKey, group_id, user_id, date, present_list, absent_list, row_id, successClbk, internetIssueClbk){			
			var data ="api_key="+apiKey+"&group_id="+group_id+"&user_id="+user_id+"&date="+date+"&present_list="+present_list+"&absent_list="+absent_list;
			$http.post(pushUrl, data, config)
            .success(function (data, status, headers, config) {          	
            	successClbk(data, row_id);
               })
            .error(function (data, status, header, config) {
                internetIssueClbk(status);
            });
		};
		return oPushService;
	}];

}])

.config(["pushDataApiServiceProvider", function(pushDataApiServiceProvider){
	pushDataApiServiceProvider.config("send-data.php");

}])



