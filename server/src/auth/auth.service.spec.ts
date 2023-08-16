import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../utils/constants';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        JwtService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock the Repository behavior
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('validateUser', () => {
    it('should return user when valid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = password;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result = await authService.validateUser(username, password);

      expect(result).toEqual({ username });
    });

    it('should return null when invalid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'password';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      const result = await authService.validateUser(username, password);

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token when valid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = password;

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

      const result = await authService.login({ username, password });

      expect(result).toHaveProperty('access_token', 'accessToken');
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'password';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(undefined);

      try {
        await authService.login({ username, password });
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toEqual('Incorrect Credentials');
      }
    });
  });

  describe('register', () => {
    it('should create a user and return access token', async () => {
      const user = new User();
      user.username = 'newuser';
      user.email = 'newuser@example.com';
      user.password = 'password';

      const savedUser = new User();
      savedUser.username = user.username;
      savedUser.email = user.email;
      savedUser.password = user.password;

      jest.spyOn(userRepository, 'create').mockReturnValue(savedUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await authService.register(user);

      expect(result).toHaveProperty('username');
      expect(result.username).toEqual('newuser');
    });
  });
});
