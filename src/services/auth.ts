import authConfig from '../configs/auth';
import prisma from '../utils/prisma';
import dayjs from 'dayjs';

export const createRefreshToken = async (userId: number, refreshToken: string) => {
    await prisma.oauthRefreshToken.create({
        data: {
            userId: userId,
            refreshToken: refreshToken,
            expired_at: dayjs().add(authConfig.jwtRefreshExpiration, 'day').toDate()
        }
    });
}

export const getRefreshToken = async (refreshToken: string) => {
    const result = await prisma.oauthRefreshToken.findFirst({
        where: {
            refreshToken: refreshToken
        }
    });
    return result;
}

export const updateExpiredToken = async (userId: number) => {
    await prisma.oauthRefreshToken.update({
        where: {
            userId: userId
        },
        data: {
            expired_at: dayjs().add(authConfig.jwtRefreshExpiration, 'day').toDate()
        }
    });
}

export const updateRefreshToken = async (userId: number, refreshToken: string) => {
    await prisma.oauthRefreshToken.update({
        where: {
            userId: userId
        },
        data: {
            refreshToken: refreshToken,
            expired_at: dayjs().add(authConfig.jwtRefreshExpiration, 'day').toDate()
        }
    });
}

export const removeRefreshToken = async (userId: number) => {
    await prisma.oauthRefreshToken.update({
        where: {
            userId: userId
        },
        data: {
            refreshToken: null,
            expired_at: null
        }
    });
}