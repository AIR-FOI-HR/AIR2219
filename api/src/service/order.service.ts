import { Order } from '../model/entity/Order';
import { OrderRepository } from '../dao/order.repository';

export const getOrdersByUserId = async (userId: string, cityId?: string): Promise<Order[] | null> => {
  if(userId.length !== 36 || userId.split("-").length - 1 !== 4) {
    return null;
  }
  let orders = null;
  
  if (!cityId){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, where: {user: { id: userId }}});
  } else if (cityId){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, where: {user: { id: userId }, restroom: {city: {id: cityId}}, }});
  }
  
  return orders;
};