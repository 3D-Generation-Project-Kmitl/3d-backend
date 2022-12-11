import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';
import filePath2FullURL from '../utils/filePath2FullURL';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const { type } = req.body;

        const files = filePath2FullURL(req);
        if (!files) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }

        const model = files["model"];
        const picture = files["picture"];

        const modelResult = await prisma.model.create({
            data: {
                userId: userId,
                type: type,
                model: model,
                picture: picture
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
                userId: userId,
            }
        },

        );
        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const modelId = Number(req.params.id);

        const modelResult = await prisma.model.findUnique({
            where: {
                modelId: modelId
            }
        });

        if (!modelResult) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }

        if (modelResult.userId !== userId) {
            throw new ApplicationError(CommonError.UNAUTHORIZED);
        }

        const files = filePath2FullURL(req);
        if (!files) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }

        const model = files["model"];
        const picture = files["picture"];

        const updateResult = await prisma.model.update({
            where: {
                modelId: modelId
            },
            data: {
                picture: picture,
                model: model
            }
        });

        sendResponse(res, updateResult, 200);
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
    update,
    remove
}

