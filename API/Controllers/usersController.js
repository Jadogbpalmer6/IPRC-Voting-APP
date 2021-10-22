usersModel = require("../models/usersModel")

exports.all = function (req , res) {
	usersModel.allStudents().then(function(rows){
		res.json(rows);
	})
	.catch(function(error){
		res.json(error);
	})
}


exports.winners = function (req , res) {
	usersModel.winners().then(function(rows){
		res.json(rows);
	})
	.catch(function(error){
		res.json(error);
	})
}
