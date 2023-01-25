const jwtoken = require("../libs/tokens");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ").pop();

  if (!token) return res.status(400).json({ message: "no token provided" });

  const decoded = jwtoken.tokenVerify(token);

  const user = await User.findOne(
    { email: decoded.email },
    { password: 0 }
  ).populate("roles");

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user;
  next();
};

const canEdit = async (req, res, next) => {
  const { user } = req;

  const roles = user.roles;

  const canEdit = roles.some(
    (role) => role.name === "admin" || role.name === "moderator"
  );

  if (!canEdit) return res.status(403).json({ message: "Forbiden" });

  next();
};

const isAdmin = async (req, res, next) => {
  const { user } = req;
  console.log(user);
  const roles = user.roles;

  const isAdmin = roles.some((role) => role.name === "admin");

  if (!isAdmin)
    return res.status(403).json({ message: "Forbiden: Require admin role" });

  next();
};

const canSale = async (req, res, next) => {
  const { user } = req;

  const roles = user.roles;

  const canSale = roles.some(
    (role) =>
      role.name === "admin" ||
      role.name === "moderator" ||
      role.name === "employee"
  );

  if (!canSale)
    return res.status(403).json({ message: "Forbiden you can't make a sale" });

  next();
};

module.exports = { verifyToken, canEdit, isAdmin, canSale };
