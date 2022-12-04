import { AppDataSource } from '../db/entrypoint/data-source';
import { Error } from '../model/entity/Error';

export const ErrorRepository = AppDataSource.getRepository(Error).extend({
    // Check documentation when using custom repositories in transactions
    // https://typeorm.io/custom-repository
    
});
