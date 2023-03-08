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

const getAllWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const walletTransactions = await walletService.getAllWalletTransactions();
        sendResponse(res, walletTransactions, 200);
    } catch (err) {
        return next(err);
    }
}

const withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const amount = Number(req.body.amount);
        const userId = req.userId;
        const walletTransactionResult = await walletService.getWalletTransactions(userId);
        if (walletTransactionResult.balance < amount) {
            return next(new Error('Not enough money'));
        }
        const result = await walletService.createWalletTransactionWithdraw(userId, amount);
        sendResponse(res, result, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    getWalletTransactions,
    getAllWalletTransactions,
    withdraw
}