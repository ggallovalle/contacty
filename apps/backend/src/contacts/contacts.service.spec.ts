import { ContactsService } from './contacts.service';
import { IContactsRepository } from './contacts.types';
import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError, ValidationError } from '../errors';

describe('ContactsService', () => {
  let sut: ContactsService;
  let repo: MockProxy<IContactsRepository>;
  const auth = { userId: 10 };
  beforeEach(() => {
    repo = mock<IContactsRepository>();
    sut = new ContactsService(repo);
  });

  describe('#create', () => {
    test('should call repo.create', async () => {
      // Arrange
      const data = {
        phoneNumber: '123',
        address: 'abc',
        email: 'asdf',
        name: 'name',
      };
      // Act
      const _ = await sut.create(data, auth);
      // Assert
      expect(repo.create).toHaveBeenCalledTimes(1);
      expect(repo.create).toBeCalledWith(data, auth);
    });

    test.each([{}, { email: 'asdf' }])(
      "should trow if doesn't pass validation",
      async (data: any) => {
        // Arrange
        // Act
        // Assert
        await expect(sut.create(data, auth)).rejects.toThrow(ValidationError);
      }
    );
  });

  test('findAll should call repo.findAll', async () => {
    // Arrange
    // Act
    const _ = await sut.findAll(auth);
    // Assert
    expect(repo.findAll).toHaveBeenCalledTimes(1);
    expect(repo.findAll).toBeCalledWith(auth);
  });

  test("findById should throw if repository couldn't find it", async () => {
    // Arrange
    const id = 10;
    repo.findById.mockReturnValueOnce(Promise.resolve(null));
    // Act
    // Assert
    await expect(sut.findById(id, auth)).rejects.toThrow(NotFoundError);
  });
});
