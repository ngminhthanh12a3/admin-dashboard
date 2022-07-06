import getDeformatAnalysisDataFields from './getDeformatAnalysisDataFields';

export default (formatAnalysisData) => {
  const deformatJSON = {};
  for (const devID in formatAnalysisData) {
    deformatJSON[devID] = getDeformatAnalysisDataFields(formatAnalysisData[devID]);
  }
  return deformatJSON;
};
