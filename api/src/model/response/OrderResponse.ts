import { Restroom } from "../entity/Restroom";
import { City } from "../entity/City";
import { Order } from "../entity/Order"

export class OrderResponse{
    constructor(
        public id: string,
        public amount: number,
        public currency: string,
        public city: City,
        public restroom: Restroom
    ) {}

    
    public static toDto(order: Order): OrderResponse {
        return new OrderResponse(
            order.id,
            order.amount.value,
            order.amount.currency,
            order.restroom.city,
            order.restroom   
        );
    }

    public static toDtos(orders: Order[]): OrderResponse[] {
        let orderResponses: OrderResponse[] = [];
        orders.forEach((order: Order) => {
            console.log(OrderResponse.toDto(order));

            orderResponses.push(OrderResponse.toDto(order))
        });
        return orderResponses;
    }


}