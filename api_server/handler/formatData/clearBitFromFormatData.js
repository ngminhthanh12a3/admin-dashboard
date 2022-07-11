module.exports = (formatJSON, bitWise, position, title = "status") => {
  // formatJSON["status"] &= ~bitWise << position;
  formatJSON[title] &= ~bitWise << position;
};
