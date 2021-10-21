const jwt = require("jsonwebtoken");
ArbitrationModel = require("../models/ArbitrationModel");

const db = require("../models");
const voter = db.voters;
const parser = new (require('simple-excel-to-json').XlsParser)();

const mailEvent = require("../Helpers/events")


module.exports = {
	login : function(req,res){
		try{
			const email = req.body.email;
			const password = req.body.password;

			if(!email || !password )
			{
				res.status(400).json({'message' : 'error', 'description' : `missing input `});
			}
			ArbitrationModel.login(email,password).then(function(rows,err){
				if(!err){
					if(rows.length == 0){
						res.status(404).json({"error": "credintials mismatch"});
					}else{
						const token = jwt.sign({"data" : rows,"userType": "arbitrator"}, "MySecretKey", {expiresIn :"100m"});
						res.status(200).json({"token" : token});
					}
				}else{
					res.status(404).json(err);
				}
			})
		}catch(error){
			res.status(404).json(error);
		}

	},
	addPosition : function(req,res){
			try{
				const ccaID = req.body.ccaID;
				const positionName = req.body.positionName;
				const description = req.body.description;

				if(!ccaID || !description || !positionName )
				{
					res.status(400).json({'message' : 'error', 'description' : `missing input `});
				}
				ArbitrationModel.addPosition(ccaID,positionName,description).then(function(rows,err){
					if(!err){
						res.status(200).json(rows);
					}else{
						res.status(404).json(err);
					}
				}).catch(function(error){
					res.status(404).json(error);
				})
			}catch(err){
				res.status(404).json(err);
			}
		},

		viewPositions: function(req,res){
			try{
				ArbitrationModel.allPositions().then(function(rows){
					res.status(200).json(rows);
				})
			}catch(err){
				res.status(404).json({'error': err});
			}
		},

		addStudents : async function( req, res){
			try{
				const file = req.file.path
			    const doc = parser.parseXls2Json(file);
			    const voters = await doc[0].map(voter => {
			      return {
			        ...voter,
			        password : `${Math.floor(Math.random() * 10)}Sec${Math.floor(Math.random() * 100)}Pwd${Math.floor(Math.random() * 100)}`
			      }
			    });

			    //adding users in thee database
			    const data = await voter.bulkCreate(voters);
			    mailEvent.emit('sendEmail',voters);

			    //send response
			    res.json({message: "voters were added in the database"});

			}catch(err){
				res.status(404).json({'error': err});
			}
		}

}