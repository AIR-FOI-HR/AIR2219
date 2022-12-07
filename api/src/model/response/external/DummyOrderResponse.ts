import { Order } from "../../entity/Order";
import { CaptureMode } from "../../constants/CaptureMode";
import { Currency } from "../../constants/Currency";
import { OrderState } from "../../constants/OrderState";
import { OrderType } from "../../constants/OrderType";
import { Amount } from "../../entity/Amount";
import { User } from "../../entity/User";
import { Restroom } from "../../entity/Restroom";

export class DummyOrderResponse {
    constructor(
      public id: string,
      public publicId: string,
      public type: OrderType,
      public state: OrderState,
      public captureMode: CaptureMode,
      public merchantOrderExtRef: string,
      public email: string,
      public createdAt: string,
      public updatedAt: string,
      public orderAmount: {
        value: string,
        currency: Currency
      },
      public checkoutUrl: string
    ) {}

    public static toEntity(dto: DummyOrderResponse, amount: Amount, user: User, restroom: Restroom): Order {
      const order = new Order(
      dto.publicId,
      dto.type,
      dto.state,
      dto.captureMode,
      dto.merchantOrderExtRef,
      dto.email,
      amount,
      dto.checkoutUrl,
      user,
      restroom
      );
      order.id = dto.id;
      return order
    }
  }

