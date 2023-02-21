const Product = require("../models/Product");

const searchProducts = async (products) => {
  let foundProducts = null;

  if (products.length !== 0) {
    const uniqueArray = products.filter((item, index, self) => {
      return index === self.findIndex((p) => p.idProduct === item.idProduct);
    });
    console.log(uniqueArray);
    foundProducts = await Product.find({
      _id: { $in: uniqueArray.map((p) => p.idProduct) },
    });

    if (uniqueArray.length !== foundProducts.length) return null;
  }

  return foundProducts;
};

module.exports = {
  searchProducts,
};
