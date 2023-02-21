const { Router } = require("express");
const productsCtrl = require("../controllers/products.controller");

const {
  verifyToken,
  canEdit,
  isAdmin,
  checkValidCategory,
  verifyExistingIngredents,
} = require("../middleware");

const adminRouter = Router();
const mobileRouter = Router();

adminRouter
  .get("/", productsCtrl.getProducts)
  .get("/:id", productsCtrl.getProduct)
  .post(
    "/",
    [verifyToken, canEdit, checkValidCategory, verifyExistingIngredents],
    productsCtrl.createProduct
  )
  .put(
    "/:id",
    [verifyToken, canEdit, checkValidCategory, verifyExistingIngredents],
    productsCtrl.updateProduct
  )
  .delete("/:id", [verifyToken, isAdmin], productsCtrl.deleteProduct);

mobileRouter
  .get("/ofert", productsCtrl.getProductsOfert)
  .get("/", productsCtrl.getProductsDTO)
  .get("/:id",productsCtrl.getProductDTO)

module.exports = {
  adminRouter,
  mobileRouter,
};
