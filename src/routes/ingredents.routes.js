const { Router } = require("express");
const ingredentsCtrl = require("../controllers/ingredent.controller");
const {isAdmin,canEdit,verifyToken} = require('../middleware');

const router = Router();

router
  .get("/", ingredentsCtrl.getIngredents)
  .get("/:id", ingredentsCtrl.getIngredent)
  .post("/", [verifyToken,canEdit],ingredentsCtrl.createIngredent)
  .put("/:id", [verifyToken,canEdit],ingredentsCtrl.updateIngredent)
  .delete("/:id", [verifyToken,isAdmin],ingredentsCtrl.deleteIngredent);

module.exports = router;
