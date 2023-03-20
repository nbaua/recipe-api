import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppLogger } from './app.logger';
import { AppModule } from './app.module';


async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  Logger.log('API Server Started At: http://localhost:' + port);
  await app.listen(port);
}

bootstrap();
