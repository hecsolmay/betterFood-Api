const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const {
  verifyToken,
  canEdit,
  verifyStatusDeleteOrder,
  canSale,
  existedTable,
  verifyWaiter,
  verifyOrderStatus,
} = require("../middleware");

const router = Router();

router
  .get("/", [verifyToken, canSale], orderController.getOrders)
  .get("/:id", [verifyToken, canSale], orderController.getOrder)
  .put("/:id", verifyOrderStatus, orderController.updateOrder)
  .post("/", [existedTable, verifyWaiter], orderController.postOrder);

module.exports = router;
