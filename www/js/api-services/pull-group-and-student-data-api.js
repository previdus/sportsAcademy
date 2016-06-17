angular.module('app.pull-data-api', [])

.provider('pullDataApiService', [function(){

	var pullUrl = "";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.config = function(url){
		pullUrl = url+ 'fetch-data.php?api_key=';
	};

	this.$get = ['$log','$http',function($log, $http){
		var oPullService = {};
		
			oPullService.pullGrpAndStudentsData = function(apiKey, successClbk, internetIssueClbk){
			var data ="";
            var fullPullUrl = pullUrl + apiKey;
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
	pullDataApiServiceProvider.config("http://websites.avyay.co.in/bfc/api/");
}])


.provider('pullStudent', [function(){

	var pullUrl = "";
	var config = { headers : 
					{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            	 }

	this.config = function(url){
		pullUrl = url+ 'fetch-data-student.php?api_key=';
	};

	this.$get = ['$log','$http',function($log, $http){
		var oPullService = {};
		
			oPullService.pullGrpAndStudentsData = function(apiKey, successClbk, internetIssueClbk){
			var data ="";
            var fullPullUrl = pullUrl + apiKey;
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

.config(["pullStudentProvider", function(pullDataApiServiceProvider){
	pullDataApiServiceProvider.config("http://websites.avyay.co.in/bfc/api/");
}])


