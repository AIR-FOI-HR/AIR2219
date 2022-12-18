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
  let orders: Order[] | null = null;
  try {
    orders = await orderService.getOrdersByUserId(
      req.params.userId, req.query.cityId?.toString() , req.query.sortDirection?.toString()
    );
  } catch (error) {
    return next(new AppError("Bad Request! Incorrectly formatted inputs.", 400));
  }
  
  if (!orders || orders.length == 0) {
    return next(new AppError("Orders not found for this user and given filters!", 404));
  }
  res.json(OrderResponse.toDtos(orders));
});

module.exports = router;
