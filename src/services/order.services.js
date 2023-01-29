const Product = require("../models/Product");
const Order = require("../models/Order");
const Sale = require("../models/Sale");

const searchProducts = async (products) => {
  const foundProducts = await Product.find({
    _id: { $in: products.map((p) => p.idProduct) },
  });

  return foundProducts;
};

const createOrderAndUpdateProd = async (
  products,
  numMesa,
  total,
  totalQuantity,
  foundProducts
) => {
  const productsUpdate = updateProd(products, foundProducts);

  const newOrder = new Order({ products, numMesa, total, totalQuantity });
  let savedOrder = await newOrder.save();

  const newSale = new Sale({ order: savedOrder._id });

  await Promise.all([newSale.save(), Product.bulkWrite(productsUpdate)]);

  return savedOrder;
};

function updateProd(products, foundProducts, sustrac = false) {
  const productsUpdate = products.map((p) => {
    let i = foundProducts.findIndex((product) => product._id == p.idProduct);
    let ordered = sustrac
      ? foundProducts[i].ordered - p.cantidad
      : foundProducts[i].ordered + p.cantidad;
    return {
      updateOne: {
        filter: { _id: p.idProduct },
        update: { $set: { ordered: ordered } },
      },
    };
  });

  return productsUpdate;
}

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) return deletedOrder;

  const _id = deletedOrder.id;

  const deletedSale = await Sale.findOneAndDelete({
    order: _id,
  });

  const foundProducts = await Product.find({
    _id: { $in: deletedOrder.products.map((p) => p.idProduct) },
  });

  const products = deletedOrder.toJSON().products;

  const searchedProd = foundProducts.map((p) => {
    return { _id: p._id.toString(), ordered: p.ordered };
  });

  const updatedProducts = updateProd(products, searchedProd, true);

  const productsUpdated = await Product.bulkWrite(updatedProducts);

  return deletedOrder;
};

module.exports = {
  searchProducts,
  createOrderAndUpdateProd,
  deleteOrder,
};
