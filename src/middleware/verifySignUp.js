const ROLES = ["admin", "user", "moderator", "employee"];

const checkRoleExisted = (req, res, next) => {
  const { roles } = req.body;
  console.log(roles);
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i]))
        return res
          .status(400)
          .json({ message: `El rol ${roles[i]} no existe` });
    }
  }

  next();
};

module.exports = {
  checkRoleExisted,
};
