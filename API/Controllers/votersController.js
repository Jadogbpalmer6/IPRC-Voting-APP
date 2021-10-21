const votersModel = require("../models/votersModel");
const jwt = require("jsonwebtoken");

module.exports = {
	login : function(req,res){
		try{
			const email = req.body.email;
			const password = req.body.password;
			if(!email || !password )
			{
				res.status(400).json({'message' : 'error', 'description' : `missing input `});
			}
			votersModel.login(email,password).then(function(rows,err){
				if(!err){
					if(rows.length == 0){
						res.status(404).json({"error": "credintials mismatch"});
					}else{
						const token = jwt.sign({"data" : rows,"userType": "voter"}, "MySecretKey",{expiresIn :"100m"});
						res.status(200).json({"token" : token});
					}
				}else{
					res.status(404).json({"error": err});
				}
			})
		}catch(error){
			res.status(404).json({"error": err});
		}

	},

	vote : function(req, res) {
		try{
			const candidID = req.params.id
			const voter = req.user.data[0];

			votersModel.markVote(candidID).then(function(vote){
			})

			votersModel.viewCandidate(candidID).then(function(candidate){
				votersModel.getPosition(candidate[0].posID).then(function(position){

					const log = [
					candidate[0].ApplyId,candidate[0].fname,candidate[0].lname,
					position[0].positionID,position[0].positionName,candidate[0].RegNo,
					voter.First_name, voter.Last_name,voter.Class, voter.id, voter.REGNO
					];
					votersModel.log(log).then(function(log){
						res.json(log);
					})

				})
			})

		}catch(err){
			res.status(404).json({error: err});		
		}
	}
}