const jwt = require("jsonwebtoken");
const config = require("../config/config");

const tokenSign = (user,  rol = "user",expires = "24h") => {


  return jwt.sign(
    { id: user._id, email: user.email, rol: rol },
    config.SECRET,
    {
      expiresIn: expires, // 24 hours
    }
  );
};

const tokenVerify = (token) => {
  return jwt.verify(token, config.SECRET);
};

const tokenDecode = (token) => {
  return jwt.decode(token);
};

module.exports = {
  tokenSign,
  tokenVerify,
  tokenDecode,
};
