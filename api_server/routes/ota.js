var express = require("express");
const multer = require("multer");
const path = require("path");

var fs = require("fs");

// let file_name = "";
// SET STORAGE
var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const binOTADirname = "binOTA";
    const binOTAPath = `/mern-app/server/${binOTADirname}`;
    // const statsBinPath = fs.statSync(binOTAPath);
    // console.log(statsBinPath.isDirectory());
    fs.readdir(binOTAPath, (err, files) => {
      if (err)
        fs.mkdir(binOTAPath, (err) => {
          if (err) return console.error(err);
        });
    });

    // console.log(__dirname);
    cb(null, binOTADirname);
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // const file_name = file.fieldname + "-" + Date.now() + ext;
    const { filetype = "", devicetype = "", version = "" } = req.body;
    const file_name = `${devicetype}-${filetype}-v${version}-${Date.now()}${ext}`;

    req.body.file_name = file_name;
    cb(null, file_name);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);

    if (ext !== ".bin") return callback(new Error("Only bin file are allowed"));

    callback(null, true);
  },
});
const fileUpload = upload.fields([{ name: "bin-file", maxCount: 1 }]);

var router = express.Router();
var { otaCTRL, fields_CTRL, upload_ota_bin_CTRL } = require("../controller");
const { version } = require("os");

// const { OTA_Field } = require("../models");
router.get("/update", otaCTRL);
router.post(
  "/upload_ota_bin",

  fileUpload,
  upload_ota_bin_CTRL
);

router.get("/fields", fields_CTRL);
// router.post(
//   "/check_upload_ota_bin",
//   // upload.single("myFile"),
//   (req, res, next) => {
//     res.status(200).json({ status: "done" });
//   }
// );
module.exports = router;
