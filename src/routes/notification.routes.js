const { Router } = require("express");
const { existedTable, verifyWaiter } = require("../middleware");
const notificationCtrl = require("../controllers/notification.controller");

const router = Router();

router.post("/help", [existedTable, verifyWaiter], notificationCtrl.postHelp);

module.exports = router;
