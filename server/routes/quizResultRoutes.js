const express = require("express");
const { saveQuizResult, getAllResults, getUserResults, determineSkinType } = require("../controllers/quizResultController");

const router = express.Router();

router.post("/", saveQuizResult);
router.get("/", getAllResults);
router.get("/:userId", getUserResults);
router.get("/determine-skin-type", determineSkinType);

module.exports = router;
