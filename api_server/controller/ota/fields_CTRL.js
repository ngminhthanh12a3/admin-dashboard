const { OTA_Field } = require("../../models");

module.exports = async (req, res, next) => {
  const dataDB = (await OTA_Field.find({}).lean().exec()) || [];
  // const { OTA_CURRENT_VERSION = 1.0, OTA_LATES_UPDATE = Date.now() } =
  //   dataDB[0] || {};

  // res.status(200).json({
  //   OTA_CURRENT_VERSION,
  //   OTA_LATES_UPDATE,
  // });
  res.status(200).json([...dataDB]);
};
