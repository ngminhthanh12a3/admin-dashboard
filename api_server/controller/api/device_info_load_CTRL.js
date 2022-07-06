const { chacha20DecryptValue } = require("../../constants");

module.exports = (req, res, next) => {
  const resJSON = chacha20DecryptValue;
  res.status(200).json(resJSON);
};
