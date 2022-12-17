import express from "express";
import * as orderService from "../service/order.service";
import * as dotenv from "dotenv";
import { Order } from "../model/entity/Order";
import { AppError } from "../model/constants/AppError";
import { OrderResponse } from "../model/response/OrderResponse";

dotenv.config();

/*
export function checkQueryParamsExist(req: Request) {
  
    let params = req.query;
    if (params.cityId){
        return true;
    } else {
        return false;
    }
    
}*/

const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  const orders: Order[] | null = await orderService.getOrdersByUserId(
    req.params.userId
  );
  if (!orders) {
    return next(new AppError("Orders not found for this user!", 404));
  }
  res.json(OrderResponse.toDtos(orders));
});

module.exports = router;
