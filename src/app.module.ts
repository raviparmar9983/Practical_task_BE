import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBModule, Modules } from './modules';
import { FileModule } from './controllers/v1/file/file.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { QuizModule } from './controllers/v1/quiz/quiz.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    DBModule,
    Modules,
    FileModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
