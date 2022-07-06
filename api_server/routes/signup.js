var express = require("express");
var router = express.Router();
var { signupCTRL } = require("../controller");
router.post("/", signupCTRL);
module.exports = router;
