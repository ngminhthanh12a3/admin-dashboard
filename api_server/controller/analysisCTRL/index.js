var express = require("express");
const { deviceInfoAnalysis } = require("../../constants");
var router = express.Router();

router.get("/temperature", (req, res, next) => {
  res.status(200).json({ ...deviceInfoAnalysis });
});
module.exports = router;
