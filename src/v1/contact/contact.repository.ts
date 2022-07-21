import { EntityRepository, Repository } from 'typeorm';

/* entity */
import { Contact } from './contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  public async submitContact(dataset: Contact): Promise<void> {
    await this.createQueryBuilder('contact')
      .insert()
      .into(Contact)
      .values(dataset)
      .execute();
  }
}