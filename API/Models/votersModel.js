connection = require("./config");
module.exports = {
	login : function(email,password){
		return new Promise (function(resolve, reject){
			const query =" SELECT * FROM voters WHERE Email_address = ? And password = ?";
			connection.query(query,[email,password],
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows);
				}
			});
		})
	},


	viewCandidate : function(ID){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM applier WHERE applyid = ? AND status = ?";
			connection.query(query,[ID,"APPROVED"],
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows)
				};
			})
		});
	},


	getPosition : function(ID){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM positions WHERE positionID = ?";
			connection.query(query,[ID],
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows)
				};
			})
		});
	},


	markVote : function(ID){
		return new Promise (function(resolve, reject){
			const query = "UPDATE candidatesvotes SET marks = marks+1 WHERE candid= ?";
			connection.query(query,[ID],
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows)
				};
			})
		});
	},


	log : function(logs){
		return new Promise (function(resolve, reject){
			const query = "INSERT INTO voting_logs(candidate_ID,candidate_First_name,candidate_Last_name,Position_ID,Position,Candidate_RegNO,voters_First_name,voters_Last_name,Voters_class,voterId,voter_RegNO) values(?,?,?,?,?,?,?,?,?,?,?)";
			connection.query(query,logs,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows)
				};
			})
		});
	}
}