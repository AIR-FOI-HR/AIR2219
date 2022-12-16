import { Order } from "../entity/Order"
import { Restroom } from "../entity/Restroom"
import { Amount } from "../entity/Amount"

export class OrderResponse{
    constructor(
        public id: string,
        public orderAmount: Amount,
        public restroom: Restroom
    ) {}

    
    public static toDto(order: Order): OrderResponse {
        return new OrderResponse(
            order.id,
            order.amount,
            order.restroom,            
        );
    }

    public static toDtos(orders: Order[]): OrderResponse[] {
        let orderResponses: OrderResponse[] = [];
        orders.forEach((order: Order) => {orderResponses.push(OrderResponse.toDto(order))});
        return orderResponses;
    }


}