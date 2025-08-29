import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';


const app = express();
app.use(helmet());
app.use(cors({ origin: ['https://notes-ddtu.onrender.com'], credentials: true }));
app.use(express.json());


app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


connectDB().then(() => {
app.listen(env.PORT, () => console.log(`API running on :${env.PORT}`));
});