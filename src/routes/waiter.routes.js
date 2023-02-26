const { Router } = require("express");
const waiterCtrl = require("../controllers/waiter.controller");
const { isAdmin, canEdit, verifyToken } = require("../middleware");

const router = Router();
const routerMobile = Router();

router
  .get("/", waiterCtrl.getWaiters)
  .get("/qr", waiterCtrl.getWaitersQr)
  .get("/all/qr", waiterCtrl.getAllQr)
  .get("/:id", waiterCtrl.getWaiter)
  .get("/:id/qr", waiterCtrl.getWaiterQrId)
  .post("/", [verifyToken, canEdit], waiterCtrl.createWaiter)
  .put("/:id", [verifyToken, canEdit], waiterCtrl.updateWaiter)
  .delete("/:id", [verifyToken, isAdmin], waiterCtrl.deleteWaiter);

routerMobile.get("/:id", waiterCtrl.getWaiterDto);

module.exports = { adminRouter: router, mobileRouter: routerMobile };
