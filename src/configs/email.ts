import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const emailConfig = {
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
};

export default emailConfig;