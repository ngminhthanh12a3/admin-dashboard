var path = require("path");
const { storeToDB } = require("../handler");

module.exports = async (req, res, next) => {
  const { OTA_Field, DeviceInfo } = require("../models");
  // enable test ota
  // const { OTA_current_fields } = require("../constants");
  const { filetype = "", devicetype = "", devID = 0 } = req.query || {};

  const {
    OTA_CURRENT_FIELDS_NAME = "",
    OTA_ENABLE = true,
    OTA_CURRENT_VERSION = 1.0,
  } = (await OTA_Field.findOne({
    OTA_FILETYPE: filetype,
    OTA_DEVICE_TYPE: devicetype,
  })
    .lean()
    .exec()) || {};

  var binPATH = path.join(process.cwd(), `binOTA/${OTA_CURRENT_FIELDS_NAME}`);

  const differenceFOTAVersion = req.query["v"] != OTA_CURRENT_VERSION;

  if (OTA_ENABLE && differenceFOTAVersion && OTA_CURRENT_FIELDS_NAME) {
    await DeviceInfo.findOneAndUpdate(
      { devID },
      {
        version: OTA_CURRENT_VERSION,
        ota_type: filetype,
        devicetype,
        ota_upload_time: Date.now(),
      }
    );
    res.download(binPATH);
  } else {
    res.writeHead(400);
    res.end("Fail");
  }
};
