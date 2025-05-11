import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandler } from './comman/filters/exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const port: number = configService.get('PORT') || 8080;
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}
bootstrap();
