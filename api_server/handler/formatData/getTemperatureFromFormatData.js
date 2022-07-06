const getBitFromFormatData = require("./getBitFromFormatData");

const tempRef = 30; // V
module.exports = (formatTemperature, formatTemperatureWarning) => {
  const tempSign = getBitFromFormatData(formatTemperatureWarning, 0x1, 7);
  const temperatureReal = getBitFromFormatData(formatTemperature, 0xf, 0);
  const temperatureFloating = getBitFromFormatData(formatTemperature, 0xf, 4);
  const differenceTemperature = temperatureReal + temperatureFloating / 100;
  const temperature = tempSign
    ? tempRef - differenceTemperature
    : differenceTemperature + tempRef;

  let temperature_warning = "";
  const tempWarningOption = getBitFromFormatData(
    formatTemperatureWarning,
    0x3,
    5
  );
  switch (tempWarningOption) {
    case 0b00:
      temperature_warning = "NORMAL";
      break;
    case 0b01:
      temperature_warning = "OVERHEAT";
      break;
    case 0b10:
      temperature_warning = "MUTATION";
      break;
    default:
      break;
  }
  return { temperature, temperature_warning };
};
