import { walletService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';
import filePath2FullURL from '../utils/filePath2FullURL';

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

const adminGetWithdrawWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const walletTransactions = await walletService.adminGetWithdrawWalletTransactions();
        sendResponse(res, walletTransactions, 200);
    } catch (err) {
        return next(err);
    }
}

const adminUpdateWalletTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { walletTransactionId, status } = req.body;
        walletTransactionId = Number(walletTransactionId);
        const evidence = filePath2FullURL(req);
        const result = await walletService.adminUpdateWalletTransaction(walletTransactionId, status, evidence);
        sendResponse(res, result, 200);
    } catch (err) {
        return next(err);
    }
}

export default {
    getWalletTransactions,
    getAllWalletTransactions,
    withdraw,
    adminGetWithdrawWalletTransactions,
    adminUpdateWalletTransaction
}