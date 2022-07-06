const { storeToDB } = require("../../handler");
const { deviceInfoAnalysis, dbInitialompleted } = require("../../constants");
const handleDeviceInfoTemperatureAnalysis = require("./handleDeviceInfoTemperatureAnalysis");
const { DeviceInfoAnalysis } = require("../../models");
const { emitToClient } = require("../../bin/emitToClient");

module.exports = (devID, props) => {
  // need to handle device info analysis
  const { temperature, temperature_warning } = props;

  // init
  if (!deviceInfoAnalysis[devID]) deviceInfoAnalysis[devID] = {};
  handleDeviceInfoTemperatureAnalysis(deviceInfoAnalysis[devID], {
    temperature,
    temperature_warning,
  });
  storeToDB(
    DeviceInfoAnalysis,
    { devID, ...deviceInfoAnalysis[devID] },
    { devID }
  );

  const emitJSON = {};
  emitJSON[devID] = deviceInfoAnalysis[devID];
  emitToClient(emitJSON, "formatDeviceInfoAnalysis");
};
