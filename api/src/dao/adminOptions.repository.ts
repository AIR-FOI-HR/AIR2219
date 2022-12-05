import { AppDataSource } from '../db/entrypoint/data-source';
import { AdminOptions } from '../model/entity/AdminOptions';

export const AdminOptionsRepository = AppDataSource.getRepository(AdminOptions)
