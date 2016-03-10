angular.module('app.userDb', [])


.service('userDatabaseService', ['$cordovaSQLite', function($cordovaSQLite){

	this.updateUserDetails = function(user_id, name, apiKey, userName, password, successClbk, dbAccessIssue){
		if(!db)
		successClbk();	
		var query = "insert into m_users(id, name,user_name, pwd, api_key) values(?,?,?,?,?)";
		$cordovaSQLite.execute(db, "delete from m_users where id=?",[user_id])
			.then(function(res){
				$cordovaSQLite.execute(db,query,[user_id, name, userName, password, apiKey])
					.then(function(res){
						successClbk();
					 },
					 function(err){ dbAccessIssue();})	
			},
			function(err){dbAccessIssue();})	
	}


	this.updateLoggedInUserDetails = function(user_id, name, apiKey, successClbk, dbAccessIssue){
		if(!db)
		successClbk();	
		var query = "insert into m_loggedin_user(id, name, api_key) values(?,?,?)";
		$cordovaSQLite.execute(db, "delete from m_loggedin_user",[])
			.then(function(res){
				$cordovaSQLite.execute(db,query,[user_id, name, apiKey])
					.then(function(res){
						successClbk();
					 },
					 function(err){ dbAccessIssue();})	
			},
			function(err){dbAccessIssue();})	
	}


	this.getLoggedInUserDetails = function(successClbk, noUserLoggedIn, dbAccessIssue){
		var query = "select * from m_loggedin_user";
		$cordovaSQLite.execute(db,query,[]).then(function(result) {
			if(result.rows.length > 0) {
				successClbk(result.rows.item(0));
			} else {
				noUserLoggedIn();
			}
		}, function(error) {
			dbAccessIssue();
		});
			
	}

	this.deleteLoggedInUserDetails = function(successClbk, dbAccessIssueClbk){
		var query = "delete from m_loggedin_user";
		$cordovaSQLite.execute(db,query,[]).then(function(result) {
			successClbk();
		}, function(error) {
			dbAccessIssueClbk();
		});
			
	}
	

	
	this.validateCredentials = function(userName, password, successClbk, incorrectCredentialClbk, dbAccessIssue){
		
		var query = "select * from m_users where user_name = ? and pwd = ?";
		$cordovaSQLite.execute(db,query,[userName,password]).then(function(result) {
			if(result.rows.length > 0) {
				successClbk(result.rows.item(0));
			} else {
				incorrectCredentialClbk();
			}
		}, function(error) {
			dbAccessIssue();
		});
			
	}

}])



