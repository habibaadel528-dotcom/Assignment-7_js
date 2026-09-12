const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/title", bookController.findByTitle);
router.get("/year-integer", bookController.findYearInteger);
router.get("/year", bookController.findByYearRange);
router.get("/genre", bookController.findByGenre);
router.get("/skip-limit", bookController.skipLimit);
router.get("/exclude-genres", bookController.excludeGenres);
router.get("/aggregate1", bookController.aggregate1);
router.get("/aggregate2", bookController.aggregate2);
router.get("/aggregate3", bookController.aggregate3);
router.get("/aggregate4", bookController.aggregate4);
router.delete("/before-year", bookController.deleteBeforeYear);
router.post("/batch", bookController.insertBatch);
router.post("/", bookController.insertOne);
router.patch("/:title", bookController.updateYearByTitle);
module.exports = router;
