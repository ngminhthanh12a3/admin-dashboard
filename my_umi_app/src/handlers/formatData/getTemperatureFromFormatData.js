import getBitFromFormatData from './getBitFromFormatData';

const tempRef = 30; // V
export default (formatTemperature, formatTemperatureWarning) => {
  // const tempSign = getBitFromFormatData(formatTemperatureWarning, 0x1, 7);
  const temperatureReal = getBitFromFormatData(formatTemperature, 0xff, 8);
  const temperatureFloating = getBitFromFormatData(formatTemperature, 0xff, 0);
  // const differenceTemperature = temperatureReal + temperatureFloating / 100;
  // const temperature = tempSign ? tempRef - differenceTemperature : differenceTemperature + tempRef;
  const temperature = temperatureReal + temperatureFloating / 100;
  let temperature_warning = '';
  const tempWarningOption = getBitFromFormatData(formatTemperatureWarning, 0x3, 5);
  switch (tempWarningOption) {
    case 0b00:
      temperature_warning = 'NORMAL';
      break;
    case 0b01:
      temperature_warning = 'OVERHEAT';
      break;
    case 0b10:
      temperature_warning = 'MUTATION';
      break;
    default:
      break;
  }
  return { temperature, temperature_warning };
};
