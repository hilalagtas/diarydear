const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcı Kayıt Endpoint'i (POST)
router.post('/register', userController.registerUser);

// Kullanıcı Girişi Endpoint'i (POST)
router.post('/login', userController.loginUser);

// Kullanıcı Güncelleme Endpoint'i (PUT)
router.put('/update/:id', userController.updateUser);

module.exports = router;
