import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modelKey } from 'src/constants/model.contants';
import { QuizSchema } from 'src/models/quiz.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelKey.quiz, schema: QuizSchema }]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
