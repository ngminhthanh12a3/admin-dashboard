export default (formatJSON, bitWise, position) => {
  return (formatJSON & (bitWise << position)) >> position;
};
