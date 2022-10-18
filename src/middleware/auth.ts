import authConfig from '../configs/auth';
import { AuthError } from '../errors/auth';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { isPermitRole } from '../constants/user';
import authToken, { extractBearer } from '../utils/token';
import { isExpired } from '../utils/isExpired';
import cookieConfig from '../configs/cookie';

import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

const { TokenExpiredError } = jwt;

interface JwtPayload {
    id: Number;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(new ApplicationError(AuthError.ACCESS_TOKEN_IS_REQUIRED));
    }

    const token = extractBearer(accessToken);

    if (!token) {
        return next(new ApplicationError(AuthError.ACCESS_TOKEN_IS_NOT_BEARER));
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret) as JwtPayload;
        req.body.user.userId = decoded.id;
        next();
    }
    catch (error) {
        if (error instanceof TokenExpiredError) {
            const { refreshToken } = req.cookies;

            // Validate refreshToken
            if (refreshToken == null) {
                return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_REQUIRED));
            }

            const result = await prisma.oauthRefreshToken.findFirst({
                where: {
                    refreshToken: refreshToken
                }
            });

            // Check if refresh token not found
            if (!result) {
                return next(new ApplicationError(AuthError.REFRESH_TOKEN_NOT_FOUND));
            }

            // Check if refresh token is expired
            if (isExpired(result.expired_at)) {
                return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_EXPIRED));
            }

            // Generate new access token from useId
            const newAccessToken = authToken.GenerateAccessToken(result.userId);

            // Extend refresh token expired time
            await prisma.oauthRefreshToken.update({
                where: {
                    userId: result.userId
                },
                data: {
                    expired_at: dayjs().add(authConfig.jwtRefreshExpiration, 'day').toDate()
                }
            });

            res.cookie('accessToken', newAccessToken, cookieConfig);

            req.body.user.userId = result.userId;
            return next();
        }
        return next(new ApplicationError(CommonError.UNAUTHORIZED));
    }

};

export const permit = (...permittedRoles: String[]) => async (
    req: Request, res: Response, next: NextFunction,
) => {

    const userId = req.body.userId;

    const userResult = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userResult) {
        return next(new ApplicationError(AuthError.USER_NOT_FOUND));
    }

    const hasPermission = permittedRoles.some(role => isPermitRole(role, userResult.role));

    if (!hasPermission) {
        return next(new ApplicationError(AuthError.NO_PERMISSION));
    }

    next();

};

export default {
    verifyToken,
    permit,
};