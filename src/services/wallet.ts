import prisma from '../utils/prisma';
import { WalletTransactionType, WalletTransaction, Cart, Product, Model, } from '@prisma/client';

type CartProduct = Cart & { Product: Product & { Model: Model } };
export const createWalletTransaction = async (userId: number, amount: number, type: WalletTransactionType, isCompleted: boolean) => {
    const walletTransactionResult = await prisma.walletTransaction.create({
        data: {
            userId: userId,
            amountMoney: amount,
            type: type,
            isCompleted: isCompleted
        }
    });
    return walletTransactionResult;
}

export const createWalletTransactionWithdraw = async (userId: number, amount: number) => {
    const walletTransactionResult = await createWalletTransaction(userId, amount, WalletTransactionType.WITHDRAW, false);
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
        await createWalletTransaction(item.userId, item.totalPrice, WalletTransactionType.ORDER, true);
    });
    // carts.forEach(async (item) => {
    //     await createWalletTransaction(item.Product.userId, item.Product.price, WalletTransactionType.ORDER, true);
    // });
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

