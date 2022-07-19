module.exports = async () => {
  // connect to mongodb
  var { connectToMongo } = require("./mongoDB");
  await connectToMongo();

  var connectSocketClient = require("./connectSocketClient");
  await connectSocketClient();

  const {
    loadDeviceInfoFromDB,
    loadOTAFieldsFromDB,
    loadDeviceInfoAnalysis,
  } = require("../handler");
  const { DeviceInfo, OTA_Field, DeviceInfoAnalysis } = require("../models");
  const {
    chacha20DecryptValue,
    OTA_current_fields,
    deviceInfoAnalysis,
  } = require("../constants");
  await loadDeviceInfoFromDB(DeviceInfo, chacha20DecryptValue, "DeviceInfo");
  await loadOTAFieldsFromDB(OTA_Field, OTA_current_fields, "OTAFields");
  await loadDeviceInfoAnalysis(
    DeviceInfoAnalysis,
    deviceInfoAnalysis,
    "DeviceInfoAnalysis"
  );

  // listen to mqtt
  var { listenToMQTT } = require("./listenToMQTT");
  await listenToMQTT();

  // var ListenToChangeStreamOnDB = require("./ListenToChangeStreamOnDB");
  // await ListenToChangeStreamOnDB();
};
