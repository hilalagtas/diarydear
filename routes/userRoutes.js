import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';  // default import

// Kullanıcı Kaydı Endpoint'i (POST)
router.post('/register', userController.registerUser);

// Kullanıcı Girişi Endpoint'i (POST)
router.post('/login', userController.loginUser);

// Kullanıcı Güncelleme Endpoint'i (PUT)
router.put('/update/:id', userController.updateUser);

export default router;
