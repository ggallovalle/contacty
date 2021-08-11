import { CONTACT_REPOSITORY } from './contract.constats';
import { IContactsRepository } from './contacts.types';
import { ContactsService } from './contacts.service';
import { ProvidenciaNestjs } from '@contacty/providencia-nestjs';

export const contactsRepo = new ProvidenciaNestjs<IContactsRepository>(
  CONTACT_REPOSITORY
);

export const contactsSrv = new ProvidenciaNestjs<ContactsService>(
  ContactsService
);
