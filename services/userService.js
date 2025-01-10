const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kullanıcı Kaydı Servisi
exports.registerUser = async (userData) => {
    const { username, email, password, birthDate, maritalStatus, gender, roles } = userData;

    // Kullanıcı zaten mevcut mu kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use.');

    // Yeni kullanıcı oluştur
    const user = new User({
        username,
        email,
        password,
        birthDate,
        maritalStatus,
        gender,
        roles,
    });

    await user.save();
    return user;
};

// Kullanıcı Girişi Servisi
exports.loginUser = async (email, password) => {
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found.');

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials.');

    // JWT token oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// Kullanıcı Güncelleme Servisi
exports.updateUser = async (id, updateData) => {
    // Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) throw new Error('User not found.');
    return updatedUser;
};
