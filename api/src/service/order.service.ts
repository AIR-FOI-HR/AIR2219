import { Order } from '../model/entity/Order';
import { OrderRepository } from '../dao/order.repository';
import { Between, FindOptionsOrderValue } from 'typeorm';

export const getOrdersByUserId = async (userId: string, cityId?: string, sortDirection: string = "DESC", sortField: string = "createdAt"): Promise<Order[] | null> => {
  if(userId.length !== 36 || userId.split("-").length - 1 !== 4) {
    return null;
  }

  let orders = null;

  if (!cityId){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, where: {user: { id: userId }}});
  } else if (cityId && sortField == "createdAt"){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, 
      where: {user: { id: userId }, restroom: {city: {id: cityId}}}, 
      order: {createdAt: sortDirection as FindOptionsOrderValue}});
  } else if (cityId && sortField == "updatedAt"){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, 
      where: {user: { id: userId }, restroom: {city: {id: cityId}}}, 
      order: {updatedAt: sortDirection as FindOptionsOrderValue}});
  } else if (cityId && sortField == "deletedAt"){
    orders = OrderRepository.find({relations: {restroom: {city: true}, amount: true}, 
      where: {user: { id: userId }, restroom: {city: {id: cityId}}}, 
      order: {deletedAt: sortDirection as FindOptionsOrderValue}});
  }
  
  return orders;
};