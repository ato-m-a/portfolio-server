import { EntityRepository, Repository } from 'typeorm';

/* entity */
import { Contact } from './contact.entity';

/* dto */
import { ContactDto } from './contact.dto';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  public async submitContact(dataset: ContactDto): Promise<void> {
    await this.createQueryBuilder('contact')
      .insert()
      .into(Contact)
      .values(dataset)
      .execute();
  }
}