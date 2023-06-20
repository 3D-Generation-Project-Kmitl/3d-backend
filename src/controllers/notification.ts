import { notificationService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationService.getNotification(req.userId)
        sendResponse(res, notifications, 200);
    } catch (err) {
        return next(err);
    }
}

const readNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = Number(req.params.id);
        const notification = await notificationService.readNotification(notificationId);
        sendResponse(res, notification, 200);
    } catch (err) {
        return next(err);
    }
}

const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = Number(req.params.id);
        const notification = await notificationService.deleteNotification(notificationId);
        sendResponse(res, notification, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    getNotifications,
    readNotification,
    deleteNotification
}
