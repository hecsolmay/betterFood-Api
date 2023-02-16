const { Router } = require("express");
const productsController = require("../controllers/products.controller");

const {
  verifyToken,
  canEdit,
  isAdmin,
  checkValidCategory,verifyExistingIngredents
} = require("../middleware");

const router = Router();

router
  .get("/", productsController.getProducts)
  .get("/:id", productsController.getProduct)
  .post(
    "/",
    [verifyToken, canEdit, checkValidCategory,verifyExistingIngredents],
    productsController.createProduct
  )
  .put(
    "/:id",
    [verifyToken, canEdit, checkValidCategory,verifyExistingIngredents],
    productsController.updateProduct
  )
  .delete("/:id", [verifyToken, isAdmin], productsController.deleteProduct);

module.exports = router;
