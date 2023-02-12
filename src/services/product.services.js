const Category = require("../models/Category");
const Product = require("../models/Product");

const createProduct = async (req) => {
  const add = 1;
  const { name, imgURL, price, description, categories, ingredents } = req.body;

  const updatePipeline = req.categories.map((c) => {
    let sum = c.totalProducts + 1;
    return {
      updateOne: {
        filter: { _id: c._id },
        update: { $set: { totalProducts: sum } },
      },
    };
  });

  const newProduct = new Product({
    name,
    imgURL,
    price,
    ingredents,
    categories,
    description,
  });
  const bulkWrite = await Category.bulkWrite(updatePipeline);

  return await newProduct.save();
};

const update = async (req) => {
  const {
    name,
    imgURL,
    price,
    description,
    categories,
    ingredents
  } = req.body;
  const { id } = req.params;

  return await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        imgURL,
        price,
        description,
        categories,
        ingredents
      },
    },
    { new: true }
  );
};

const deleteProdCate = async (categories) => {
  const categoriesfound = await Category.find({
    _id: { $in: categories },
  });

  const updatedCategories = categoriesfound.map((c) => {
    let sum = c.totalProducts <= 0 ? 0 : c.totalProducts - 1;
    return {
      updateOne: {
        filter: { _id: c._id },
        update: { $set: { totalProducts: sum } },
      },
    };
  });

  const bulkWrite = await Category.bulkWrite(updatedCategories);
};

module.exports = {
  createProduct,
  update,
  deleteProdCate,
};
