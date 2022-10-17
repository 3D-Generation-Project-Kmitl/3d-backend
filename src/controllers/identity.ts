import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identity = req.body;

        const identityResult = await prisma.identity.create({
            data: identity
        });

        sendResponse(res, { identityResult }, 200);
    } catch (error) {
        return next(error);
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const identityResult = await prisma.identity.findUnique({
            where: {
                userId: userId
            }
        });
        sendResponse(res, { identityResult }, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const identity = req.body;

        const identityResult = await prisma.identity.update({
            where: {
                userId: userId
            },
            data: identity
        });

        sendResponse(res, { identityResult }, 200);
    } catch (error) {
        return next(error);
    }
}

export default {
    create,
    get,
    update
}

