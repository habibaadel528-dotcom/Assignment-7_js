const express = require("express");
const router = express.Router();
const logController = require("./logs.controller");

router.post("/", logController.insertLog);

module.exports = router;
