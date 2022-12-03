import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const cart = await prisma.cart.create({
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
        sendResponse(res, cart, 201);
    } catch (error) {
        return next(error)
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const cart = await prisma.cart.findMany({
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
        sendResponse(res, cart, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const { productId } = req.body
        const cart = await prisma.cart.deleteMany({
            where: {
                userId,
                productId
            }
        });
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