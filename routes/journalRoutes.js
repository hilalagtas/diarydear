import express from 'express';
const router = express.Router();
import journalController from '../controllers/journalController.js';

// Günlük Ekleme Endpoint'i (POST)
router.post('/', journalController.addJournal);

export default router;