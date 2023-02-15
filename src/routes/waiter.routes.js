const { Router } = require("express");
const waiterCtrl = require("../controllers/waiter.controller");
const {isAdmin,canEdit,verifyToken} = require('../middleware');

const router = Router();

router
  .get("/", waiterCtrl.getWaiters)
  .get("/:id", waiterCtrl.getWaiter)
  .post("/", [verifyToken,canEdit],waiterCtrl.createWaiter)
  .put("/:id", [verifyToken,canEdit],waiterCtrl.updateWaiter)
  .delete("/:id", [verifyToken,isAdmin],waiterCtrl.deleteWaiter);

module.exports = router;
