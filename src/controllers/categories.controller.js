const Category = require("../models/Category");
const Response = require("../common/response");
const createError = require("http-errors");

const getCategories = async (req, res) => {
  try {
    console.log("Buscando categorias ");
    let Categories = await Category.find({});
    console.log(Categories);
    Response.succes(res, 200, "Listado de categorias", Categories);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};
const getCategory = async (req, res) => {
  try {
    const id = req.params;
    let category = await Category.findById(id);

    if (!category) return Response.error(res, createError.NotFound());

    Response.succes(res, 200, `Categoria ${id}`, category);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const categorySave = await newCategory.save();

    Response.succes(res, 201, "Categoria Creado Con exito", categorySave);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};
const deleteCategory = (req, res) => {};
const updateCategory = (req, res) => {
  res.json("Actualizando Categoria");
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
