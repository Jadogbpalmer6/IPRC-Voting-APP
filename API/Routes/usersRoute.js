express = require("express");
bodyParser = require("body-parser");
router = express.Router();

usersController = require("../controllers/usersController");

jsonParser = bodyParser.json();

router.get('/all',usersController.all)


module.exports = router;