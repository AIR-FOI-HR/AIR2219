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
        req.query.sortField?.toString(),
        req.query.dateFrom?.toString(),
        req.query.dateTo?.toString()
      )
    ) {
      orders = await orderService.getOrdersByUserId(
        req.params.userId,
        req.query.cityId?.toString(),
        req.query.sortDirection?.toString(),
        req.query.sortField?.toString()
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

export function checkIfSortFieldValid(sortField: string): boolean{
  const values = Object.values(sortFields);

  if (values.includes(sortField as unknown as sortFields)){
    return true;
  } else {
    return false;
  }

}

export function checkDateRange(dateFrom = "2000-01-01", dateTo = new Date().toISOString()){
  if (dateFrom != "" && dateTo != ""){
    //console.log(dateFrom, dateTo);
    let dateF = convertStringToDate(dateFrom);
    let dateT = convertStringToDate(dateTo);
    //console.log(dateF, dateT);
    if (!dateF || !dateT){
      return false
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function convertStringToDate(date: string){
  let year = Number(date.slice(0,4));
  let month = Number(date.slice(5,7));
  let day = Number(date.slice(8,10));

  //console.log(year, month, day);

  if (year >= 2000 && month >= 1 && day >= 1){
    let newDate = new Date(year, month-1, day+1);
    return newDate;
  } else {
    return false;
  }

  
}

export function checkQueryParamsValidity(
  cityId?: string,
  sortDirection: string = "DESC",
  sortField: string = "createdAt",
  dateFrom?: string,
  dateTo?: string
) {
  if (
    (sortDirection != "ASC" && sortDirection != "DESC") ||
    cityId?.length !== 36 ||
    cityId?.split("-").length - 1 !== 4 ||
    !checkIfSortFieldValid(sortField) ||
    !checkDateRange(dateFrom, dateTo)

  ) {
    return null;
  } else {
    return true;
  }
}