
const jwt = require("jsonwebtoken");

module.exports = {
	authenticateArbitrator : function(req,res,next){
		const header = req.headers['authorization'];
		const token = header && header.split(' ')[1];
		jwt.verify(token, "MySecretKey", (err, user) => {
			if (err) {
				res.status(401).json({"error" :"authentication error"})
			} else {
				req.user = user;
				if(user.userType != "arbitrator"){
					res.status(401).json({"error" :"acces denied"});
				}else{
					next();
				}
				
			}
		});
	},

	authenticateVoter : function(req,res,next){
		const header = req.headers['authorization'];
		const token = header && header.split(' ')[1];
		jwt.verify(token, "MySecretKey", (err, user) => {
			if (err) {
				res.status(401).json({"error" :"authentication error"})
			} else {
				req.user = user;
				if(user.userType != "voter"){
					res.status(401).json({"error" :"acces denied"});
				}else{
					next();
				}
				
			}
		});
	}
}