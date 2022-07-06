const { publishToBroker } = require("../broker");
var numeral = require("numeral");

module.exports = async (Model, OTA_current_fields, dbInitialTitle) => {
  const dataArray = await Model.find().lean().exec() || [];
  const { OTA_CURRENT_VERSION = 1.0 } = dataArray[0] || {};

  // const message = numeral(OTA_CURRENT_VERSION).format("0.0");
  const version_format = numeral(OTA_CURRENT_VERSION).format("0.0");
  const message = version_format;
  const topic = "esp/firmware_version";

  publishToBroker(topic, message);

  OTA_current_fields = { ...dataArray[0] };
};
