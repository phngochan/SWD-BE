const express = require('express');
const { createQuiz, getQuizWithQuestions } = require('../controllers/quizController');
const router = express.Router();

router.post('/', createQuiz); // Create a new quiz
router.get('/', getQuizWithQuestions); // Allow fetching all questions without requiring authentication

module.exports = router;

