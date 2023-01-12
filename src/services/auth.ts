import authConfig from '../configs/auth';
import prisma from '../utils/prisma';
import { generateOTP } from '../utils/otp';
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

export const getOTP = async (userId: number) => {
    const result = await prisma.otp.findFirst({
        where: {
            userId: userId
        }
    });
    return result;
}

export const updateOTP = async (userId: number) => {
    const otp = await generateOTP();
    const result = await prisma.otp.upsert({
        where: {
            userId: userId
        },
        update: {
            otp: otp,
            expired_at: dayjs().add(authConfig.otpExpiration, 'minute').toDate()
        },
        create: {
            userId: userId,
            otp: otp,
            expired_at: dayjs().add(authConfig.otpExpiration, 'minute').toDate()
        }
    });
    return result;
}
