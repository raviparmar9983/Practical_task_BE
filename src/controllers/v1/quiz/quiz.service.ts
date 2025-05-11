import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelKey } from 'src/constants/model.contants';
import { QuizDTO } from 'src/dtos/quiz.dtos';
import { Model } from 'mongoose';
import { messageKey } from 'src/constants/message.constants';
import { BaseListQueryParamDTO } from 'src/dtos/comman.dtos';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(modelKey.quiz) private readonly quizModel: Model<QuizDTO>,
  ) {}

  async addQuizeData(quizData: QuizDTO) {
    try {
      const score = quizData.questions.reduce((total, question) => {
        return question.selectedAnswer === question.correctAnswer
          ? total + 1
          : total;
      }, 0);
      quizData.score = score;
      if (!quizData.totalMarks) {
        quizData.totalMarks = quizData.questions.length;
      }
      const game = await this.quizModel.create(quizData);
      return {
        status: true,
        message: messageKey.recordCreatedSuccessfully,
        data: game,
      };
    } catch (error) {
      throw error;
    }
  }

  async getQuizeData(userId: string, queryParam: BaseListQueryParamDTO) {
    try {
      const pageNum =
        Number(queryParam.pageNum) > 0 ? Number(queryParam.pageNum) : 1;
      const pageLimit =
        Number(queryParam.pageLimit) > 0 ? Number(queryParam.pageLimit) : 10;
      const skip = (pageNum - 1) * pageLimit;

      const [quizList, totalCount] = await Promise.all([
        this.quizModel
          .find({ userId })
          .skip(skip)
          .limit(pageLimit)
          .sort({ timestamp: -1 }),
        this.quizModel.countDocuments({ userId }),
      ]);

      return {
        status: true,
        message: messageKey.requestCompleted,
        data: quizList,
        pagination: {
          pageNum,
          pageLimit,
          totalRecords: totalCount,
          totalPages: Math.ceil(totalCount / pageLimit),
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
