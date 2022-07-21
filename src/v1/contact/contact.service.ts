import { Injectable } from '@nestjs/common';

/* repo */
import { ContactRepository } from './contact.repository';

/* entity */
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(private ContactRepository: ContactRepository) {}

  public async submitContact(dataset: Contact): Promise<void> {
    await this.ContactRepository.submitContact(dataset);
  }
}