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
    await createWalletTransaction(userId, amount, WalletTransactionType.WITHDRAW, false);
}

export const createWalletTransactionOrder = async (carts: CartProduct[]) => {
    carts.forEach(async (item) => {
        await createWalletTransaction(item.Product.userId, item.Product.price, WalletTransactionType.ORDER, true);
    });
}

export const getWalletTransactions = async (userId: number) => {
    const walletTransactionResult = await prisma.walletTransaction.findMany({
        where: {
            userId: userId
        }
    });
    const balance = await getBalance(walletTransactionResult);
    return {
        walletTransactions: walletTransactionResult,
        balance: balance
    };
}

const getBalance = async (walletTransactions: WalletTransaction[]) => {
    let balance = 0;
    walletTransactions.forEach((item) => {
        if (item.type === WalletTransactionType.WITHDRAW) balance -= item.amountMoney;
        else balance += item.amountMoney;
    });
    return balance;
}

