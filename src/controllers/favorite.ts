import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const favorite = await prisma.favorite.create({
            data: {
                userId,
                productId
            },
            include: {
                Product: {
                    include: {
                        Model: true
                    }
                }
            }
        });
        sendResponse(res, favorite, 201);
    } catch (error) {
        return next(error)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const favorite = await prisma.favorite.findMany({
            where: {
                userId
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                Product: {
                    include: {
                        Model: true
                    }
                }
            }
        });
        sendResponse(res, favorite, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const favorite = await prisma.favorite.deleteMany({
            where: {
                userId,
                productId
            }
        });
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