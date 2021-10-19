connection = require("./config");
module.exports = {
	login : function(email,password){
		return new Promise (function(resolve, reject){
			const query =` SELECT * FROM arbitration WHERE Email = "${email}" And password = ${password} `;
			connection.query(query,
				(err,rows) => {
				if (err) {
					reject (err);
				} else {
					resolve(rows);
				}
			});
		})
	},
		addPosition: function(ccaID,positionName,description){
			return new Promise (function(resolve, reject){
				const query = "INSERT INTO positions(ccaID,positionName,description) values(?,?,?)";
				connection.query(query,
					[
						ccaID,
						positionName,
						description
					],
					(err,rows) => {
					if (err) {
						reject (err);
					} else {
						resolve (rows);
					}
				})
			})

		},

		addCategory : function(categoryname){
			return new Promise (function(resolve, reject){
				const query = "INSERT INTO commitecategory(categoryname) values(?)";
				connection.query(query,
					[
						categoryname
					],
					(err,rows) => {
					if (err) {
						reject (err);
					} else {
						resolve (rows);
					}
				})
			})
		},

		allPositions : function(){
		return new Promise (function(resolve, reject){
			const query = "SELECT * FROM positions";
			connection.query(query,
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