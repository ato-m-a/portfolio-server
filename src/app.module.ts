import { Module, ValidationPipe, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { APP_PIPE } from '@nestjs/core';

/* module */
import { V1Module } from './v1/v1.module';

/* router config */
import { routes } from './router';

/* db config */
import ormconfig from '../ormconfig';

/* logger middleware */
import { LoggerMiddleware } from './logger/logger.middleware';

/* validator middleware */
import { AuthValidator } from './app.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    RouterModule.forRoutes(routes),
    V1Module,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    // validator
    consumer.apply(AuthValidator)
    .exclude(
      { path: '/api/v1/auth', method: RequestMethod.GET },
      { path: '/api/v1/auth/signin', method: RequestMethod.POST },
      { path: '/api/v1/auth/signup', method: RequestMethod.POST },
      { path: '/api/v1/auth/signout', method: RequestMethod.DELETE },
      { path: '/api/v1/auth/update/password', method: RequestMethod.POST },
      { path: '/api/v1/auth/sudo', method: RequestMethod.POST },
      { path: '/api/v1/auth/signin/sudo', method: RequestMethod.POST }
    )
    .forRoutes('/api/v1/*')
    // logger
    consumer.apply(LoggerMiddleware).forRoutes('/api/v1/*');
  }
}