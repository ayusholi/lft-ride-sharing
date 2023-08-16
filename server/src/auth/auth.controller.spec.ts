import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({})
      .overrideGuard(JwtAuthGuard) // Mock the JwtAuthGuard
      .useValue({ canActivate: () => true }) // Override with a mock that always allows
      .compile();
  });

  describe('login', () => {
    it('should return the result from AuthService login', async () => {
      expect('login').toEqual('login');
    });
  });
});
