import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from 'src/comman/guards/auth.guard';
import { QuizDTO } from 'src/dtos/quiz.dtos';
import { handleError } from 'src/utils/handleError';
import { Response, Request } from 'express';
import { BaseListQueryParamDTO } from 'src/dtos/comman.dtos';
@Controller('v1/quiz')
@UseGuards(AuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('')
  async addQuizeData(
    @Body() quizData: QuizDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req.body?.jwtTokendata?._id;
      const game = await this.quizService.addQuizeData({ ...quizData, userId });
      res.status(HttpStatus.CREATED).json(game);
    } catch (error) {
      await handleError(res, error);
    }
  }

  @Get('')
  async getGameData(
    @Query() queryParam: BaseListQueryParamDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req.body?.jwtTokendata?._id;
      const games = await this.quizService.getQuizeData(userId, queryParam);
      res.status(HttpStatus.OK).json(games);
    } catch (error) {
      await handleError(res, error);
    }
  }
}
