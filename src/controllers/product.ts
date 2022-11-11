import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const product = req.body
        product.userId = userId;
        const newProduct = await prisma.product.create({
            data: product
        });
        sendResponse(res, newProduct, 201);
    } catch (error) {
        return next(error)
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.product.findMany(
            {
                orderBy: {
                    productId: 'desc'
                },
                include: {
                    Model: {
                        select: {
                            picture: true
                        }
                    }
                }
            }
        );
        sendResponse(res, products, 200);
    } catch (error) {
        return next(error)
    }
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const product = await prisma.product.findUnique({
            where: {
                productId: id
            },
            include: {
                Model: {
                    select: {
                        model: true,
                        picture: true
                    }
                }
            }
        });
        if (!product) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        sendResponse(res, product, 200);
    } catch (error) {
        return next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const id = Number(req.params.id);
        const product = req.body
        if (userId !== product.userId) {
            throw new ApplicationError(CommonError.UNAUTHORIZED);
        }
        const updatedProduct = await prisma.product.update({
            where: {
                productId: id
            },
            data: product
        });
        sendResponse(res, updatedProduct, 200);
    } catch (error) {
        return next(error)
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const id = Number(req.params.id);
        const product = await prisma.product.findUnique({
            where: {
                productId: id
            }
        });
        if (!product) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        if (userId !== product.userId) {
            throw new ApplicationError(CommonError.UNAUTHORIZED);
        }
        await prisma.product.delete({
            where: {
                productId: id
            }
        });
        sendResponse(res, null, 204);
    } catch (error) {
        return next(error)
    }
}


export default {
    create,
    getProducts,
    getProduct,
    update,
    remove
}