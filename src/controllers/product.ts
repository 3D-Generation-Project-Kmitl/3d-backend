import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const product = req.body
        product.userId = userId;
        const newProduct = await prisma.product.create({
            data: product
        });
        sendResponse(res, { newProduct }, 201);
    } catch (error) {
        return next(error)
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyword = String(req.query.keyword);

        const category = await prisma.category.findMany({
            where: {
                name: {
                    contains: keyword,
                    mode: "insensitive"
                }
            }
        });

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: keyword,
                    mode: "insensitive"
                },
                details: {
                    contains: keyword,
                    mode: "insensitive"
                },
            },
        });
        sendResponse(res, { products });
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
            }
        });
        if (!product) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }
        sendResponse(res, { product });
    } catch (error) {
        return next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
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
        sendResponse(res, { updatedProduct });
    } catch (error) {
        return next(error)
    }
}

export default {
    create,
    getProducts,
    getProduct,
    update
}