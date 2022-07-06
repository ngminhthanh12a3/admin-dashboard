// 0 - Require bcrypt
const bcrypt = require("bcrypt");
// 1 - Specify how many salt rounds
const saltRounds = 10;

exports.getBcryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

exports.checkCorrectPassword = (enteredPassword, hashedPassword) => {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
};
