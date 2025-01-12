import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Kullanıcı Kaydı Servisi
const registerUser = async (userData) => {
    const { username, email, password, birthDate, maritalStatus, gender, roles } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use.');

    // Password hash işlemini kaldırdım, basit kontrol yapıyorum
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
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found.');

    // Basit kontrol yerine metin doğrulama
    if (password !== user.password) throw new Error('Invalid credentials.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// Kullanıcı Güncelleme Servisi
const updateUser = async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) throw new Error('User not found.');
    return updatedUser;
};

// Kullanıcı Arama Servisi (Kullanıcı adına göre arama)
const searchUsersByUsername = async (username) => {
    const users = await User.find({
        username: { $regex: `${username}`, $options: 'i' }  // 'i' case insensitive
    });
    return users;
};

// Tüm fonksiyonları tek bir nesne olarak dışa aktar
export default {
    registerUser,
    loginUser,
    updateUser,
    searchUsersByUsername
};
