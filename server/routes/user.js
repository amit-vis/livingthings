const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const { checkToken } = require("../config/auth");

router.post("/create", userController.register);
router.post("/signin", userController.signin);

module.exports = router;