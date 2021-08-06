import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { AuthAware } from '../types/auth';
import { CreateContact, IContactsRepository } from './contacts.types';

@Injectable()
export class ContactsRepository implements IContactsRepository {
  constructor(private readonly _db: PrismaService) {}

  create(data: CreateContact, auth: AuthAware) {
    return this._db.contact.create({
      select: ContactsRepository._selectFields(),
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

  findById(id: number, auth: AuthAware) {
    return this._db.contact.findFirst({
      where: {
        userId: auth.userId,
        id,
      },
      select: ContactsRepository._selectFields(),
    });
  }

  findAll(auth: AuthAware) {
    return this._db.contact.findMany({
      where: {
        userId: auth.userId,
      },
      select: ContactsRepository._selectFields(),
    });
  }

  deleteById(id: number) {
    return this._db.contact.delete({
      where: {
        id,
      },
    });
  }

  updateById(
    id: number,
    data: Partial<{
      name: string;
      phoneNumber: string;
      email: string;
      address: string;
    }>
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
