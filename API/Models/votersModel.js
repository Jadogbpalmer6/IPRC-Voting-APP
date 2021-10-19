connection = require("./config");
module.exports = {
	login : function(email,password){
		return new Promise (function(resolve, reject){
			const query =` SELECT * FROM voters WHERE Email_address = "${email}" And password = ${password} `;
			connection.query(query,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows);
				}
			});
		})
	}
}