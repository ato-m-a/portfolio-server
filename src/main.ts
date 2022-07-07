import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import helmet from 'helmet';

/* setup swagger */
import setupSwagger from '../util/swagger';

/* root module */
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  
  app.enableCors({
    origin: ['http://localhost:3000', 'https://xn--s55bw1vqg.com'],
    preflightContinue: false,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'X-Auth-Token'],
    optionsSuccessStatus: 200
  });

  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      store: new (require('connect-pg-simple')(session)) ({
        conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
      }),
      cookie: {
        maxAge: 86400000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: process.env.NODE_ENV === 'production'
      }
    })
  );

  app.use(
    urlencoded({
      limit: '50mb',
      parameterLimit: 100000,
      extended: true
    }),
    json({
      limit: '50mb'
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  setupSwagger(app);

  await app.listen(8000, '0.0.0.0');
}
bootstrap();
