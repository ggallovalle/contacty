import { Module } from '@nestjs/common';
import { contactsRepository } from './contacts.providers';
import { ContactsRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';

@Module({
  providers: [contactsRepository.class(ContactsRepository), ContactsService],
})
export class ContactsModule {}
