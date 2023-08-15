import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity'; // Make sure the import path is correct
import { Timestamp } from 'typeorm';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return access token when valid credentials are provided', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        profile_image_link: '',
        contact_number: 980000,
        email_verified_at: null,
        created_at: null,
        updated_at: null,
      };
      await authService.register(mockUser);

      const user = { username: 'testuser', password: 'password123' };
      const mockAccessToken = 'mock_access_token';
      const mockValidatedUser = { username: 'testuser', email: 'test@example.com' };

      mockUsersService.findOne.mockResolvedValue(mockValidatedUser);
      mockJwtService.sign.mockReturnValue(mockAccessToken);

      const result = await authService.login(user);

      expect(result).toEqual({ access_token: mockAccessToken });
      expect(mockUsersService.findOne).toHaveBeenCalledWith(user.username);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ username: user.username, password: user.password });
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const mockUser = { username: 'testuser', password: 'wrongpassword' };

      mockUsersService.findOne.mockResolvedValue(null);

      await expect(authService.login(mockUser)).rejects.toThrow(UnauthorizedException);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(mockUser.username);
    });
  });

  describe('register', () => {
    it('should return access token when registering a user', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        profile_image_link: '',
        contact_number: 980000,
        email_verified_at: null,
        created_at: null,
        updated_at: null,
      };
      const mockAccessToken = 'mock_access_token';

      mockUsersService.createUser.mockResolvedValue(mockAccessToken);

      const result = await authService.register(mockUser);

      expect(result).toEqual({ access_token: mockAccessToken });
      expect(mockUsersService.createUser).toHaveBeenCalledWith(mockUser.username, mockUser.email, mockUser.password);
    });
  });
});
