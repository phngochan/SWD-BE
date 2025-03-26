const express = require("express");
const { getAllQuestions, addQuestion, updateQuestion, deleteQuestion} = require("../controllers/questionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

//Public route: Get all questions
router.get("/", getAllQuestions); // Removed authenticate middleware

//Protected routes: Only Manager can create, update, and delete questions
router.post("/",  authenticate, authorize(["Manager"]), addQuestion);

router.put("/:id",  authenticate, authorize(["Manager"]), updateQuestion);

router.delete("/:id",  authenticate, authorize(["Manager"]), deleteQuestion);

module.exports = router;
