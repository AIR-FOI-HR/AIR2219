import express, { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import * as paymentService from '../service/payment.service';
import * as dotenv from 'dotenv';
import { AppError } from '../model/constants/AppError';
import { OrderState } from '../model/constants/OrderState';
import { authenticateRequest } from '../auth/auth';
import { AuthRequest } from '../model/request/AuthRequest';

dotenv.config();

const router = express.Router();

router.use(authenticateRequest);

router.post(
  '/createOrder',
  [
    check('restroomId').notEmpty(),
    check('amount').notEmpty(),
    check('currency').notEmpty(),
    check('cardNumber').notEmpty(),
    check('cvv').isLength({ min: 3 }),
    check('expiryDate').isLength({ max: 5 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Invalid order data!', 422));
    }

    const createdOrder = await paymentService.processPayment(req as AuthRequest);

    if (createdOrder.state === OrderState.FAILED) {
      return next(
        new AppError(createdOrder.errorToOrder[0].error.description, createdOrder.errorToOrder[0].error.statusCode)
      );
    }

    const confirmedOrder = await paymentService.confirmOrder(createdOrder.id);

    if(!confirmedOrder) {
      return next(
        new AppError('Internal Server error! Payment not processed successfully!', 500)
      );
    }

    paymentService.publishMQTTMessage(confirmedOrder.id, confirmedOrder.restroom.tag);
    res.json({ message: 'Payment processed successfully!' });
  }
);

module.exports = router;
