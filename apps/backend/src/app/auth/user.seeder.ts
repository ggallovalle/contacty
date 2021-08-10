import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import * as faker from 'faker';

@Injectable()
export class UserSeeder {
  data: any[] = [];

  constructor(private readonly _prisma: PrismaService) {}

  async seed(qty: number = 10) {
    const data = Array.from({ length: qty }).map(() => ({
      username: faker.name.firstName(),
      password: faker.internet.password(),
    }));
    await this._prisma.user.createMany({
      data,
    });
    this.data = await this._prisma.user.findMany({
      take: qty,
    });
  }

  async down() {
    return this._prisma.user.deleteMany();
  }
}
