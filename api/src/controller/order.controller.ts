import express, { NextFunction, Request, Response } from 'express';
import * as orderService from '../service/order.service';
import * as dotenv from 'dotenv';
import { Order } from '../model/entity/Order';
import { AppError } from '../model/constants/AppError';
import { OrderResponse } from '../model/response/OrderResponse';
import { authenticateRequest } from '../auth/auth';
import { AuthRequest } from '../model/request/AuthRequest';

dotenv.config();

const router = express.Router();

router.use(authenticateRequest);

router.get(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    let orders: Order[] | null = null;

    let { cityId, dateFrom, dateTo, sortField, sortDirection } = req.query;
    const userId = req.params.userId;

    const loggedUserData = (req as AuthRequest).userData;
    if(!loggedUserData.isAdmin && loggedUserData.id !== userId) {
      return next(new AppError('You do not have permission to perform this operation!', 403));
    }

    if (!dateFrom) {
      dateFrom = new Date(-8640000000000000).toString();
    }

    if (!dateTo) {
      dateTo = new Date().toString();
    }

    if (!sortField) {
      sortField = 'createdAt';
    }

    if (!sortDirection) {
      sortDirection = 'DESC';
    }

    const dateFromDate = new Date(dateFrom as string);
    const dateToDate = new Date(dateTo as string);

    if (dateToDate < dateFromDate) {
      return next(new AppError('Bad Request! Invalid date range.', 400));
    }
    
    orders = await orderService.getOrdersByUserId(
      userId,
      dateFromDate,
      dateToDate,
      cityId as string,
      sortDirection as string,
      sortField as string
    );

    if (!orders) {
      return next(new AppError('Data not found.', 404));
    }

    res.json(OrderResponse.toDtos(orders as Order[]));
  }
);

module.exports = router;
