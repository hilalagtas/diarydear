import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Kullanıcı Kaydı Servisi
const registerUser = async (userData) => {
    const { username, email, password, birthDate, maritalStatus, gender, roles } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use.');

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// Kullanıcı Güncelleme Servisi
const updateUser = async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) throw new Error('User not found.');
    return updatedUser;
};

// Tüm fonksiyonları tek bir nesne olarak dışa aktar
export default {
    registerUser,
    loginUser,
    updateUser
};
