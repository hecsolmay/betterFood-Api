const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const {
  verifyToken,
  canEdit,
  verifyStatusDeleteOrder,
  canSale,
  existedTable,
  verifyWaiter,
} = require("../middleware");

const router = Router();

router
  .get("/", [verifyToken, canSale], orderController.getOrders)
  .get("/:id", [verifyToken, canSale], orderController.getOrder)
  .post("/", [existedTable, verifyWaiter], orderController.postOrder)
  .delete(
    "/:id",
    [verifyToken, canEdit, verifyStatusDeleteOrder],
    orderController.deleteOrder
  );

module.exports = router;
