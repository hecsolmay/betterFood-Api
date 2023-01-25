const { Router } = require("express");
const orderController = require("../controllers/order.controller");

const router = Router();

router
  .get("/", orderController.getOrders)
  .get("/:id", orderController.getOrder)
  .post("/", orderController.postOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

module.exports = router;
