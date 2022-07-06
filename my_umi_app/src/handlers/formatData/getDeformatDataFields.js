import getCurrentFromFormatData from './getCurrentFromFormatData';
import getStatusFromFormatData from './getStatusFromFormatData';
import getTemperatureFromFormatData from './getTemperatureFromFormatData';
// import getVoltageFromFormatData from './getVoltageFromFormatData';
export default (formatJSON) => {
  const current1 = getCurrentFromFormatData(formatJSON['current1']);
  const current2 = getCurrentFromFormatData(formatJSON['current2']);
  const {
    dynamo_status,
    relay_warning1,
    relay_warning2,
    status1,
    status2,
    wifi_status,
    voltage_warning1,
    voltage_warning2,
  } = getStatusFromFormatData(formatJSON['status']);
  const { temperature, temperature_warning } = getTemperatureFromFormatData(
    formatJSON['temperature'],
    formatJSON['temperature_warning'],
  );
  const voltage1 = formatJSON['voltage1'];
  //getVoltageFromFormatData(formatJSON['voltage1']);
  const voltage2 = formatJSON['voltage2'];
  // getVoltageFromFormatData(formatJSON['voltage2']);
  return {
    current1,
    current2,
    dynamo_status,
    relay_warning1,
    relay_warning2,
    status1,
    status2,
    wifi_status,
    voltage_warning1,
    voltage_warning2,
    temperature,
    temperature_warning,
    voltage1,
    voltage2,
  };
};
