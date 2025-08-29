import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
});

export async function sendOtpMail(to, otp) {
  await transporter.sendMail({
    from: `"Notes App" <${env.MAIL_USER}>`,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It will expire in ${env.OTP_EXPIRES_MIN} minutes.`,
  });
}
