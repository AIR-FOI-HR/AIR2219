import { AppDataSource } from '../db/entrypoint/data-source';
import { Order } from '../model/entity/Order';

export const OrderRepository = AppDataSource.getRepository(Order);