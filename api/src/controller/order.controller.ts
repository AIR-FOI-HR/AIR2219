import express from "express";
import * as orderService from "../service/order.service";
import * as dotenv from "dotenv";
import { Order } from "../model/entity/Order";
import { AppError } from "../model/constants/AppError";
import { OrderResponse } from "../model/response/OrderResponse";

dotenv.config();

const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  let orders: Order[] | null = null;
  try {
    if (
      checkQueryParamsValidity(
        req.query.cityId?.toString(),
        req.query.sortDirection?.toString(),
        req.query.sortField?.toString()
      )
    ) {
      orders = await orderService.getOrdersByUserId(
        req.params.userId,
        req.query.cityId?.toString(),
        req.query.sortDirection?.toString()
      );
    } else {
      return next(
        new AppError("Bad Request! Incorrectly formatted inputs.", 400)
      );
    }
  } catch (error) {
    return next(
      new AppError("Bad Request! Can't handle inputs.", 400)
    );
  }

  if (!orders || orders.length == 0) {
    return next(
      new AppError("Orders not found for this user and given filters!", 404)
    );
  }
  res.json(OrderResponse.toDtos(orders));
});

module.exports = router;


enum sortFields{
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  deletedAt = "deletedAt"
};

export function checkIfSortFieldValid(sortField = "createdAt"): boolean{
  const values = Object.values(sortFields);

  if (values.includes(sortField as unknown as sortFields)){
    console.log("POSTOJI");
    return true;
  } else {
    return false;
  }

}

export function checkQueryParamsValidity(
  cityId?: string,
  sortDirection: string = "DESC",
  sortField: string = "createdAt"
) {
  if (
    (sortDirection != "ASC" && sortDirection != "DESC") ||
    cityId?.length !== 36 ||
    cityId?.split("-").length - 1 !== 4 ||
    !checkIfSortFieldValid(sortField)
  ) {
    return null;
  } else {
    return true;
  }
}