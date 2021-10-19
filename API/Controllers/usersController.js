usersModel = require("../models/usersModel")

exports.all = function (req , res) {
	usersModel.allStudents().then(function(rows){
		console.log(rows);
		res.json(rows);
	})
	.catch(function(error){
		res.json(error);
	})
}