import { AppDataSource } from '../db/entrypoint/data-source';
import { OrderError } from '../model/entity/OrderError';

export const OrderErrorRepository = AppDataSource.getRepository(OrderError);