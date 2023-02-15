const Product = require("../models/Product");
const Response = require("../common/response");
const createHttpError = require("http-errors");
const services = require("../services/product.services");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");

const path = `${apiURL}/product`;

const populateOptions = [
  {
    path: "categories",
    select: { _id: 1, name: 1 },
  },
];

const getProducts = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = await getQueryParams(req);
    const sort = getQuerySort(req);

    const products = await Product.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
        populate: populateOptions,
        sort: sort,
      })
    );
    const info = paginate.info(products,path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = products;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("categories");

    if (!product) return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Producto ${id}`, product);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await services.createProduct(req);
    Response.succes(res, 201, "Producto Creado Con exito", newProduct);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    await services.deleteProdCate(deletedProduct.categories);

    if (!deletedProduct)
      return res
        .status(400)
        .json({ message: "No se pudo encontrar el producto" });

    Response.succes(res, 200, `Producto ${id} eliminado `, deletedProduct);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await services.update(req);

    if (!updatedProduct)
      return res
        .status(400)
        .json({ message: "No se pudo encontrar el producto" });

    Response.succes(
      res,
      200,
      `Producto ${updatedProduct.name} actualizado `,
      updatedProduct
    );
  } catch (error) {
    Response.error(res);
  }
};

async function getQueryParams(req) {
  let query = {};
  const { category, q, offert } = req.query;

  if (category) {
  }
  if (offert) query.offert = { $gt: 0 };

  if (q) query.name = { $regex: q, $options: "i" };

  console.log(query);
  return query;
}

function getQuerySort(req) {
  const { ordered, price } = req.query;
  let query = {};

  if (ordered) query.ordered = ordered;
  if (price) query.price = price;

  console.log(query);
  return query;
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
