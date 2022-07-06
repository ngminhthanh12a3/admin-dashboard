var express = require("express");
var router = express.Router();
var { indexCTRL } = require("../controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.end("ok");
});

router.all("/", indexCTRL);
module.exports = router;
