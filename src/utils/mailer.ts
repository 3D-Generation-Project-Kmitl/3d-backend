import emailConfig from '../configs/email';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(emailConfig);

export const sendOTP = async (email: string, otp: string, ref: string) => {
    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: 'OTP สำหรับยืนยันตัวตน',
        text: `รหัส OTP ของคุณคือ ${otp}\n\n\nรหัสอ้างอิง (Ref):${ref}`,
    };
    transporter.sendMail(mailOptions);
}
