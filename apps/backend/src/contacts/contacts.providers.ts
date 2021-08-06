import { classProvider } from '../utils/provider';
import { CONTACT_REPOSITORY } from './contract.constats';
import { IContactsRepository } from './contacts.types';

export const contactsRepository = {
  class: classProvider<IContactsRepository>(CONTACT_REPOSITORY),
};
