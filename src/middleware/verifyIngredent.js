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

const verifyExistingIngredents = async (req, res, next) => {
  const { ingredents } = req.body;

  if (ingredents) {
    let id = ingredents.map((i) => i.id);
    const foundIngredents = await Ingredent.find({ _id: { $in: id } });

    if (foundIngredents.length !== ingredents.length)
      return res.status(400).json({ message: "ingredent not valid" });
  }

  next();
};

module.exports = {
  checkUniqueIngredent,
  verifyExistingIngredents,
};
