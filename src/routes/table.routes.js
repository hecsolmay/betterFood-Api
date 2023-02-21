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

router
  .get("/", tableCtrl.getTables)
  .get("/:id", tableCtrl.getTable)
  .post("/", [verifyToken, canEdit, uniqueTable], tableCtrl.createTable)
  .put(
    "/:id",
    [verifyToken, canEdit, uniqueTable, verifyWaiter],
    tableCtrl.updateTable
  )
  .delete("/:id", [verifyToken, isAdmin], tableCtrl.deleteTable);

module.exports = router;
