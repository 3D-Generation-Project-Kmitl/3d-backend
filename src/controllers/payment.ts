import { userService, paymentService, orderService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(req.userId);
        if (!user) {
            return next(new ApplicationError(CommonError.RESOURCE_NOT_FOUND));
        }
        const amount = await orderService.getAmount(user.userId);
        if (amount <= 0) {
            return next(new ApplicationError(CommonError.INVALID_REQUEST));
        }
        const { paymentIntent, ephemeralKey, customer } = await paymentService.paymentIntent(user, amount);
        sendResponse(res, { paymentIntent, ephemeralKey, customer }, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    create
}








