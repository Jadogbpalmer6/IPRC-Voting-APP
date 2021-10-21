express = require("express");
bodyParser = require("body-parser");
router = express.Router();

usersController = require("../controllers/usersController");
votersController = require("../controllers/votersController")
auth = require("../authentication");


jsonParser = bodyParser.json();

router.get('/all',auth.authenticateArbitrator,usersController.all)
router.get('/vote/:id',auth.authenticateVoter,votersController.vote)


module.exports = router;