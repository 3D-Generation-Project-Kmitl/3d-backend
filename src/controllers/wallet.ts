import { walletService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

const getWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const walletTransactions = await walletService.getWalletTransactions(req.userId);
        sendResponse(res, walletTransactions, 200);
    } catch (err) {
        return next(err);
    }
}

const withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const amount = Number(req.body.amount);
        const userId = req.userId;
        await walletService.createWalletTransactionWithdraw(userId, amount);
        sendResponse(res, {}, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    getWalletTransactions,
    withdraw
}