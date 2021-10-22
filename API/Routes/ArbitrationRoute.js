express = require("express");
bodyParser = require("body-parser");
router = express.Router();
const multer  = require('multer')
const upload = require("../Helpers/upload");

// app.use(express.urlencoded({ extended: true }));

ArbitrationController = require("../controllers/ArbitrationController");
auth = require("../authentication");

jsonParser = bodyParser.json();

router.post('/login',jsonParser,ArbitrationController.login);
router.post('/add/position',jsonParser,auth.authenticateArbitrator,ArbitrationController.addPosition);
router.get('/view/positions',jsonParser,auth.authenticateArbitrator,ArbitrationController.viewPositions);
router.get('/report',jsonParser,auth.authenticateArbitrator,ArbitrationController.report);
router.post('/add/students',auth.authenticateArbitrator,upload.single('doc'),ArbitrationController.addStudents);

module.exports = router;