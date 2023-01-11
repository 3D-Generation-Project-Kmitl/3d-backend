import emailConfig from '../configs/email';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;
const transporter = nodemailer.createTransport(emailConfig);

export const sendOTP = async (email: string, otp: string) => {
    const mailOptions = {
        from: env.EMAIL_USER,
        to: email,
        subject: 'OTP for reset password',
        text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions);
}
