connection = require("./config");

module.exports = {

	register : function(RegNo,fname,lname,gender,dob,biography,nid,posID){
		return new Promise (function(resolve, reject){
			const query = "insert into applier(RegNo,fname,lname,gender,dob,Biography,NID,posID) values(?,?,?,?,?,?,?,?)";
			connection.query(query,
			[
				RegNo,
				fname,
				lname,
				gender,
				dob,
				biography,
				nid,
				posID
			],(err,res) =>{
			if (err) {
				reject (err);
			} else {
				resolve (res);
			}
		});

		});
	},

	all: function(){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM applier";
			connection.query(query,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve (rows);
				}
			})
		})
	},

	allApproved : function(){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM applier WHERE status = 'APPROVED'";
			connection.query(query,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve (rows);
				}
			})
		})
	},

	approve: function(applid,posID){
		return new Promise (function(resolve, reject){
			const query = "UPDATE applier SET status = 'APPROVED' WHERE applyid =?" ;
			connection.query(query,[applid],
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve (rows);
				}
			})
		})
	},

	Position : function(ID){
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

	viewCandidates : function(ID){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM applier WHERE posID = ? AND status = ?";
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


	viewResults : function(){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM candidatesvotes JOIN applier ON candidatesvotes.candid = applier.ApplyId JOIN positions ON applier.posID = positions.positionID";
			connection.query(query,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows)
				};
			})
		});
	},


	// RetrieveCandidate : function(ID){
	// 	return new Promise (function(resolve, reject){
	// 		const query = "SELECT * FROM applier WHERE ApplyId = ? ";
	// 		connection.query(query,[ID],
	// 			(err,rows) => {
	// 			if (err) {
	// 				reject (err);
	// 			} else {
	// 				resolve(rows[0])
	// 			};
	// 		})
	// 	});
	// }

}
