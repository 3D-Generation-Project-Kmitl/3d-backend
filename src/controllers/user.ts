import { sendResponse } from '../utils/response';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();
        sendResponse(res, { users }, 200);
    } catch (error: any) {
        return next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const user = await prisma.user.findUnique({
            where: {
                userId: id
            }
        });
        sendResponse(res, { user }, 200);
    } catch (error: any) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.body.userId);
        if (id !== userId) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }
        const user = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                userId: userId
            },
            data: user
        });
        sendResponse(res, { updatedUser }, 200);
    } catch (error: any) {
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.body.userId);
        if (id !== userId) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }
        const user = await prisma.user.delete({
            where: {
                userId: userId
            }
        });
        sendResponse(res, { user }, 200);
    } catch (error: any) {
        return next(error);
    }
}

export default {
    getUsers,
    getUser,
    update,
    remove
}