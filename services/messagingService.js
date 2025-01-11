import Message from '../models/messagingModel.js';
import User from '../models/userModel.js';

const sendMessage = async (fromUserId, toUserId, message, conversationId) => {
    const sender = await User.findById(fromUserId);
    const receiver = await User.findById(toUserId);
    if (!sender || !receiver) throw new Error('User not found.');

    const newMessage = new Message({
        fromUserId,
        toUserId,
        message,
        conversationId // Burada conversationId'yi kullanıyoruz
    });

    await newMessage.save();
    return newMessage;
};

// Mesajları Görüntüleme Servisi
const getMessages = async (conversationId) => {
    const messages = await Message.find({ conversationId })
        .populate('fromUserId', 'username email')
        .populate('toUserId', 'username email')
        .sort({ createdAt: 1 }); // Eski mesajlar önce gelsin

    return messages;
};

// Servisleri dışa aktarma
export default {
    sendMessage,
    getMessages
};