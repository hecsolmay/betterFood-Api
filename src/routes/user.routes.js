const { Router } = require("express");
const userController = require("../controllers/users.controller");
const { isAdmin, checkRoleExisted, verifyToken } = require("../middleware");

const router = Router();

router
  .get("/", [verifyToken, isAdmin], userController.getUsers)
  .get("/:id", [verifyToken, isAdmin], userController.getUser)
  .put("/change/:id", [verifyToken, isAdmin], userController.updateUserRole)
  .put("/:id", userController.updateUser);

module.exports = router;
