import getBitFromFormatData from './getBitFromFormatData';
const refVoltage = 220;
export default (formatVoltage) => {
  const deformatVoltage = getBitFromFormatData(formatVoltage, 0x7f, 0);
  const voltageSign = getBitFromFormatData(formatVoltage, 0x1, 7);
  const voltage = voltageSign ? refVoltage - deformatVoltage : refVoltage + deformatVoltage;
  return voltage;
};
