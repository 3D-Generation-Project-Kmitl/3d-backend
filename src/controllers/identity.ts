import { sendResponse } from '../utils/response';
import { identityService, userService } from '../services';

import { Request, Response, NextFunction } from 'express';
import filePath2FullURL from '../utils/filePath2FullURL';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const files = filePath2FullURL(req);
        if (!files) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }
        const cardPicture = files["cardPicture"];
        const cardFacePicture = files["cardFacePicture"];
        const identity = req.body;
        identity.userId = userId;
        identity.cardPicture = cardPicture;
        identity.cardFacePicture = cardFacePicture;
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
        if (!identityResult) {
            return sendResponse(res, {}, 200);
        }
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

