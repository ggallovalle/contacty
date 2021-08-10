import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import * as faker from 'faker';

@Injectable()
export class ContactsSeeder {
  data: any[] = [];

  constructor(private readonly _prisma: PrismaService) {}

  async seed(usersIds: number[], qty: number = 10) {
    const data = Array.from({ length: qty }).map(() => ({
      name: faker.name.firstName(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      address: faker.fake('{{address.city}} {{address.country}}'),
      userId: usersIds[Math.floor(Math.random() * usersIds.length)],
    }));
    await this._prisma.contact.createMany({
      data,
    });
    this.data = await this._prisma.contact.findMany({
      take: qty,
    });
  }

  async down() {
    return this._prisma.contact.deleteMany();
  }
}
