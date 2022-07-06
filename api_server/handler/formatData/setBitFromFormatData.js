module.exports = (formatJSON, bitWise, position) => {
  formatJSON["status"] |= bitWise << position;
};
