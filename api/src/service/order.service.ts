import { Order } from '../model/entity/Order';
import { OrderRepository } from '../dao/order.repository';
import { Between, Like } from 'typeorm';

export const getOrdersByUserId = async (userId: string, dateFrom: Date, dateTo: Date, cityId: string, sortDirection: string, sortField: string): Promise<Order[] | null> => {
  if(userId.length !== 36 || userId.split("-").length - 1 !== 4) {
    return null;
  }

  console.log(cityId);
  if(cityId){
  if( cityId.length !== 36 || cityId.split("-").length - 1 !== 4 ) {
    return null;
  }
  } else if (cityId == "") {
    return null;
  }
  
  let orders = null;

  orders = await OrderRepository.find({relations: {restroom: {city: true}, amount: true}, 
    where: {user: { id: userId}, restroom: {city: {id: cityId}}, createdAt: Between(dateFrom, dateTo)}, 
    
    order: {[sortField]: sortDirection}});
  return orders;
};
