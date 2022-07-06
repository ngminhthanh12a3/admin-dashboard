import getDeformatDataFields from './getDeformatDataFields';

export default (formatJSON) => {
  const deformatJSON = {};
  for (const devID in formatJSON) {
    deformatJSON[devID] = getDeformatDataFields(formatJSON[devID]);
  }
  return deformatJSON;
};
