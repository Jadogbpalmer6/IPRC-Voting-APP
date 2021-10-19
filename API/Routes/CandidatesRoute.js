express = require("express");
bodyParser = require("body-parser");
router = express.Router();

CandidatesController = require("../controllers/CandidatesController");

auth = require("../authentication");



jsonParser = bodyParser.json();

router.post('/register',jsonParser,CandidatesController.register)
router.get('/all/approved',jsonParser,CandidatesController.allApproved)
router.get('/all',jsonParser,auth.authenticateArbitrator,CandidatesController.all)
router.post('/approve',jsonParser,auth.authenticateArbitrator,CandidatesController.approve)

module.exports = router;