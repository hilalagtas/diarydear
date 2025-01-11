import mongoose from 'mongoose';

// Rol Şeması
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Role name must be at least 3 characters'],
    },
    description: {
        type: String,
        trim: true,
    },
    advice: {
        type: [String], // Rol için öneriler listesi
        default: [],
        validate: {
            validator: (v) => Array.isArray(v),
            message: 'Advice must be an array of strings',
        },
    },
}, { timestamps: true }); // Oluşturulma ve güncellenme tarihlerini tutar

// Rol Modeli
const Role = mongoose.model('Role', roleSchema);

// Default Export
export default Role;