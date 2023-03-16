import prisma from '../utils/prisma';
import { WalletTransactionType, WalletTransaction, Cart, Product, Model, TransactionStatus, } from '@prisma/client';

type CartProduct = Cart & { Product: Product & { Model: Model } };
export const createWalletTransaction = async (userId: number, amount: number, type: WalletTransactionType, status: TransactionStatus) => {
    const walletTransactionResult = await prisma.walletTransaction.create({
        data: {
            userId: userId,
            amountMoney: amount,
            type: type,
            status: status
        }
    });
    return walletTransactionResult;
}

export const createWalletTransactionWithdraw = async (userId: number, amount: number) => {
    const walletTransactionResult = await createWalletTransaction(userId, amount, WalletTransactionType.WITHDRAW, TransactionStatus.PENDING);
    return walletTransactionResult;
}

export const createWalletTransactionOrder = async (carts: CartProduct[]) => {
    type UserTransaction = {
        userId: number,
        totalPrice: number
    }
    const userTransactions: UserTransaction[] = [];
    carts.forEach((item) => {
        const userTransaction = userTransactions.find((userTransaction) => userTransaction.userId === item.Product.userId);
        if (userTransaction) {
            userTransaction.totalPrice += item.Product.price;
        } else {
            userTransactions.push({
                userId: item.Product.userId,
                totalPrice: item.Product.price
            });
        }
    });
    userTransactions.forEach(async (item) => {
        await createWalletTransaction(item.userId, item.totalPrice, WalletTransactionType.ORDER, TransactionStatus.APPROVED);
    });
}

export const getWalletTransactions = async (userId: number) => {
    const walletTransactionResult = await prisma.walletTransaction.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    const balance = await getBalance(walletTransactionResult);
    return {
        walletTransactions: walletTransactionResult,
        balance: balance
    };
}

export const getAllWalletTransactions = async () => {
    const walletTransactionResult = await prisma.walletTransaction.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });
    return walletTransactionResult;
}

export const getBalance = async (walletTransactions: WalletTransaction[]) => {
    let balance = 0;
    walletTransactions.forEach((item) => {
        if (item.type === WalletTransactionType.WITHDRAW) balance -= item.amountMoney;
        else balance += item.amountMoney;
    });
    return balance;
}

export const adminGetWithdrawWalletTransactions = async () => {
    const walletTransactionResult = await prisma.walletTransaction.findMany({
        where: {
            type: WalletTransactionType.WITHDRAW,
            status: TransactionStatus.PENDING
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            User: {
                include: {
                    Identity: true
                }
            }

        }
    });
    return walletTransactionResult;
}

export const adminUpdateWalletTransaction = async (walletTransactionId: number, status: TransactionStatus, evidence?: string) => {
    const walletTransactionResult = await prisma.walletTransaction.update({
        where: {
            walletTransactionId: walletTransactionId
        },
        data: {
            status: status,
            evidence: evidence
        }
    });
    return walletTransactionResult;
}