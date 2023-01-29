const { Router } = require("express");
const dashController = require("../controllers/dashboard.controller");

const router = Router();

router.get("/", dashController.getData);

module.exports = router;
