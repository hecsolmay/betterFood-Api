const PascalCase = require("../libs/pascalCase");
const Ingredent = require("../models/Ingredent");

const checkUniqueIngredent = async (req, res, next) => {
  const { name } = req.body;

  let query = PascalCase(name);

  const foundIngredent = await Ingredent.findOne({ name: query });

  if (foundIngredent)
    return res.status(409).json({ message: "Ingredent Already Exist" });

  next();
};

module.exports = {
  checkUniqueIngredent,
};
