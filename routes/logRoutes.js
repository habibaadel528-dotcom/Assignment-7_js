const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

router.post("/", logController.insertLog);

module.exports = router;
