const getBitFromFormatData = require("./getBitFromFormatData");

module.exports = (status) => {
  const dynamo_status = getBitFromFormatData(status, 0x1, 0)
    ? "ACTIVE"
    : "DEACTIVE";
  const wifi_status = getBitFromFormatData(status, 0x1, 1)
    ? "ACTIVE"
    : "DEACTIVE";
  const status1 = getBitFromFormatData(status, 0x1, 2) ? "ON" : "OFF";
  const status2 = getBitFromFormatData(status, 0x1, 3) ? "ON" : "OFF";
  const relay_warning1 = getBitFromFormatData(status, 0x1, 4)
    ? "RELAY UNAVAILABLE"
    : "RELAY AVAILABLE";
  const relay_warning2 = getBitFromFormatData(status, 0x1, 5)
    ? "RELAY UNAVAILABLE"
    : "RELAY AVAILABLE";
  const voltage_warning1 = getBitFromFormatData(status, 0x1, 6)
    ? "Voltage Warning"
    : "NORMAL";
  const voltage_warning2 = getBitFromFormatData(status, 0x1, 7)
    ? "Voltage Warning"
    : "NORMAL";
  return {
    dynamo_status,
    relay_warning1,
    relay_warning2,
    status1,
    status2,
    wifi_status,
    voltage_warning1,
    voltage_warning2,
  };
};
