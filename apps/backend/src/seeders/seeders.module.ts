import { Module } from '@nestjs/common';
import { contactsSeeder, userSeeder } from './seeders.providers';
import { UserSeeder } from './user.seeder';
import { prismaSrv } from '../shared/shared.providers';
import { ContactsSeeder } from './contacts.seeder';

@Module({
  providers: [
    userSeeder.autoFactory(UserSeeder, [prismaSrv]),
    contactsSeeder.autoFactory(ContactsSeeder, [prismaSrv]),
  ],
  exports: [userSeeder.token, contactsSeeder.token],
})
export class SeedersModule {}
