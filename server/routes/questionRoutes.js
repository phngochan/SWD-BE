const express = require("express");
const { getAllQuestions, addQuestion, updateQuestion, deleteQuestion} = require("../controllers/questionController");

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", addQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
