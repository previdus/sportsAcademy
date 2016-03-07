angular.module('app.grpAndStudentDb', [])


.service('grpAndStudentDatabaseService', ['$cordovaSQLite', function($cordovaSQLite){

	this.deleteAllGrpsAndStudents = function(user_id, successClbk, dbAccessIssue){
		if(!db)
			dbAccessIssue();
		$cordovaSQLite.execute(db, "delete from m_groups where user_id = ?",[user_id])
			.then(function(res){
				$cordovaSQLite.execute(db, "delete from m_students where group_id in ( select group_id from m_groups where user_id = ?);",[user_id])
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

	this.getGroups = function(userId, successClbk, dbAccessIssueClbk){
		if(!db)
			dbAccessIssue();
		var query = "select * from m_groups where user_id = ?";
		$cordovaSQLite.execute(db,query,[userId]).then(function(result) {
			successClbk(result.rows);
		}, function(error) {
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

	
}])



