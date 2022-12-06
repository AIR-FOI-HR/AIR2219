import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../../model/entity/User';
import { Error } from '../../model/entity/Error';
import { AdminOptions } from '../../model/entity/AdminOptions';
import { Restroom } from '../../model/entity/Restroom';
import { City } from '../../model/entity/City';
import { Order } from '../../model/entity/Order';
import { OrderError } from '../../model/entity/OrderError';
import { Amount } from '../../model/entity/Amount';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 5656,
  database: process.env.DB_NAME || 'eflush_db',
  schema: process.env.DB_SCHEMA || 'eflush_app',
  username: process.env.DB_USER || 'eflushusr',
  password: process.env.DB_PASSWORD || 'eflushpassword',
  synchronize: false,
  logging: process.env.LOG_SQL === 'true', // Logs sql that gets executed on the database
  entities: [User, Error, AdminOptions, Restroom, City, Order, OrderError, Amount],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'changelog_master',
});
