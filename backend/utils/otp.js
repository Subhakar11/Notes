import crypto from 'crypto';
import { env } from '../config/env.js';


const store = new Map();


export function generateOtp(email, name) {
const otp = ('' + crypto.randomInt(0, 1000000)).padStart(6, '0');
const expiresAt = Date.now() + env.OTP_EXPIRES_MIN * 60 * 1000;
store.set(email, { otp, expiresAt, name });
return otp;
}


export function verifyOtp(email, otp) {
const entry = store.get(email);
if (!entry) return { ok: false, reason: 'No OTP requested' };
if (Date.now() > entry.expiresAt) return { ok: false, reason: 'OTP expired' };
if (entry.otp !== otp) return { ok: false, reason: 'Invalid OTP' };
store.delete(email);
return { ok: true, name: entry.name };
}