const { Router } = require("express");
const categoryControllers = require("../controllers/categories.controller");
const {
  canEdit,
  isAdmin,
  verifyToken,
  checkUniqueCategory,
} = require("../middleware");

const router = Router();

/**
 *
 */
router.get("/", categoryControllers.getCategories);
router.get("/:id", categoryControllers.getCategory);

router.post(
  "/",
  [verifyToken, canEdit, checkUniqueCategory],
  categoryControllers.createCategory
);

router.delete(
  "/:id",
  [verifyToken, isAdmin],
  categoryControllers.deleteCategory
);

router.put("/:id", [verifyToken, canEdit], categoryControllers.updateCategory);

module.exports = router;
