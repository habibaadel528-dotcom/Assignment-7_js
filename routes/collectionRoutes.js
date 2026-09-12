const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
router.post("/books", collectionController.createBooksCollection);
router.post("/authors", collectionController.createAuthorsCollection);
router.post("/logs/capped", collectionController.createCappedLogs);
router.post("/books/index", collectionController.createBooksIndex);

module.exports = router;
