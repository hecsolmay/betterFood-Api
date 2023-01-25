const { Router } = require("express");
const productsController = require("../controllers/products.controller");
const { verifyToken, canEdit, isAdmin } = require("../middleware");

const router = Router();

// canEdit = [verifyToken, canEdit]

// TODO: get Es la ruta de prueba middlewares

router
  .get("/", [verifyToken, isAdmin], productsController.getProducts)
  .get("/:id", productsController.getProduct)
  .post("/", [verifyToken], productsController.createProduct)
  .put("/:id", productsController.updateProduct)
  .delete("/:id", productsController.deleteProduct);

module.exports = router;
