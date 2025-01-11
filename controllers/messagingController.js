import messagingService from '../services/messagingService.js';

// Mesaj Gönderme
const sendMessage = async (req, res) => {
    try {
        const { fromUserId, toUserId, message } = req.body;

        if (!fromUserId || !toUserId || !message) {
            return res.status(400).json({ error: 'fromUserId, toUserId ve message gereklidir.' });
        }

        const conversationId = [fromUserId, toUserId].sort().join('-'); // Konuşma ID'sini oluştur
        const newMessage = await messagingService.sendMessage(fromUserId, toUserId, message, conversationId);

        return res.status(201).json({ message: 'Message sent successfully.', newMessage });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Mesajları Görüntüleme
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID is required.' });
        }

        const messages = await messagingService.getMessages(conversationId);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Fonksiyonları dışa aktarıyoruz
export default { sendMessage, getMessages };