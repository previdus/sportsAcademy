angular.module('app.pull-data-api', [])

.provider('pullDataApiService', [function(){

	var pullUrl = "";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.$get = ['$log','$http','$rootScope',function($log, $http, $rootScope){
		var oPullService = {};
			pullUrl = $rootScope.apiUrl;
			oPullService.pullGrpAndStudentsData = function(apiKey, successClbk, internetIssueClbk){
			var data ="";
            var fullPullUrl = pullUrl + 'fetch-data.php?api_key=' + apiKey;
			$http.get(fullPullUrl, data, config)
            .success(function (data, status, headers, config) {          	
            		successClbk(data);
            })
            .error(function (data, status, header, config) {
                internetIssueClbk(status);
            });
		};

		oPullService.pullStudentsDetails = function(apiKey, student_id, successClbk, internetIssueClbk){
			var data ="";
            var fullPullUrl = pullUrl + 'fetch-data-student.php?api_key=' + apiKey + "&student_id=" + student_id;
			$http.get(fullPullUrl, data, config)
            .success(function (data, status, headers, config) {
                      	
            		successClbk(data);
            })
            .error(function (data, status, header, config) {
                internetIssueClbk(status);
            });
		};

		oPullService.pullAttendance = function(groupId, date, successClbk, internetIssueClbk){
			var data ="";
            var fullPullUrl = pullUrl + 'fetch-data-attendance.php?group_id=' + groupId + "&date=" + date;
			$http.get(fullPullUrl, data, config)
            .success(function (data, status, headers, config) {          	
            		successClbk(data);
            })
            .error(function (data, status, header, config) {
                internetIssueClbk(status);
            });
		};
		return oPullService;
	}];

}])

.config(["pullDataApiServiceProvider", function(pullDataApiServiceProvider){
	
}])



