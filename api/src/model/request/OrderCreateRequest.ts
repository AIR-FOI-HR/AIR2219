import { Currency } from "../constants/Currency";

export class OrderCreateRequest {
    constructor(
      public restroomId: string,
      public amount: string,
      public currency: Currency,
      public email: string,
      public cardNumber: string,
      public cvv: string,
      public expiryDate: string
    ) {}
  }


