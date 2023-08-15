import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { User } from 'src/users/user.entity';
import { Ride } from 'src/ride/ride.entity';
dotenv.config();

/**
 * Add all the Postgres Connection Settings here
 */
export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  entities: [User, Ride],
  migrationsRun: false,
  migrations: ['dist/migrations/*.ts'],
  logging: true,
  synchronize: true,
};
export const configure = new DataSource(config);
