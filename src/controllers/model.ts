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

        const modelResult = await modelService.createModel(userId, type, model, picture);

        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getModelsByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const { isProduct } = req.query;

        const modelResult = await modelService.getModelsByStoreId(userId, isProduct === "true");

        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const getByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const modelResult = await modelService.getModelsByCustomerId(userId);
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

const updateModelFromReconstruction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { modelId, model, picture } = req.body;

        const modelResult = await modelService.getModelById(modelId);

        if (!modelResult) {
            throw new ApplicationError(CommonError.RESOURCE_NOT_FOUND);
        }

        const modelUpdated = await modelService.updateModel(modelId, model, picture);

        sendResponse(res, modelUpdated, 200);
    } catch (error) {
        return next(error);
    }

}


const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const modelResult = await modelService.removeModel(id);
        if (!modelResult) {
            throw new ApplicationError(CommonError.INVALID_REQUEST);
        }
        sendResponse(res, modelResult, 200);
    } catch (error) {
        return next(error);
    }
}

const countModels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await modelService.countModels();
        const countToday = await modelService.countModelsByDays(1);
        sendResponse(res, {
            count,
            countToday
        }, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    create,
    getByCustomerId,
    getModelsByStoreId,
    update,
    updateModelFromReconstruction,
    remove,
    countModels
}

