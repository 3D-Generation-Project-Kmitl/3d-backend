import { sendResponse } from '../utils/response';
import { cartService } from '../services';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const cart = await cartService.createCart(userId, productId);
        sendResponse(res, cart, 201);
    } catch (error) {
        return next(error)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const cart = await cartService.getCartByUserId(userId);
        sendResponse(res, cart, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const cart = await cartService.removeCart(userId, productId);
        sendResponse(res, cart, 200);
    } catch (error) {
        return next(error)
    }
}

export default {
    create,
    get,
    remove
}