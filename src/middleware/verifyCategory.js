const PascalCase = require("../libs/pascalCase");
const Category = require("../models/Category");

const checkValidCategory = async (req, res, next) => {
  const { categories } = req.body;
  let foundCategories = {};

  if (categories) {
    console.log(categories);
    foundCategories = await Category.find({ _id: { $in: categories } });
    if (foundCategories.length !== categories.length)
      return res.status(400).json({ message: "Categorias no validas" });
  }

  req.categories = foundCategories;
  next();
};

const checkUniqueCategory = async (req, res, next) => {
  const { name } = req.body;

  let query = PascalCase(name);

  const foundCategory = await Category.findOne({ name: query });

  if (foundCategory)
    return res.status(409).json({ message: "Category already exist" });

  next();
};

module.exports = {
  checkValidCategory,
  checkUniqueCategory,
};
