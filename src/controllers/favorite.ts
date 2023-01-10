import { sendResponse } from '../utils/response';
import { favoriteService } from '../services';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const favorite = await favoriteService.createFavorite(userId, productId);
        sendResponse(res, favorite, 201);
    } catch (error) {
        return next(error)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const favorite = await favoriteService.getFavoriteByUserId(userId);
        sendResponse(res, favorite, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const favorite = await favoriteService.removeFavorite(userId, productId);
        sendResponse(res, favorite, 200);
    } catch (error) {
        return next(error)
    }
}

export default {
    create,
    get,
    remove
}