import dotenv from 'dotenv';
import { PoolConfig } from 'pg';

dotenv.config();

const { env } = process;

const dbConfig: PoolConfig = {
    user: env.DB_USER,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
};

export default dbConfig;