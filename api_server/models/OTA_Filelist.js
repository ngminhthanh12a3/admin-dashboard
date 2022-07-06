var mongoose = require("mongoose");
var OTA_FilelistSchema = new mongoose.Schema({
  commit_message: {
    type: String,
    default: "",
  },
  file_name: {
    type: String,
    required: true,
    default: "",
  },
  filetype: {
    type: String,
    required: true,
    default: "",
  },
  version: {
    type: String,
    required: true,
    default: "1.0",
  },
  upload_time: {
    type: Number,
    default: Date.now(),
  },
  devicetype: {
    type: String,
    default: "ESP32",
  },
});
var OTA_Filelist = mongoose.model("OTA_Filelist", OTA_FilelistSchema);

module.exports = OTA_Filelist;
