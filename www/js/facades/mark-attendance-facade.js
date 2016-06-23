angular.module('app.mark-attendance-facade', [])


.service('markAttenadanceFacade', ['grpAndStudentDatabaseService', 'pullDataApiService','$rootScope', function(grpAndStudentDatabaseService,pullDataApiService,$rootScope){

	this.getAllGroups = function(successClbk, dbAccessIssueClbk){

			grpAndStudentDatabaseService.getGroups(successClbk, dbAccessIssueClbk);
		}

	this.getAllStudents = function(groupId, successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.getStudents(groupId, successClbk, dbAccessIssueClbk);
		}

	this.addAttendance = function(groupId, date, present_list, absent_list, successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.saveAttendance(groupId, $rootScope.loggedInUser.id, date,present_list, absent_list, successClbk, dbAccessIssueClbk);
	}

	this.getAttendance = function(groupId, date, successClbk, dbAccessIssueClbk){

		grpAndStudentDatabaseService.getAttendance(groupId, date,successClbk, dbAccessIssueClbk);
	}	

	this.deleteAttendance = function(groupId, date, successClbk, dbAccessIssueClbk){
		grpAndStudentDatabaseService.deleteAttendance(groupId, date, successClbk, dbAccessIssueClbk);
	}

	this.fetchStudentDetails = function(student_id, successClbk, internetAccessIssueClbk){
		pullDataApiService.pullStudentsDetails($rootScope.loggedInUser.apiKey, student_id, successClbk, internetAccessIssueClbk);
	}

	this.getAbsentList = function(groupId, date, successClbk, dbAccessIssueClbk){

		grpAndStudentDatabaseService.getAttendance(groupId, date,
		function(attendances)
		{
			if(attendances.length > 0){
				successClbk(attendances.item(0).absent_list.split(","));
			} else {
				pullDataApiService.pullAttendance(groupId, date, 
					function(attendance){
						successClbk(attendance.absent);
				},
				function(){
					var attendance = [];
					successClbk(attendance);
				});
			}
		
		}, dbAccessIssueClbk);
	}
		

}])











