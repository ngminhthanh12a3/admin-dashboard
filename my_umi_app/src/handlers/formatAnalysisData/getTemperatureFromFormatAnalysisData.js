import { getTemperatureFromFormatData } from '../formatData';

export default (formatTemperatureArray) => {
  const temperatureDeformatArray = [];
  formatTemperatureArray.forEach((formatTemperatureItem) => {
    // fix error
    if (formatTemperatureItem) {
      const { temperature: formatTemperature, temperature_warning: formatTemperatureWarning } =
        formatTemperatureItem['value'];
      const { temperature: deformatTemperature } = getTemperatureFromFormatData(
        formatTemperature,
        formatTemperatureWarning,
      );
      const deformatAnalysisJSON = { ...formatTemperatureItem, value: deformatTemperature };
      temperatureDeformatArray.push(deformatAnalysisJSON);
    }
  });

  return temperatureDeformatArray;
};
