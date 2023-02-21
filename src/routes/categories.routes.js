const { Router } = require("express");
const categoryCtrl = require("../controllers/categories.controller");
const productCtrl = require("../controllers/products.controller");
const {
  canEdit,
  isAdmin,
  verifyToken,
  checkUniqueCategory,
} = require("../middleware");

const adminRouter = Router();
const mobileRouter = Router();

// WEB ADMIN  ---------------------------------
adminRouter.get("/", categoryCtrl.getCategories);

adminRouter.get("/:id", categoryCtrl.getCategory);

adminRouter.post(
  "/",
  [verifyToken, canEdit, checkUniqueCategory],
  categoryCtrl.createCategory
);

adminRouter.delete("/:id", [verifyToken, isAdmin], categoryCtrl.deleteCategory);

adminRouter.put("/:id", [verifyToken, canEdit], categoryCtrl.updateCategory);

// MOBILE ENDPOINTS  ---------------------------------
mobileRouter.get("/", categoryCtrl.getCategoriesMobile);

mobileRouter.get("/:id/products", productCtrl.getCategoryProducts);

module.exports = { adminRouter, mobileRouter };
