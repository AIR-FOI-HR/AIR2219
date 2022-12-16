import { Order } from '../model/entity/Order';
import { OrderRepository } from '../dao/order.repository';

export const getOrdersByUserId = async (userId: string): Promise<Order[] | null> => {
  if(userId.length !== 36 || userId.split("-").length - 1 !== 4) {
    return null;
  }

  return OrderRepository.find({relations: {user: true}, where: {user: { id: userId }}});
};
