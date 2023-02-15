const ROLES = ["admin", "user", "moderator"];

const checkRoleExisted = (req, res, next) => {
  const { rol } = req.body;
  console.log(rol);

  const valid = ROLES.some((r) => r === rol);
  if (rol) {
    if (!valid)
      return res.status(400).json({ message: `El rol ${rol} no existe` });
  }

  next();
};

module.exports = {
  checkRoleExisted,
};
