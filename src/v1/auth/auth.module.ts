import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* controller */
import { AuthController } from './auth.controller';

/* service */
import { AuthService } from './auth.service';

/* repo */
import { UserRepository, AccessLogRepository } from './auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, AccessLogRepository]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService]
})
export class AuthModule {}