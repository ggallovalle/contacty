import { ProvidenciaNestjs } from '@contacty/providencia-nestjs';
import { UserSeeder } from './user.seeder';
import { ContactsSeeder } from './contacts.seeder';

export const userSeeder = new ProvidenciaNestjs<UserSeeder>(UserSeeder);
export const contactsSeeder = new ProvidenciaNestjs<ContactsSeeder>(
  ContactsSeeder
);
