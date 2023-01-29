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

module.exports = {
  checkValidCategory,
};
