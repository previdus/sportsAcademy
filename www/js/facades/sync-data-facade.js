angular.module('app.sync-data-facade', [])


.service('syncDataFacade', ['pullDataApiService','grpAndStudentDatabaseService', function(pullDataApiService, grpAndStudentDatabaseService){

	this.pull = function(successClbk, failureClbk, internetIssueClbk, dbAccessIssueClbk){
			pullDataApiService.pullGrpAndStudentsData(loggedInUser.apiKey, 
			function success(grpStudentData){
				grpAndStudentDatabaseService.deleteAllGrpsAndStudents(loggedInUser.id, 
					function success(){
						angular.forEach(grpStudentData.groups, function(grpObj,idx){
							grpAndStudentDatabaseService.InsertGrp(grpObj.group_id, grpObj.group_name, loggedInUser.id);	
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
			function internetIssueClbk(){
				internetIssueClbk();
			})}
}])











