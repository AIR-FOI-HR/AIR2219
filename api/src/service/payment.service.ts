import { Amount } from '../model/entity/Amount';
import { Order } from '../model/entity/Order';
import { DummyOrderResponse } from '../model/response/external/DummyOrderResponse';
import { UserRepository } from '../dao/user.repository';
import { OrderCreateRequest } from '../model/request/OrderCreateRequest';
import { RestroomRepository } from '../dao/restroom.repository';
import { OrderRepository } from '../dao/order.repository';
import { AmountRepository } from '../dao/amount.repository';
import { OrderState } from '../model/constants/OrderState';
import * as mqtt from 'mqtt';
import { DummyErrorResponse } from '../model/response/external/DummyErrorResponse';
import { ErrorRepository } from '../dao/error.repository';
import { Error } from '../model/entity/Error';
import { OrderErrorRepository } from '../dao/orderError.repository';
import { OrderError } from '../model/entity/OrderError';
import { OrderType } from '../model/constants/OrderType';
import { CaptureMode } from '../model/constants/CaptureMode';
const client = mqtt.connect('mqtt://test.mosquitto.org:1883/ws');

export const processPayment = async (
  req: OrderCreateRequest
): Promise<Order> => {
  //TODO: Transactions

  let price: number = parseOrderPrice(req.amount);
  console.log('NUMBA PRICE: ', price);
  const amount: Amount = new Amount(
    price,
    req.currency,
    new Date().toISOString(),
    req.email
  );

  const restroom = await RestroomRepository.findOneByOrFail({
    id: req.restroomId,
  });

  const user = await UserRepository.findOneByOrFail({
    email: req.email,
  });

  const response = await sendRequestToPaymentService(
    'POST',
    'createOrder',
    JSON.stringify(req)
  );
  const parsedResponse = await response.json();

  let newOrder: Order;
  let error: Error | null;
  let orderError: OrderError | null = null;

  if (response.status === 201) {
    let orderResponse: DummyOrderResponse = parsedResponse;

    newOrder = DummyOrderResponse.toEntity(
      orderResponse,
      amount,
      user,
      restroom
    );
  } else {
    let orderResponse: DummyErrorResponse = parsedResponse;

    newOrder = new Order(
      null,
      OrderType.PAYMENT,
      OrderState.FAILED,
      CaptureMode.AUTOMATIC,
      'Order created using a test card',
      req.email,
      amount,
      '',
      user,
      restroom
    );

    error = await ErrorRepository.findOneBy({ id: orderResponse.id });
    if (!error) {
      error = DummyErrorResponse.toEntity(
        orderResponse.description,
        parsedResponse.status
      );
      await ErrorRepository.save(error);
    }

    orderError = new OrderError(newOrder, error!, orderResponse.timestamp);
  }

  await AmountRepository.save(amount);
  await OrderRepository.save(newOrder);
  if (orderError) {
    await OrderErrorRepository.save(orderError);
  }

  const order = await OrderRepository.findOne({
    where: { id: newOrder.id },
    relations: { errorToOrder: { error: true } },
  });
  return order!;
};

export const confirmOrder = async (id: string): Promise<Order> => {
  const response = await sendRequestToPaymentService(
    'PUT',
    'confirmOrder/' + id,
    ''
  );

  const orderResponse = (await response.json()) as DummyOrderResponse;

  const order = await OrderRepository.findOne({
    where: { id: orderResponse.id },
    relations: { restroom: true },
  });
  order!.state = OrderState.COMPLETED;
  await OrderRepository.save(order!);

  return order!;
};

export const publishMQTTMessage = (orderId: string, orderTag: string): void => {
  client.publish(
    'foi/air2219',
    JSON.stringify({
      id: orderId,
      tag: orderTag,
    })
  );
};

const parseOrderPrice = (price: string): number => {
  const decimalPointInsertIndex: number = price.length - 2;
  return parseFloat(
    price.slice(0, decimalPointInsertIndex) +
      '.' +
      price.slice(decimalPointInsertIndex)
  );
};

const sendRequestToPaymentService = async (
  method: string,
  path: string,
  body: string
): Promise<Response> => {
  return fetch('https://dummy-payment-provider.vercel.app/api/' + path, {
    method: method,
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 3ELBMYXvPXZKSrejHvJT',
    },
  });
};
