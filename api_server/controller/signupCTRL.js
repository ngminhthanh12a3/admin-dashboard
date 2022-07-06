var { User } = require("../models");

module.exports = (req, res, next) => {
  const { username, password } = req.body;

  // find exist username
  User.findOne({ username: username })
    .then((usr) => {
      if (usr) {
        res.status(500).json({ err: "Username is already exist!" });
        return usr;
      }
      return;
    })
    .then((usr) => {
      // If username exist
      if (usr) return;
      var { getBcryptPassword } = require("../handler");
      // create user infomation
      var user = new User({
        username: username,
        // hashedPassword
        password: getBcryptPassword(password),
      });

      // save user's info to mongodb
      user.save((err, User) => {
        if (err) {
          res.status(400).json({ err: "Database Error" });
          return;
        } else {
          res.status(200).json({ msg: "New user added" });
          return;
        }
      });
    });

  // Clear session
  req.session.destroy();
};
