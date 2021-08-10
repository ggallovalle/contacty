import { Module } from '@nestjs/common';
import { providers } from './contacts.providers';
import { ContactsRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from '../../shared/prisma.service';

@Module({
  providers: [
    providers.repository.factory(ContactsRepository.create, [PrismaService]),
    // NOTE: the class provider doesn't work without an @Injectable decorator
    //  on top of the class itself, which makes it more framework dependant
    // providers.repository.class(ContactsRepository),
    providers.service.factory(ContactsService.create, [
      providers.repository.token,
    ]),
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
