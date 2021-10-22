connection = require("./config");

module.exports = {

	allStudents : function(){
		return new Promise (function(resolve, reject){
			query = "SELECT * FROM voters";
			connection.query(query,(err,res) =>{
			if (err) {
				reject (err);
			} else {
				resolve (res);
			}
		});

		});
	},

	winners  : function(regNo){
		return new Promise (function(resolve, reject){
			query = "SELECT * FROM candidatesvotes JOIN applier ON applier.ApplyId = candidatesvotes.candid JOIN positions ON applier.posID = positions.positionID GROUP BY applier.posID HAVING MAX(candidatesvotes.marks AND applier.status = 'APPROVED')";
			connection.query(query,[regNo],(err,res) =>{
			if (err) {
				reject (err);
			} else {
				resolve (res)
			}
		});

		});
	}

}