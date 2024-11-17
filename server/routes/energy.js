const express = require("express");
const router = express.Router();
const energyController = require("../controller/energy_controller");
const { checkToken } = require("../config/auth");

router.get("/get-energyData", checkToken, energyController.chartData);

module.exports = router;