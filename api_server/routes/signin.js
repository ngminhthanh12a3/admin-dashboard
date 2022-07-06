var express = require("express");
var router = express.Router();
var { signinCTRL } = require("../controller");

router.post("/", signinCTRL);
module.exports = router;
