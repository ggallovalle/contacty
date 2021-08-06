import { AuthAware } from '../types/auth';

export type Contact = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
};

export type CreateContact = {
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
};

export interface IContactsRepository {
  create(data: CreateContact, auth: AuthAware): Promise<{ id: number }>;

  findById(id: number, auth: AuthAware): Promise<Contact>;

  findAll(auth: AuthAware): Promise<Contact[]>;

  deleteById(id: number, auth: AuthAware): Promise<void>;

  updateById(
    id: number,
    data: Partial<Contact>,
    auth: AuthAware
  ): Promise<{ id: number }>;
}
