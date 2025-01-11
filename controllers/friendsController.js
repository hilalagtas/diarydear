import friendsService from '../services/friendsService.js';

// Arkadaş Ekleme
const sendFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const request = await friendsService.sendFriendRequest(userId, friendId);
        return res.status(201).json({ message: 'Friend request sent successfully.', request });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Arkadaşlık İsteğini Kabul Etme
const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const updatedRequest = await friendsService.acceptFriendRequest(requestId);
        return res.json({ message: 'Friend request accepted.', updatedRequest });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Arkadaş Listesini Getirme
const getFriendsList = async (req, res) => {
    try {
        const { userId } = req.params;
        const friends = await friendsService.getFriendsList(userId);
        return res.json(friends);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Arkadaş Silme
const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const deletedFriend = await friendsService.removeFriend(userId, friendId);
        return res.json({ message: 'Friend removed successfully.', deletedFriend });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Fonksiyonları dışa aktarıyoruz
export default { sendFriendRequest, acceptFriendRequest, getFriendsList, removeFriend };