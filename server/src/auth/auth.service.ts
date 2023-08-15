import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username; password }) {
    const payload = { username: user.username, password: user.password };
    const validateUser = await this.validateUser(payload.username, payload.password);
    if (!validateUser) return new UnauthorizedException('Incorrect Credentials');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const payload = { email: user.email, password: user.password, username: user.username };
    const createUser = await this.usersService.createUser(payload.username, payload.email, payload.password);
    return {
      access_token: createUser,
    };
  }
}
