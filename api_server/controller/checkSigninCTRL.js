module.exports = (req, res, next) => {
  const { user } = req.session;

  // check for signned in User
  if (user) {
    // return User Signed in status
    res.status(200).json({ msg: "User Signed In", username: user.username });
  } else {
    // clear session
    req.session.destroy();
    // And return Error: User not Signed In
    res.status(400).json({ err: "User not Signed In" });
  }
};
