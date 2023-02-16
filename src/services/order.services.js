const Product = require("../models/Product");

const searchProducts = async (products) => {
  const foundProducts = await Product.find({
    _id: { $in: products.map((p) => p.idProduct) },
  });

  return foundProducts;
};

module.exports = {
  searchProducts,
};
