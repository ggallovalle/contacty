import { Inject, Injectable } from '@nestjs/common';
import { Contact, CreateContact, IContactsRepository } from './contacts.types';
import { AuthAware } from '../types/auth';
import { CONTACT_REPOSITORY } from './contract.constats';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly _repo: IContactsRepository
  ) {}

  create(data: CreateContact, auth: AuthAware): Promise<Contact> {
    return this._repo.create(data, auth);
  }

  findById(id: number, auth: AuthAware): Promise<Contact> {
    return this._repo.findById(id, auth);
  }

  findAll(auth: AuthAware): Promise<Contact[]> {
    return this._repo.findAll(auth);
  }

  deleteById(id: number): Promise<{ id: number }> {
    return this._repo.deleteById(id);
  }

  updateById(id: number, data: Partial<Contact>) {
    return this._repo.updateById(id, data);
  }
}
