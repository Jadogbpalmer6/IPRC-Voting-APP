express = require("express");
bodyParser = require("body-parser");

jsonParser = bodyParser.json();
router = express.Router();

app = require("../helpers/includes");

//routes
UsersRoute = require("./usersRoute");
CandidatesRoute = require("./CandidatesRoute");
ArbitrationRoute = require("./ArbitrationRoute")
votersController = require("../controllers/votersController")

app.use('/api/users/',UsersRoute);
app.use('/api/candidates/', CandidatesRoute)
app.use('/api/arbitration/', ArbitrationRoute)
app.use('/api/login', jsonParser ,votersController.login)

module.exports = router;