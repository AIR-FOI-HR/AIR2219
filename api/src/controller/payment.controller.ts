import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import * as paymentService from '../service/payment.service';
import * as dotenv from 'dotenv';
import { AppError } from '../model/constants/AppError';
import { OrderState } from '../model/constants/OrderState';
import { authenticateRequest } from '../middleware/auth';

dotenv.config();

const router = express.Router();


router.use(authenticateRequest);

router.post(
  '/createOrder',
  [
    check('restroomId').notEmpty(),
    check('amount').notEmpty(),
    check('currency').notEmpty(),
    check('email').isEmail(),
    check('cardNumber').notEmpty(),
    check('cvv').isLength({ min: 3 }),
    check('expiryDate').isLength({ max: 5 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Invalid order data!', 422));
    }

    /* Test implementation to check if user who sent request is admin
       If the user is admin, the process can continue
       If the user is not admin, the process can not continue and error is returned
       For testing purposes temporarily because the creation of the order should
       be possible for every logged in user

       Uncomment this to test the authentication middleware
       ||||||||||||
       vvvvvvvvvvvv
       
    const { isAdmin } = req.userData;
    if (!isAdmin) {
      return next(new AppError("Unauthorized", 401));
    }
    */

    const createdOrder = await paymentService.processPayment(req.body);

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
