const jwtoken = require("../libs/tokens");
const User = require("../models/User");
const Response = require("../common/response");

const verifyToken = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.toLowerCase().startsWith("bearer"))
    return res.status(400).json({ error: "not authorization token provide" });

  const token = authorization.split(" ").pop();

  let decoded = null;

  try {
    decoded = jwtoken.tokenVerify(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "no token provided or invalid" });
  }

  if (!token || !decoded.id)
    return res.status(400).json({ error: "no token provided or invalid" });

  try {
    const user = await User.findById(decoded.id, { password: 0 }).populate(
      "rol"
    );
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
  } catch (error) {
    return Response.error(res);
  }

  next();
};

const canEdit = async (req, res, next) => {
  const { user } = req;

  const rol = user.rol.name;

  const canEdit = rol === "admin" || rol === "moderator";
  if (!canEdit) return res.status(403).json({ message: "Forbiden" });

  next();
};

const isAdmin = async (req, res, next) => {
  const { user } = req;
  const rol = user.rol;

  const isAdmin = rol.name === "admin";

  if (!isAdmin)
    return res.status(403).json({ message: "Forbiden: Require admin role" });

  next();
};

const canSale = async (req, res, next) => {
  const { user } = req;

  const rol = user.rol.name;
  const canSale = rol === "admin" || rol === "moderator" || rol === "employee";

  if (!canSale)
    return res.status(403).json({ message: "Forbiden you can't make a sale" });

  next();
};

module.exports = { verifyToken, canEdit, isAdmin, canSale };
