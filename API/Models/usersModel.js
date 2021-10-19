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

	regNoExist  : function(regNo){
		return new Promise (function(resolve, reject){
			query = "SELECT * FROM voters WHERE REGNO = ?";
			connection.query(query,[regNo],(err,res) =>{
			if (err) {
				reject (err);
			} else {
				if(res != 0){
					resolve(true)
				}else {
					resolve(false)
				};
			}
		});

		});
	}


}