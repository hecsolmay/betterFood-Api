const { Router } = require("express");
const userController = require("../controllers/users.controller");
const { isAdmin, checkRoleExisted, verifyToken } = require("../middleware");

const router = Router();

router
  .get("/", [verifyToken, isAdmin], userController.getUsers)
  .get("/:id", [verifyToken, isAdmin], userController.getUser)
  .put(
    "/:id",
    [verifyToken, isAdmin, checkRoleExisted],
    userController.updateUserRole
  );

module.exports = router;
