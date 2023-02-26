const { Router } = require("express");
const tableCtrl = require("../controllers/table.controller");
const {
  canEdit,
  verifyToken,
  isAdmin,
  uniqueTable,
  verifyWaiter,
} = require("../middleware");

const router = Router();
const routerMobile = Router();

router
  .get("/", tableCtrl.getTables)
  .get("/qr", tableCtrl.getTablesQr)
  .get("/all/qr", tableCtrl.getAllQr)
  .get("/:id", tableCtrl.getTable)
  .get("/:id/qr", tableCtrl.getTableQrId)
  .post("/", [verifyToken, canEdit, uniqueTable], tableCtrl.createTable)
  .put("/:id", [verifyToken, canEdit, uniqueTable], tableCtrl.updateTable)
  .delete("/:id", [verifyToken, isAdmin], tableCtrl.deleteTable);

routerMobile.get("/:id", tableCtrl.getTableDto);

module.exports = { AdminRoute: router, MobileRoute: routerMobile };
