import { sendResponse } from '../utils/response';
import { identityService, userService } from '../services';

import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identity = req.body;
        const identityResult = await identityService.createIdentity(identity);
        sendResponse(res, identityResult, 200);
    } catch (error) {
        return next(error);
    }
}

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const identityResult = await identityService.getIdentityByUserId(userId);
        sendResponse(res, identityResult, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const identity = req.body;
        const identityResult = await identityService.updateIdentity(userId, identity);
        sendResponse(res, identityResult, 200);
    } catch (error) {
        return next(error);
    }
}

const adminUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, issue, userId } = req.body;

        const identityResult = await identityService.adminUpdateIdentity(userId, status, issue);

        if (status === 'APPROVED') {
            await userService.updateVerified(userId, true);
        }

        sendResponse(res, identityResult, 200);
    } catch (error) {
        return next(error);
    }
}

export default {
    create,
    get,
    update,
    adminUpdate
}

