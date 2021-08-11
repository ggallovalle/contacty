import {
  ClassProvider as NestClassProvider,
  FactoryProvider as NestFactoryProvider,
  Module,
} from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from '../../shared/prisma.service';
import { IContactsRepository } from './contacts.types';
import { CONTACT_REPOSITORY } from './contract.constats';

const prismaService = new Providencia(PrismaService);
const contactsRepository = new Providencia<IContactsRepository>(
  CONTACT_REPOSITORY
);
const userService = new Providencia(ContactsService);

@Module({
  providers: [
    // providers.repository.factory(ContactsRepository.create, [PrismaService]), // old
    // NOTE: the class provider doesn't work without an @Injectable decorator
    //  on top of the class itself, which makes it more framework dependant
    // providers.repository.class(ContactsRepository),
    // providers.service.factory(ContactsService.create, [ //old
    //   providers.repository.token,                      // old
    // ]),                                                // old
    contactsRepository.factory(ContactsRepository.create, [prismaService]),
    userService.factory(ContactsService.create, [contactsRepository]),
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
