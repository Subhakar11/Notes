import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';


export function requireAuth(req, res, next) {
const header = req.headers.authorization;
if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
const token = header.slice(7);
try {
const decoded = jwt.verify(token, env.JWT_SECRET);
req.user = decoded;
next();
} catch (e) {
return res.status(401).json({ message: 'Invalid token' });
}
}