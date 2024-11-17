const express = require("express");
const router = express.Router();
const accessLogController = require("../controller/AccessLog_controller");
const { checkToken } = require("../config/auth");

router.post("/create-log", checkToken, accessLogController.createLog);
router.get("/get-log", checkToken, accessLogController.getLog);

module.exports = router;