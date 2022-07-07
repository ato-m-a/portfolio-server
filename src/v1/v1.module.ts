import { Module } from '@nestjs/common';

/* modules */
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule
  ]
})
export class V1Module {}