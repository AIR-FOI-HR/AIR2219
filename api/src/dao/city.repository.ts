import { AppDataSource } from '../db/entrypoint/data-source';
import { City } from '../model/entity/City';

export const CityRepository = AppDataSource.getRepository(City);