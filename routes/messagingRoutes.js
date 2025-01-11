import express from 'express';
const router = express.Router();
import messagingController from '../controllers/messagingController.js'; // Default import

// Mesaj Gönderme Endpoint'i (POST)
router.post('/', messagingController.sendMessage);

// Belirli bir konuşmadaki mesajları getirme Endpoint'i (GET)
router.get('/:conversationId', messagingController.getMessages);

export default router;