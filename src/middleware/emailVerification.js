const User = require("../models/User");

const emailExisted = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).json({ message: "User already exist" });

  next();
};

module.exports = { emailExisted };
