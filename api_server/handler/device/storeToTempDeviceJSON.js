const { emitToClient } = require("../../bin/emitToClient");
const { handleDeviceJSONStatus } = require("../decryptValue");
const { getBitFromFormatData } = require("../formatData");

module.exports = (decryptJSON) => {
  const { chacha20DecryptValue } = require("../../constants");
  const { devID, ...propsJSON } = decryptJSON;

  // initialize
  if (!chacha20DecryptValue[devID]) chacha20DecryptValue[devID] = {};

  // send device online notification
  if (
    // chacha20DecryptValue[devID]["wifi_status"] === "DEACTIVE" ||
    !getBitFromFormatData(chacha20DecryptValue[devID]["status"], 0x1, 1) ||
    !chacha20DecryptValue[devID]["status"]
  )
    emitToClient(
      {
        type: "success",
        message: "Device Wifi Status",
        description: `Device ${devID}. Wifi Status: ACTIVE`,
      },
      "notification"
    );
  chacha20DecryptValue[devID] = { ...propsJSON };
  handleDeviceJSONStatus(chacha20DecryptValue, devID);
};
