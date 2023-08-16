import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username: username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username; password }) {
    const payload = { username: user.username, password: user.password };
    const validateUser = await this.validateUser(payload.username, payload.password);
    if (!validateUser) throw new UnauthorizedException('Incorrect Credentials');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const payload = { email: user.email, password: user.password, username: user.username };
    const createUser = await this.usersRepository.create({
      username: payload.username,
      email: payload.email,
      password: payload.password,
    });
    return {
      username: payload.username,
    };
  }
}
