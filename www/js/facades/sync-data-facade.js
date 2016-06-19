angular.module('app.sync-data-facade', [])


.service('syncDataFacade', ['pullDataApiService','grpAndStudentDatabaseService', 'pushDataApiService','$rootScope', function(pullDataApiService, grpAndStudentDatabaseService,pushDataApiService,$rootScope){

	this.getNoOfAttendanceToBePushed = function(successClbk){
		grpAndStudentDatabaseService.getSavedAttendance(function success(rows){
				var noOfAttendanceToBeSaved = 0;
				if(rows)
					noOfAttendanceToBeSaved = rows.length;
				successClbk(noOfAttendanceToBeSaved);	
		})
	}

	this.pull = function(successClbk, failureClbk, internetIssueClbk, dbAccessIssueClbk){
			pullDataApiService.pullGrpAndStudentsData($rootScope.loggedInUser.apiKey, 
			function success(grpStudentData){
				grpAndStudentDatabaseService.deleteAllGrpsAndStudents( 
					function success(){
						angular.forEach(grpStudentData.groups, function(grpObj,idx){
							grpAndStudentDatabaseService.InsertGrp(grpObj.group_id, grpObj.group_name, $rootScope.loggedInUser.id);	
						});
						angular.forEach(grpStudentData.students, function(studentObj,idx){
							grpAndStudentDatabaseService.InsertStudent(studentObj.student_id, studentObj.student_name,studentObj.group_id, studentObj.dos, studentObj.doe);
						});

						successClbk();
					},
					function dbAccessIssue(){
						dbAccessIssueClbk();
					})
			},  
			function internetIssue(){
				internetIssueClbk();
			})
	}

	this.push = function($scope, internetIssueClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.getSavedAttendance(function success(savedAttendanceData){
				if(savedAttendanceData.length > 0){
					for(var i = 0; i< savedAttendanceData.length; i++){
						var attendance = savedAttendanceData.item(i);
						pushDataApiService.pushAttendanceData(
							$rootScope.loggedInUser.apiKey,
							attendance.group_id,
							attendance.user_id,
							attendance.date,
							attendance.present_list,
							attendance.absent_list,
							attendance.rowid, 
							function success(data, row_id){
								if(data.success){
									grpAndStudentDatabaseService.deleteAttendanceRow(row_id);
									$scope.noOfAttendanceToBeSavedToServer = $scope.noOfAttendanceToBeSavedToServer-1;
								}
							},internetIssueClbk
						);	
					}
				}
			}, dbAccessIssueClbk)
	    }	
   }])











