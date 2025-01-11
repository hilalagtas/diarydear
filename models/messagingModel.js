import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: [true, 'Message content is required'],
        trim: true
    },
    conversationId: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Mesaj Modeli
const Message = mongoose.model('Message', messageSchema);

// Default Export
export default Message;