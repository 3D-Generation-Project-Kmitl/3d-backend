import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { sendResponse } from '../utils/response';
import { modelService } from '../services';
import filePath2FullURL from '../utils/filePath2FullURL';

import { Request, Response, NextFunction } from 'express';


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

        const modelData = {
            userId: userId,
            type: type,
            model: model,
            picture: picture
        }

        const modelResult = await modelService.createModel(modelData);

        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const modelResult = await modelService.getModelsByUserId(userId);
        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const modelId = Number(req.params.id);

        const modelResult = await modelService.getModelById(modelId);

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

        const updateResult = await modelService.updateModel(modelId, model, picture);

        sendResponse(res, updateResult, 200);
    } catch (error) {
        return next(error);
    }
}


const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const modelResult = await modelService.removeModel(id);
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

