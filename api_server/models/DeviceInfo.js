const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var deviceInfoSchema = new Schema({
  // devID: String,
  // current1: String,
  // current2: String,
  // dynamo_status: String,
  // relay_warning1: String,
  // relay_warning2: String,
  // status1: String,
  // status2: String,
  // temperature: String,
  // temperature_warning: String,
  // voltage1: String,
  // voltage2: String,
  // wifi_status: String,
  devID: { type: Number, unique: true },
  voltage1: Number,
  voltage2: Number,
  current1: Number,
  current2: Number,
  temperature: Number,
  temperature_warning: Number,
  status: Number,
  version: { type: Number, default: 1.0 },
  ota_type: { type: String, default: "Local" },
  devicetype: { type: String, default: "ESP32" },
  ota_upload_time: { type: Number, default: "Invalid date" },
});

const DeviceInfo = mongoose.model("DeviceInfo", deviceInfoSchema);

module.exports = DeviceInfo;
