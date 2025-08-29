import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Note } from '../models/Note.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const { title, body } = req.body || {};
  if (!title) return res.status(400).json({ message: 'Title required' });
  const note = await Note.create({ userId: req.user.id, title, body });
  res.status(201).json(note);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Deleted' });
});

export default router;