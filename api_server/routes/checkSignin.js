var express = require("express");
var router = express.Router();
var { checkSigninCTRL } = require("../controller");
router.post("/", checkSigninCTRL);
module.exports = router;
