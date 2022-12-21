import { Order } from "../entity/Order"
import { Amount } from "../entity/Amount";
import { OrderState } from "../constants/OrderState";
import { RestroomResponse } from "./RestroomResponse";

export class OrderResponse{
    constructor(
        public orderState: OrderState,
        public amount: Amount,
        public restroom: RestroomResponse
    ) {}

    
    public static toDto(order: Order): OrderResponse {
        return new OrderResponse(
            order.state,
            order.amount,
            RestroomResponse.toDto(order.restroom) 
        );
    }

    public static toDtos(orders: Order[]): OrderResponse[] {
        let orderResponses: OrderResponse[] = [];
        orders.forEach((order: Order) => {
            orderResponses.push(OrderResponse.toDto(order))
        });
        return orderResponses;
    }


}