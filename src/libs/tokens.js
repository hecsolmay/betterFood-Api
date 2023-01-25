const jwt = require("jsonwebtoken");
const config = require("../config/config");

const tokenSign = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, roles: user.roles },
    config.SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );
};

const tokenVerify = (token) => {
  return jwt.decode(token);
};

module.exports = {
  tokenSign,
  tokenVerify,
};
