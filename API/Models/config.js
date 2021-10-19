const mysql = require("mysql");
mysqlConnection = mysql.createConnection({
	host: 'localhost',
	port:'3306',
	user: 'root',
	password:'',
	database:'iprc voting app'
});

mysqlConnection.connect((err) =>{
	if(err){
		console.log(err);
	}
})


module.exports = mysqlConnection;