import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { AuthAware } from '../types/auth';
import { CreateContact, IContactsRepository } from './contacts.types';

@Injectable()
export class ContactsRepository implements IContactsRepository {
  constructor(private readonly _db: PrismaService) {}

  async create(data: CreateContact, auth: AuthAware) {
    return this._db.contact.create({
      select: { id: true },
      data: {
        userId: auth.userId,
        email: data.email,
        address: data.address,
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  private static _selectFields() {
    return {
      name: true,
      address: true,
      email: true,
      phoneNumber: true,
    };
  }

  async findById(id: number, auth: AuthAware) {
    return this._db.contact.findFirst({
      where: {
        userId: auth.userId,
        id,
      },
      select: ContactsRepository._selectFields(),
    });
  }

  async findAll(auth: AuthAware) {
    return this._db.contact.findMany({
      where: {
        userId: auth.userId,
      },
      select: ContactsRepository._selectFields(),
    });
  }

  async deleteById(id: number, auth: AuthAware) {
    await this._db.contact.deleteMany({
      where: {
        id,
        userId: auth.userId,
      },
    });
  }

  async updateById(
    id: number,
    data: Partial<{
      name: string;
      phoneNumber: string;
      email: string;
      address: string;
    }>,
    auth: AuthAware
  ) {
    // NOTE is better to be explicit when updating because of the dynamic nature,
    //  of javascript and the possible use of "any" at the consumer side
    return this._db.contact.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        email: data.email,
      },
    });
  }
}
