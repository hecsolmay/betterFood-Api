const Product = require("../models/Product");

const searchProducts = async (products) => {
  const foundProducts = products
    ? await Product.find({
        _id: { $in: products.map((p) => p.idProduct) },
      })
    : null;

  if (foundProducts.length != products.length) return null;
  return foundProducts;
};

module.exports = {
  searchProducts,
};
