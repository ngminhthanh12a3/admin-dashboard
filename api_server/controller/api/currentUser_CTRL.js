const { User } = require("../../models");

module.exports = async (req, res, next) => {
  const { currentUsername } = req.query;
  if (currentUsername) {
    const { _id, password, ...user_info } =
      (await User.findOne({
        username: currentUsername,
      })
        .lean()
        .exec()) || {};
    if (user_info) {
      res.status(200).json({
        success: true,
        data: { ...user_info },
      });
      return;
    }
  }
  res.status(400).json({
    success: false,
    data: {
      access: "guest",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
  });
};
