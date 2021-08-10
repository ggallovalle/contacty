import * as request from 'supertest';
import * as faker from 'faker';
import { ContactsModule } from './contacts.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ContactsSeeder } from './contacts.seeder';
import { UserSeeder } from '../auth/user.seeder';
import { PrismaService } from '../../shared/prisma.service';

describe('Contacts', () => {
  let app: INestApplication;
  let seeder: PrismaService;
  let users: any[];
  let contacts: any[];
  let currentUser: any;
  let currentUserContacts: any[];
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ContactsModule, SharedModule, ContactsSeeder, UserSeeder],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    seeder = app.get(PrismaService);
    const userSeeder = app.get(UserSeeder);
    const contactSeeder = app.get(ContactsSeeder);
    await userSeeder.seed(2);
    users = userSeeder.data;
    await contactSeeder.seed(
      users.map((it) => it.id),
      15
    );
    contacts = contactSeeder.data;
    currentUser = users[0];
    currentUserContacts = contacts.filter((it) => it.userId === currentUser.id);
  });

  afterAll(async () => {
    await seeder.down('contact', 'user');
    await app.close();
  });

  test('/GET contacts', async () => {
    // Arrange
    const sutContacts = contacts.reduce((acc, curr) => {
      // filter-map
      if (curr.userId == currentUser.id) {
        delete curr.userId;
        acc.push(curr);
      }
      return acc;
    }, []);
    // Act
    await request(app.getHttpServer())
      .get('/contacts')
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(200, sutContacts);
  });

  test('/POST contacts', async () => {
    // Arrange
    const contact = {
      name: faker.name.firstName(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      address: faker.address.city(),
    };
    // Act
    await request(app.getHttpServer())
      .post('/contacts')
      .send(contact)
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  test('/PUT contacts', async () => {
    // Arrange
    const contact = {
      name: faker.name.firstName(),
      address: faker.address.city(),
    };
    const toUpdate = currentUserContacts[0];
    currentUserContacts.splice(0, 1);

    // Act
    await request(app.getHttpServer())
      .put(`/contacts/${toUpdate.id}`)
      .send(contact)
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(200);

    await request(app.getHttpServer())
      .get(`/contacts/${toUpdate.id}`)
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(contact);
      });
  });

  test('/DELETE contacts', async () => {
    // Arrange
    const toDelete = currentUserContacts[0];
    currentUserContacts.splice(0, 1);
    // Act
    await request(app.getHttpServer())
      .delete(`/contacts/${toDelete.id}`)
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(200);

    await request(app.getHttpServer())
      .get(`/contacts/${toDelete.id}`)
      .auth(currentUser.id, { type: 'bearer' })
      // Assert
      .expect(404);
  });
});
