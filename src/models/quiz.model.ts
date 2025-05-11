import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  selectedAnswer: { type: String, required: false },
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [QuestionSchema],
    isCompleted: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    totalMarks: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export { QuizSchema };
