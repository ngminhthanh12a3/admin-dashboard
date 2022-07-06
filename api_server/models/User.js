const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  access: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  },
});

var User = mongoose.model("User", userSchema);

module.exports = User;
