const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizResultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
