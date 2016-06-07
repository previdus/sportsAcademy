angular.module('app.grpAndStudentDb', [])


.service('grpAndStudentDatabaseService', ['$cordovaSQLite', function($cordovaSQLite){

	this.deleteAllGrpsAndStudents = function(successClbk, dbAccessIssue){
		if(!db)
			dbAccessIssue();
		var deleteGrpQuery = "delete from m_groups where user_id in (select id from m_loggedin_user)";
		var deleteStudentQuery = "delete from m_students where group_id in ( select group_id from m_groups where user_id in (select id from m_loggedin_user))";
		$cordovaSQLite.execute(db, deleteStudentQuery ,[])
			.then(function(res){
				$cordovaSQLite.execute(db, deleteGrpQuery ,[])
					.then(function(res){
						successClbk();
					 },
					 function(err){ dbAccessIssue();})	
			},
			function(err){dbAccessIssue();})	
	}
	
	
	this.InsertGrp = function(groupId, groupName, userId){
		if(!db)
			dbAccessIssue();
		$cordovaSQLite.execute(db, "insert into m_groups(group_id, name, user_id) values(?,?,?);",[groupId, groupName, userId])
			.then(function(res){
				
			},
			function(err){})
			
	}
	
	this.InsertStudent = function(studentId, studentName, groupId){	
		if(!db)
			dbAccessIssue();
		$cordovaSQLite.execute(db, "insert into m_students(student_id, name, group_id) values(?,?,?);",[studentId, studentName, groupId])
			.then(function(res){
				
			},
			function(err){})
			
	}


	this.saveAttendance = function(group_id, userId, date,present_list, absent_list, successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "insert into m_attendance(group_id,user_id,date,present_list,absent_list) values(?,?,?,?,?)";
		$cordovaSQLite.execute(db,query,[group_id, userId, date, present_list,absent_list]).then(function(result) {
			successClbk();
		}, function(error) {
			dbAccessIssueClbk();
		});
	}

	this.deleteAttendance = function(rowId){	
		if(!db)
			dbAccessIssue();
		$cordovaSQLite.execute(db, "delete from m_attendance where rowid = ?;",[rowId])
			.then(function(res){
				
			},
			function(err){})
			
	}


	this.getSavedAttendance = function(successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "select *, rowid from m_attendance where user_id in (select id from m_loggedin_user)";
		$cordovaSQLite.execute(db,query,[]).then(function(result) {
			successClbk(result.rows);
		}, function(error) {
			dbAccessIssueClbk();
		});
	}
	

	this.getGroups = function(successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();

		var query = "select * from m_groups where user_id in (select id from m_loggedin_user)";
		$cordovaSQLite.execute(db,query,[]).then(function(result) {
			successClbk(result.rows);
		}, function(error) {
			alert(error);
			dbAccessIssueClbk();
		});
	}



	this.getStudents = function(groupId, successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "select * from m_students where group_id = ?";
		$cordovaSQLite.execute(db,query,[groupId]).then(function(result) {
			successClbk(result.rows);
		}, function(error) {
			dbAccessIssueClbk();
		});
			
	}

	this.getAttendance = function(groupId, date, successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "select * from m_attendance where group_id = ? and  date = ? and user_id in (select id from m_loggedin_user) ";
		$cordovaSQLite.execute(db,query,[groupId,date]).then(function(result) {
			successClbk(result.rows);
		}, function(error) {
			dbAccessIssueClbk();
		});

	}

	this.deleteAttendance = function(groupId, date, successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "delete from m_attendance where group_id = ? and  date = ? and user_id in (select id from m_loggedin_user) ";
		$cordovaSQLite.execute(db,query,[groupId,date]).then(function(result) {
			successClbk();
		}, function(error) {
			dbAccessIssueClbk();
		});

	}

	
}])



