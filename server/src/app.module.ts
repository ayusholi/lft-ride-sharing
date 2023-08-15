import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), PassportModule, AuthModule, UsersModule, RideModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
