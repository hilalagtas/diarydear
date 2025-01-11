import Friend from '../models/friendsModel.js';
import User from '../models/userModel.js';

// Arkadaş Ekleme Servisi
const sendFriendRequest = async (userId, friendId) => {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) throw new Error('User not found.');

    const existingRequest = await Friend.findOne({ userId, friendId, status: 'pending' });
    if (existingRequest) throw new Error('Friend request already sent.');

    const friendRequest = new Friend({ userId, friendId, status: 'pending' });
    await friendRequest.save();
    return friendRequest;
};

// Arkadaşlık İsteğini Kabul Etme Servisi
const acceptFriendRequest = async (requestId) => {
    const request = await Friend.findById(requestId);
    if (!request || request.status !== 'pending') throw new Error('Friend request not found or already handled.');

    request.status = 'accepted';
    await request.save();
    return request;
};

// Arkadaş Listesini Getirme Servisi
const getFriendsList = async (userId) => {
    const friends = await Friend.find({ 
        $or: [{ userId, status: 'accepted' }, { friendId: userId, status: 'accepted' }]
    }).populate('userId friendId', 'username email');
    
    return friends;
};

// Arkadaş Silme Servisi
const removeFriend = async (userId, friendId) => {
    const deletedFriend = await Friend.findOneAndDelete({ 
        $or: [{ userId, friendId }, { userId: friendId, friendId: userId }],
        status: 'accepted'
    });

    if (!deletedFriend) throw new Error('Friend not found.');
    return deletedFriend;
};

// Servisleri dışa aktarma
export default {
    sendFriendRequest,
    acceptFriendRequest,
    getFriendsList,
    removeFriend
};