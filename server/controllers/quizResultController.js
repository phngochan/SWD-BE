const QuizResult = require('../models/QuizResult');

const determineSkinType = (answers) => {
  const totalWeight = answers.reduce((sum, answer) => sum + (answer.weight || 0), 0);
  const minWeight = answers.length * 1; // 17 (if all answers are the lowest weight)
  const maxWeight = answers.length * 4; // 68 (if all answers are the highest weight)
  
  const range = maxWeight - minWeight;
  const normalizedScore = ((totalWeight - minWeight) / range) * 100;

  if (normalizedScore <= 25) return "Dry Skin";
  if (normalizedScore <= 50) return "Combination Skin";
  if (normalizedScore <= 75) return "Normal Skin";
  return "Oily Skin";
};

//Save
const saveQuizResult = async (req, res) => {
  try {
      const { userId, answers } = req.body;

      if (!answers || answers.length === 0) {
          return res.status(400).json({ message: "Answers are required." });
      }

      const skinType = determineSkinType(answers);

      if (!userId) {
          return res.status(200).json({ 
              message: "Quiz completed as guest.",
              quizResult: { skinType, answers } 
          });
      }

      const newQuizResult = new QuizResult({
          userId,
          answers,
          skinType
      });

      await newQuizResult.save();
      res.status(201).json({ message: "Quiz result saved successfully!", quizResult: newQuizResult });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getAllResults = async (req, res) => {
  try {
      const results = await QuizResult.find().populate("userId", "name email");
      res.json(results);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getUserResults = async (req, res) => {
  try {
      const { userId } = req.params;
      const results = await QuizResult.find({ userId });

      if (!results || results.length === 0) {
          return res.status(404).json({ message: "No quiz results found for this user." });
      }

      res.json(results);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveQuizResult,
  getAllResults,
  getUserResults,
  determineSkinType,
};