import { AppDataSource } from '../db/entrypoint/data-source';
import { Restroom } from '../model/entity/Restroom';

export const RestroomRepository = AppDataSource.getRepository(Restroom);