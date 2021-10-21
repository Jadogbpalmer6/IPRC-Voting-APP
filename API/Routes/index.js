express = require("express");
bodyParser = require("body-parser");

router = express.Router();

app = require("../helpers/includes");
app.use(express.json());

//routes
VotersRoute = require("./VotersRoute");
CandidatesRoute = require("./CandidatesRoute");
ArbitrationRoute = require("./ArbitrationRoute")
votersController = require("../controllers/votersController")

app.use('/api/voters/',VotersRoute);
app.use('/api/candidates/', CandidatesRoute)
app.use('/api/arbitration/', ArbitrationRoute)
app.use('/api/login' ,votersController.login)

module.exports = router;