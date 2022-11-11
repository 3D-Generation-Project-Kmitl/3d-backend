import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.body;

        const categoryResult = await prisma.category.create({
            data: category
        });

        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryResult = await prisma.category.findMany();
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const category = req.body;
        const categoryResult = await prisma.category.update({
            where: {
                categoryId: id
            },
            data: category
        });
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const categoryResult = await prisma.category.delete({
            where: {
                categoryId: id
            }
        });
        sendResponse(res, categoryResult, 200);
    } catch (error) {
        return next(error);
    }
}

export default {
    create,
    getCategories,
    update,
    remove
}