import { Module } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { prismaSrv } from '../../shared/shared.providers';
import { contactsRepo, contactsSrv } from './contacts.providers';

@Module({
  providers: [
    // NOTE: the class provider doesn't work without an @Injectable decorator
    //  on top of the class itself, which makes it more framework dependant
    // contactsRepo.class(ContactsRepository), // doesn't work currently
    // contactsRepo.factory(ContactsRepository.create, [prismaSrv]), // manual factory
    contactsRepo.autoFactory(ContactsRepository, [prismaSrv]),
    // contactsSrv.factory(ContactsService.create, [contactsRepo]), // manual factory
    contactsSrv.autoFactory(ContactsService, [contactsRepo]),
    // contactsSrv.autoFactory(ContactsService, [prismaSrv]), // compile time error
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
