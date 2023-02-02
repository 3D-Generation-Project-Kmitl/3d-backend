import { userService, paymentService, orderService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import stripe from '../utils/stripe';
import dotenv from 'dotenv';

dotenv.config();

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
        const { paymentIntent, ephemeralKey, customer } = await paymentService.getPaymentIntent(user, amount);
        sendResponse(res, { paymentIntent, ephemeralKey, customer }, 200);
    } catch (err) {
        return next(err);
    }
}

const webhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig!,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err: any) {
            return next(new ApplicationError(CommonError.INVALID_REQUEST));
        }
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object as any;
                // Then define and call a function to handle the event payment_intent.succeeded
                const userId = Number(paymentIntent.metadata.userId);
                await orderService.createOrder(userId);
                break;
            // ... handle other event types
            default:
            // Unexpected event type
        }
        sendResponse(res, {}, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    create,
    webhook
}








