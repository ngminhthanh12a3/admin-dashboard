const { DeviceInfo } = require("../../models");

module.exports = async (req, res, next) => {
  const data = await DeviceInfo.find({}).lean().exec();
  res.status(200).json({
    data: [...data],

    page: 1,
    success: true,
    total: data.length,
  });
};
