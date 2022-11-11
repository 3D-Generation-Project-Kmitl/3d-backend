import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const { type } = req.body;
        const model = req.file?.path;

        if (!model) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }

        const modelResult = await prisma.model.create({
            data: {
                userId: userId,
                type: type,
                model: model
            }
        });

        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const modelResult = await prisma.model.findMany({
            where: {
                userId: userId
            }
        });
        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const modelResult = await prisma.model.delete({
            where: {
                modelId: id
            }
        });
        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

export default {
    create,
    getByUserId,
    remove
}

