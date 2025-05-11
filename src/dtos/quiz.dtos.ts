import { ObjectId } from 'mongoose';

class QuestionDto {
  question: string;

  selectedAnswer: string;

  correctAnswer: string;
}

export class QuizDTO {
  userId: ObjectId;
  questions: QuestionDto[];
  isCompleted: boolean;
  score: number;
  totalMarks: number;
}
