module.exports = (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.status(200).json({ msg: "Logout Success" });
    return;
  }
  res.status(400).json({ err: "Logout Fail" });
};
