express = require("express");
bodyParser = require("body-parser");
router = express.Router();

ArbitrationController = require("../controllers/ArbitrationController");
auth = require("../authentication");

jsonParser = bodyParser.json();

router.post('/login',jsonParser,ArbitrationController.login);
router.post('/add/position',jsonParser,auth.authenticateArbitrator,ArbitrationController.addPosition);
router.get('/view/positions',jsonParser,auth.authenticateArbitrator,ArbitrationController.viewPositions);

module.exports = router;