const mongoose = require("mongoose");

var OTA_FieldSchema = mongoose.Schema({
  OTA_FILETYPE: {
    type: String,
    default: "Local",
  },
  OTA_DEVICE_TYPE: {
    type: String,
    default: "ESP32",
  },
  OTA_CURRENT_FIELDS_NAME: String,
  OTA_CURRENT_VERSION: {
    type: Number,
    default: 1.0,
  },
  OTA_LATES_UPDATE: {
    type: Number,
    default: Date.now(),
  },
  OTA_ENABLE: {
    type: Boolean,
    default: true,
  },
});
var OTA_Field = mongoose.model("OTA_Field", OTA_FieldSchema);

module.exports = OTA_Field;
