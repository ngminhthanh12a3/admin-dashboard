const { DeviceInfo } = require("../../models");
module.exports = (decryptJSON) => {
  var { storeToTempDeviceJSON, storeToDB } = require("../../handler");

  storeToTempDeviceJSON(decryptJSON);
  const { devID } = decryptJSON;
  storeToDB(DeviceInfo, decryptJSON, { devID: devID });
};
