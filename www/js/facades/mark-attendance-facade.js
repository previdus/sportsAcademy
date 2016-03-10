angular.module('app.mark-attendance-facade', [])


.service('markAttenadanceFacade', ['grpAndStudentDatabaseService', '$rootScope', function(grpAndStudentDatabaseService,$rootScope){

	this.getAllGroups = function(successClbk, dbAccessIssueClbk){

			grpAndStudentDatabaseService.getGroups(successClbk, dbAccessIssueClbk);
		}

	this.getAllStudents = function(groupId, successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.getStudents(groupId, successClbk, dbAccessIssueClbk);
		}

	this.addAttendance = function(groupId, date, present_list, absent_list, successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.saveAttendance(groupId, $rootScope.loggedInUser.id, date,present_list, absent_list, successClbk, dbAccessIssueClbk);
	}	
		

}])











