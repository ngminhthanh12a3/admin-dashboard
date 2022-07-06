const mongoose = require("mongoose");
var DeviceInfoAnalysisSchema = mongoose.Schema({
  devID: Number,
  temperature: Array,
});
var DeviceInfoAnalysis = mongoose.model(
  "DeviceInfoAnalysis",
  DeviceInfoAnalysisSchema
);

module.exports = DeviceInfoAnalysis;
