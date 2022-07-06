const getBitFromFormatData = require("./getBitFromFormatData");
module.exports = (formatCurrent) => {
  const currentReal = getBitFromFormatData(formatCurrent, 0xff, 0);
  const currenFloating = getBitFromFormatData(formatCurrent, 0xff, 8);
  const deformatCurrent = currentReal + currenFloating / 100;
  return deformatCurrent;
};
