import { sendResponse } from '../utils/response';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { userService } from '../services';
import filePath2FullURL from '../utils/filePath2FullURL';

import { Request, Response, NextFunction } from 'express';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers();
        sendResponse(res, users, 200);
    } catch (error: any) {
        return next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const user = userService.getUserById(id);
        if (!user) {
            return next(new ApplicationError(CommonError.RESOURCE_NOT_FOUND));
        }
        sendResponse(res, user, 200);
    } catch (error: any) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        const picture = filePath2FullURL(req);
        const user = req.body;
        if (picture) {
            user.picture = picture;
        } else {
            delete user.picture;
        }
        const updatedUser = await userService.updateUser(userId, user);
        sendResponse(res, updatedUser, 200);
    } catch (error: any) {
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.userId);
        if (id !== userId) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }
        const user = await userService.removeUser(userId);
        sendResponse(res, user, 200);
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