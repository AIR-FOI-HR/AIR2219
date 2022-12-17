import { Restroom } from "../entity/Restroom";
import { Order } from "../entity/Order"
import { Amount } from "../entity/Amount";
import { OrderState } from "../constants/OrderState";

export class OrderResponse{
    constructor(
        public orderState: OrderState,
        public amount: Amount,
        public restroom: Restroom
    ) {}

    
    public static toDto(order: Order): OrderResponse {
        return new OrderResponse(
            order.state,
            order.amount,
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