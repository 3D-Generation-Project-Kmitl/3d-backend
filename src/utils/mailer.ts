import emailConfig from '../configs/email';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(emailConfig);

export const sendOTP = async (email: string, otp: string) => {
    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: 'OTP for reset password',
        text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions);
}
