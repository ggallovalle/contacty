import { Module } from '@nestjs/common';
import { contactsRepository } from './contacts.providers';
import { ContactsRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';

@Module({
  providers: [contactsRepository.class(ContactsRepository), ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
