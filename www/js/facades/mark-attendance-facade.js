angular.module('app.mark-attendance-facade', [])


.service('markAttenadanceFacade', ['grpAndStudentDatabaseService', function(grpAndStudentDatabaseService){

	this.getAllGroups = function(successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.getGroups(loggedInUser.id, successClbk, dbAccessIssueClbk);
		}

	this.getAllStudents = function(groupId, successClbk, dbAccessIssueClbk){
			grpAndStudentDatabaseService.getGroups(groupId, successClbk, dbAccessIssueClbk);
		}

	this.addAttendance = function(successClbk, dbAccessIssueClbk){
			
	}	
		

}])











