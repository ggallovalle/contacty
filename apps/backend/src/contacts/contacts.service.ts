import { Inject, Injectable } from '@nestjs/common';
import { Contact, CreateContact, IContactsRepository } from './contacts.types';
import { AuthAware } from '../types/auth';
import { CONTACT_REPOSITORY } from './contract.constats';
import { NotFoundError, ValidationError } from '../errors';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly _repo: IContactsRepository
  ) {}

  async create(data: CreateContact, auth: AuthAware): Promise<{ id: number }> {
    if (!data.name) {
      throw new ValidationError();
    }
    return this._repo.create(data, auth);
  }

  async findById(id: number, auth: AuthAware): Promise<Contact> {
    const res = await this._repo.findById(id, auth);
    if (!res) {
      throw new NotFoundError();
    }
    return res;
  }

  findAll(auth: AuthAware): Promise<Contact[]> {
    return this._repo.findAll(auth);
  }

  async deleteById(id: number, auth: AuthAware): Promise<{ id: number }> {
    await this._repo.deleteById(id, auth);
    return { id };
  }

  updateById(id: number, data: Partial<Contact>, auth: AuthAware) {
    return this._repo.updateById(id, data, auth);
  }
}
