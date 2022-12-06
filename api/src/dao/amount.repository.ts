import { AppDataSource } from '../db/entrypoint/data-source';
import { Amount } from '../model/entity/Amount';

export const AmountRepository = AppDataSource.getRepository(Amount);