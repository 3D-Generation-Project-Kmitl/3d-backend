import { sendResponse } from '../utils/response';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { authService, userService } from '../services';
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
        const user = await userService.getUserById(id);
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

const countUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await userService.countUsers();
        const countToday = await userService.countUsersByDays(1);
        sendResponse(res, {
            count,
            countToday
        }, 200);
    } catch (error: any) {
        return next(error);
    }
}

const adminGetUsersWithIdentity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsersWithIdentity();
        sendResponse(res, users, 200);
    } catch (error: any) {
        return next(error);
    }
}

const adminBanUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await userService.banUser(userId, true);
        await authService.removeRefreshToken(userId);
        sendResponse(res, user, 200);
    } catch (error: any) {
        return next(error);
    }
}

const adminUnBanUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await userService.banUser(userId, false);
        sendResponse(res, user, 200);
    } catch (error: any) {
        return next(error);
    }
}

export default {
    getUsers,
    getUser,
    update,
    remove,
    countUsers,
    adminGetUsersWithIdentity,
    adminBanUser,
    adminUnBanUser
}