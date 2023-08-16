import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user when a valid username is provided', async () => {
      const username = 'testuser';
      const user = new User();
      user.username = username;
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(user);

      const result = await usersService.findOne(username);

      expect(result).toEqual(user);
    });

    it('should return undefined when an invalid username is provided', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(undefined);

      const result = await usersService.findOne(username);

      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const username = 'newuser';
      const email = 'newuser@example.com';
      const password = 'password';
      const createdUser = new User();
      createdUser.username = username;
      createdUser.email = email;
      createdUser.password = password;
      jest.spyOn(usersRepository, 'save').mockResolvedValue(createdUser);

      const result = await usersService.createUser(username, email, password);

      expect(result).toEqual(createdUser);
    });
  });
});
