import authConfig from '../configs/auth';
import cookieConfig from '../configs/cookie';
import authToken from '../utils/token';
import { userService, authService } from '../services';
import { ApplicationError } from '../errors/applicationError';
import { CommonError } from '../errors/common';
import { AuthError } from '../errors/auth';
import { sendResponse } from '../utils/response';
import { isExpired } from '../utils/isExpired';
import prisma from '../utils/prisma';

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';


const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken == null) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_REQUIRED));
        }

        const result = await authService.getRefreshToken(refreshToken);

        if (!result) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_NOT_FOUND));
        }

        if (isExpired(result.expired_at)) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_EXPIRED));
        }

        // Generate new access token from useId
        const newAccessToken = authToken.GenerateAccessToken(result.userId);

        // Extend refresh token expired time
        await authService.updateExpiredToken(result.userId);

        const userResult = await userService.getUserById(result.userId);

        if (!userResult) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }

        const { password: unusedPassword, ...userProfile } = userResult;

        res.cookie('accessToken', newAccessToken, cookieConfig);
        sendResponse(res, userProfile, 200);

    } catch (error) {
        return next(error);
    }
}


const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, authConfig.salt);
        user.role = 'USER';
        user.isVerified = false;
        const userResult = await userService.createUser(user);

        const accessToken = authToken.GenerateAccessToken(userResult.userId);
        const refreshToken = await authToken.GenerateRefreshToken();

        await authService.createRefreshToken(userResult.userId, refreshToken);

        // Remove unused password from userResult
        const { password: unusedPassword, ...userProfile } = userResult;

        res.cookie('accessToken', accessToken, cookieConfig);
        res.cookie('refreshToken', refreshToken, cookieConfig);

        sendResponse(res, userProfile, 200);
    } catch (error) {
        return next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userResult = await userService.getUserByEmail(email);

        if (!userResult) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }

        const isPasswordValid = bcrypt.compareSync(password, userResult.password);
        if (!isPasswordValid) {
            return next(new ApplicationError(CommonError.UNAUTHORIZED));
        }

        const accessToken = authToken.GenerateAccessToken(userResult.userId);
        const refreshToken = await authToken.GenerateRefreshToken();

        await authService.updateRefreshToken(userResult.userId, refreshToken);

        // Remove unused password from userResult
        const { password: unusedPassword, ...userProfile } = userResult;

        res.cookie('accessToken', accessToken, cookieConfig);
        res.cookie('refreshToken', refreshToken, cookieConfig);

        sendResponse(res, userProfile, 200);
    } catch (error) {
        return next(error);
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        await authService.deleteRefreshToken(userId);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        sendResponse(res, { message: 'Logout success' }, 200);
    } catch (error) {
        return next(error);
    }
}

const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken == null) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_REQUIRED));
        }

        const result = await authService.getRefreshToken(refreshToken);
        if (!result) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_NOT_FOUND));
        }

        if (isExpired(result.expired_at)) {
            return next(new ApplicationError(AuthError.REFRESH_TOKEN_IS_EXPIRED));
        }

        // Generate new access token from useId
        const newAccessToken = authToken.GenerateAccessToken(result.userId);

        // Extend refresh token expired time
        await authService.updateExpiredToken(result.userId);

        res.cookie('accessToken', newAccessToken, cookieConfig);
        sendResponse(res, { accessToken: newAccessToken }, 200);

    } catch (error) {
        return next(error);
    }
}

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;
    if (oldPassword === newPassword) {
        return next(new ApplicationError(AuthError.PASSWORD_SHOULD_DIFFERENT));
    }
    try {
        const userResult = await userService.getUserById(userId);
        if (!userResult) {
            return next(new ApplicationError(AuthError.USER_NOT_FOUND))
        }

        const passwordIsValid = bcrypt.compareSync(
            oldPassword,
            userResult.password,
        );

        if (!passwordIsValid) {
            return next(new ApplicationError(AuthError.INVALID_PASSWORD))
        }

        const newPasswordHash = bcrypt.hashSync(newPassword, authConfig.salt);

        await userService.updatePassword(userId, newPasswordHash);

        sendResponse(res, { message: 'Update password success' });

    } catch (error) {
        return next(error);
    }
}

export default {
    register,
    login,
    logout,
    getAccessToken,
    updatePassword,
    validateToken,
}
