const { Router } = require("express");
const salesController = require("../controllers/sales.controller");
const { verifyToken, canSale, verifyUpdateSale } = require("../middleware");

const router = Router();
const Mobilerouter = Router();

Mobilerouter.get("/", salesController.getSalesMobile);

router
  .get("/", salesController.getSales)
  .get("/reports", [verifyToken, canSale], salesController.getReports)
  .get("/:id", salesController.getSale)
  .delete("/:id", [verifyUpdateSale], salesController.deleteSale)
  .put("/:id", [verifyUpdateSale], salesController.updateSale);

module.exports = { router, Mobilerouter };
