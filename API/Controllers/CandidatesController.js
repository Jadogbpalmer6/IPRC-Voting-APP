CandidatesModel = require("../models/CandidatesModel");
usersModel = require("../models/usersModel")

module.exports = {
	register : function(req,res){
		let RegNo = req.body.regno;
		let fname = req.body.fname;
		let lname = req.body.lname;
		let gender = req.body.gender;
		let dob = req.body.dob;
		let biography = req.body.biography;
		let posID = req.body.posID

		let nid = req.body.nid;

		
		if(!RegNo || !fname || !lname || !gender || !dob || !biography || !nid || !posID){
			res.status(400).json({'message' : 'error', 'description' : `missing input `});
		};
		usersModel.regNoExist(RegNo).then(function(exist){
			if (exist) {
				CandidatesModel.register(RegNo,fname,lname,gender,dob,biography,nid,posID).then(function(rows){
					res.status(200).json(rows);
				})
				.catch(function(error){
					res.status(404).json(error);
				})
			} else {
				res.status(404).json({"error": "invalid REGNO"});
			}
		})
			
	},

	all : function(req,res){
		try{
			CandidatesModel.all().then(function(rows){
				rows.forEach(function(row){

					CandidatesModel.Position(row.posID).then(function(position){
						row.position = position[0].positionName;
						rows = Object.assign(rows,row);
						res.status(200).json(rows);

					})
				})
			}).catch(function(err){
				res.status(404).json({'error': err});
			})
		}catch(err){
			res.status(404).json({'error': err});
		}
	},

	allApproved : function(req,res){
		try{
			CandidatesModel.allApproved().then(function(rows){
				rows.forEach(function(row){

					CandidatesModel.Position(row.posID).then(function(position){
						row.position = position[0].positionName;
						rows = Object.assign(rows,row);
						res.status(200).json(rows);

					})
				})
			}).catch(function(err){
				res.status(404).json({'error': err});
			})
		}catch(err){
			res.status(404).json({'error': err});
		}
	},

	approve : function(req,res){
		try{
			const applid = req.body.applid;

			if(!applid){
				res.status(404).json({'message' : 'error', 'description' : "missing input "});
			}
			CandidatesModel.approve(applid).then(function(rows){
				res.status(200).json(rows);
			})
		}catch(err){
			res.status(404).json({'error': "err"});
		}
	},

	candidatePosition: function(req,res){
		try{
			const posID = req.params.id;

			CandidatesModel.viewCandidates(posID).then(function(rows){
				res.status(200).json(rows);
			})
		}catch(err){
			res.status(404).json({error: err});
		}
	},


	viewResults : function(req,res){
		try{
			const posID = req.params.id;

			CandidatesModel.viewResults(posID).then(function(rows){
				res.status(200).json(rows);
			})
		}catch(err){
			res.status(404).json({error: err});
		}
	}
	
}

