const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Kullanıcı Şeması
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required'],
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married'],
        required: [true, 'Marital status is required'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required'],
    },
    roles: {
        type: [String],
        required: [true, 'At least one role is required'],
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: 'Roles cannot be empty',
        },
    },
}, { timestamps: true });

// Şifre Hashleme Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Şifre değişmediyse hashleme
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Şifre Doğrulama Metodu
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Kullanıcı Modeli
const User = mongoose.model('User', userSchema);

module.exports = User;
