import getTemperatureFromFormatAnalysisData from './getTemperatureFromFormatAnalysisData';
export default (formatAnalysisJSON) => {
  const temperatureDeformatArray = getTemperatureFromFormatAnalysisData(
    formatAnalysisJSON['temperature'],
  );
  return { temperature: temperatureDeformatArray };
};
