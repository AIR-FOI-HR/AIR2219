import { AppDataSource } from '../db/entrypoint/data-source';
import { User } from '../model/entity/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
    // Check documentation when using custom repositories in transactions
    // https://typeorm.io/custom-repository
    findByFullName(firstName: string, lastName: string): Promise<User[]> {
        return this.createQueryBuilder('user')
            .where('user.firstName = :firstName', { firstName })
            .andWhere('user.lastName = :lastName', { lastName })
            .getMany();
    },
});
