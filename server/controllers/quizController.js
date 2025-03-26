const Question = require("../models/Question");

const createQuiz = async (req, res) => {
  try {
    const { questionText, answerOptions } = req.body;

    if (!questionText || !answerOptions || !Array.isArray(answerOptions) || answerOptions.length === 0) {
      return res.status(400).json({ message: "Invalid question data" });
    }

    const newQuestion = new Question({
      questionText,
      answerOptions
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question has been added successfully!", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getQuizWithQuestions = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Question.find({
      answerOptions: {
        quizId: quizId,
      }
    });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createQuiz,
  getQuizWithQuestions
};