import express from 'express';
import * as orderService from '../service/order.service';
import * as dotenv from 'dotenv';
import { Order } from '../model/entity/Order';
import { AppError } from '../model/constants/AppError';
import { OrderResponse } from '../model/response/OrderResponse';


dotenv.config();

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
    if (req.query.cityId){
        const orders: Order[] | null = await orderService.getOrdersByUserId(req.params.userId, req.query.cityId.toString());
        if (!orders){
            return next(new AppError("Orders not found for this user!", 404));
        }
        res.json(OrderResponse.toDtos(orders));
    } else {
        return next(new AppError("City Id not provided!", 400));
    }
});

module.exports = router;