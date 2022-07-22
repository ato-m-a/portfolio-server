import { Injectable } from '@nestjs/common';

/* repo */
import { ContactRepository } from './contact.repository';

/* entity */
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(private ContactRepository: ContactRepository) {}

  public async submitContact(dataset: ContactDto): Promise<void> {
    await this.ContactRepository.submitContact(dataset);
  }
}