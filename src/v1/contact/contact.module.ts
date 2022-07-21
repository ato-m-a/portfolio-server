import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* controller */
import { ContactController } from './contact.controller';

/* service */
import { ContactService } from './contact.service';

/* repo */
import { ContactRepository } from './contact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactRepository])
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService]
})
export class ContactModule {}