import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { generateOtp, verifyOtp } from '../utils/otp.js';
import { signJwt } from '../utils/jwt.js';
import { sendOtpMail } from '../utils/mailer.js';

const router = Router();
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// 1) Request OTP
router.post('/request-otp', async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const otp = generateOtp(email, name);

  try {
    await sendOtpMail(email, otp);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
});


// 2) Verify OTP and create/login user
router.post('/verify-otp', async (req, res) => {
  const { email, otp, name } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });

  const isValid = verifyOtp(email, otp); 
  if (!isValid) return res.status(400).json({ message: 'Invalid or expired OTP' });

  // find or create user
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: name || email.split('@')[0], 
         provider: "otp"
    });
  }

  const token = signJwt({ id: user.id, email: user.email, name: user.name });

  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});



// 3) Optional: email+password
router.post('/signup-password', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password || !name) return res.status(400).json({ message: 'email, password, name required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already used' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash: hash, provider: 'local' });
  const token = signJwt({ id: user.id, email: user.email, name: user.name });
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/login-password', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signJwt({ id: user.id, email: user.email, name: user.name });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// 4) Google Sign-In — expects ID token from GIS
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ message: 'Missing idToken' });
    const ticket = await googleClient.verifyIdToken({ idToken, audience: env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload?.email) return res.status(400).json({ message: 'Email not present in token' });
    let user = await User.findOne({ email: payload.email });
    if (!user) user = await User.create({ email: payload.email, name: payload.name, provider: 'google' });
    const token = signJwt({ id: user.id, email: user.email, name: user.name });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Google auth failed' });
  }
});

export default router;