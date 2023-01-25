const { Router } = require("express");
const categoryControllers = require("../controllers/categories.controller");
const { canEdit, isAdmin, verifyToken } = require("../middleware");

const router = Router();

[];
router
  .get("/", categoryControllers.getCategories)
  .get("/:id", categoryControllers.getCategory)
  .post("/", [verifyToken, canEdit], categoryControllers.createCategory)
  .delete("/:id", [verifyToken, isAdmin], categoryControllers.deleteCategory)
  .put("/:id", [verifyToken, canEdit], categoryControllers.updateCategory);

module.exports = router;
