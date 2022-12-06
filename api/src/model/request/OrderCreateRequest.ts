
export class OrderCreateRequest {
    constructor(
      public restroomId: string,
      public amount: string,
      public currency: string,
      public email: string,
      public cardNumber: string,
      public cvv: string,
      public expiryDate: string
    ) {}
  }


