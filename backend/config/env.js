import dotenv from 'dotenv';
dotenv.config();


export const env = {
PORT: process.env.PORT || 3002,
MONGODB_URI: process.env.MONGODB_URI ,
JWT_SECRET: process.env.JWT_SECRET,
OTP_EXPIRES_MIN: Number(process.env.OTP_EXPIRES_MIN || 5),
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
 MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS

};