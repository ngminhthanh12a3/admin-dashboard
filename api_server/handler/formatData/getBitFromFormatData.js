module.exports = (formatJSON, bitWise, position) => {
  return (formatJSON & (bitWise << position)) >> position;
};
