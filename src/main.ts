import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('mongoose-morgan');
morgan.token('request', function (req: any, _: any) {
  return JSON.stringify({
    url: req.url,
    params: req.params,
    method: req.method,
    httpVersion: req.httpVersion,
  });
});

morgan.token('response', function (_: any, res: any) {
  return JSON.stringify({
    statusCode: res.statusCode,
  });
});

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(
    morgan(
      {
        connectionString: `mongodb://localhost:27017/recipe-db`,
      },
      {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      },
      'Request: :request - Response: :response',
    ),
  );
  app.useGlobalPipes(new ValidationPipe());

  Logger.log('API Server Started At: http://localhost:' + port);
  await app.listen(port);
}
bootstrap();
