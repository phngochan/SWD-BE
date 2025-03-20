const Question = require("../models/Question");

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Add a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               answerOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Question has been added successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */
const addQuestion = async (req, res) => {
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
};

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *               answerOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Question has been updated successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question is not found
 */

const updateQuestion = async (req, res) => {
    try {
        const { questionText, answerOptions } = req.body;
        const { id } = req.params;

        if (!questionText || !answerOptions || !Array.isArray(answerOptions)) {
            return res.status(400).json({ message: "Invalid question data" });
        }

        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { questionText, answerOptions },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question is not found" });
        }

        res.json({ message: "Question has been updated successfully!", question: updatedQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question is not found" });
        }

        res.json({ message: "Question has been deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion
};
