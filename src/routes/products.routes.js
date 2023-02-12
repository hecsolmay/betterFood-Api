const { Router } = require("express");
const productsController = require("../controllers/products.controller");

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

const {
  verifyToken,
  canEdit,
  isAdmin,
  checkValidCategory,
} = require("../middleware");

const router = Router();

router
  .get("/", productsController.getProducts)
  .get("/:id", productsController.getProduct)
  .post(
    "/",
    [verifyToken, canEdit, checkValidCategory],
    productsController.createProduct
  )
  .put(
    "/:id",
    [verifyToken, canEdit, checkValidCategory],
    productsController.updateProduct
  )
  .delete("/:id", [verifyToken, isAdmin], productsController.deleteProduct);

module.exports = router;
