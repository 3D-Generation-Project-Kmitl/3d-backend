import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const authConfig = {
    salt: Number(env.AUTH_SALT),
    secret: String(env.AUTH_SECRET),
    jwtExpiration: 180, // 180 second
    jwtRefreshExpiration: 7, // 7 days

};

export default authConfig;