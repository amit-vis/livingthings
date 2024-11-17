const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/accessLog", require("./accesslog"));
router.use("/energy", require("./energy"));

module.exports = router;