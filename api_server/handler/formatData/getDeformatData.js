const getDeformatDataFields = require("./getDeformatDataFields");

module.exports = (formatJSON) => {
  const deformatJSON = {};
  for (const devID in formatJSON) {
    deformatJSON[devID] = getDeformatDataFields(formatJSON[devID]);
  }
  return deformatJSON;
};
