angular.module('app.sync-data-facade', [])


.service('syncDataFacade', ['pullDataApiService','grpAndStudentDatabaseService', '$rootScope', function(pullDataApiService, grpAndStudentDatabaseService,$rootScope){

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
							grpAndStudentDatabaseService.InsertStudent(studentObj.student_id, studentObj.student_name,studentObj.group_id);
						});
						successClbk();
					},
					function dbAccessIssue(){
						dbAccessIssueClbk();
					})
			},  
			function internetIssue(){
				internetIssueClbk();
			})}
}])











