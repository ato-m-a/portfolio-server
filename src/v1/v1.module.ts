import { Module } from '@nestjs/common';

/* modules */
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    AuthModule,
    ContactModule
  ]
})
export class V1Module {}