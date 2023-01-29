const { Router } = require("express");
const salesController = require("../controllers/sales.controller");
const { verifyToken, canSale, verifyUpdateSale } = require("../middleware");

const router = Router();

router
  .get("/", [verifyToken, canSale], salesController.getSales)
  .get("/:id", [verifyToken, canSale], salesController.getSale)
  .put(
    "/:id",
    [verifyToken, canSale, verifyUpdateSale],
    salesController.updateSale
  );

module.exports = router;
