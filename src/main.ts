import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseMorgan = require('mongoose-morgan');

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(
    mongooseMorgan(
      {
        connectionString: 'mongodb://localhost:27017/logs-db',
      },
      {},
      'tiny',
    ),
  );
  app.useGlobalPipes(new ValidationPipe());

  Logger.log('API Server Started At: http://localhost:' + port);
  await app.listen(port);
}
bootstrap();
