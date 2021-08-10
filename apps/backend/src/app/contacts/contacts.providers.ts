import { makeProvider } from '../../utils/provider.utils';
import { CONTACT_REPOSITORY } from './contract.constats';
import { IContactsRepository } from './contacts.types';
import { ContactsService } from './contacts.service';

export const providers = {
  repository: makeProvider<IContactsRepository>(CONTACT_REPOSITORY),
  service: makeProvider<ContactsService>(ContactsService),
};
