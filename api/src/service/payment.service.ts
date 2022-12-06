import { Amount } from '../model/entity/Amount';
import { Order } from '../model/entity/Order'
import { DummyOrderResponse } from '../model/response/external/DummyOrderResponse';
import { UserRepository } from '../dao/user.repository';
import { OrderCreateRequest } from '../model/request/OrderCreateRequest';
import { RestroomRepository } from '../dao/restroom.repository';
import { OrderRepository } from '../dao/order.repository';
import { AmountRepository } from '../dao/amount.repository';

export const processPayment = async (req: OrderCreateRequest): Promise<string | null> => {
    const response = await fetch('https://dummy-payment-provider.vercel.app/api/createOrder', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 3ELBMYXvPXZKSrejHvJT'
    }
  });

  const JSONResponse = await response.json();
  console.log(JSONResponse);
  

  if (response.status == 201){
    let orderResponse: DummyOrderResponse = JSONResponse;

    let value = parseInt(JSONResponse.orderAmount.value.slice(0, 3) + "." + JSONResponse.orderAmount.value.slice(3), 10);

    const amount: Amount = new Amount(
      value,
      orderResponse.orderAmount.currency,
      orderResponse.createdAt,
      orderResponse.email
    )
    await AmountRepository.save(amount);

    const restroom = await RestroomRepository.findOneByOrFail({ id: req.restroomId });

    const user = await UserRepository.findOneByOrFail({email: orderResponse.email});
    
    const newOrder: Order = DummyOrderResponse.toEntity(orderResponse, amount, user, restroom);
    
    await OrderRepository.save(newOrder);
    
    return JSONResponse.id;

  } else {

    //TODO: Implement
    //let orderError: DummyErrorResponse = JSONResponse;
      
    return null;
  }
}


export const confirmOrder = async (id: string): Promise<{}> => {
  const response = await fetch('https://dummy-payment-provider.vercel.app/api/confirmOrder/' + id, {
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3ELBMYXvPXZKSrejHvJT'
  }
});

//const JSONResponse = await response.json();
//console.log(JSONResponse);


if (response.status == 200){
  return true;

} else
    return false;

}
