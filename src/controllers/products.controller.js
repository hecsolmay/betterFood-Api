const Product = require("../models/Product");
const Response = require("../common/response");
const createError = require("http-errors");

const {Types: {ObjectId: ObjectId}} = require('mongoose');

const getProducts = async (req, res) => {
  try {
    let products = await Product.find({}).populate("categories");
    Response.succes(res, 200, "Listado de Productos", products);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = ObjectId(req.params);
    const product = await Product.findById(id);
    // let product = await Product.findById(id).populate("categories");

    if (!product) return Response.error(res, createError.NotFound());

    Response.succes(res, 200, `Producto ${id}`, product);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, imgURL, price, personalize, categories } = req.body;
    const newProduct = new Product({
      name,
      imgURL,
      price,
      personalize,
      categories,
    });
    const productSave = await newProduct.save();

    Response.succes(res, 201, "Producto Creado Con exito", productSave);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    Response.succes(res, 200, `Producto ${id} eliminado `, deletedProduct);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateProduct = async (req, res) => {
  res.json("Actualizando Productos");
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
