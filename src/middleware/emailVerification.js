const User = require("../models/User");

const emailExisted = async (req, res, next) => {
  let query = req.body.email.trim().toLowerCase();
  const user = await User.findOne({ email: query });

  if (user) return res.status(409).json({ message: "User already exist" });

  next();
};

module.exports = { emailExisted };
