votersModel = require("../models/votersModel");
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
}