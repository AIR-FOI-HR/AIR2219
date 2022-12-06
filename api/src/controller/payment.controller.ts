import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import * as paymentService from '../service/payment.service';
import { AppError } from '../model/constants/AppError';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.post(
    "/createOrder",
    [
      check("amount").notEmpty(),
      check("currency").notEmpty(),
      check("email").isEmail(),
      check("cardNumber").notEmpty(),
      check("cvv").isLength({ min: 3 }),
      check("expiryDate").isLength({ max: 5 })
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            console.log(errors);
          return next(new AppError("Invalid data!", 400));
      }
      
      const paymentResponse = await paymentService.processPayment(req.body);      

      if (paymentResponse == true){
        res.json({message: 'Payment processed successfully!'});
      } else {
        res.json({message: 'Payment not processed successfully!'});
      }

  
      
    }
  );
  

  module.exports = router;