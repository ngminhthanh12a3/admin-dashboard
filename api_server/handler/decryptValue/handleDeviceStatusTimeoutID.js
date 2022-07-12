const { emitToClient } = require("../../bin/emitToClient");
const { DeviceInfo } = require("../../models");
const { storeToDB } = require("../db");
const {
  clearBitFromFormatData,
  getBitFromFormatData,
} = require("../formatData");

const timeOutWifiStatus = 20000;

module.exports = (chacha20DecryptValue, devID) => {
  // cleartimeout
  const { deviceStatusTimeoutID } = require("../../constants");

  // fix error: undefined
  if (deviceStatusTimeoutID[devID])
    clearTimeout(deviceStatusTimeoutID[devID].wifi_statusTimeoutID);
  // initialize if undefined
  else deviceStatusTimeoutID[devID] = {};

  //timeOutToSetDeActive.
  deviceStatusTimeoutID[devID].wifi_statusTimeoutID = setTimeout(() => {
    // fix error
    if (chacha20DecryptValue[devID]) {
      // chacha20DecryptValue[devID].wifi_status = "DEACTIVE";
      clearBitFromFormatData(chacha20DecryptValue[devID], 0x1, 1, "status");

      const emitJSON = {};
      emitJSON[devID] = chacha20DecryptValue[devID];
      storeToDB(
        DeviceInfo,
        { devID, ...chacha20DecryptValue[devID] },
        { devID }
      );

      emitToClient(emitJSON, "encryptDT");

      const wifiStatus = getBitFromFormatData(
        chacha20DecryptValue[devID],
        0x1,
        1,
        "status"
      )
        ? "ACTIVE"
        : "DEACTIVE";

      emitToClient(
        {
          type: "info",
          message: "Device Wifi Status",
          description: `Device ${devID}. Wifi Status: ${wifiStatus}`,
        },
        "notification"
      );
    }
  }, timeOutWifiStatus);
};
