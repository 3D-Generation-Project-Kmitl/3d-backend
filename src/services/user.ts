import prisma from '../utils/prisma';
import dayjs from 'dayjs';
import { User } from '@prisma/client';

export const createUser = async (user: User) => {
    const userResult = await prisma.user.create({
        data: user
    });
    return userResult;
}

export const getUserById = async (userId: number) => {
    const userResult = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    });
    return userResult;
}

export const getUserByEmail = async (email: string) => {
    const userResult = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return userResult;
}

export const updateUser = async (userId: number, user: User) => {
    const userResult = await prisma.user.update({
        where: {
            userId: userId
        },
        data: user
    });
    return userResult;
}

export const updatePassword = async (userId: number, password: string) => {
    await prisma.user.update({
        where: {
            userId: userId
        },
        data: {
            password: password
        }
    });
}