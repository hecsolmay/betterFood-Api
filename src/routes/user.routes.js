const { Router } = require("express");
const userController = require("../controllers/users.controller");
const { isAdmin, checkRoleExisted, verifyToken } = require("../middleware");

const router = Router();

router.get("/", [verifyToken, isAdmin], userController.getUsers);
router.get("/:id", [verifyToken, isAdmin], userController.getUser);
router.put("/:id", userController.updateUser);
router.put(
  "/change/:id",
  [verifyToken, isAdmin],
  userController.updateUserRole
);

module.exports = router;
