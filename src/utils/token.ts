import authConfig from '../configs/auth';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const convertBearer = (token: String) => `Bearer ${token}`;

export const extractBearer = (token: String) => {
    if (token && token.split(' ')[0] === 'Bearer') {
        return token.split(' ')[1];
    }
    return null;
};

export const GenerateRefreshToken = async () => crypto.randomBytes(48).toString('hex');

export const GenerateAccessToken = (userId: number) => {
    const accessToken = jwt.sign(
        { id: userId },
        authConfig.secret,
        { expiresIn: authConfig.jwtExpiration },
    );

    return convertBearer(accessToken);
};

export default {
    GenerateRefreshToken,
    GenerateAccessToken,
    extractBearer,
    convertBearer,
};