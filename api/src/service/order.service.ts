import { Order } from '../model/entity/Order';
import { OrderRepository } from '../dao/order.repository';
import { FindOptionsOrderValue } from 'typeorm';

export const getOrdersByUserId = async (userId: string, cityId?: string, sortDirection: string = "DESC"): Promise<Order[] | null> => {
  if(userId.length !== 36 || userId.split("-").length - 1 !== 4) {
    return null;
  }
  
  if (sortDirection != "ASC" && sortDirection != "DESC"){
    return null;
  }

  let orders = null;

  if (!cityId){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, where: {user: { id: userId }}});
  } else if (cityId){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, 
      where: {user: { id: userId }, restroom: {city: {id: cityId}}}, 
      order: {createdAt: sortDirection as FindOptionsOrderValue}});
  }
  
  return orders;
};