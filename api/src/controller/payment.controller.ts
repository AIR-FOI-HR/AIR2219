import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { check } from "express-validator";
import * as paymentService from "../service/payment.service";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();


const errors = new Map();
errors.set(1, {id: "7a09cc08-3cdb-4de8-ae97-0e8879151031", statusCode: 400, description: "Invalid Data!"});
errors.set(2, {id: "9cd3ce47-6dfa-459b-b590-375a37ef6aa4", statusCode: 500, description: "Server error! Payment not processed successfully!"});


router.post(
  "/createOrder",
  [
    check("amount").notEmpty(),
    check("currency").notEmpty(),
    check("email").isEmail(),
    check("cardNumber").notEmpty(),
    check("cvv").isLength({ min: 3 }),
    check("expiryDate").isLength({ max: 5 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //console.log(errors);
      return returnError(res, 1); 
    }

    const paymentResponse = await paymentService.processPayment(req.body);

    if (paymentResponse != false) {
      paymentService.confirmOrder(paymentResponse as string);
      res.json({ message: "Payment processed successfully!" });
    } else {
      return returnError(res, 2);
    }
  }
);



const returnError = (res: any, key: any) => {
  const error = errors.get(key);
  res.status(error.statusCode);
  res.json({
    id: error.id,
    description: error.description,
    timestamp: new Date().getTime(),
  });
};

module.exports = router;
