const Product = require("../models/Product");
const Response = require("../common/response");
const createHttpError = require("http-errors");
const paginate = require("../common/paginate");
const { apiURL } = require("../config/config");
const PascalCase = require("../libs/pascalCase");

const path = `${apiURL}/product`;

const populateOptions = [
  {
    path: "categories",
    match: { active: 1 },
    select: { _id: 1, name: 1 },
  },
  {
    path: "ingredents.id",
    match: { active: 1 },
    select: { _id: 1, name: 1 },
  },
];

const getProducts = async (req, res) => {
  try {
    let { limit, page } = paginate.getQuery(req);
    const query = getQueryParams(req);
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
    const info = paginate.info(products, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = products;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    let { limit, page } = paginate.getQuery(req);
    const selectDTO = {
      name: 1,
      imgURL: 1,
      price: 1,
      description: 1,
      _id: 1,
      ofert: 1,
      ofertPrice: 1,
    };
    const sort = { name: 1 };
    const query = { active: 1, categories: id };

    const products = await Product.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
        sort,
        select: selectDTO,
      })
    );
    const info = paginate.info(products, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = products;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};
const getProductsDTO = async (req, res) => {
  try {
    let query = getQueryParams(req);
    let { limit, page } = paginate.getQuery(req);
    const populate = [
      {
        path: "ingredents.id",
        match: { active: 1 },
        select: { _id: 1, name: 1 },
      },
    ];
    const selectDTO = {
      ordered: 0,
      active: 0,
      createdAt: 0,
      updatedAt: 0,
      categories: 0,
    };
    // const selectDTO = {
    //   name: 1,
    //   imgURL: 1,
    //   price: 1,
    //   description: 1,
    //   _id: 1,
    //   ofert: 1,
    //   ofertPrice: 1,
    // };
    const sort = { name: 1 };
    query = { ...query, active: 1 };

    const products = await Product.paginate(
      query,
      paginate.getOptions({
        populate,
        limit,
        page,
        sort,
        select: selectDTO,
      })
    );
    const info = paginate.info(products, path);

    if (page > info.totalPages)
      return res.status(404).json({ error: "there is nothing here" });

    const { results } = products;
    paginate.success(res, 200, "ok", info, results);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getProductDTO = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate(populateOptions)
      .select({ ordered: 0, active: 0, createdAt: 0, updatedAt: 0 });

    if (!product) return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Producto ${id}`, product);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const getProductsOfert = async (req, res) => {
  try {
    let query = getQueryParams(req);
    let { limit, page } = paginate.getQuery(req);
    const selectDTO = {
      name: 1,
      imgURL: 1,
      price: 1,
      description: 1,
      _id: 1,
      ofert: 1,
      ofertPrice: 1,
    };
    const sort = { name: 1 };
    query = { active: 1, ofert: { $gt: 0 } };

    const products = await Product.paginate(
      query,
      paginate.getOptions({
        limit,
        page,
        sort,
        select: selectDTO,
      })
    );
    const info = paginate.info(products, path);

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
    const product = await Product.findById(id).populate(populateOptions);

    if (!product) return Response.error(res, createHttpError.NotFound());

    Response.succes(res, 200, `Producto ${id}`, product);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const createProduct = async (req, res) => {
  const { name, imgURL, price, description, categories, ingredents } = req.body;
  try {
    const newProduct = new Product({
      name: PascalCase(name),
      imgURL,
      price,
      ingredents,
      categories,
      description,
    });

    const savedProduct = await newProduct.save();
    const product = await Product.findById(savedProduct._id).populate(
      populateOptions
    );
    Response.succes(res, 201, "Producto Creado Con exito", product);
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res
        .status(400)
        .json({ message: "No se pudo encontrar el producto" });

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    Response.error(res);
  }
};

const updateProduct = async (req, res) => {
  const { imgURL, price, description, categories, ingredents, active } =
    req.body;
  try {
    const { id } = req.params;
    let { ofert } = req.body;
    let { name } = req.body;

    if (name) name = PascalCase(name);

    if (ofert < 0 || ofert > 100) ofert = 0;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          imgURL,
          price,
          description,
          categories,
          ingredents,
          active,
          ofert,
        },
      },
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(400)
        .json({ message: "No se pudo encontrar el producto" });

    return res.status(204).json();
  } catch (error) {
    Response.error(res);
  }
};

function getQueryParams(req) {
  let query = {};
  const { q } = req.query;

  if (q) query.name = { $regex: q, $options: "i" };

  return query;
}

function getQuerySort(req) {
  const { ordered, price } = req.query;
  let query = {};

  if (ordered) query.ordered = ordered;
  if (price) query.price = price;

  if (Object.entries(query).length === 0) query.name = 1;
  return query;
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getCategoryProducts,
  getProductsOfert,
  getProductsDTO,
  getProductDTO,
};
