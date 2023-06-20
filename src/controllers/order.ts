import { orderService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.createOrder(req.userId);
        sendResponse(res, order, 200);
    } catch (err) {
        return next(err);
    }
}

const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.userId);
        sendResponse(res, orders, 200);
    } catch (err) {
        return next(err);
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.getOrderById(Number(req.params.id));
        sendResponse(res, order, 200);
    } catch (err) {
        return next(err);
    }
}

const countOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await orderService.countOrders();
        const countToday = await orderService.countOrdersByDays(1);
        sendResponse(res, {
            count,
            countToday
        }, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    create,
    getOrdersByUserId,
    getOrderById,
    countOrders
}