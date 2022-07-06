var express = require("express");
const { signoutCTRL } = require("../controller");
var router = express.Router();

router.post("/", signoutCTRL);
module.exports = router;
